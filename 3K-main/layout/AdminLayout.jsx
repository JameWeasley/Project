'use client'
import React, { useEffect, useState } from 'react'
import api from '/ess/api'
import { usePathname } from 'next/navigation';
import { AdminRoute } from '/middleware/frontend'
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
    ListboxItem
} from "@nextui-org/react";
import { useRouter } from 'next/navigation';
export default function AdminLayout({ children }) {
    const router = useRouter()
    return (
        <AdminRoute>
            <div className="min-h-full">
                <div className="container mx-auto py-10">
                    <div className="lg:flex">
                        <div className="lg:w-1/5 lg:order-first p-4  w-full">
                            <Card className="border-solid border-5 border-red-950 backdrop-blur-md bg-black/20">
                                <CardBody>
                                    <p className="text-md m-2 py-2 px-3 -skew-x-12 rounded-none bg-gradient-to-r from-red-500 to-red-800">เมนู</p>
                                    <Listbox
                                        aria-label="Actions"
                                        onAction={(key) => router.push('/admin/' + key)}
                                    >
                                        <ListboxItem key="announce" className="hover:px-3 hover:-skew-x-12 hover:rounded-none hover:bg-gradient-to-r hover:from-red-500 hover:to-red-800">ประกาศ</ListboxItem>
                                        <ListboxItem key="boss-monster" className="hover:px-3 hover:-skew-x-12 hover:rounded-none hover:bg-gradient-to-r hover:from-red-500 hover:to-red-800">บอสและมอนส์เตอร์</ListboxItem>
                                        <ListboxItem key="item" className="hover:px-3 hover:-skew-x-12 hover:rounded-none hover:bg-gradient-to-r hover:from-red-500 hover:to-red-800">ไอเท็ม</ListboxItem>
                                        <ListboxItem key="shop" className="hover:px-3 hover:-skew-x-12 hover:rounded-none hover:bg-gradient-to-r hover:from-red-500 hover:to-red-800">ร้านค้า</ListboxItem>
                                        <ListboxItem key="gift" className="hover:px-3 hover:-skew-x-12 hover:rounded-none hover:bg-gradient-to-r hover:from-red-500 hover:to-red-800">ให้ของผู้เล่น</ListboxItem>
                                    </Listbox>
                                </CardBody>
                            </Card>
                        </div>
                        <div className="lg:w-4/5 p-4">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </AdminRoute>
    )
}
