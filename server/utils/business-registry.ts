// Shared business registry data used by /api/business-registry endpoints

import type { BusinessRegistry } from '~/types/business-registry'

export const businessRegistryData: BusinessRegistry[] = [
    {
        avatar: { initials: 'MR', color: 'green' },
        name: 'Mishael Rice Trading',
        bin: 'BIN-001623',
        owner: 'Dela Vega, Alexander Caunin',
        email: 'mishael.rice@email.com',
        phone: '+63 917 812 3456',
        industry: { label: 'Retail Trade', color: 'green' },
        barangay: 'San Jose',
        address: 'Purok 3, Brgy. San Jose',
        floorArea: '80 sqm',
        employees: 5,
        dtiSecNo: 'DTI-2024-012345',
        tin: '123-456-789-000',
        status: { label: 'Active', color: 'green' },
        permitNo: '2025-003872',
        permitExp: 'January 01, 2026',
        releasedDate: 'September 04, 2025',
        releasedTime: '12:11 PM',
        capitalInvestment: '₱500,000',
        grossSales: '₱3,200,000',
        totalPaid: '₱25,000',
        permits: [
            { number: '2025-003872', issuedDate: 'September 04, 2025', amount: '₱25,000.00', status: 'current' },
            { number: '2024-002541', issuedDate: 'July 15, 2024', amount: '₱22,500.00', status: 'completed' },
            { number: '2023-001892', issuedDate: 'August 5, 2023', amount: '₱20,000.00', status: 'completed' }
        ],
        payments: [
            { orNumber: '2025-08891', date: 'Jan 15, 2025', description: 'Business Permit Fee', amount: '₱12,000' },
            { orNumber: '2025-08892', date: 'Jan 15, 2025', description: 'Fire Safety Fee', amount: '₱5,000' },
            { orNumber: '2025-08893', date: 'Jan 15, 2025', description: 'Sanitary Permit + Others', amount: '₱8,000' }
        ]
    },
    {
        avatar: { initials: 'AS', color: 'green' },
        name: 'Amoris Sari-Sari Store',
        bin: 'BIN-001622',
        owner: 'Perez, Francisco Generoso',
        email: 'francisco.perez@email.com',
        phone: '+63 918 234 5678',
        industry: { label: 'Retail Trade', color: 'green' },
        barangay: 'Poblacion',
        address: 'Purok 1, Brgy. Poblacion',
        floorArea: '40 sqm',
        employees: 3,
        dtiSecNo: 'DTI-2024-011982',
        tin: '234-567-890-001',
        status: { label: 'Active', color: 'green' },
        permitNo: '2025-003870',
        permitExp: 'January 01, 2026',
        releasedDate: 'July 30, 2025',
        releasedTime: '11:25 AM',
        capitalInvestment: '₱150,000',
        grossSales: '₱850,000',
        totalPaid: '₱12,500',
        permits: [
            { number: '2025-003870', issuedDate: 'July 30, 2025', amount: '₱12,500.00', status: 'current' },
            { number: '2024-002390', issuedDate: 'June 20, 2024', amount: '₱11,000.00', status: 'completed' }
        ],
        payments: [
            { orNumber: '2025-07521', date: 'Jan 10, 2025', description: 'Business Permit Fee', amount: '₱7,500' },
            { orNumber: '2025-07522', date: 'Jan 10, 2025', description: 'Fire Safety Fee', amount: '₱2,500' },
            { orNumber: '2025-07523', date: 'Jan 10, 2025', description: 'Sanitary Permit + Others', amount: '₱2,500' }
        ]
    },
    {
        avatar: { initials: 'KZ', color: 'purple' },
        name: 'Kidz Zone Tutorial Center',
        bin: 'BIN-001621',
        owner: 'De Torres, Myla De Castro',
        email: 'myla.detorres@email.com',
        phone: '+63 920 345 6789',
        industry: { label: 'Education', color: 'purple' },
        barangay: 'San Miguel',
        address: 'Purok 5, Brgy. San Miguel',
        floorArea: '120 sqm',
        employees: 8,
        dtiSecNo: 'DTI-2023-009834',
        tin: '345-678-901-002',
        status: { label: 'Active', color: 'green' },
        permitNo: '2025-003869',
        permitExp: 'January 01, 2026',
        releasedDate: 'July 18, 2025',
        releasedTime: '12:07 PM',
        capitalInvestment: '₱800,000',
        grossSales: '₱1,500,000',
        totalPaid: '₱18,000',
        permits: [
            { number: '2025-003869', issuedDate: 'July 18, 2025', amount: '₱18,000.00', status: 'current' },
            { number: '2024-002215', issuedDate: 'May 12, 2024', amount: '₱16,500.00', status: 'completed' },
            { number: '2023-001534', issuedDate: 'April 22, 2023', amount: '₱15,000.00', status: 'completed' }
        ],
        payments: [
            { orNumber: '2025-06891', date: 'Jan 08, 2025', description: 'Business Permit Fee', amount: '₱10,000' },
            { orNumber: '2025-06892', date: 'Jan 08, 2025', description: 'Fire Safety Fee', amount: '₱4,000' },
            { orNumber: '2025-06893', date: 'Jan 08, 2025', description: 'Sanitary Permit + Others', amount: '₱4,000' }
        ]
    },
    {
        avatar: { initials: 'HC', color: 'amber' },
        name: 'Hallari Construction Services',
        bin: 'BIN-001620',
        owner: 'Hallari, Emmanuel Belda',
        email: 'emmanuel.hallari@email.com',
        phone: '+63 925 456 7890',
        industry: { label: 'Construction', color: 'amber' },
        barangay: 'Bagumbayan',
        address: 'Purok 2, Brgy. Bagumbayan',
        floorArea: '200 sqm',
        employees: 15,
        dtiSecNo: 'SEC-2022-007621',
        tin: '456-789-012-003',
        status: { label: 'Active', color: 'green' },
        permitNo: '2025-003868',
        permitExp: 'January 01, 2026',
        releasedDate: 'July 16, 2025',
        releasedTime: '03:18 PM',
        capitalInvestment: '₱2,500,000',
        grossSales: '₱8,700,000',
        totalPaid: '₱45,000',
        permits: [
            { number: '2025-003868', issuedDate: 'July 16, 2025', amount: '₱45,000.00', status: 'current' },
            { number: '2024-002089', issuedDate: 'April 28, 2024', amount: '₱42,000.00', status: 'completed' }
        ],
        payments: [
            { orNumber: '2025-06341', date: 'Jan 05, 2025', description: 'Business Permit Fee', amount: '₱25,000' },
            { orNumber: '2025-06342', date: 'Jan 05, 2025', description: 'Fire Safety Fee', amount: '₱10,000' },
            { orNumber: '2025-06343', date: 'Jan 05, 2025', description: 'Sanitary Permit + Others', amount: '₱10,000' }
        ]
    },
    {
        avatar: { initials: 'LF', color: 'green' },
        name: 'Lorenzo Fashion Boutique',
        bin: 'BIN-001619',
        owner: 'Seminiano, Ma. Eloisa Lorenzo',
        email: 'eloisa.lorenzo@email.com',
        phone: '+63 932 567 8901',
        industry: { label: 'Retail Trade', color: 'green' },
        barangay: 'Poblacion',
        address: 'Purok 4, Brgy. Poblacion',
        floorArea: '65 sqm',
        employees: 4,
        dtiSecNo: 'DTI-2023-010456',
        tin: '567-890-123-004',
        status: { label: 'Active', color: 'green' },
        permitNo: '2025-003867',
        permitExp: 'January 01, 2026',
        releasedDate: 'July 08, 2025',
        releasedTime: '01:49 PM',
        capitalInvestment: '₱350,000',
        grossSales: '₱1,800,000',
        totalPaid: '₱15,000',
        permits: [
            { number: '2025-003867', issuedDate: 'July 08, 2025', amount: '₱15,000.00', status: 'current' },
            { number: '2024-001945', issuedDate: 'March 15, 2024', amount: '₱13,500.00', status: 'completed' },
            { number: '2023-001321', issuedDate: 'February 10, 2023', amount: '₱12,000.00', status: 'completed' }
        ],
        payments: [
            { orNumber: '2025-05781', date: 'Jan 03, 2025', description: 'Business Permit Fee', amount: '₱8,000' },
            { orNumber: '2025-05782', date: 'Jan 03, 2025', description: 'Fire Safety Fee', amount: '₱3,500' },
            { orNumber: '2025-05783', date: 'Jan 03, 2025', description: 'Sanitary Permit + Others', amount: '₱3,500' }
        ]
    },
    {
        avatar: { initials: 'WR', color: 'purple' },
        name: 'Wondernest Reading and Tutorial Services',
        bin: 'BIN-001618',
        owner: 'Parado, Maica Elaine Quitan',
        email: 'maica.parado@email.com',
        phone: '+63 945 678 9012',
        industry: { label: 'Education', color: 'purple' },
        barangay: 'Sta. Rosa',
        address: 'Purok 6, Brgy. Sta. Rosa',
        floorArea: '95 sqm',
        employees: 6,
        dtiSecNo: 'DTI-2024-012001',
        tin: '678-901-234-005',
        status: { label: 'Active', color: 'green' },
        permitNo: '2025-003865',
        permitExp: 'January 01, 2026',
        releasedDate: 'July 01, 2025',
        releasedTime: '04:00 PM',
        capitalInvestment: '₱600,000',
        grossSales: '₱1,200,000',
        totalPaid: '₱16,500',
        permits: [
            { number: '2025-003865', issuedDate: 'July 01, 2025', amount: '₱16,500.00', status: 'current' },
            { number: '2024-001823', issuedDate: 'February 28, 2024', amount: '₱15,000.00', status: 'completed' }
        ],
        payments: [
            { orNumber: '2025-05201', date: 'Jan 02, 2025', description: 'Business Permit Fee', amount: '₱9,500' },
            { orNumber: '2025-05202', date: 'Jan 02, 2025', description: 'Fire Safety Fee', amount: '₱3,500' },
            { orNumber: '2025-05203', date: 'Jan 02, 2025', description: 'Sanitary Permit + Others', amount: '₱3,500' }
        ]
    },
    {
        avatar: { initials: 'DB', color: 'amber' },
        name: 'Don Borito Kitchenette',
        bin: 'BIN-001617',
        owner: 'Tabora, Noel Anilao',
        email: 'noel.tabora@email.com',
        phone: '+63 956 789 0123',
        industry: { label: 'Food & Beverage', color: 'amber' },
        barangay: 'Poblacion',
        address: 'Purok 7, Brgy. Poblacion',
        floorArea: '110 sqm',
        employees: 10,
        dtiSecNo: 'DTI-2023-008745',
        tin: '789-012-345-006',
        status: { label: 'Active', color: 'green' },
        permitNo: '2025-003864',
        permitExp: 'January 01, 2026',
        releasedDate: 'June 27, 2025',
        releasedTime: '01:11 PM',
        capitalInvestment: '₱1,200,000',
        grossSales: '₱4,500,000',
        totalPaid: '₱30,000',
        permits: [
            { number: '2025-003864', issuedDate: 'June 27, 2025', amount: '₱30,000.00', status: 'current' },
            { number: '2024-001712', issuedDate: 'January 22, 2024', amount: '₱28,000.00', status: 'completed' },
            { number: '2023-001198', issuedDate: 'December 15, 2022', amount: '₱25,000.00', status: 'completed' }
        ],
        payments: [
            { orNumber: '2025-04891', date: 'Dec 28, 2024', description: 'Business Permit Fee', amount: '₱15,000' },
            { orNumber: '2025-04892', date: 'Dec 28, 2024', description: 'Fire Safety Fee', amount: '₱7,500' },
            { orNumber: '2025-04893', date: 'Dec 28, 2024', description: 'Sanitary Permit + Others', amount: '₱7,500' }
        ]
    },
    {
        avatar: { initials: 'E&', color: 'green' },
        name: 'Erly & Manny Sari-Sari Store',
        bin: 'BIN-001616',
        owner: 'Pasencia, Erlina Cueto',
        email: 'erlina.pasencia@email.com',
        phone: '+63 967 890 1234',
        industry: { label: 'Retail Trade', color: 'green' },
        barangay: 'San Jose',
        address: 'Purok 8, Brgy. San Jose',
        floorArea: '35 sqm',
        employees: 2,
        dtiSecNo: 'DTI-2024-011534',
        tin: '890-123-456-007',
        status: { label: 'Active', color: 'green' },
        permitNo: '2025-003861',
        permitExp: 'January 01, 2026',
        releasedDate: 'June 23, 2025',
        releasedTime: '04:14 PM',
        capitalInvestment: '₱100,000',
        grossSales: '₱600,000',
        totalPaid: '₱10,000',
        permits: [
            { number: '2025-003861', issuedDate: 'June 23, 2025', amount: '₱10,000.00', status: 'current' },
            { number: '2024-001601', issuedDate: 'January 05, 2024', amount: '₱9,000.00', status: 'completed' }
        ],
        payments: [
            { orNumber: '2025-04321', date: 'Dec 20, 2024', description: 'Business Permit Fee', amount: '₱5,500' },
            { orNumber: '2025-04322', date: 'Dec 20, 2024', description: 'Fire Safety Fee', amount: '₱2,000' },
            { orNumber: '2025-04323', date: 'Dec 20, 2024', description: 'Sanitary Permit + Others', amount: '₱2,500' }
        ]
    },
    {
        avatar: { initials: 'KV', color: 'green' },
        name: 'KNP Vape Shop (Bulakin I)',
        bin: 'BIN-001615',
        owner: 'Pq, Heyvah Preah Engrina',
        email: 'heyvah.pq@email.com',
        phone: '+63 978 901 2345',
        industry: { label: 'Retail Trade', color: 'green' },
        barangay: 'Bulakin I',
        address: 'Purok 2, Brgy. Bulakin I',
        floorArea: '25 sqm',
        employees: 2,
        dtiSecNo: 'DTI-2024-012100',
        tin: '901-234-567-008',
        status: { label: 'Active', color: 'green' },
        permitNo: '2025-003860',
        permitExp: 'January 01, 2026',
        releasedDate: 'June 17, 2025',
        releasedTime: '01:39 PM',
        capitalInvestment: '₱200,000',
        grossSales: '₱950,000',
        totalPaid: '₱8,500',
        permits: [
            { number: '2025-003860', issuedDate: 'June 17, 2025', amount: '₱8,500.00', status: 'current' }
        ],
        payments: [
            { orNumber: '2025-03891', date: 'Dec 15, 2024', description: 'Business Permit Fee', amount: '₱4,500' },
            { orNumber: '2025-03892', date: 'Dec 15, 2024', description: 'Fire Safety Fee', amount: '₱2,000' },
            { orNumber: '2025-03893', date: 'Dec 15, 2024', description: 'Sanitary Permit + Others', amount: '₱2,000' }
        ]
    },
    {
        avatar: { initials: 'MC', color: 'green' },
        name: "Molar's Closet Consumer Goods Trading",
        bin: 'BIN-001614',
        owner: 'Garcia, Romerlin Kristi Calayag',
        email: 'romerlin.garcia@email.com',
        phone: '+63 989 012 3456',
        industry: { label: 'Retail Trade', color: 'green' },
        barangay: 'Poblacion',
        address: 'Purok 1, Brgy. Poblacion',
        floorArea: '50 sqm',
        employees: 3,
        dtiSecNo: 'DTI-2024-011890',
        tin: '012-345-678-009',
        status: { label: 'Active', color: 'green' },
        permitNo: '2025-003858',
        permitExp: 'January 01, 2026',
        releasedDate: 'June 05, 2025',
        releasedTime: '11:07 AM',
        capitalInvestment: '₱250,000',
        grossSales: '₱1,100,000',
        totalPaid: '₱11,000',
        permits: [
            { number: '2025-003858', issuedDate: 'June 05, 2025', amount: '₱11,000.00', status: 'current' },
            { number: '2024-001489', issuedDate: 'December 18, 2023', amount: '₱10,000.00', status: 'completed' }
        ],
        payments: [
            { orNumber: '2025-03201', date: 'Dec 10, 2024', description: 'Business Permit Fee', amount: '₱6,000' },
            { orNumber: '2025-03202', date: 'Dec 10, 2024', description: 'Fire Safety Fee', amount: '₱2,500' },
            { orNumber: '2025-03203', date: 'Dec 10, 2024', description: 'Sanitary Permit + Others', amount: '₱2,500' }
        ]
    }
]
