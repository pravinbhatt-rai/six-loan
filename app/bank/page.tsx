import React from "react";
import BankHero from "@/component/bank/BankHero";
import BankPartners from "@/component/bank/BankPartners";
import BankHighlights from "@/component/bank/BankHighlights";

export default function BankPage() {
    return (
        <main>
            <BankHero />
            <BankPartners />
            <BankHighlights />
        </main>
    );
}