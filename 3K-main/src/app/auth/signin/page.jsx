'use client'
import React, { useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Divider,
    Image,
    Input,
    Button
} from "@nextui-org/react";
import Link from "next/link";
import Cookies from 'js-cookie'
import api from '@/ess/api'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useAuth } from '@/middleware/frontend';
import { useRouter } from 'next/navigation'

export default function SignIn() {
    const router = useRouter()
    const [Username, setUsername] = useState('')
    const [Password, setPassword] = useState('')
    const MySwal = withReactContent(Swal)
    const { user, isAuthenticated, update_user } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            api.post('/auth/signin', {
                username: Username,
                password: Password,
            })
                .then(async (ress) => {
                    await Cookies.set('token', ress.data.token, { expires: 1 })
                    MySwal.fire({
                        title: <strong>Good job!</strong>,
                        html: <b>เข้าสู่ระบบสำเร็จ!</b>,
                        icon: 'success'
                    })
                    await update_user()
                    router.push('/')
                })
                .catch(function (error) {
                    console.log(error)
                    MySwal.fire({
                        title: <strong>Error!</strong>,
                        html: <b>{error?.response?.data?.msg}</b>,
                        icon: 'error'
                    })
                })
        } catch (e) {
            console.log(e)
            MySwal.fire({
                title: <strong>Error!</strong>,
                html: <b>{e}</b>,
                icon: 'error'
            })
        }
    }

    return isAuthenticated ? router.push('/') : (
        <main className="grid mt-10 place-content-center place-items-center overflow-hidden">
            <Card className="lg:min-w-[500px] lg:max-w-12 border-solid border-5 border-red-950 backdrop-blur-md bg-black/20 p-4" >
                <CardHeader className="flex gap-3">
                    <Image
                        alt="GamePassHub Logo"
                        radius="sm"
                        src="/logo.png"
                        width={65}
                    />
                    <div className="flex flex-col">
                        <p className="text-md">เข้าสู่ระบบ</p>
                        <p className="text-small text-default-500">Signin</p>
                    </div>
                </CardHeader>
                <Divider />
                <form onSubmit={handleLogin}>

                    <CardBody className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        <Input
                            type="text"
                            className="col-span-2"
                            label="ชื่อบัญชี"
                            placeholder="ชื่อบัญชี"
                            value={Username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Input
                            type="password"
                            className="col-span-2"
                            label="รหัสผ่าน"
                            placeholder="ขั้นต่ำ 8ตัวอักษร"
                            minngth="8"
                            isInvalid={Password.length > 0 && Password.length < 8}
                            errorMessage={Password.length > 0 && Password.length < 8 && 'รหัสผ่านน้อยกว่า 8ตัวอักษร'}
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)}

                        />

                        <Button className="col-span-2 w-full -skew-x-12 rounded-none bg-gradient-to-r from-red-500 to-red-800" color="primary" type="submit">เข้าสู่ระบบ</Button>
                        <Divider className="col-span-2" />
                        {/* <Button className="col-span-2 w-full" color="primary" variant="bordered" onClick={() => signIn('facebook')}>เข้าสู่ระบบด้วยบัญชี    Facebook</Button> */}

                        <Link href='/auth/signup' className="col-span-2 -skew-x-12 w-full z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 border-medium px-unit-4 min-w-unit-20 h-unit-10 text-small gap-unit-2 [&>svg]:max-w-[theme(spacing.unit-8)] data-[pressed=true]:scale-[0.97] transition-transform-colors-opacity motion-reduce:transition-none bg-transparent border-red-500 text-white data-[hover=true]:opacity-hover">
                            สมัครสมาชิก
                        </Link>
                    </CardBody>
                </form>
            </Card>
        </main>
    );
}