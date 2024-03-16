'use client'
import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { useAuth } from "/middleware/frontend";
import Link from "next/link";
import Image from "next/image";

function createMarkup(c) {
    return { __html: c };
}
const x = ({ children }) => {

    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }, []);
    const { user, loading } = useAuth();
    var date = new Date();
    return (
        !loading && (
            <>

                {/* <Image
                    src={process.env.NEXT_PUBLIC_Logo}
                    width="192"
                    height="67"
                    className="d-inline-block align-top"
                    alt=""
                /> */}
                {children}
                {/* <div className="d-flex py-3 bg-dark-191919 d-flex align-items-center">
                    <div className='container d-flex flex-row'>
                        <span>© {date.getFullYear()} {process.env.NEXT_PUBLIC_Title}, All right reserved. - Powered by <Link href='https://facebook.com/PatcharapolThangthong'>Patcharapol Thangthong</Link></span>
                    </div>
                </div> */}
            </>
        )
    );
};
export default x;
