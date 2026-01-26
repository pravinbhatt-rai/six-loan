"use client";

import { usePathname } from "next/navigation";
import { Suspense, lazy } from "react";
import Navbar from "@/component/HomePage/navbar";
import LoanFooter from "@/component/PersonalLoan/LoanFooter";

// Optional: Skeleton/Loading fallback
const NavbarSkeleton = () => <div className="h-20 bg-gray-200 animate-pulse" />;
const FooterSkeleton = () => <div className="h-64 bg-gray-200 animate-pulse" />;

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
