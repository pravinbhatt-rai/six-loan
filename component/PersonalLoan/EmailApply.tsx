'use client';
import React, { useState } from 'react';

/**
 * LoanCTA Component
 * Replicates the "Ready to Get Your Loan?" design.
 * Now updated with a complex "Ribbon/Mesh" wave effect.
 */
export function EmailApply() {
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Submitted email:', email);
    };

    // Helper to generate the "Ribbon" lines
    // We create multiple parallel lines with slight offsets to mimic the reference image's flow
    const renderRibbon = () => {
        const lines = [];
        const totalLines = 20;

        for (let i = 0; i < totalLines; i++) {
            const offset = i * 10;
            const opacity = 0.05 + (i / totalLines) * 0.15; // Varying opacity for depth
            const strokeWidth = 0.5 + (i % 3 === 0 ? 1 : 0); // Varying thickness

            // Complex bezier curves to mimic the fluid "fan" and "swirl" motion
            // We shift the control points slightly for each line to create the 3D ribbon effect
            const d = `
        M -100,${350 + i * 5} 
        C ${200 - i * 5},${350 - i * 10} ${300 + i * 2},${50 + i * 5} ${500},${100 + i * 2}
        S ${700 + i * 5},${300 - i * 2} ${900},${200 + i * 5}
      `;

            lines.push(
                <path
                    key={i}
                    d={d}
                    fill="none"
                    stroke="white"
                    strokeWidth={strokeWidth}
                    opacity={opacity}
                />
            );
        }
        return lines;
    };

    return (
        <div className="mt-12 mb-12 flex items-center justify-center p-4 font-sans">

            {/* Main Container Card */}
            <div
                className="relative w-full max-w-4xl rounded-3xl overflow-hidden shadow-xl"
                style={{ backgroundColor: '#1CBEA2' }}
            >

                {/* --- Background Wave Effect (Complex Ribbon) --- */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                    <svg
                        className="w-full h-full"
                        viewBox="0 0 800 400"
                        preserveAspectRatio="xMidYMid slice"
                    >
                        {/* Gradient for subtle lighting depth */}
                        <defs>
                            <radialGradient id="glow" cx="20%" cy="20%" r="60%">
                                <stop offset="0%" stopColor="white" stopOpacity="0.15" />
                                <stop offset="100%" stopColor="white" stopOpacity="0" />
                            </radialGradient>
                        </defs>

                        {/* A subtle glow in the top-left corner */}
                        <rect width="100%" height="100%" fill="url(#glow)" />

                        {/* The generated ribbon lines */}
                        {renderRibbon()}

                        {/* Additional decorative flowing shape for the background */}
                        <path
                            d="M0,400 C300,350 400,100 800,50 L800,400 Z"
                            fill="white"
                            fillOpacity="0.03"
                        />
                    </svg>
                </div>

                {/* --- Content Content --- */}
                <div className="relative z-10 flex flex-col items-center justify-center py-20 px-6 text-center">

                    {/* Headline - Serif Font */}
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4 tracking-wide drop-shadow-sm">
                        Ready to Get Your Loan?
                    </h2>

                    {/* Subheadline - Sans-serif Font */}
                    <p className="text-white/90 text-sm md:text-lg mb-10 font-light max-w-lg mx-auto">
                        Check your credit score and apply today!
                    </p>

                    {/* Input Form */}
                    <form onSubmit={handleSubmit} className="w-full max-w-lg">
                        <div className="relative flex items-center bg-white rounded-full p-1.5 shadow-lg transition-transform hover:scale-[1.01]">

                            {/* Input Field */}
                            <input
                                type="email"
                                placeholder="Enter your email here"
                                className="flex-1 bg-transparent px-6 py-3 text-gray-700 placeholder-gray-500 outline-none rounded-l-full text-base"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="bg-[#26D0B0] hover:bg-[#20b89b] text-white font-semibold rounded-full px-8 py-3 transition-colors duration-200 shadow-md whitespace-nowrap"
                            >
                                Start Now
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}

export default EmailApply;