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
    Image as Im
} from "@nextui-org/react";
import { EyeIcon } from "@/components/EyeIcon";

import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Cookies from 'js-cookie';

import jsQR from 'jsqr';

export default function Admin_Index() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const MySwal = withReactContent(Swal)
    const [result, setResult] = useState('');
    const router = useRouter()
    const handleImageUpload = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const imageDataUrl = e.target.result;
                const image = new Image();

                image.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    canvas.width = image.width;
                    canvas.height = image.height;

                    ctx.drawImage(image, 0, 0, image.width, image.height);

                    const imageData = ctx.getImageData(0, 0, image.width, image.height);
                    const code = jsQR(imageData.data, image.width, image.height);

                    if (code) {
                        setResult(code.data);
                    } else {
                        MySwal.fire({
                            title: <strong>Error!</strong>,
                            html: <b>ไม่สามารถสแกน QR Code ได้</b>,
                            icon: 'error'
                        })
                    }
                };

                image.src = imageDataUrl;
            };

            reader.readAsDataURL(file);
        }
    };

    const createBill = async (e) => {
        e.preventDefault()

        api.post('/topup', {
            payload: result,
        }, {
            headers: {
                authorization: Cookies.get('token')
            }
        })
            .then((result) => {
                MySwal.fire({
                    title: <strong>Good job!</strong>,
                    html: <b>{result.data.msg}</b>,
                    icon: 'success'
                }).then(() => {
                    router.push('/')
                })
            }).catch((err) => {
                MySwal.fire({
                    title: <strong>Error!</strong>,
                    html: <b>{err.response?.data.msg || err.message || 'ไม่สามารถเติมเงินได้'}</b>,
                    icon: 'error'
                })
            });
    }
    return (
        <div className="min-h-full">
            <div className='container mx-auto py-10'>
                <div className="flex flex-col items-center justify-center my-5">
                    <Im src="/logo.png" width={300} alt="3Kingdoms Logo" />
                    <Card className="w-full lg:w-[700px]">
                        <CardHeader className="flex gap-3">
                            <div className="flex flex-col">
                                <p className="text-md">เติมเงิน</p>
                            </div>
                        </CardHeader>
                        <Divider />
                        <CardBody className='flex flex-col justify-center items-center'>
                            <p className='text-2xl'>1 บาท มีค่า {1 * process.env.NEXT_PUBLIC_Topup} Point</p>
                            <p className='text-1xl text-danger'>กรุณาแสดงผ่าน QRCODE นี้เท่านั้น</p>

                            <Im
                                width={400}
                                // height={120}
                                className="z-0 overflow-visible object-contain object-center hover:scale-110 my-5"
                                src={'/qr.jpg'}
                                fallbackSrc="https://via.placeholder.com/100x120"
                                alt="NextUI Image with fallback"
                            />
                            <form onSubmit={createBill}>
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
                                        onChange={handleImageUpload}
                                    />
                                </label>
                                <div className="my-5">
                                    <Button color="danger" className='w-full' type='submit'>
                                        ยืนยัน
                                    </Button>
                                </div>
                            </form>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
}
