// Shared task data used by both /api/task and /api/task/[id]

import type { Task, DeptReview, DeptReviewStatus } from '~/types/model'


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
        ])
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
        ])
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
        ])
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
        ])
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
        ])
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
        ])
    }
]
