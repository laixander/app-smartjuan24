import type { BadgeProps } from '@nuxt/ui'

export interface TimelineEntry {
    icon: string
    color: BadgeProps['color']
    title: string
    actor?: string
    date?: string
    description?: string
}
