'use client'
import React, { useEffect, useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Divider,
    Image,
    Input,
    Button,
    Listbox,
    ListboxItem,
    Pagination,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Spinner
} from "@nextui-org/react";

import Link from "next/link";
import api from '@/ess/api'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/middleware/frontend';
import { uploadFile } from "ru6su6.dev";
import Cookies from "js-cookie";

export default function Boss({ D, admin = false }) {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const MySwal = withReactContent(Swal)

    const [SD, setSD] = useState()

    const [ITEM, setITEM] = useState()


    const [FN, setFN] = useState()
    const [FI, setFI] = useState()
    const [FID, setFID] = useState()
    const [IT, setIT] = useState([""])
    const [M, setM] = useState([""])

    const fetch = async (code) => {
        setITEM()
        api.get('get/boss_desc', {
            params: {
                drop: JSON.stringify(code)
            }
        })
            .then(async (d) => {
                setITEM(d.data)
            })
    }
    const skill = (d, type, i) => {
        var k = d.split(',')[0]
        var v = d.split(',')[1]
        if (type == 'attack') {
            switch (k) {
                case 'skillAttr_SLASH':
                    return <p key={i}>โจมตีสะบั้น : {v}</p>
                    break
                case 'skillAttr_STING':
                    return <p key={i}>โจมตีแทง : {v}</p>
                    break
                case 'skillAttr_BREAK':
                    return <p key={i}>โจมตีสับ : {v}</p>
                    break
                case 'skillAttr_ARROW':
                    return <p key={i}>โจมตียิง : {v}</p>
                    break
                case 'skillAttr_FIRE':
                    return <p key={i}>โจมตีไฟ : {v}</p>
                    break
                case 'skillAttr_WATER':
                    return <p key={i}>โจมตีน้ำ : {v}</p>
                    break
                case 'skillAttr_GOD':
                    return <p key={i}>โจมตีเซียน : {v}</p>
                    break
                case 'skillAttr_EVIL':
                    return <p key={i}>โจมตีมาร : {v}</p>
                    break
            }
        } else if (type == 'magic') {
            switch (k) {
                case 'skillAttr_SLASH':
                    return <p key={i}>ป้องกันสะบั้น : {v}</p>
                    break
                case 'skillAttr_STING':
                    return <p key={i}>ป้องกันแทง : {v}</p>
                    break
                case 'skillAttr_BREAK':
                    return <p key={i}>ป้องกันสับ : {v}</p>
                    break
                case 'skillAttr_ARROW':
                    return <p key={i}>ป้องกันยิง : {v}</p>
                    break
                case 'skillAttr_FIRE':
                    return <p key={i}>ป้องกันไฟ : {v}</p>
                    break
                case 'skillAttr_WATER':
                    return <p key={i}>ป้องกันน้ำ : {v}</p>
                    break
                case 'skillAttr_GOD':
                    return <p key={i}>ป้องกันเซียน : {v}</p>
                    break
                case 'skillAttr_EVIL':
                    return <p key={i}>ป้องกันมาร : {v}</p>
                    break
            }
        }
    }

    const handleInputChange = (type, index) => (event) => {
        if (type == 'item') {
            const newData = [...IT];
            newData[index] = event.target.value;
            setIT(newData);
        } else if (type == 'map') {
            const newData = [...M];
            newData[index] = event.target.value;
            setM(newData);
        }
    };

    const handleDeleteInput = (type, index) => {
        if (type == 'item') {
            const newData = [...IT];
            newData.splice(index, 1);
            setIT(newData);
        } else if (type == 'map') {
            const newData = [...M];
            newData.splice(index, 1);
            setM(newData);
        }
    };

    const handleAddInput = (type) => {
        if (type == 'item') {
            setIT([...IT, '']);
        } else if (type == 'map') {
            setM([...M, ''])
        }
    };
    const handleFileChange = async (event, type) => {
        const file = event.target.files[0];
        const maxSize = 100 * 1024 * 1024;
        if (file?.size > maxSize) {
            MySwal.fire({
                title: <strong>Error!</strong>,
                html: <b>ไฟล์มีขนาดเกินกำหนด (ไม่เกิน 100 MB)</b>,
                icon: 'error'
            })
            event.target.value = null;
            return;
        } else {
            try {
                const result = await uploadFile(file);
                setFI(result.url)
            } catch (error) {
                console.error('เกิดข้อผิดพลาดในการส่งคำขอ:', error);
                return MySwal.fire({
                    title: <strong>Error!</strong>,
                    html: <b>เกิดข้อผิดพลาดในการอัพโหลดไฟล์</b>,
                    icon: 'error'
                })
            }
        }
    };
    const del = async (id) => {
        MySwal.fire({
            title: "ต้องการลบบอสหรือมอนส์เตอร์ใช่หรือไม่ ?",
            // text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "ต้องการลบบอสหรือมอนส์เตอร์",
            cancelButtonText: "ยกเลิก"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await api.delete('/admin/boss', {
                    params: {
                        id
                    },
                    headers: {
                        authorization: Cookies.get('token')
                    }
                })
                    .then(async (ress) => {
                        MySwal.fire({
                            title: <strong>Good job!</strong>,
                            html: <b>{ress.data.msg}</b>,
                            icon: 'success'
                        })
                    })
                    .catch(function (error) {
                        console.log(error)
                        MySwal.fire({
                            title: <strong>Error!</strong>,
                            html: <b>{error?.response?.data?.msg}</b>,
                            icon: 'error'
                        })
                    })
            }
        });

    }

    const submit = async (e) => {
        e.preventDefault()
        await api.put('/admin/boss', {
            FN,
            FI,
            IT,
            id: FID,
            M
        }, {
            headers: {
                authorization: Cookies.get('token')
            }
        })
            .then(async (ress) => {
                MySwal.fire({
                    title: <strong>Good job!</strong>,
                    html: <b>{ress.data.msg}</b>,
                    icon: 'success'
                })
                onOpenChange(0)
                setFN()
                setFI()
                setIT([""])
            })
            .catch(function (error) {
                console.log(error)
                MySwal.fire({
                    title: <strong>Error!</strong>,
                    html: <b>{error?.response?.data?.msg}</b>,
                    icon: 'error'
                })
            })
    }
    return (
        <>
            {D && D?.data && D?.data.map((d, i) => (
                <>
                    <div
                        className="relative flex w-64 max-w-full flex-none scroll-ml-6 flex-col gap-3 rounded-large bg-content1 p-4 shadow-medium"
                    >
                        <div
                            className="relative flex max-h-full w-full flex-col items-center justify-center overflow-visible"
                        >
                            <Image
                                width={100}
                                height={120}
                                className="z-0 overflow-visible object-contain object-center hover:scale-110"
                                src={d?.image || `/boss/${d?.code?.toString().padStart(4, '0')}_1-1.bmp`}
                                fallbackSrc="https://via.placeholder.com/100x120"
                                alt="NextUI Image with fallback"
                            />
                        </div>
                        <div className="flex flex-col gap-3 px-1">
                            <div
                                className="flex items-center justify-between"
                            >
                                <h3 className="text-medium font-medium text-default-700">{d?.name}</h3>
                            </div>
                            <div className="flex gap-2 flex-col">

                                <Button
                                    fullWidth
                                    className="font-medium backdrop-blur-md bg-black/20 border-medium border-red-500"
                                    // color="danger"
                                    radius="lg"
                                    // variant={isPopular ? "flat" : "solid"}
                                    onClick={() => { onOpen(); setSD(d); fetch(d?.drop); if (admin) { setFN(d.name); setFI(d.image); setIT(d.drop); setFID(d._id); setM(d?.maps) } }}
                                >
                                    {admin ? 'แก้ไข' : 'รายละเอียด'}
                                </Button>

                                {admin &&
                                    <Button
                                        fullWidth
                                        radius="lg"
                                        color="danger"
                                        onClick={() => del(d._id)}
                                    >
                                        ลบ
                                    </Button>
                                }
                            </div>
                        </div>
                    </div>
                </>
            ))}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size={admin ? '2xl' : ''} scrollBehavior="outside">
                <ModalContent>
                    {(onClose) => (
                        <>
                            {!admin &&
                                <>
                                    <ModalHeader className="flex flex-col gap-1">รายละเอียด {SD?.name}</ModalHeader>
                                    <ModalBody className="text-center">
                                        <div className="grid grid-cols-1 lg:grid-cols-2">
                                            <p>เลเวล : {SD?.level}</p>
                                            <p>ค่าประสบการณ์ : {SD?.level}</p>
                                            <p>พลังกาย : {SD?.level}</p>
                                            <p>พลังสกิล : {SD?.level}</p>
                                            <p>พลังโจมตี : {SD?.level}</p>
                                            <p>พลังป้องกัน : {SD?.level}</p>
                                            <p>ความเร็วโจมตี : {SD?.level}</p>
                                            <p>ความแรงพลังโจมตีสกิล : {SD?.level}</p>
                                            {SD?.magic_attack_type && SD?.magic_attack_type?.map((d, i) => skill(d, 'attack', i))}
                                            {SD?.eq_magic_resist && SD?.eq_magic_resist?.map((d, i) => skill(d, 'magic', i))}
                                            <p>โจมตี : {SD?.attr_str || 0}</p>
                                            <p>ปัญญา : {SD?.attr_int || 0}</p>
                                            <p>ตะบะ : {SD?.attr_mind || 0}</p>
                                            <p>กาย : {SD?.attr_con || 0}</p>
                                            <p>ตีโต้ : {SD?.attr_dex || 0}</p>
                                            <p>คุม : {SD?.attr_leader || 0}</p>
                                        </div>
                                        {SD?.maps !== [] &&
                                            <>
                                                <Divider />
                                                <p className="my-3">แผนที่</p>
                                                <Divider />
                                                <div className="grid grid-cols-1 lg:grid-cols-4">
                                                    {SD?.maps?.map((d, i) => (
                                                        <p>{d}</p>
                                                    ))}
                                                </div>
                                            </>
                                        }

                                        {!ITEM ? <Spinner color="danger" label="กำลังโหลดข้อมูลเพิ่มเติม..." /> : <div className="">
                                            <Divider />
                                            <p className="my-3">ไอเท็มที่ดรอป</p>
                                            <Divider />
                                            <div className="grid grid-cols-4 lg:grid-cols-4 mt-3 gap-2">
                                                {ITEM.map((d, i) => (
                                                    <div className="flex flex-col justify-center items-center">
                                                        <Image
                                                            width={33}
                                                            height={40}
                                                            className="z-0 overflow-visible object-contain object-center hover:scale-110"
                                                            src={`/items/${d?.code.toString().padStart(4, '0')}_1-1.bmp`}
                                                            fallbackSrc="https://via.placeholder.com/33x40"
                                                            alt=""
                                                        />
                                                        <small>{d?.name}</small>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>}
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="danger" variant="light" onPress={onClose}>
                                            ปิด
                                        </Button>
                                    </ModalFooter>
                                </>
                            }
                            {admin &&
                                <form onSubmit={submit}>
                                    <ModalHeader className="flex flex-col gap-1">แก้ไขบอสหรือมอนส์เตอร์</ModalHeader>
                                    <ModalBody>
                                        <Input
                                            className="mb-2"
                                            type="text"
                                            label="ชื่อ"
                                            variant='bordered'
                                            value={FN}
                                            onChange={(e) => setFN(e.target.value)}
                                        />
                                        <label className="block">
                                            <input
                                                id='uploadFile'
                                                type="file"
                                                className="block w-full text-sm text-gray-500
                                        file:me-4 file:py-2 file:px-4
                                        file:rounded-lg file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-danger file:text-white
                                        file:cursor-pointer
                                        file:disabled:opacity-50 file:disabled:pointer-events-none"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                            />
                                        </label>
                                        <Image
                                            width={100}
                                            height={120}
                                            className="z-0 overflow-visible object-contain object-center hover:scale-110"
                                            src={FI || ''}
                                            fallbackSrc="https://via.placeholder.com/100x120"
                                            alt="NextUI Image with fallback"
                                        />
                                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
                                            {IT?.map((d, i) => (
                                                <>
                                                    <Input
                                                        className="mb-2 lg:col-span-3"
                                                        type="text"
                                                        label="เลข Code ไอเท็ม"
                                                        variant='bordered'
                                                        value={d}
                                                        onChange={handleInputChange('item', i)}
                                                    />
                                                    <Button color="danger" onClick={() => handleDeleteInput('item', i)} className='h-[56px]'>
                                                        X
                                                    </Button>
                                                </>
                                            ))}
                                        </div>
                                        <Button color="danger" onClick={() => handleAddInput('item')}>
                                            เพิ่มไอเท็ม
                                        </Button>
                                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
                                            {M?.map((d, i) => (
                                                <>
                                                    <Input
                                                        className="mb-2 lg:col-span-3"
                                                        type="text"
                                                        label="ชื่อแผนที่"
                                                        variant='bordered'
                                                        value={d}
                                                        onChange={handleInputChange('map', i)}
                                                    />
                                                    <Button color="danger" onClick={() => handleDeleteInput('map', i)} className='h-[56px]'>
                                                        X
                                                    </Button>
                                                </>
                                            ))}
                                        </div>
                                        <Button color="danger" onClick={() => handleAddInput('map')}>
                                            เพิ่มแผนที่
                                        </Button>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="danger" variant="light" onPress={onClose}>
                                            ยกเลิก
                                        </Button>
                                        <Button color="danger" type='submit'>
                                            แก้ไขบอสหรือมอนส์เตอร์
                                        </Button>
                                    </ModalFooter>
                                </form>
                            }
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
