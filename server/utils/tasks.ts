// Shared task data used by both /api/task and /api/task/[id]

import type { Task } from '~/types/model'

export const tasks: Task[] = [
    {
        id: 1,
        title: 'Sari-Sari Store ni Aling Nena',
        type: 'renewal',
        status: 'assessment',
        aging: 2,
        permit: 'Business Permit',
        submitted: '02/16/2026',
        industry: 'Retail'
    },
    {
        id: 2,
        title: 'Jollibee Branch #123',
        type: 'new',
        status: 'assessment',
        aging: 6,
        permit: 'Building Permit',
        submitted: '02/15/2026',
        industry: 'Food & Beverage'
    },
    {
        id: 3,
        title: 'SM Savemore Market',
        type: 'renewal',
        status: 'processing',
        aging: 12,
        permit: 'Mayor\'s Permit',
        submitted: '02/10/2026',
        industry: 'Retail'
    },
    {
        id: 4,
        title: 'Mercury Drug Corporation',
        type: 'new',
        status: 'approval',
        aging: 4,
        permit: 'Business Permit',
        submitted: '02/14/2026',
        industry: 'Pharmacy'
    },
    {
        id: 5,
        title: 'Petron Gas Station',
        type: 'renewal',
        status: 'done',
        aging: 8,
        permit: 'Sanitary Permit',
        submitted: '02/12/2026',
        industry: 'Energy'
    },
    {
        id: 6,
        title: '7-Eleven Convenience Store',
        type: 'new',
        status: 'done',
        aging: 15,
        permit: 'Business Permit',
        submitted: '02/01/2026',
        industry: 'Retail'
    }
]
