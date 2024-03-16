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
    Textarea
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
    const [T, setT] = useState('')
    const [FT, setFT] = useState('all')
    const [IFT, setIFT] = useState('')
    const [FST, setFST] = useState([])
    const [D, setD] = useState([])
    const [TP, setTP] = useState(1)
    const [CP, setCP] = useState(1)
    const [L, setL] = useState(true)
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [FN, setFN] = useState()
    const [FI, setFI] = useState()

    useEffect(() => {
        setT('ไอเเพิ่มไอเท็ม')
        fetch('items')
    }, [])

    const fetch = async (page = '') => {
        setL(true)
        if (!IFT && FT == 'all') return api.get(`/get/items`, {
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
                FT: FT !== 'all' ? FT : ''
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
    const submit = async (e) => {
        e.preventDefault()
        await api.post('/admin/item', {
            FN,
            FI
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
                await fetch(CP)
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
        <AdminLayout>
            <div className="flex justify-center flex-col">
                <div className='grid grid-cols-1 lg:grid-cols-4 gap-5'>
                    <Button color='danger' className='lg:col-span-4' onPress={onOpen}>เพิ่มไอเท็ม</Button>
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
                        {!L && D && D?.data && <Items D={D} admin={true} />}
                    </div>
                </div>
            </div>
            <div className="mt-5 flex justify-center">
                <Pagination showControls total={TP} initialPage={CP} onChange={(t) => fetch(t)} isDisabled={L} color="danger" />
            </div>
            <Modal size='2xl' isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <form onSubmit={submit}>
                            <ModalHeader className="flex flex-col gap-1">เพิ่มไอเท็ม</ModalHeader>
                            <ModalBody>
                                <p className='text-center text-danger text-2xl'>เพิ่มไอเท็มทีละชิ้นเท่านั้น</p>
                                <Textarea
                                    label="ข้อมูลไอเท็ม"
                                    variant="bordered"
                                    placeholder={`code = 1
name = กระบี่ตรง
type = itemTypeWeapon,itemTypeSword,itemTypeNoUse
wait_type = act_STAND_SWORD
light = 2
attack_range = 3
effect_range = 0
add_attack_power = 4,6
attack_speed = 7
add_weapon_hit = 90
eq_magic_attack_type = skillAttr_SLASH,20
eq_magic_attack_type = skillAttr_STING,40
limit_level = 5
limit_job = jobWARLORD,jobLEADER,jobADVISOR,jobWIZARD,jobENGINEER
cost = 200
sell = 50
cost_level = 20
icon = 1
help_string = 8100
super_type = itemTypeSword
sfx_hit = wav\comm\hit02.wav
sfx_attack = wav\comm\throw1.wav
comp_times = 2`}
                                    disableAnimation
                                    disableAutosize
                                    classNames={{
                                        base: "w-full",
                                        input: "resize-y min-h-[150px]",
                                    }}
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
                                    เพิ่ม
                                </Button>
                            </ModalFooter>
                        </form>
                    )}
                </ModalContent>
            </Modal>
        </AdminLayout>
    );
}
