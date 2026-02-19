import type { WorkflowStep, WorkflowTabItem, StepConfig } from '~/types/workflow'
import type { TimelineEntry } from '~/types/timeline'

export const WORKFLOW_TABS: WorkflowTabItem[] = [
    {
        label: 'Department Clearances',
        icon: 'i-lucide-building-2',
        slot: 'dept-clearances',
        badge: { label: '5/7', color: 'yellow', variant: 'solid' },
    },
    {
        label: 'Business Information',
        icon: 'i-lucide-info',
        slot: 'business-info'
    },
    {
        label: 'Documents',
        icon: 'i-lucide-file-text',
        slot: 'documents',
        badge: { label: '6/8', color: 'yellow', variant: 'solid' }
    },
    {
        label: 'Fees & Payment',
        icon: 'i-lucide-wallet',
        slot: 'fees-payment'
    }
]

export const STEP_CONFIG: StepConfig = {
    done: { color: 'green', opacity: 'opacity-100' },
    pending: { color: 'amber', opacity: 'opacity-100' },
    waiting: { color: 'neutral', opacity: 'opacity-50' }
} as const

export const WORKFLOW_STEPS: WorkflowStep[] = [
    { title: 'Submission', description: 'Feb 5, 2026', status: 'done' },
    { title: 'Assessment', description: 'Validated', status: 'done' },
    { title: 'Department Reviews', description: '5/7 Cleared', status: 'pending' },
    { title: 'Payment', description: 'Paid', status: 'done' },
    { title: 'Mayor Approval', description: 'Waiting', status: 'waiting' }
]

export const TIMELINE_DATA: TimelineEntry[] = [
    {
        icon: 'i-lucide-file-text',
        color: 'blue',
        title: 'Application Submitted',
        actor: 'Ricardo Villanueva',
        date: 'Feb 5, 2026 8:30 AM',
        description: 'Online submission via SmartJuan Portal'
    },
    {
        icon: 'i-lucide-shield',
        color: 'purple',
        title: 'Documents Validated',
        actor: 'Maria Santos (BPLO)',
        date: 'Feb 6, 2026 10:15 AM',
        description: 'All 8 required documents verified and accepted'
    },
    {
        icon: 'i-lucide-credit-card',
        color: 'yellow',
        title: 'Payment Received',
        actor: "City Treasurer's Office",
        date: 'Feb 7, 2026 11:40 AM',
        description: 'OR No. 2026-08891 — ₱2,450,000.00 via LandBank'
    },
    {
        icon: 'i-lucide-circle-check',
        color: 'green',
        title: 'Approved by BPLO',
        actor: 'Maria Santos',
        date: 'Feb 7, 2026 9:15 AM',
        description: 'Initial assessment complete. Forwarded to departments.'
    },
    {
        icon: 'i-lucide-circle-alert',
        color: 'red',
        title: 'Issue by Environmental',
        actor: 'Ana Villanueva',
        date: 'Feb 8, 2026 1:15 PM',
        description: 'Waste management plan needs revision'
    },
    {
        icon: 'i-lucide-circle',
        color: 'neutral',
        title: 'Forwarded to Mayor',
        actor: 'System',
        date: 'Feb 9, 2026 8:00 AM',
        description: "Awaiting final approval from the Mayor's Office"
    }
]
