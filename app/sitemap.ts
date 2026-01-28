import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://sixfinance.app'

    // Static pages (excluded: login, dashboard, user, my-applications, customer-support, loandetails)
    const staticRoutes = [
        {
            url: `${baseUrl}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 1.0,
        },
        {
            url: `${baseUrl}/about-us`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contact-us`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/terms-conditions`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.5,
        },

        // Loan Products
        {
            url: `${baseUrl}/personalLoan`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/homeLoan`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/businessLoan`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/educationLoan`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/LoanAgainstProperty`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/loanAgainstSecurity`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/professionalLoan`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/transferHomeLoan`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/transferPersonalLoan`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        },

        // Credit & Financial Products
        {
            url: `${baseUrl}/creditcards`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/debitcard`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/bank`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/insurance`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },

        // Credit & Debit Info
        {
            url: `${baseUrl}/creditinfo`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/creditinfo/25-best-credit-cards-india`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/creditinfo/cashback`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/creditinfo/eligibility`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/creditinfo/forex`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        },
        {
            url: `${baseUrl}/creditinfo/fuel`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        },
        {
            url: `${baseUrl}/creditinfo/international`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        },
        {
            url: `${baseUrl}/creditinfo/lounge`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        },
        {
            url: `${baseUrl}/creditinfo/reward-calculator`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/creditinfo/rewards`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/creditinfo/secured`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/creditinfo/travel`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/debitinfo`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },

        // Auto Loans
        {
            url: `${baseUrl}/newCar`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/usedCar`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/newBike`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/usedBike`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        },

        // Financial & Compliance
        {
            url: `${baseUrl}/incometax`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/pan`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/aadhaar`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/netbanking`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/epf`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/ppf`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },

        // Blog
        {
            url: `${baseUrl}/blogs`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.8,
        },
    ]

    // Personal Loan Sub-pages (21 variants)
    const personalLoanSubRoutes = [
        '5-lakh',
        '10-lakh',
        '20-lakh',
        '30-lakh',
        '40-lakh',
        '50-lakh',
        'consolidation',
        'doctors',
        'flexi',
        'lowCibil',
        'medical',
        'overdraft',
        'preApproved',
        'salaried',
        'self-employed',
        'seniors',
        'short-term',
        'term',
        'travel',
        'wedding',
        'women',
    ]

    const personalLoanRoutes = personalLoanSubRoutes.map((slug) => ({
        url: `${baseUrl}/personalLoan/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    // Home Loan Sub-pages (16 variants)
    const homeLoanSubRoutes = [
        '10-lakh',
        '15-lakh',
        '20-lakh',
        '30-lakh',
        '40-lakh',
        '60-lakh',
        'construction',
        'extension',
        'low-cibil',
        'nri',
        'plot',
        'rates',
        'renovation',
        'self-employed',
        'top-up',
        'women',
    ]

    const homeLoanRoutes = homeLoanSubRoutes.map((slug) => ({
        url: `${baseUrl}/homeLoan/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    // Business Loan Sub-pages (7 variants)
    const businessLoanSubRoutes = [
        'dairy',
        'goat',
        'low-cibil',
        'poultry',
        'rates',
        'small',
        'startup',
    ]

    const businessLoanRoutes = businessLoanSubRoutes.map((slug) => ({
        url: `${baseUrl}/businessLoan/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    // Loan Against Property Sub-pages (9 variants)
    const loanAgainstPropertySubRoutes = [
        '5-lakh',
        '10-lakh',
        '20-lakh',
        '30-lakh',
        '40-lakh',
        '50-lakh',
        '75-lakh',
        '1-crore',
        '2-crore',
    ]

    const loanAgainstPropertyRoutes = loanAgainstPropertySubRoutes.map((slug) => ({
        url: `${baseUrl}/LoanAgainstProperty/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    // Loan Against Security Sub-pages (9 variants)
    const loanAgainstSecuritySubRoutes = [
        '5-lakh',
        '10-lakh',
        '20-lakh',
        '30-lakh',
        '40-lakh',
        '50-lakh',
        '75-lakh',
        '1-crore',
        '2-crore',
    ]

    const loanAgainstSecurityRoutes = loanAgainstSecuritySubRoutes.map((slug) => ({
        url: `${baseUrl}/loanAgainstSecurity/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    // New Car Loan Sub-pages (19 variants)
    const newCarSubRoutes = [
        '3-lakh',
        '4-lakh',
        '5-lakh',
        '6-lakh',
        '7-lakh',
        '8-lakh',
        '9-lakh',
        '10-lakh',
        '15-lakh',
        '20-lakh',
        '25-lakh',
        '30-lakh',
        '35-lakh',
        '40-lakh',
        '45-lakh',
        '50-lakh',
        '75-lakh',
        '1-crore',
    ]

    const newCarRoutes = newCarSubRoutes.map((slug) => ({
        url: `${baseUrl}/newCar/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }))

    // Used Car Loan Sub-pages (19 variants)
    const usedCarSubRoutes = [
        '3-lakh',
        '4-lakh',
        '5-lakh',
        '6-lakh',
        '7-lakh',
        '8-lakh',
        '9-lakh',
        '10-lakh',
        '15-lakh',
        '20-lakh',
        '25-lakh',
        '30-lakh',
        '35-lakh',
        '40-lakh',
        '45-lakh',
        '50-lakh',
        '75-lakh',
        '1-crore',
    ]

    const usedCarRoutes = usedCarSubRoutes.map((slug) => ({
        url: `${baseUrl}/usedCar/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }))

    // New Bike Loan Sub-pages (9 variants)
    const newBikeSubRoutes = [
        '50k',
        '1-lakh',
        '2-lakh',
        '3-lakh',
        '4-lakh',
        '5-lakh',
        '10-lakh',
        '15-lakh',
        '20-lakh',
    ]

    const newBikeRoutes = newBikeSubRoutes.map((slug) => ({
        url: `${baseUrl}/newBike/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }))

    // Used Bike Loan Sub-pages (9 variants)
    const usedBikeSubRoutes = [
        '50k',
        '1-lakh',
        '2-lakh',
        '3-lakh',
        '4-lakh',
        '5-lakh',
        '10-lakh',
        '15-lakh',
        '20-lakh',
    ]

    const usedBikeRoutes = usedBikeSubRoutes.map((slug) => ({
        url: `${baseUrl}/usedBike/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }))

    // Debit Info Sub-pages (12 variants)
    const debitInfoSubRoutes = [
        'atm-finder',
        'best-debit-cards',
        'cashback',
        'compare',
        'finder',
        'international',
        'lounge-access',
        'offers',
        'safety',
        'smart-spend',
        'upgrade',
        'zero-fee',
    ]

    const debitInfoRoutes = debitInfoSubRoutes.map((slug) => ({
        url: `${baseUrl}/debitinfo/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }))

    // Combine all routes
    return [
        ...staticRoutes,
        ...personalLoanRoutes,
        ...homeLoanRoutes,
        ...businessLoanRoutes,
        ...loanAgainstPropertyRoutes,
        ...loanAgainstSecurityRoutes,
        ...newCarRoutes,
        ...usedCarRoutes,
        ...newBikeRoutes,
        ...usedBikeRoutes,
        ...debitInfoRoutes,
    ]
}
