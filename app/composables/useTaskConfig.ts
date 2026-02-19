import type { ColumnKey } from '~/types/model'

export function useTaskConfig() {
    const badgeConfig = {
        renewal: { label: 'Renewal', color: 'orange' },
        new: { label: 'New', color: 'primary' }
    } as const

    const statusLabels: Record<ColumnKey, string> = {
        assessment: 'Pending Assessment',
        processing: 'Processing',
        approval: 'Pending Mayor',
        done: 'Completed'
    }

    function getAgingConfig(days: number) {
        if (days < 5) return { color: 'primary' as const, icon: 'i-lucide-calendar', class: 'text-primary-500' }
        if (days < 10) return { color: 'yellow' as const, icon: 'i-lucide-circle-alert', class: 'text-yellow-500' }
        return { color: 'red' as const, icon: 'i-lucide-circle-alert', class: 'text-red-500' }
    }

    return { badgeConfig, statusLabels, getAgingConfig }
}
