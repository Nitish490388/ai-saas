"use client";

import { useEffect, useState } from "react";
import { ProModal } from "./proModal";

export const ModalProvider = () => {
    const [isMounted, setIsmounted] = useState(false);

    useEffect(() => {
        setIsmounted(false);
    }, []);

    if(!isMounted) {
        return null;
    }

    return (
        <>
            <ProModal/>
        </>
    )
}