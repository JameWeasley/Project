"use client"
import React, { useEffect, useState } from 'react'
import api from '@/ess/api'

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Divider,
    Link,
    Image,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Pagination,
    Tooltip,
    Spinner
} from "@nextui-org/react";
import { EditIcon } from "@/components/EditIcon";
import { DeleteIcon } from "@/components/DeleteIcon";

import AdminLayout from '@/layout/AdminLayout';
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Cookies from 'js-cookie';

export default function Admin_Index() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const MySwal = withReactContent(Swal)
    const [Edit, setEdit] = useState(false)
    const [L, setL] = useState()
    const [T, setT] = useState()
    const [DD, setDD] = useState()
    const [ID, setID] = useState()
    const [D, setD] = useState([])
    const [CP, setCP] = useState(1)
    const [TP, setTP] = useState(1)

    useEffect(() => {
        fetch()
    }, [])

    const fetch = async (page = '') => {
        setL(true)
        api.get(`/get/announce`, {
            params: {
                page,
            }
        })
            .then(async (d) => {
                setL(false)
                setCP(d.data.current_page)
                setTP(d.data.total)
                setD(d.data.data)
            })
        if (page == '') setCP(1)
    }

    const submit = async (e) => {
        e.preventDefault()
        if (Edit) {
            await api.put('/admin/announce', {
                T,
                DD,
                ID
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
                    setT()
                    setD()
                })
                .catch(function (error) {
                    console.log(error)
                    MySwal.fire({
                        title: <strong>Error!</strong>,
                        html: <b>{error?.response?.data?.msg}</b>,
                        icon: 'error'
                    })
                })
        } else {
            await api.post('/admin/announce', {
                T,
                DD,
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
                    setT()
                    setDD()
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
    }

    const del = async (id) => {
        MySwal.fire({
            title: "ต้องการลบประกาศใช่หรือไม่ ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "ต้องการลบประกาศ",
            cancelButtonText: "ยกเลิก"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await api.delete('/admin/announce', {
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
                        fetch(CP)
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
    return (
        <AdminLayout>
            <div className="mb-5">
                <Button onClick={() => { onOpen(); setEdit(false); setID(); setT(); setDD(); }} color='danger' className='w-full'>เพิ่มประกาศ</Button>
            </div>
            {L ?
                <div className="col-span-5 flex justify-center"><Spinner color="danger" label="กำลังโหลดข้อมูล..." /></div>
                :
                <>
                    <Table isStriped aria-label="Example static collection table">
                        <TableHeader>
                            <TableColumn>หัวข้อ</TableColumn>
                            <TableColumn></TableColumn>
                        </TableHeader>
                        <TableBody>
                            {D && D?.map((d, i) => (
                                <TableRow key={i}>
                                    <TableCell>{d?.title}</TableCell>
                                    <TableCell>
                                        <div className="relative flex items-center gap-2 w-full justify-end">
                                            <Tooltip content="แก้ไขประกาศ">
                                                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                    <EditIcon onClick={() => { onOpen(); setID(d?._id); setT(d?.title); setDD(d?.desc); setEdit(true); }} />
                                                </span>
                                            </Tooltip>
                                            <Tooltip color="danger" content="ลบประกาศ">
                                                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                                    <DeleteIcon onClick={() => del(d?._id)} />
                                                </span>
                                            </Tooltip>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className="mt-5 flex justify-center">
                        <Pagination showControls total={TP} initialPage={CP} onChange={(t) => fetch(t)} isDisabled={L} color="danger" />
                    </div>
                </>
            }
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='2xl'>
                <ModalContent>
                    {(onClose) => (
                        <form onSubmit={submit}>
                            <ModalHeader className="flex flex-col gap-1">{!Edit ? 'เพิ่มประกาศ' : 'แก้ไขประกาศ'}</ModalHeader>
                            <ModalBody className='flex flex-col justify-center items-center'>
                                <Input type="text" label="ชื่อหัวข้อ" variant='bordered' value={T} onChange={(e) => setT(e.target.value)} />
                                <ReactQuill theme="snow" className='mb-5 text-center' value={DD} onChange={(e) => setDD(e)} />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    ยกเลิก
                                </Button>
                                <Button color="danger" type='submit'>
                                    {!Edit ? 'เพิ่มประกาศ' : 'แก้ไขประกาศ'}
                                </Button>
                            </ModalFooter>
                        </form>
                    )}
                </ModalContent>
            </Modal>
        </AdminLayout>
    );
}
