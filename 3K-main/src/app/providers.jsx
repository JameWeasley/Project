'use client'
import React from "react";

import { NextUIProvider } from '@nextui-org/react'
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    Button,
    DropdownItem,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    Avatar,
    Image
} from "@nextui-org/react";
import Link from "next/link";
import { useAuth } from '@/middleware/frontend';
import Cookies from 'js-cookie'
import Footer from "@/components/footer";

export function Providers({ children }) {
    const { user, isAuthenticated, update_user } = useAuth();

    const signOut = async () => {
        await Cookies.remove('token', { path: '/' })
        window.location.reload();
        MySwal.fire({
            title: <strong>Good job!</strong>,
            html: <b>ออกจากระบบสำเร็จ!</b>,
            icon: 'success'
        })
    }
    return (
        <NextUIProvider>
            <div className="min-h-screen">
                <Navbar isBordered position="sticky">
                    <NavbarContent className="sm:hidden" justify="start">
                        <NavbarMenuToggle />
                    </NavbarContent>

                    <NavbarContent className="pr-3" justify="center">
                        <NavbarBrand>
                            <Image src="/logo.png" width={150} alt="3Kingdoms Logo" />
                        </NavbarBrand>
                    </NavbarContent>

                    <NavbarContent justify="end">
                        <NavbarItem className="hidden lg:flex">
                            <Link href='/'>หน้าแรก</Link>
                        </NavbarItem>
                        <NavbarItem className="hidden lg:flex">
                            <Link href='/info'>ข้อมูล</Link>
                        </NavbarItem>
                        {!isAuthenticated ? (
                            <>
                                <NavbarItem className="hidden lg:flex">
                                    <Link href='/auth/signin' className="px-4 py-2 -skew-x-12 rounded-none bg-gradient-to-r from-red-500 to-red-800">เข้าสู่ระบบ</Link>
                                </NavbarItem>
                            </>
                        ) : (
                            <>
                                <NavbarItem className="hidden lg:flex">
                                    <Link href='/topup'>เติมเงิน</Link>
                                </NavbarItem>
                                {user?.privilege == 3 && (
                                    <NavbarItem className="hidden lg:flex">
                                        <Link href='/admin/'>สำหรับแอดมิน</Link>
                                    </NavbarItem>
                                )}
                                <Dropdown placement="bottom-end">
                                    <DropdownTrigger>
                                        <NavbarItem className="flex">
                                            <Link href="#">{`${user.account}`}</Link>
                                        </NavbarItem>
                                    </DropdownTrigger>
                                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                                        <DropdownItem key="profile" className="h-14 gap-2">
                                            <p className="font-semibold">{`${user.account}`}</p>
                                            <p>{user.permission == 0 ? 'ผู้ซื้อ' : user.permission == 1 ? 'ผู้ขาย' : user.permission == 2 && 'พนักงาน'}</p>
                                        </DropdownItem>
                                        <DropdownItem key="logout" color="danger" onClick={() => signOut()}>
                                            Log Out
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </>
                        )}
                    </NavbarContent>

                    <NavbarMenu>
                        <NavbarMenuItem>
                            <Link className="w-full" href="/">
                                หน้าแรก
                            </Link>
                        </NavbarMenuItem>
                        <NavbarMenuItem>
                            <Link className="w-full" href="/info">
                                ข้อมูล
                            </Link>
                        </NavbarMenuItem>
                        {isAuthenticated &&
                            <>
                                <NavbarMenuItem>
                                    <Link className="w-full" href="#">
                                        เติมเงิน
                                    </Link>
                                </NavbarMenuItem>
                                {user?.privilege == 3 && (
                                    <NavbarMenuItem>
                                        <Link className="w-full" href="/admin/">
                                            สำหรับแอดมิน
                                        </Link>
                                    </NavbarMenuItem>
                                )}
                            </>
                        }
                    </NavbarMenu>
                </Navbar>
                {children}
                <Footer />
            </div>
        </NextUIProvider>
    )
}