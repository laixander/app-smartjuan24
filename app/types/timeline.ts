import type { BadgeProps } from '@nuxt/ui'

export interface TimelineEntry {
    icon: string
    color: BadgeProps['color']
    status?: 'completed' | 'pending' | 'rejected' | 'info'
    statusConfig?: { icon: string, color: string }
    title: string
    subtitle?: string
    actor?: string
    date?: string
    description?: string
}
