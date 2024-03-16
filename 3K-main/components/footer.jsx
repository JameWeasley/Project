"use client";

import React from "react";
import {
    Chip,
    Image,
    Divider
} from "@nextui-org/react";

import { FacebookIcon } from "./social";
// import ThemeSwitch from "./theme-switch";

export default function Footer() {
    return (
        <footer className="flex w-full flex-col sticky top-[100vh]">
            <div className="mx-auto w-full max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
                <div className="flex flex-col items-center justify-center gap-2 md:order-2 md:items-end">
                    <Image src="https://m1r.ai/9/ckxur.png" height="32px" width="32px" />
                </div>
                <div className="mt-4 md:order-1 md:mt-0">
                    <div className="flex items-center justify-center gap-3 md:justify-start">
                        <div className="flex items-center">
                            <Image src="/logo.png" width={150} className="mr-3" alt="GamePassHub Logo" />
                        </div>
                        <Divider className="h-4" orientation="vertical" />
                        RU6SU6.CLOUD
                    </div>
                    <p className="text-center text-tiny text-default-400 md:text-start">
                        &copy; 2024 3Kingdoms. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
