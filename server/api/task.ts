// /server/api/task.ts

import type { Task } from '~/types/model'

export default defineEventHandler((): Task[] => {
    return [
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
        }
    ]
})
