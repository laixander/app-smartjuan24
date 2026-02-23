// Shared task data used by both /api/task and /api/task/[id]

import type { Task, DeptReview, FeeItem, PaymentInfo } from '~/types/model'

const DEPARTMENTS = [
    { department: 'BPLO', officer: 'Maria Santos' },
    { department: 'City Treasurer', officer: 'Roberto Cruz' },
    { department: 'Zoning', officer: 'Carlos Reyes' },
    { department: 'Bureau of Fire', officer: 'Lt. Juan Dela Cruz' },
    { department: 'City Health', officer: 'Dr. Elena Ramos' },
    { department: 'City Engineering', officer: 'Engr. Paulo Tan' },
    { department: 'Environmental', officer: 'Ana Villanueva' }
] as const

const createReviews = (data: Array<Pick<DeptReview, 'status' | 'timestamp' | 'remarks'>>): DeptReview[] => {
    return DEPARTMENTS.map((dept, index) => ({
        ...dept,
        ...data[index]
    })) as DeptReview[]
}



export const tasks: Task[] = [
    {
        id: 1,
        title: 'Sari-Sari Store ni Aling Nena',
        type: 'renewal',
        status: 'assessment',
        aging: 2,
        permit: 'Business Permit',
        submitted: '02/16/2026',
        industry: 'Retail',
        reviews: createReviews([
            { status: 'cleared', timestamp: '2026-02-16 14:20', remarks: 'Application form and IDs verified.' },
            { status: 'cleared', timestamp: '2026-02-16 15:00', remarks: 'Previous taxes settled.' },
            { status: 'cleared', timestamp: '2026-02-17 09:30', remarks: 'Location remains compliant.' },
            { status: 'pending', timestamp: '', remarks: '' },
            { status: 'pending', timestamp: '', remarks: '' },
            { status: 'pending', timestamp: '', remarks: '' },
            { status: 'pending', timestamp: '', remarks: '' }
        ]),
        ownerInfo: {
            fullName: 'Elena "Nena" Santos',
            contactNumber: '+63 918 555 1234',
            email: 'alingnena@email.com',
            nationality: 'Filipino',
            address: 'Brgy. 123, Pasig Line, Sta. Ana, Manila',
            location: {
                name: 'Sta. Ana, Manila',
                image: 'https://images.unsplash.com/photo-1723002093542-807b783ccf07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5pbGElMjBjaXR5JTIwbWFwJTIwc2F0ZWxsaXRlJTIwdmlld3xlbnwxfHx8fDE3NzA2MjAwODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
            }
        },
        businessDetails: {
            applicationType: 'Business Permit Renewal',
            businessName: 'Sari-Sari Store ni Aling Nena',
            ownershipType: 'Single Proprietorship',
            dtiSecNumber: 'DTI-2022-123456',
            dtiSecDate: 'January 10, 2022',
            tin: '234-567-890-000',
            businessArea: '25 sqm',
            employeeCount: 1,
            spaceOwnership: 'Owned',
            address: '123 Pasig Line, Sta. Ana, Manila',
            govtIncentive: 'None'
        },
        businessActivities: [
            { lineOfBusiness: 'Sari-Sari Store', units: 1, capitalization: 50000.00 }
        ],
        documents: [
            { title: 'DTI Registration', status: 'Verified', verifiedBy: 'BPLO' },
            { title: 'Barangay Clearance', status: 'Verified', verifiedBy: 'BPLO' },
            { title: 'Community Tax Certificate', status: 'Verified', verifiedBy: 'BPLO' },
            { title: 'Occupancy Permit', status: 'Pending' }
        ],
        feeItems: [
            { description: 'Business Tax', amount: 5000.00 },
            { description: "Mayor's Permit Fee", amount: 1500.00 },
            { description: 'Sanitary Permit Fee', amount: 500.00 },
            { description: 'Garbage Fee', amount: 200.00 }
        ],
        paymentInfo: {
            status: 'Fully Paid',
            orNumber: '2026-08891',
            paymentDate: 'Feb 16, 2026',
            paymentMode: 'Cash',
            amountPaid: 7200.00
        }
    },
    {
        id: 2,
        title: 'Jollibee Branch #123',
        type: 'new',
        status: 'assessment',
        aging: 6,
        permit: 'Building Permit',
        submitted: '02/15/2026',
        industry: 'Food & Beverage',
        reviews: createReviews([
            { status: 'cleared', timestamp: '2026-02-15 10:00', remarks: 'New branch paperwork submitted.' },
            { status: 'cleared', timestamp: '2026-02-15 11:30', remarks: 'Assessment fees paid.' },
            { status: 'with issue', timestamp: '2026-02-16 14:00', remarks: 'Drive-thru exit needs alignment with sidewalk.' },
            { status: 'pending', timestamp: '', remarks: '' },
            { status: 'pending', timestamp: '', remarks: '' },
            { status: 'pending', timestamp: '', remarks: '' },
            { status: 'pending', timestamp: '', remarks: '' }
        ]),
        ownerInfo: {
            fullName: 'Tony Tan Caktiong',
            contactNumber: '+63 2 8888 0000',
            email: 'admin@jollibee.com.ph',
            nationality: 'Filipino',
            address: 'Jollibee Plaza, Ortigas Center, Pasig City',
            location: {
                name: 'Ortigas Center, Pasig',
                image: 'https://images.unsplash.com/photo-1723002093542-807b783ccf07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5pbGElMjBjaXR5JTIwbWFwJTIwc2F0ZWxsaXRlJTIwdmlld3xlbnwxfHx8fDE3NzA2MjAwODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
            }
        },
        businessDetails: {
            applicationType: 'New Business Permit',
            businessName: 'Jollibee Branch #123',
            ownershipType: 'Corporation',
            dtiSecNumber: 'SEC-1978-987654',
            dtiSecDate: 'January 28, 1978',
            tin: '000-123-456-789',
            businessArea: '500 sqm',
            employeeCount: 45,
            spaceOwnership: 'Rented',
            address: 'GF, Mega Mall, Mandaluyong City',
            govtIncentive: 'BOI Registered'
        },
        businessActivities: [
            { lineOfBusiness: 'Fast Food Restaurant', units: 1, capitalization: 15000000.00 }
        ],
        documents: [
            { title: 'SEC Registration', status: 'Verified', verifiedBy: 'BPLO' },
            { title: 'Articles of Incorporation', status: 'Verified', verifiedBy: 'BPLO' },
            { title: 'Contract of Lease', status: 'Verified', verifiedBy: 'BPLO' },
            { title: 'Building Permit', status: 'Verified', verifiedBy: 'Engineering' },
            { title: 'Fire Safety Certificate', status: 'Pending' },
            { title: 'Sanitary Permit', status: 'Missing' }
        ],
        feeItems: [
            { description: 'Business Tax', amount: 150000.00 },
            { description: "Mayor's Permit Fee", amount: 25000.00 },
            { description: 'Sanitary Permit Fee', amount: 8500.00 },
            { description: 'Fire Safety Fee', amount: 12000.00 },
            { description: 'Garbage Fee', amount: 5000.00 }
        ],
        paymentInfo: {
            status: 'Unpaid',
            orNumber: '–',
            paymentDate: '–',
            paymentMode: '–',
            amountPaid: 0.00
        }
    },
    {
        id: 3,
        title: 'SM Savemore Market',
        type: 'renewal',
        status: 'processing',
        aging: 12,
        permit: 'Mayor\'s Permit',
        submitted: '02/10/2026',
        industry: 'Retail',
        reviews: createReviews([
            { status: 'cleared', timestamp: '2026-02-10 09:00', remarks: 'Doc requirements complete.' },
            { status: 'cleared', timestamp: '2026-02-10 10:30', remarks: 'Gross receipts verified.' },
            { status: 'cleared', timestamp: '2026-02-11 11:00', remarks: 'No changes in floor plan.' },
            { status: 'cleared', timestamp: '2026-02-12 14:00', remarks: 'Fire exits and sprinklers inspected.' },
            { status: 'cleared', timestamp: '2026-02-13 15:30', remarks: 'Sanitary standards maintained.' },
            { status: 'pending', timestamp: '', remarks: '' },
            { status: 'pending', timestamp: '', remarks: '' }
        ]),
        ownerInfo: {
            fullName: 'Henry Sy Jr.',
            contactNumber: '+63 2 8833 8888',
            email: 'info@smprime.com',
            nationality: 'Filipino',
            address: 'SM Corporate Offices, Pasay City',
            location: {
                name: 'MOA Complex, Pasay',
                image: 'https://images.unsplash.com/photo-1723002093542-807b783ccf07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5pbGElMjBjaXR5JTIwbWFwJTIwc2F0ZWxsaXRlJTIwdmlld3xlbnwxfHx8fDE3NzA2MjAwODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
            }
        },
        businessDetails: {
            applicationType: 'Mayor\'s Permit Renewal',
            businessName: 'SM Savemore Market',
            ownershipType: 'Corporation',
            dtiSecNumber: 'SEC-1994-112233',
            dtiSecDate: 'June 06, 1994',
            tin: '111-222-333-444',
            businessArea: '1,200 sqm',
            employeeCount: 80,
            spaceOwnership: 'Owned',
            address: 'SM Makati, Ayala Center, Makati City',
            govtIncentive: 'None'
        },
        businessActivities: [
            { lineOfBusiness: 'Supermarket', units: 1, capitalization: 50000000.00 }
        ],
        documents: [
            { title: 'SEC Registration', status: 'Verified', verifiedBy: 'BPLO' },
            { title: 'Mayor\'s Permit (Previous)', status: 'Verified', verifiedBy: 'BPLO' },
            { title: 'Real Property Tax Clearance', status: 'Verified', verifiedBy: 'BPLO' },
            { title: 'Fire Safety Certificate', status: 'Verified', verifiedBy: 'BFP' },
            { title: 'Sanitary Permit', status: 'Verified', verifiedBy: 'Health' },
            { title: 'Environmental Compliance', status: 'Pending' }
        ],
        feeItems: [
            { description: 'Business Tax', amount: 2500000.00 },
            { description: "Mayor's Permit Fee", amount: 450000.00 },
            { description: 'Regulatory Fee', amount: 325000.00 },
            { description: 'Garbage Fee', amount: 50000.00 }
        ],
        paymentInfo: {
            status: 'Fully Paid',
            orNumber: '2026-09121',
            paymentDate: 'Feb 10, 2026',
            paymentMode: 'Bank Transfer',
            amountPaid: 3325000.00
        }
    },
    {
        id: 4,
        title: 'Mercury Drug Corporation',
        type: 'new',
        status: 'approval',
        aging: 4,
        permit: 'Business Permit',
        submitted: '02/14/2026',
        industry: 'Pharmacy',
        reviews: createReviews([
            { status: 'cleared', timestamp: '2026-02-14 08:30', remarks: 'FDA License verified.' },
            { status: 'cleared', timestamp: '2026-02-14 09:15', remarks: 'Taxes paid for current year.' },
            { status: 'cleared', timestamp: '2026-02-14 10:00', remarks: 'Commercial zone compliant.' },
            { status: 'cleared', timestamp: '2026-02-15 11:30', remarks: 'Fire safety equipment present.' },
            { status: 'cleared', timestamp: '2026-02-16 13:00', remarks: 'Medical storage verified.' },
            { status: 'cleared', timestamp: '2026-02-17 14:00', remarks: 'Structural integrity certified.' },
            { status: 'cleared', timestamp: '2026-02-18 09:00', remarks: 'Medical waste disposal plan approved.' }
        ]),
        ownerInfo: {
            fullName: 'Vivian Que-Azcona',
            contactNumber: '+63 2 8911 5071',
            email: 'corp@mercurydrug.com',
            nationality: 'Filipino',
            address: '7 Mercury Ave., Bagumbayan, Quezon City',
            location: {
                name: 'Libis, Quezon City',
                image: 'https://images.unsplash.com/photo-1723002093542-807b783ccf07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5pbGElMjBjaXR5JTIwbWFwJTIwc2F0ZWxsaXRlJTIwdmlld3xlbnwxfHx8fDE3NzA2MjAwODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
            }
        },
        businessDetails: {
            applicationType: 'New Business Permit',
            businessName: 'Mercury Drug Corporation',
            ownershipType: 'Corporation',
            dtiSecNumber: 'SEC-1945-001122',
            dtiSecDate: 'March 15, 1945',
            tin: '555-666-777-888',
            businessArea: '300 sqm',
            employeeCount: 15,
            spaceOwnership: 'Rented',
            address: 'Ayala Ave. cor. Paseo de Roxas, Makati City',
            govtIncentive: 'PEDA Registered'
        },
        businessActivities: [
            { lineOfBusiness: 'Retail Pharmacy', units: 1, capitalization: 10000000.00 }
        ],
        documents: [
            { title: 'SEC Registration', status: 'Verified', verifiedBy: 'BPLO' },
            { title: 'FDA License to Operate', status: 'Verified', verifiedBy: 'Health' },
            { title: 'Pharmacist Board Certificate', status: 'Verified', verifiedBy: 'Health' },
            { title: 'Fire Safety Certificate', status: 'Verified', verifiedBy: 'BFP' },
            { title: 'Sanitary Permit', status: 'Verified', verifiedBy: 'Health' },
            { title: 'Occupancy Permit', status: 'Verified', verifiedBy: 'Engineering' }
        ],
        feeItems: [
            { description: 'Business Tax', amount: 850000.00 },
            { description: "Mayor's Permit Fee", amount: 120000.00 },
            { description: 'Sanitary Permit Fee', amount: 45000.00 }
        ],
        paymentInfo: {
            status: 'Fully Paid',
            orNumber: '2026-09450',
            paymentDate: 'Feb 14, 2026',
            paymentMode: 'Check',
            amountPaid: 1015000.00
        }
    },
    {
        id: 5,
        title: 'Petron Gas Station',
        type: 'renewal',
        status: 'done',
        aging: 8,
        permit: 'Sanitary Permit',
        submitted: '02/12/2026',
        industry: 'Energy',
        reviews: createReviews([
            { status: 'cleared', timestamp: '2026-02-12 09:00', remarks: 'DOE clearance attached.' },
            { status: 'cleared', timestamp: '2026-02-12 10:00', remarks: 'Payment confirmed.' },
            { status: 'cleared', timestamp: '2026-02-13 11:00', remarks: 'Buffer zone verified.' },
            { status: 'cleared', timestamp: '2026-02-14 13:00', remarks: 'Fuel safety audit passed.' },
            { status: 'cleared', timestamp: '2026-02-15 14:00', remarks: 'Sanitary permit issued.' },
            { status: 'cleared', timestamp: '2026-02-16 15:00', remarks: 'Tank certificates validated.' },
            { status: 'cleared', timestamp: '2026-02-17 16:00', remarks: 'Spill containment verified.' }
        ]),
        ownerInfo: {
            fullName: 'Ramon S. Ang',
            contactNumber: '+63 2 8884 9200',
            email: 'contactus@petron.com',
            nationality: 'Filipino',
            address: 'Petron MegaPlaza, 358 Sen. Gil Puyat Ave., Makati City',
            location: {
                name: 'Makati CBD',
                image: 'https://images.unsplash.com/photo-1723002093542-807b783ccf07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5pbGElMjBjaXR5JTIwbWFwJTIwc2F0ZWxsaXRlJTIwdmlld3xlbnwxfHx8fDE3NzA2MjAwODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
            }
        },
        businessDetails: {
            applicationType: 'Sanitary Permit Renewal',
            businessName: 'Petron Gas Station',
            ownershipType: 'Corporation',
            dtiSecNumber: 'SEC-1933-445566',
            dtiSecDate: 'December 22, 1933',
            tin: '999-888-777-666',
            businessArea: '2,500 sqm',
            employeeCount: 12,
            spaceOwnership: 'Owned',
            address: 'EDSA cor. Main Ave., Quezon City',
            govtIncentive: 'None'
        },
        businessActivities: [
            { lineOfBusiness: 'Gasoline Station', units: 1, capitalization: 25000000.00 }
        ],
        documents: [
            { title: 'DOE Certificate of Compliance', status: 'Verified', verifiedBy: 'BPLO' },
            { title: 'Environmental Compliance (ECC)', status: 'Verified', verifiedBy: 'Environment' },
            { title: 'Tank Calibration Certificate', status: 'Verified', verifiedBy: 'BPLO' },
            { title: 'Fire Safety Certificate', status: 'Verified', verifiedBy: 'BFP' },
            { title: 'Sanitary Permit', status: 'Verified', verifiedBy: 'Health' }
        ],
        feeItems: [
            { description: 'Business Tax', amount: 4500000.00 },
            { description: "Mayor's Permit Fee", amount: 750000.00 },
            { description: 'Environmental Fee', amount: 120000.00 },
            { description: 'Fire Safety Fee', amount: 250000.00 }
        ],
        paymentInfo: {
            status: 'Unpaid',
            orNumber: '–',
            paymentDate: '–',
            paymentMode: '–',
            amountPaid: 0.00
        }
    },
    {
        id: 6,
        title: '7-Eleven Convenience Store',
        type: 'new',
        status: 'done',
        aging: 15,
        permit: 'Business Permit',
        submitted: '02/01/2026',
        industry: 'Retail',
        reviews: createReviews([
            { status: 'cleared', timestamp: '2026-02-01 09:00', remarks: 'Franchise docs OK.' },
            { status: 'cleared', timestamp: '2026-02-01 10:00', remarks: 'All fees settled.' },
            { status: 'cleared', timestamp: '2026-02-02 11:00', remarks: 'Parking compliance OK.' },
            { status: 'cleared', timestamp: '2026-02-03 13:00', remarks: 'Fire safety compliant.' },
            { status: 'cleared', timestamp: '2026-02-04 14:00', remarks: 'Food storage compliant.' },
            { status: 'cleared', timestamp: '2026-02-05 15:00', remarks: 'Wiring and plumbing OK.' },
            { status: 'cleared', timestamp: '2026-02-06 16:00', remarks: 'Waste segregation verified.' }
        ]),
        ownerInfo: {
            fullName: 'Vicente Paterno',
            contactNumber: '+63 2 8711 0711',
            email: 'customercare@7-eleven.com.ph',
            nationality: 'Filipino',
            address: 'Columbia Tower, Ortigas Ave., Mandaluyong City',
            location: {
                name: 'Ortigas, Mandaluyong',
                image: 'https://images.unsplash.com/photo-1723002093542-807b783ccf07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5pbGElMjBjaXR5JTIwbWFwJTIwc2F0ZWxsaXRlJTIwdmlld3xlbnwxfHx8fDE3NzA2MjAwODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
            }
        },
        businessDetails: {
            applicationType: 'New Business Permit',
            businessName: '7-Eleven Convenience Store',
            ownershipType: 'Corporation',
            dtiSecNumber: 'SEC-1982-334455',
            dtiSecDate: 'October 26, 1982',
            tin: '777-888-999-000',
            businessArea: '150 sqm',
            employeeCount: 8,
            spaceOwnership: 'Rented',
            address: 'Ground Floor, BPI Building, Ayala Ave., Makati City',
            govtIncentive: 'None'
        },
        businessActivities: [
            { lineOfBusiness: 'Convenience Store', units: 1, capitalization: 5000000.00 }
        ],
        documents: [
            { title: 'SEC Registration', status: 'Verified', verifiedBy: 'BPLO' },
            { title: 'Franchise Agreement', status: 'Verified', verifiedBy: 'BPLO' },
            { title: 'Fire Safety Certificate', status: 'Verified', verifiedBy: 'BFP' },
            { title: 'Sanitary Permit', status: 'Verified', verifiedBy: 'Health' },
            { title: 'Occupancy Permit', status: 'Verified', verifiedBy: 'Engineering' }
        ],
        feeItems: [
            { description: 'Business Tax', amount: 45000.00 },
            { description: "Mayor's Permit Fee", amount: 12000.00 },
            { description: 'Sanitary Permit Fee', amount: 3500.00 }
        ],
        paymentInfo: {
            status: 'Fully Paid',
            orNumber: '2026-10234',
            paymentDate: 'Feb 01, 2026',
            paymentMode: 'Online Payment',
            amountPaid: 60500.00
        }
    }
]
