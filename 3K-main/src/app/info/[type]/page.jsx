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
    Spinner
} from "@nextui-org/react";

import Link from "next/link";
import api from '@/ess/api'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/middleware/frontend';
import Items from "@/components/items";
import Boss from "@/components/boss";
import Shops from "@/components/shop";

export default function info_type({ params }) {
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
    useEffect(() => {
        switch (params.type) {
            case 'boss-monster':
                setT('บอสและมอนส์เตอร์')
                setFST([
                    {
                        name: "ทั้งหมด",
                        key: 'all'
                    },
                    {
                        name: "ระดับ 30 ถึง 50",
                        key: '30_50'
                    },
                    {
                        name: "ระดับ 51 ถึง 60",
                        key: '51_60'
                    },
                    {
                        name: "ระดับ 61 ถึง 70",
                        key: '61_70'
                    },
                    {
                        name: "ระดับ 71 ถึง 130",
                        key: '71_130'
                    },
                ])
                fetch('boss')
                break
            case 'monster':
                setT('มอนส์เตอร์')
                break
            case 'item':
                setT('ไอเท็ม')
                fetch('items')
                setFST([
                    {
                        name: "ทั้งหมด",
                        key: 'all'
                    },
                    {
                        name: "ไอเท็มทั้งหมด",
                        key: 'itemTypeSoldier'
                    },
                    {
                        name: "ทหารทั้งหมด",
                        key: 'itemTypeWeapon'
                    },
                    {
                        name: "อาวุธทั้งหมด",
                        key: 'itemTypeSword'
                    },
                    {
                        name: "อาวุธสั้น",
                        key: 'itemTypeTwoHand'
                    },
                    {
                        name: "อาวุธสองมือ",
                        key: 'itemTypeFalchion'
                    },
                    {
                        name: "อาวุธหนัก",
                        key: 'itemTypeLance'
                    },
                    {
                        name: "อาวุธยาว",
                        key: 'itemTypeBow'
                    },
                    {
                        name: "ธนู",
                        key: 'itemTypeArrow'
                    },
                    {
                        name: "ลูกศร",
                        key: 'itemTypeTwo'
                    },
                    {
                        name: "เกราะมือ",
                        key: 'itemType2HandArmor'
                    },
                    {
                        name: "อาวุธขว้าง",
                        key: 'itemTypeThrow'
                    },
                    {
                        name: "มีดคู่",
                        key: 'itemType2DoubleDagger'
                    },
                    {
                        name: "อุปกรณ์เสริม(ซ้าย)",
                        key: 'itemType2Jade'
                    },
                    {
                        name: "อุปกรณ์เสริม(ขวา)",
                        key: 'itemType2HideWeapon'
                    },
                    {
                        name: "หมวกป้องกัน",
                        key: 'itemTypeHead'
                    },
                    {
                        name: "เกราะป้องกัน",
                        key: 'itemTypeArmor'
                    },
                    {
                        name: "รองเท้าป้องกัน",
                        key: 'itemTypeFoot'
                    },
                    {
                        name: "โล่เล็กป้องกัน",
                        key: 'itemTypeSmallShield'
                    },
                    {
                        name: "โล่ใหญ่ป้องกัน",
                        key: 'itemTypeShield'
                    },
                    {
                        name: "ปลอกแขน",
                        key: 'itemTypeArm'
                    },
                    {
                        name: "ผ้าคลุม",
                        key: 'itemTypeP'
                    },
                    {
                        name: "เสื้อใน",
                        key: 'itemTypeUnderwear'
                    },
                    {
                        name: "จิตนักสู้",
                        key: 'itemTypeSoul'
                    },
                    {
                        name: "พาหนะ",
                        key: 'itemTypeHorse'
                    },
                    {
                        name: "เครื่องประดับ",
                        key: 'itemTypeOther'
                    },
                    {
                        name: "เวทออฟต่างๆ",
                        key: 'itemTypeComposite'
                    },
                    {
                        name: "สกิล",
                        key: 'itemTypeSkillBook'
                    },
                    {
                        name: "ถุงเสี่ยงโชค",
                        key: 'itemTypeLetto'
                    },
                    {
                        name: "ทหาร",
                        key: 'itemTypeSiegeWeapon'
                    },
                ])
                break
            case 'quest':
                setT('เควส')
                break
            case 'shop':
                setT('ร้านค้า')
                fetch('shop')
                break
            case 'skills':
                setT('สกิล')
                break
        }
    }, [params])

    const fetch = async (type, page = '') => {
        setL(true)
        if (!IFT && FT == 'all') return api.get(`/get/${type}`, {
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

        api.get(`/get/${type}_filter`, {
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
        if (page == '') { setCP(1); console.log('setpage') } else { console.log(`unset page ${page}`) }
    }

    const FF = async (key) => {
        setFT(key)
        setIFT('')
    }

    return (
        <div className="min-h-full">
            <div className="container mx-auto py-10">
                <div className="lg:flex">
                    <div className="lg:w-1/5 lg:order-first p-4 w-full lg:relative lg:h-full">
                        <Card className="border-solid border-5 border-red-950 backdrop-blur-md bg-black/20">
                            <CardBody className="overflow-auto">
                                {/* <p className="text-md m-2 py-2 px-3 -skew-x-12 rounded-none bg-gradient-to-r from-red-500 to-red-800">ข้อมูล{T}</p> */}

                                <div className="mt-4">
                                    <Input
                                        className="mb-2"
                                        type="text"
                                        label="ค้นหาจากชื่อ"
                                        value={IFT}
                                        onChange={(e) => setIFT(e.target.value)}
                                        // onChange={(e) => fetch(params.type == 'item' ? 'items' : params.type == 'boss-monster' ? 'boss' : params.type == 'shop' ? 'shop' : '')}
                                        onKeyDown={(e) => (e.keyCode == 13 ? fetch(params.type == 'item' ? 'items' : params.type == 'boss-monster' ? 'boss' : params.type == 'shop' ? 'shop' : ''): "")}
                                    />
                                    {params.type == 'boss-monster' && (
                                        <>
                                            <p>ระดับ</p>
                                            <Listbox
                                                aria-label="Actions"
                                                onAction={(key) => FF(key)}
                                            >
                                                {FST && FST.map((d, i) => (
                                                    <ListboxItem key={d.key} className={`py-2 px-3 -skew-x-12 ${FT == d.key ? 'rounded-none bg-gradient-to-r from-red-500 to-red-800' : 'hover:rounded-none hover:bg-gradient-to-r hover:from-red-500 hover:to-red-800'}`}>{d.name}</ListboxItem>
                                                ))}
                                            </Listbox>
                                        </>
                                    )}
                                    {params.type == 'item' && (
                                        <>
                                            <p>หมวดหมู่</p>
                                            <Listbox
                                                aria-label="Actions"
                                                onAction={async (key) => {
                                                    FF(key)                                                  
                                                    fetch(params.type == 'item' ? 'items' : params.type == 'boss-monster' ? 'boss' : params.type == 'shop' ? 'shop' : '')
                                              
                                                    
                                                }}
                                                // onClick={(e) => {
                                                //     console.log("yes");
                                                //     // 
                                                // }}
                                            >
                                                {FST && FST.map((d, i) => (
                                                    <ListboxItem key={d.key} className={`py-2 px-3 -skew-x-12 ${FT == d.key ? 'rounded-none bg-gradient-to-r from-red-500 to-red-800' : 'hover:rounded-none hover:bg-gradient-to-r hover:from-red-500 hover:to-red-800'}`}>{d.name}</ListboxItem>
                                                ))}
                                            </Listbox>
                                        </>
                                    )}

                                    {/* <Button color="danger" type="button" className="w-full bg-transparent border-medium border-red-500 rounded-none"
                                        onClick={(e) => fetch(params.type == 'item' ? 'items' : params.type == 'boss-monster' ? 'boss' : params.type == 'shop' ? 'shop' : '')}
                                    >ค้นหา</Button> */}
                                </div>

                                <Link href='/info' className="mt-4 w-full z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 border-medium px-unit-4 min-w-unit-20 h-unit-10 text-small gap-unit-2 [&>svg]:max-w-[theme(spacing.unit-8)] data-[pressed=true]:scale-[0.97] transition-transform-colors-opacity motion-reduce:transition-none bg-transparent border-red-500 text-white data-[hover=true]:opacity-hover">
                                    เมนูหลัก
                                </Link>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="lg:w-4/5 p-4">
                        <div className="flex justify-center">
                            <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
                                {L && <div className="col-span-5 flex justify-center"><Spinner color="danger" label="กำลังโหลดข้อมูล..." /></div>}
                                {params && params.type == 'item' && !L && D && D?.data && <Items D={D} />}
                                {params && params.type == 'boss-monster' && !L && D && D?.data && <Boss D={D} />}
                                {params && params.type == 'shop' && !L && D && D?.data && <Shops D={D} />}
                            </div>
                        </div>
                        <div className="mt-5 flex justify-center">
                            <Pagination showControls total={TP} initialPage={CP} onChange={(t) => fetch(params.type == 'item' ? 'items' : params.type == 'boss-monster' ? 'boss' : params.type == 'shop' ? 'shop' : '', t)} isDisabled={L} color="danger" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
