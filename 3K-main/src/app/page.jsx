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
    Spinner,
    Listbox,
    ListboxItem
} from "@nextui-org/react";
import { EyeIcon } from "@/components/EyeIcon";
import Link from 'next/link';

import AdminLayout from '@/layout/AdminLayout';
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Cookies from 'js-cookie';
import { useAuth } from '@/middleware/frontend';
import YouTube from 'react-youtube';

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
    const { user, isAuthenticated, update_user } = useAuth();

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

    const videoOptions = {
        playerVars: {
            autoplay: 1,
            controls: 0,
            rel: 0,
            showinfo: 0,
            mute: 1,
            loop: 1
        }
    };
    return (

        <div className="min-h-full">
            <div className="container mx-auto py-10">
                <div className="flex justify-center my-5"><Image src="/logo.png" width={600} alt="3Kingdoms Logo" /></div>
                <div className="lg:flex">
                    <div className="lg:w-[600px] p-4 lg:order-first w-full min-h-[50vh]">
                        <Card className="border-solid border-5 border-red-950 backdrop-blur-md bg-black/20 h-full">
                            <CardBody>
                                {isAuthenticated ?
                                    <>
                                        <p className="text-2xl m-2 py-2 px-3 -skew-x-12 rounded-none bg-gradient-to-r from-red-500 to-red-800">ข้อมูล</p>
                                        <div className="flex flex-col gap-5 mx-3">
                                            <p className='text-md my-5'>ชื่อ : {user?.account}</p>
                                            <p className='text-md my-5'>Point : {user?.point}</p>
                                            <Link href='/topup' className="h-full">
                                                <Image src='/topup.png' className='z-0 overflow-visible object-contain object-center hover:scale-110' width="100%" />
                                            </Link>
                                            <Link href='/info' className="h-full">
                                                <Image src='/info.png' className='z-0 overflow-visible object-contain object-center hover:scale-110' width="100%" />
                                            </Link>
                                            <a href='http://server.3kingdoms-online.in.th/download/3kingdoms-online.zip' target='_Blank' className="h-full">
                                                <Image src='/download.png' className='z-0 overflow-visible object-contain object-center hover:scale-110' width="100%" />
                                            </a>
                                            <a href='http://server.3kingdoms-online.in.th/download/patch-3kingdoms-online.zip' target='_Blank' className="h-full">
                                                <Image src='/patch.png' className='z-0 overflow-visible object-contain object-center hover:scale-110' width="100%" />
                                            </a>
                                        </div>
                                    </>
                                    :
                                    <div className='flex flex-col gap-5 mx-3'>
                                        <Link href='/auth/signin' className="h-full">
                                            <Image src='/signin.png' className='z-0 overflow-visible object-contain object-center hover:scale-110' width="100%" />
                                        </Link>
                                        <Link href='/auth/signup' className="h-full">
                                            <Image src='/signup.png' className='z-0 overflow-visible object-contain object-center hover:scale-110' width="100%" />
                                        </Link>
                                        <a href='http://server.3kingdoms-online.in.th/download/3kingdoms-online.zip' target='_Blank' className="h-full">
                                            <Image src='/download.png' className='z-0 overflow-visible object-contain object-center hover:scale-110' width="100%" />
                                        </a>
                                        <a href='http://server.3kingdoms-online.in.th/download/patch-3kingdoms-online.zip' target='_Blank' className="h-full">
                                            <Image src='/patch.png' className='z-0 overflow-visible object-contain object-center hover:scale-110' width="100%" />
                                        </a>
                                        <Link href='/info' className="h-full">
                                            <Image src='/info.png' className='z-0 overflow-visible object-contain object-center hover:scale-110' width="100%" />
                                        </Link>
                                    </div>
                                }
                            </CardBody>
                        </Card>
                    </div>
                    <div className="lg:w-4/5 p-4">
                        {L ?
                            <div className="flex justify-center"><Spinner color="danger" label="กำลังโหลดข้อมูล..." /></div>
                            :
                            <>
                                <p className="text-5xl">ประกาศ</p>
                                <Table isStriped aria-label="Example static collection table">
                                    <TableHeader>
                                        <TableColumn>หัวข้อ</TableColumn>
                                        <TableColumn></TableColumn>
                                    </TableHeader>
                                    <TableBody>
                                        {D && D?.map((d, i) => (
                                            <TableRow key={i}>
                                                <TableCell className='hover:cursor-pointer' onClick={() => { onOpen(); setT(d?.title); setDD(d?.desc); }}>{d?.title}</TableCell>
                                                <TableCell>
                                                    <div className="relative flex items-center gap-2 w-full justify-end">
                                                        <Tooltip content="อ่านรายละเอียด">
                                                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                                <EyeIcon onClick={() => { onOpen(); setT(d?.title); setDD(d?.desc); }} />
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
                        <YouTube videoId="3pvHfAB9OrE" className='mt-5' opts={videoOptions} />

                        {/* <iframe width="100%" height="315" className='mt-5' src="https://www.youtube.com/embed/?si=GOtUIViWVhzwU4mC?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay='1'; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
                        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='2xl'>
                            <ModalContent>
                                {(onClose) => (
                                    <>
                                        <ModalHeader className="flex flex-col gap-1">{T}</ModalHeader>
                                        <ModalBody className='flex flex-col justify-center items-center'>
                                            <div dangerouslySetInnerHTML={{ __html: DD }} />
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="danger" variant="light" onPress={onClose}>
                                                ปิด
                                            </Button>
                                        </ModalFooter>
                                    </>
                                )}
                            </ModalContent>
                        </Modal>
                    </div>

                    <div className="lg:w-[600px] p-4 w-full min-h-[50vh]">
                        <Card className="border-solid border-5 border-red-950 backdrop-blur-md bg-black/20 h-full overflow-hidden">
                            <CardBody>
                                <Image src='/1.png' className='w-full z-0 overflow-visible object-contain object-center scale-95 hover:scale-100' />
                                <Image src='/2.png' className='w-full z-0 overflow-visible object-contain object-center scale-95 hover:scale-100' />
                                <Image src='/3.png' className='w-full z-0 overflow-visible object-contain object-center scale-95 hover:scale-100' />
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

{/* <div className="min-h-full">
<div className='container mx-auto py-10'>
    
</div>
</div> */}