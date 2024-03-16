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

export default function Items({ D, admin = false }) {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const MySwal = withReactContent(Swal)
    const [SD, setSD] = useState()
    const [BOSS, setBOSS] = useState()
    const [FN, setFN] = useState()
    const [FI, setFI] = useState()
    const [FID, setFID] = useState()
    const fetch = async (code) => {
        setBOSS()
        api.get('get/item_desc', {
            params: {
                item: code
            }
        })
            .then(async (d) => {
                setBOSS(d.data)
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
            title: "ต้องการลบไอเท็มใช่หรือไม่ ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "ต้องการลบไอเท็ม",
            cancelButtonText: "ยกเลิก"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await api.delete('/admin/item', {
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
        await api.put('/admin/item', {
            FN,
            FI,
            id: FID
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
                        key={i}
                    >
                        <div
                            className="relative flex max-h-full w-full flex-col items-center justify-center overflow-visible"
                        >
                            <Image
                                width={100}
                                height={120}
                                className="z-0 overflow-visible object-contain object-center hover:scale-110"
                                src={d?.image || `/items/${d?.icon?.toString().padStart(4, '0')}_1-1.bmp`}
                                fallbackSrc="https://via.placeholder.com/100x120"
                                alt="NextUI Image with fallback"
                            />
                        </div>
                        <div className="flex flex-col gap-3 px-1">
                            <div
                                className="flex items-center justify-center"
                            >
                                <h3 className="text-medium font-medium text-default-700">{d?.name}</h3>
                                {/* <p className="text-medium font-medium text-default-500">${price}</p> */}
                            </div>
                            <div className="flex gap-2 flex-col">
                                <Button
                                    fullWidth
                                    className="font-medium backdrop-blur-md bg-black/20 border-medium border-red-500"
                                    // color="danger"
                                    radius="lg"
                                    // variant={isPopular ? "flat" : "solid"}
                                    onClick={() => { onOpen(); setSD(d); fetch(d.code); if (admin) { setFN(d.name); setFI(d.image); setFID(d._id); } }}
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
                                        <p>{SD?.help_string}</p>
                                        <Divider />
                                        <div className="grid grid-cols-1 lg:grid-cols-2">
                                            <p>ราคาซื้อ : {SD?.cost || 0}</p>
                                            <p>ราคาขาย : {SD?.sell || 0}</p>
                                            <p>จำกัดเลเวล : {SD?.limit_level || 0}</p>
                                            <p>พลังโจมตี : {SD?.add_attack_power?.replace(",", " - ") || 0}</p>
                                            <p>ความเร็วโจมตี : {SD?.attack_speed || 0}</p>
                                            <p>อัตรากระหน่ำ : {SD?.add_weapon_hit || 0}</p>
                                            {SD?.eq_magic_attack_type && SD?.eq_magic_attack_type?.map((d, i) => skill(d, 'attack', i))}
                                            {SD?.eq_magic_resist && SD?.eq_magic_resist?.map((d, i) => skill(d, 'magic', i))}
                                            <p>โจมตี : {SD?.add_attr_str || 0}</p>
                                            <p>ปัญญา : {SD?.add_attr_int || 0}</p>
                                            <p>ตะบะ : {SD?.add_attr_mind || 0}</p>
                                            <p>กาย : {SD?.add_attr_con || 0}</p>
                                            <p>ตีโต้ : {SD?.add_attr_dex || 0}</p>
                                            <p>คุม : {SD?.add_attr_leader || 0}</p>
                                        </div>
                                        {!BOSS ? <Spinner color="danger" label="กำลังโหลดข้อมูลเพิ่มเติม..." /> : <div className="">
                                            <Divider />
                                            <p className="my-3">บอสและมอนส์เตอร์ที่ดรอปไอเท็ม</p>
                                            <Divider />
                                            <div className="grid grid-cols-4 lg:grid-cols-4 mt-3 gap-2">
                                                {BOSS.map((d, i) => (
                                                    <div className="flex flex-col justify-center items-center">
                                                        <Image
                                                            width={33}
                                                            height={40}
                                                            className="z-0 overflow-visible object-contain object-center hover:scale-110"
                                                            src={`/boss/${d?.code.toString().padStart(4, '0')}_1-1.bmp`}
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
                                    <ModalHeader className="flex flex-col gap-1">แก้ไขไอเท็ม</ModalHeader>
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
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="danger" variant="light" onPress={onClose}>
                                            ยกเลิก
                                        </Button>
                                        <Button color="danger" type='submit'>
                                            แก้ไขไอเท็ม
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
