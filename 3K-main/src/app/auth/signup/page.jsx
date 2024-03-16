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
import api from '@/ess/api'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/middleware/frontend';
// import Turnstile from "react-turnstile";
import Turnstile, { useTurnstile } from "react-turnstile";
export default function SignIn() {
    const router = useRouter()
    const MySwal = withReactContent(Swal)
    const [Username, setUsername] = useState('')
    const [Password, setPassword] = useState('')
    const [Password_confirm, setPassword_confirm] = useState('')
    const [Token, setToken] = useState()

    const { user, isAuthenticated, update_user } = useAuth();
    const turnstile = useTurnstile();


    const handleLogin = async (e) => {
        e.preventDefault()
        if (Password !== Password_confirm) {
            return MySwal.fire({
                title: <strong>Error!</strong>,
                html: <b>รหัสผ่านไม่ตรงกัน!</b>,
                icon: 'error'
            })
        }
        try {
            api.post('/auth/signup', {
                username: Username,
                password: Password,
                token: Token
            })
                .then(function (ress) {
                    MySwal.fire({
                        title: <strong>Good job!</strong>,
                        html: <b>สมัครสมาชิกสำเร็จ!</b>,
                        icon: 'success'
                    })
                    router.push('/')
                })
                .catch(function (error) {
                    turnstile.reset();
                    MySwal.fire({
                        title: <strong>Error!</strong>,
                        html: <b>{error?.response?.data?.msg}</b>,
                        icon: 'error'
                    })
                })
        } catch (e) {
            turnstile.reset();
            MySwal.fire({
                title: <strong>Error!</strong>,
                html: <b>{e}</b>,
                icon: 'error'
            }).then((result) => {
                $('#btn-submit').html('สมัครสมาชิก').removeAttr('disabled');
            })
        }
    }

    return isAuthenticated ? router.push('/') : (
        <main className="grid mt-10 place-content-center place-items-center overflow-hidden">
            <Card className="lg:min-w-[500px] lg:max-w-12 border-solid border-5 border-red-950 backdrop-blur-md bg-black/20 p-4">
                <CardHeader className="flex gap-3">
                    <Image
                        alt="GamePassHub Logo"
                        radius="sm"
                        src="/logo.png"
                        width={65}
                    />
                    <div className="flex flex-col">
                        <p className="text-md">สมัครสมาชิก</p>
                        <p className="text-small text-default-500">Signup</p>
                    </div>
                </CardHeader>
                <Divider />
                <form onSubmit={handleLogin}>
                    <CardBody className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        <Input type="text" className="col-span-2" label="ชื่อบัญชี" placeholder="ชื่อบัญชี" value={Username} onChange={(e) => setUsername(e.target.value)} />
                        <Input
                            type="password"
                            label="รหัสผ่าน"
                            placeholder="ขั้นต่ำ 8ตัวอักษร"
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)}
                            isInvalid={Password.length > 0 && Password.length < 8}
                            errorMessage={Password.length > 0 && Password.length < 8 && 'รหัสผ่านน้อยกว่า 8ตัวอักษร'}
                        />
                        <Input
                            type="password"
                            label="ยืนยันรหัสผ่าน"
                            placeholder="ยืนยันรหัสผ่าน"
                            value={Password_confirm}
                            onChange={(e) => setPassword_confirm(e.target.value)}
                        />

                        <Turnstile
                            sitekey={process.env.NEXT_PUBLIC_CF_Key}
                            onVerify={(token) => setToken(token)}
                        />
                        <Button className="col-span-2 w-full -skew-x-12 rounded-none bg-gradient-to-r from-red-500 to-red-800" color="primary" type="submit">สมัครสมาชิก</Button>
                        <Divider className="col-span-2" />
                        <Link href='/auth/signin' className="col-span-2 -skew-x-12 w-full z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 border-medium px-unit-4 min-w-unit-20 h-unit-10 text-small gap-unit-2 [&>svg]:max-w-[theme(spacing.unit-8)] data-[pressed=true]:scale-[0.97] transition-transform-colors-opacity motion-reduce:transition-none bg-transparent border-red-500 text-white data-[hover=true]:opacity-hover">
                            เข้าสู่ระบบ
                        </Link>
                    </CardBody>
                </form>
            </Card>
        </main>
    );
}
