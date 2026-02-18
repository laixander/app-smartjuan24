// /server/api/business.ts

import type { DeptReview } from '~/types/model'

export default defineEventHandler((): DeptReview[] => {
    return [
        {
            department: 'BPLO',
            officer: 'Maria Santos',
            status: 'cleared',
            timestamp: '2026-02-07 09:15',
            remarks: 'All documents complete and verified.'
        },
        {
            department: 'Environmental',
            officer: 'Ana Villanueva',
            status: 'with issue',
            timestamp: '2026-02-07 12:00',
            remarks: 'Waste management plan needs revision.'
        }
    ]
})
