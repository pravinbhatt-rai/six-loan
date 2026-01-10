"use client";
import React, { createContext, useContext, useState } from "react";

type LoanTypeContextValue = {
    loanType: string;
    setLoanType: (v: string) => void;
};

const LoanTypeContext = createContext<LoanTypeContextValue | undefined>(undefined);

export const LoanTypeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [loanType, setLoanType] = useState<string>("Personal Loans");

    return (
        <LoanTypeContext.Provider value={{ loanType, setLoanType }}>
            {children}
        </LoanTypeContext.Provider>
    );
};

export const useLoanType = (): LoanTypeContextValue => {
    const ctx = useContext(LoanTypeContext);
    if (!ctx) throw new Error("useLoanType must be used within a LoanTypeProvider");
    return ctx;
};

export default LoanTypeContext;
