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
    Image
} from "@nextui-org/react";

import AdminLayout from '@/layout/AdminLayout';
import { useRouter } from 'next/navigation'
export default function Admin_Index() {
    return (
        <AdminLayout>
        </AdminLayout>
    );
}
