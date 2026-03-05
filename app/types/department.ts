export interface Department {
    id: string
    name: string
    head: string
    usersAssigned: number
    performance: number
    status: 'Active' | 'Inactive'
    avgTime: string
    category: {
        label: 'Regulatory' | 'Finance' | 'Inspection' | 'Support'
        color: 'blue' | 'green' | 'amber' | 'neutral'
    }
}

export const DEPARTMENTS: Department[] = [
    {
        id: 'DEPT-BPLO',
        name: 'Business Permits and Licensing Office',
        head: 'Maria Santos',
        usersAssigned: 45,
        performance: 92,
        status: 'Active',
        avgTime: '1.2 days',
        category: { label: 'Regulatory', color: 'blue' }
    },
    {
        id: 'DEPT-TREASURY',
        name: 'City Treasurer\'s Office',
        head: 'Elena Reyes',
        usersAssigned: 28,
        performance: 95,
        status: 'Active',
        avgTime: '0.5 days',
        category: { label: 'Finance', color: 'green' }
    },
    {
        id: 'DEPT-ZONING',
        name: 'Zoning Administration Office',
        head: 'Roberto Lim',
        usersAssigned: 15,
        performance: 88,
        status: 'Active',
        avgTime: '3.0 days',
        category: { label: 'Regulatory', color: 'blue' }
    },
    {
        id: 'DEPT-BFP',
        name: 'Bureau of Fire Protection',
        head: 'F/Supt. Antonio Cruz',
        usersAssigned: 60,
        performance: 96,
        status: 'Active',
        avgTime: '2.5 days',
        category: { label: 'Inspection', color: 'amber' }
    },
    {
        id: 'DEPT-CHO',
        name: 'City Health Office',
        head: 'Dr. Ramon Perez',
        usersAssigned: 120,
        performance: 90,
        status: 'Active',
        avgTime: '1.8 days',
        category: { label: 'Inspection', color: 'amber' }
    },
    {
        id: 'DEPT-ENGR',
        name: 'Office of the Building Official / Engineering',
        head: 'Engr. Carlos Mendoza',
        usersAssigned: 85,
        performance: 78,
        status: 'Active',
        avgTime: '5.2 days',
        category: { label: 'Inspection', color: 'amber' }
    },
    {
        id: 'DEPT-ASSESSOR',
        name: 'City Assessor\'s Office',
        head: 'Pedro Gonzales',
        usersAssigned: 30,
        performance: 88,
        status: 'Active',
        avgTime: '2.1 days',
        category: { label: 'Finance', color: 'green' }
    },
    {
        id: 'DEPT-MIS',
        name: 'Management Information System',
        head: 'Juan Dela Cruz',
        usersAssigned: 22,
        performance: 98,
        status: 'Active',
        avgTime: '1.0 days',
        category: { label: 'Support', color: 'neutral' }
    }
]
