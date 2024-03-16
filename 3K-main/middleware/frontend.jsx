'use client'
import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation'

import api from "/ess/api";
const AuthContext = createContext({});
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const AuthProvider = ({ children }) => {
    const Router = useRouter()
    const MySwal = withReactContent(Swal)
    const [user, setUser] = useState(undefined);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (!loading) return;
        (async () => {
            const token = await Cookies.get("token");
            if (token) {
                try {
                    await api.get('/get/userdata', {
                        headers: {
                            Authorization: Cookies.get("token"),
                        },
                    })
                        .then(function (ress) {
                            setUser(ress.data);
                        })
                        .catch(async (e) => {
                            // await Cookies.remove('token', { path: '/' })
                            MySwal.fire({
                                title: <strong>Error!</strong>,
                                html: <b>{e?.response?.data?.msg}</b>,
                                icon: 'error'
                            })
                        })
                } catch (e) {
                    console.log(e)
                }
            }
            setLoading(false);
        })();
    }, []);

    const update_user = async () => {
        const token = await Cookies.get("token");
        if (token) {
            try {
                await api.get('/get/userdata', {
                    headers: {
                        Authorization: Cookies.get("token"),
                    },
                })
                    .then(function (ress) {
                        setUser(ress.data);
                    })
                    .catch(async (e) => {
                        // await Cookies.remove('token', { path: '/' })
                        MySwal.fire({
                            title: <strong>Error!</strong>,
                            html: <b>{e?.response?.data?.msg}</b>,
                            icon: 'error'
                        })
                    })
            } catch (e) {
                console.log(e)
            }
        }
        setLoading(false);
    };
    return (
        <AuthContext.Provider
            value={{
                isAuthenticated: !!user,
                user,
                loading,
                update_user
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => useContext(AuthContext);


export const AdminRoute = ({ children }) => {
    const Router = useRouter()
    const { loading, isAuthenticated, user } = useAuth();
    if (!loading) {
        if (!isAuthenticated) {
            Router.push("/");
            return <></>;
        } else if (user?.privilege !== 3) {
            Router.push("/");
            return <></>;
        } else {
            return children;
        }
    } else {
        return <></>;
    }
};
