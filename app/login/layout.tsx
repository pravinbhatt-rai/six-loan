import { LoanTypeProvider } from "@/component/PersonalLoan/LoanTypeContext";

export default function LoginLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <LoanTypeProvider>
            <main>{children}</main>
        </LoanTypeProvider>
    );
}
