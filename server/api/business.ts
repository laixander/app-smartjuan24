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
            department: 'City Treasurer',
            officer: 'Roberto Cruz',
            status: 'cleared',
            timestamp: '2026-02-07 10:00',
            remarks: 'Tax assessment completed. Payment confirmed.'
        },
        {
            department: 'Zoning',
            officer: 'Carlos Reyes',
            status: 'cleared',
            timestamp: '2026-02-07 10:15',
            remarks: 'Location compliant with zoning ordinance.'
        },
        {
            department: 'Bureau of Fire',
            officer: 'Lt. Juan Dela Cruz',
            status: 'cleared',
            timestamp: '2026-02-07 11:00',
            remarks: 'Fire safety inspection passed.'
        },
        {
            department: 'City Health',
            officer: 'Dr. Elena Ramos',
            status: 'pending',
            timestamp: '',
            remarks: ''
        },
        {
            department: 'City Engineering',
            officer: 'Engr. Paulo Tan',
            status: 'cleared',
            timestamp: '2026-02-07 11:30',
            remarks: 'Building permit verified. Structural clearance OK.'
        },
        {
            department: 'Environmental',
            officer: 'Ana Villanueva',
            status: 'with issue',
            timestamp: '2026-02-07 12:00',
            remarks: 'Waste management plan needs revision. See attached memo.'
        }
    ]
})
