import type { BadgeProps } from '@nuxt/ui'

export type WorkflowStepStatus = 'done' | 'pending' | 'waiting'

export interface WorkflowStep {
    title: string
    description: string
    status: WorkflowStepStatus
}

export interface WorkflowTabItem {
    label: string
    icon: string
    slot: string
    badge?: BadgeProps
}

export type StepConfigItem = {
    color: BadgeProps['color']
    opacity: string
}

export type StepConfig = Record<WorkflowStepStatus, StepConfigItem>
