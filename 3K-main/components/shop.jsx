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
import Cookies from "js-cookie";
import { uploadFile } from "ru6su6.dev";

export default function Shops({ D, admin = false }) {
    const router = useRouter()
    const MySwal = withReactContent(Swal)
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [SD, setSD] = useState()
    const [BOSS, setBOSS] = useState()


    const [FN, setFN] = useState()
    const [FI, setFI] = useState()
    const [FID, setFID] = useState()
    const [IT, setIT] = useState([""])

    const fetch = async (code) => {
        setBOSS()
        api.get('get/shop_desc', {
            params: {
                item: JSON.stringify(code)
            }
        })
            .then(async (d) => {
                setBOSS(d.data)
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

    const handleInputChange = (index) => (event) => {
        const newData = [...IT];
        newData[index] = event.target.value;
        setIT(newData);
    };

    const handleDeleteInput = (index) => {
        const newData = [...IT];
        newData.splice(index, 1);
        setIT(newData);
    };

    const handleAddInput = () => {
        setIT([...IT, '']);
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
            title: "ต้องการลบร้านค้าใช่หรือไม่ ?",
            // text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "ต้องการลบร้านค้า",
            cancelButtonText: "ยกเลิก"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await api.delete('/admin/shop', {
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
        await api.put('/admin/shop', {
            FN,
            FI,
            IT,
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
                        key={i}
                    >
                        <div
                            className="relative flex  max-h-full w-full flex-col items-center justify-center overflow-visible"
                        >
                            <Image
                                width={100}
                                height={120}
                                className="z-0 overflow-visible object-contain object-center hover:scale-110"
                                src={d?.image || `/Shop.png`}
                                fallbackSrc="https://via.placeholder.com/100x120"
                                alt="NextUI Image with fallback"
                            />
                        </div>
                        <div className="flex flex-col gap-3 px-1 h-full">
                            <div
                                className="flex items-center justify-center"
                            >
                                <h3 className="text-medium font-medium text-default-700">{d?.ShopName}</h3>
                            </div>
                            <div className="flex gap-2 flex-col">

                                <Button
                                    fullWidth
                                    className="font-medium backdrop-blur-md bg-black/20 border-medium border-red-500"
                                    // color="danger"
                                    radius="lg"
                                    // variant={isPopular ? "flat" : "solid"}
                                    onClick={() => { onOpen(); setSD(d); fetch(d.items); if (admin) { setFN(d.ShopName); setFI(d.image); setIT(d.items); setFID(d._id); } }}
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
                                    <ModalHeader className="flex flex-col gap-1">รายละเอียด {SD?.ShopName}</ModalHeader>
                                    <ModalBody className="text-center">
                                        {!BOSS ? <Spinner color="danger" label="กำลังโหลดข้อมูลเพิ่มเติม..." /> : <div className="">
                                            <p className="my-3">สินค้าที่ขาย</p>
                                            <Divider />
                                            <div className="grid grid-cols-4 lg:grid-cols-4 mt-3 gap-2">
                                                {BOSS.map((d, i) => (
                                                    <div className="flex flex-col justify-center items-center">
                                                        <Image
                                                            width={33}
                                                            height={40}
                                                            className="z-0 overflow-visible object-contain object-center hover:scale-110"
                                                            src={`/items/${d?.icon.toString().padStart(4, '0')}_1-1.bmp`}
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
                                    <ModalHeader className="flex flex-col gap-1">แก้ไขร้านค้า</ModalHeader>
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
                                                        onChange={handleInputChange(i)}
                                                    />
                                                    <Button color="danger" onClick={() => handleDeleteInput(i)} className='h-[56px]'>
                                                        X
                                                    </Button>
                                                </>
                                            ))}
                                        </div>
                                        <Button color="danger" onClick={handleAddInput}>
                                            เพิ่มไอเท็ม
                                        </Button>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="danger" variant="light" onPress={onClose}>
                                            ยกเลิก
                                        </Button>
                                        <Button color="danger" type='submit'>
                                            แก้ไขร้านค้า
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
