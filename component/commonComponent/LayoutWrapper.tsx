"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/component/HomePage/navbar";
import LoanFooter from "@/component/PersonalLoan/LoanFooter";

export default function LayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isLoginPage = pathname.startsWith("/login");

    return (
        <>
            {!isLoginPage && <Navbar />}
            <main className={isLoginPage ? "" : "pt-[72px] lg:pt-20"}>{children}</main>
            {!isLoginPage && <LoanFooter />}
        </>
    );
}
