"use client"
import React, { useEffect, useState } from 'react'
import api from '@/ess/api'
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
    Spinner,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Textarea,
    Autocomplete,
    AutocompleteItem
} from "@nextui-org/react";
import Link from "next/link";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { uploadFile } from 'ru6su6.dev'
import Cookies from 'js-cookie';

import AdminLayout from '@/layout/AdminLayout';
import { useRouter } from 'next/navigation'
import { useAuth } from '@/middleware/frontend';
import Items from '@/components/items';
export default function Admin_Index() {
    const router = useRouter()
    const MySwal = withReactContent(Swal)
    const { user, isAuthenticated, update_user } = useAuth();
    const [IFT, setIFT] = useState('')
    const [D, setD] = useState([])
    const [Player, setPlayer] = useState([])
    const [TP, setTP] = useState(1)
    const [CP, setCP] = useState(1)
    const [L, setL] = useState(true)
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [PL, setPL] = useState()
    const [AM, setAM] = useState()
    const [IT, setIT] = useState()

    useEffect(() => {
        fetch('items')
        fetch2()
    }, [])

    const fetch = async (page = '') => {
        setL(true)
        if (!IFT) return api.get(`/get/items`, {
            params: {
                page
            }
        })
            .then(async (d) => {
                setL(false)
                setCP(d.data.current_page)
                setTP(d.data.total)
                setD(d.data)
            })

        api.get(`/get/items_filter`, {
            params: {
                page,
                IFT,
            }
        })
            .then(async (d) => {
                setL(false)
                setCP(d.data.current_page)
                setTP(d.data.total)
                setD(d.data)
            })
        if (page == '') setCP(1)
    }
    const fetch2 = async () => {
        setL(true)
        api.get(`/get/player`, {
            headers: {
                authorization: Cookies.get('token')
            }
        })
            .then(async (d) => {
                setL(false)
                setPlayer(d.data)
            })
    }

    const submit = async (e) => {
        e.preventDefault()
        await api.post('/admin/gift', {
            PL,
            AM,
            IT
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
        <AdminLayout>
            <div className="flex justify-center flex-col">
                <div className='grid grid-cols-1 lg:grid-cols-4 gap-5'>
                    <Input
                        className="mb-2 lg:col-span-3"
                        type="text"
                        label="ค้นหาจากชื่อ"
                        value={IFT}
                        onChange={(e) => setIFT(e.target.value)}
                    />
                    <Button color="danger" type="button" className="w-full h-[56px] backdrop-blur-md bg-black/20 border-medium border-red-500"
                        onClick={(e) => fetch()}
                    >ค้นหา</Button>
                </div>
                <div className="flex justify-center">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 mt-5">
                        {L && <div className="col-span-5 flex justify-center"><Spinner color="danger" label="กำลังโหลดข้อมูล..." /></div>}
                        {!L && D && D?.data && D && D?.data && D?.data.map((d, i) => (
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
                                            onClick={() => { onOpen(); setIT(d?.code) }}
                                        >
                                            เลือก
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mt-5 flex justify-center">
                <Pagination showControls total={TP} initialPage={CP} onChange={(t) => fetch(t)} isDisabled={L} color="danger" />
            </div>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='2xl' scrollBehavior="outside">
                <ModalContent>
                    {(onClose) => (
                        <form onSubmit={submit}>
                            <ModalHeader className="flex flex-col gap-1">เลือกผู้เล่น</ModalHeader>
                            <ModalBody className="text-center">

                                <Autocomplete
                                    label="เลือกผู้เล่น"
                                    className="w-full"
                                    onInputChange={(e) => setPL(e)}
                                >
                                    {Player && Player.map((d, i) => (
                                        <AutocompleteItem key={d.account} value={d.account}>
                                            {d.account}
                                        </AutocompleteItem>
                                    ))}
                                </Autocomplete>

                                <Input type="number" label="จำนวน" value={AM} onChange={(e) => setAM(e.target.value)} />
                                <p>ผู้เล่น : {PL}</p>
                                <p>ไอเท็ม : {IT}</p>
                                <p>จำนวน : {AM || 0}</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    ปิด
                                </Button>
                                <Button color='danger' type='submit'>
                                    ให้ของผู้เล่น
                                </Button>
                            </ModalFooter>
                        </form>
                    )}
                </ModalContent>
            </Modal>
        </AdminLayout>
    );
}
