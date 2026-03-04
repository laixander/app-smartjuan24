// /composables/usePermitApplicationConfig.ts

import type { ColumnKey, TaskType } from '~/types/model'

export function usePermitApplicationConfig() {
    const statusColors: Record<ColumnKey, 'neutral' | 'yellow' | 'blue' | 'green'> = {
        'assessment': 'yellow',
        'processing': 'blue',
        'approval': 'blue',
        'done': 'green'
    }

    const statusLabels: Record<ColumnKey, string> = {
        'assessment': 'Assessment',
        'processing': 'Processing',
        'approval': 'Approval',
        'done': 'Done'
    }

    const typeBadge: Record<TaskType, { label: string; color: 'primary' | 'orange' }> = {
        'new': { label: 'New', color: 'primary' },
        'renewal': { label: 'Renewal', color: 'orange' }
    }

    return { statusColors, statusLabels, typeBadge }
}
