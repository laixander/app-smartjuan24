// Shared property registry data used by /api/property-registry endpoints

import type { PropertyRegistry } from '~/types/property-registry'

export const propertyRegistryData: PropertyRegistry[] = [
    {
        avatar: { initials: 'JD', color: 'blue' },
        tdNo: 'TD-2025-001234',
        pin: '05-001-0001-001-00',
        owner: 'Dela Cruz, Juan P.',
        email: 'juan.delacruz@email.com',
        phone: '+63 917 123 4567',
        barangay: 'Poblacion',
        address: 'Lot 1 Block 2, Purok 3, Brgy. Poblacion',
        propertyKind: { label: 'Residential', color: 'blue' },
        classification: { label: 'Taxable', color: 'green' },
        lotArea: '200 sqm',
        floorArea: '120 sqm',
        assessedValue: '₱480,000',
        marketValue: '₱1,200,000',
        assessmentLevel: '40%',
        assessedDate: 'January 15, 2025',
        status: { label: 'Current', color: 'green' },
        totalPaid: '₱9,600',
        taxDue: '₱9,600',
        assessments: [
            { taxDecNo: 'TD-2025-001234', assessedDate: 'January 15, 2025', assessedValue: '₱480,000', status: 'current' },
            { taxDecNo: 'TD-2022-000981', assessedDate: 'March 10, 2022', assessedValue: '₱420,000', status: 'superseded' }
        ],
        payments: [
            { orNumber: '2025-10891', date: 'Jan 10, 2025', description: 'Real Property Tax – 1st Quarter', amount: '₱2,400' },
            { orNumber: '2025-10892', date: 'Apr 08, 2025', description: 'Real Property Tax – 2nd Quarter', amount: '₱2,400' },
            { orNumber: '2025-10893', date: 'Jul 07, 2025', description: 'Real Property Tax – 3rd Quarter', amount: '₱2,400' },
            { orNumber: '2025-10894', date: 'Oct 06, 2025', description: 'Real Property Tax – 4th Quarter', amount: '₱2,400' }
        ]
    },
    {
        avatar: { initials: 'MS', color: 'violet' },
        tdNo: 'TD-2025-001235',
        pin: '05-001-0002-001-00',
        owner: 'Santos, Maria Luz G.',
        email: 'marialuz.santos@email.com',
        phone: '+63 918 234 5678',
        barangay: 'San Jose',
        address: 'Lot 5 Block 1, Purok 2, Brgy. San Jose',
        propertyKind: { label: 'Commercial', color: 'violet' },
        classification: { label: 'Taxable', color: 'green' },
        lotArea: '350 sqm',
        floorArea: '280 sqm',
        assessedValue: '₱2,100,000',
        marketValue: '₱3,500,000',
        assessmentLevel: '60%',
        assessedDate: 'February 3, 2025',
        status: { label: 'Current', color: 'green' },
        totalPaid: '₱42,000',
        taxDue: '₱42,000',
        assessments: [
            { taxDecNo: 'TD-2025-001235', assessedDate: 'February 3, 2025', assessedValue: '₱2,100,000', status: 'current' },
            { taxDecNo: 'TD-2022-000723', assessedDate: 'January 20, 2022', assessedValue: '₱1,800,000', status: 'superseded' }
        ],
        payments: [
            { orNumber: '2025-11201', date: 'Jan 15, 2025', description: 'Real Property Tax – Annual', amount: '₱42,000' }
        ]
    },
    {
        avatar: { initials: 'RR', color: 'amber' },
        tdNo: 'TD-2025-001236',
        pin: '05-002-0003-001-00',
        owner: 'Reyes, Roberto A.',
        email: 'roberto.reyes@email.com',
        phone: '+63 920 345 6789',
        barangay: 'Bagumbayan',
        address: 'Lot 3, Purok 4, Brgy. Bagumbayan',
        propertyKind: { label: 'Agricultural', color: 'amber' },
        classification: { label: 'Taxable', color: 'green' },
        lotArea: '2,500 sqm',
        floorArea: 'N/A',
        assessedValue: '₱87,500',
        marketValue: '₱250,000',
        assessmentLevel: '35%',
        assessedDate: 'March 12, 2025',
        status: { label: 'Delinquent', color: 'red' },
        totalPaid: '₱0',
        taxDue: '₱1,750',
        assessments: [
            { taxDecNo: 'TD-2025-001236', assessedDate: 'March 12, 2025', assessedValue: '₱87,500', status: 'current' }
        ],
        payments: []
    },
    {
        avatar: { initials: 'FG', color: 'green' },
        tdNo: 'TD-2025-001237',
        pin: '05-001-0004-001-00',
        owner: 'Garcia, Felicitas B.',
        email: 'felicitas.garcia@email.com',
        phone: '+63 925 456 7890',
        barangay: 'Sta. Rosa',
        address: 'Lot 7 Block 3, Brgy. Sta. Rosa',
        propertyKind: { label: 'Residential', color: 'blue' },
        classification: { label: 'Exempt', color: 'neutral' },
        lotArea: '180 sqm',
        floorArea: '100 sqm',
        assessedValue: '₱360,000',
        marketValue: '₱900,000',
        assessmentLevel: '40%',
        assessedDate: 'January 20, 2025',
        status: { label: 'Exempt', color: 'neutral' },
        totalPaid: '₱0',
        taxDue: '₱0',
        assessments: [
            { taxDecNo: 'TD-2025-001237', assessedDate: 'January 20, 2025', assessedValue: '₱360,000', status: 'current' },
            { taxDecNo: 'TD-2021-000502', assessedDate: 'June 15, 2021', assessedValue: '₱300,000', status: 'superseded' }
        ],
        payments: []
    },
    {
        avatar: { initials: 'LM', color: 'teal' },
        tdNo: 'TD-2025-001238',
        pin: '05-003-0005-001-00',
        owner: 'Mendoza, Lorenzo C.',
        email: 'lorenzo.mendoza@email.com',
        phone: '+63 932 567 8901',
        barangay: 'San Miguel',
        address: 'Lot 2, Purok 1, Brgy. San Miguel',
        propertyKind: { label: 'Industrial', color: 'teal' },
        classification: { label: 'Taxable', color: 'green' },
        lotArea: '1,000 sqm',
        floorArea: '750 sqm',
        assessedValue: '₱3,750,000',
        marketValue: '₱5,000,000',
        assessmentLevel: '75%',
        assessedDate: 'April 5, 2025',
        status: { label: 'Current', color: 'green' },
        totalPaid: '₱75,000',
        taxDue: '₱75,000',
        assessments: [
            { taxDecNo: 'TD-2025-001238', assessedDate: 'April 5, 2025', assessedValue: '₱3,750,000', status: 'current' },
            { taxDecNo: 'TD-2023-001045', assessedDate: 'February 28, 2023', assessedValue: '₱3,200,000', status: 'superseded' }
        ],
        payments: [
            { orNumber: '2025-12301', date: 'Jan 20, 2025', description: 'Real Property Tax – Annual', amount: '₱75,000' }
        ]
    },
    {
        avatar: { initials: 'AA', color: 'orange' },
        tdNo: 'TD-2025-001239',
        pin: '05-004-0006-001-00',
        owner: 'Alcantara, Ana Marie T.',
        email: 'anamarie.alcantara@email.com',
        phone: '+63 945 678 9012',
        barangay: 'Bulakin I',
        address: 'Lot 9 Block 5, Purok 2, Brgy. Bulakin I',
        propertyKind: { label: 'Residential', color: 'blue' },
        classification: { label: 'Taxable', color: 'green' },
        lotArea: '150 sqm',
        floorArea: '90 sqm',
        assessedValue: '₱216,000',
        marketValue: '₱540,000',
        assessmentLevel: '40%',
        assessedDate: 'January 8, 2025',
        status: { label: 'Delinquent', color: 'red' },
        totalPaid: '₱2,160',
        taxDue: '₱4,320',
        assessments: [
            { taxDecNo: 'TD-2025-001239', assessedDate: 'January 8, 2025', assessedValue: '₱216,000', status: 'current' }
        ],
        payments: [
            { orNumber: '2025-13401', date: 'Jan 05, 2025', description: 'Real Property Tax – 1st Quarter (partial)', amount: '₱2,160' }
        ]
    },
    {
        avatar: { initials: 'BT', color: 'sky' },
        tdNo: 'TD-2025-001240',
        pin: '05-001-0007-001-00',
        owner: 'Torres, Benjamin E.',
        email: 'benjamin.torres@email.com',
        phone: '+63 956 789 0123',
        barangay: 'Poblacion',
        address: 'Lot 4 Block 8, Brgy. Poblacion',
        propertyKind: { label: 'Commercial', color: 'violet' },
        classification: { label: 'Taxable', color: 'green' },
        lotArea: '500 sqm',
        floorArea: '400 sqm',
        assessedValue: '₱3,000,000',
        marketValue: '₱5,000,000',
        assessmentLevel: '60%',
        assessedDate: 'February 18, 2025',
        status: { label: 'Current', color: 'green' },
        totalPaid: '₱60,000',
        taxDue: '₱60,000',
        assessments: [
            { taxDecNo: 'TD-2025-001240', assessedDate: 'February 18, 2025', assessedValue: '₱3,000,000', status: 'current' },
            { taxDecNo: 'TD-2022-000834', assessedDate: 'March 5, 2022', assessedValue: '₱2,600,000', status: 'superseded' },
            { taxDecNo: 'TD-2019-000421', assessedDate: 'May 12, 2019', assessedValue: '₱2,100,000', status: 'superseded' }
        ],
        payments: [
            { orNumber: '2025-14501', date: 'Jan 10, 2025', description: 'Real Property Tax – Annual', amount: '₱60,000' }
        ]
    },
    {
        avatar: { initials: 'CV', color: 'pink' },
        tdNo: 'TD-2025-001241',
        pin: '05-005-0008-001-00',
        owner: 'Villanueva, Carmen G.',
        email: 'carmen.villanueva@email.com',
        phone: '+63 967 890 1234',
        barangay: 'San Jose',
        address: 'Lot 12, Purok 5, Brgy. San Jose',
        propertyKind: { label: 'Agricultural', color: 'amber' },
        classification: { label: 'Taxable', color: 'green' },
        lotArea: '5,000 sqm',
        floorArea: 'N/A',
        assessedValue: '₱175,000',
        marketValue: '₱500,000',
        assessmentLevel: '35%',
        assessedDate: 'March 25, 2025',
        status: { label: 'Current', color: 'green' },
        totalPaid: '₱3,500',
        taxDue: '₱3,500',
        assessments: [
            { taxDecNo: 'TD-2025-001241', assessedDate: 'March 25, 2025', assessedValue: '₱175,000', status: 'current' },
            { taxDecNo: 'TD-2023-001198', assessedDate: 'April 18, 2023', assessedValue: '₱155,000', status: 'superseded' }
        ],
        payments: [
            { orNumber: '2025-15601', date: 'Mar 28, 2025', description: 'Real Property Tax – Annual', amount: '₱3,500' }
        ]
    }
]
