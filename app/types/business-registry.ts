// /types/business-registry.ts

import type { BadgeProps } from '@nuxt/ui'

// ── Shared sub-types ──────────────────────────────────────────────

export type PermitHistoryStatus = 'current' | 'completed'

export interface LabeledColor {
    label: string
    color: BadgeProps['color']
}

export interface AvatarConfig {
    initials: string
    color: BadgeProps['color']
}

// ── Domain interfaces ─────────────────────────────────────────────

export interface PermitHistory {
    number: string
    issuedDate: string
    amount: string
    status: PermitHistoryStatus
}

export interface PaymentRecord {
    orNumber: string
    date: string
    description: string
    amount: string
}

export interface BusinessRegistry {
    avatar: AvatarConfig
    name: string
    bin: string
    owner: string
    email: string
    phone: string
    industry: LabeledColor
    barangay: string
    address: string
    floorArea: string
    employees: number
    dtiSecNo: string
    tin: string
    status: LabeledColor
    permitNo: string
    permitExp: string
    releasedDate: string
    releasedTime: string
    capitalInvestment: string
    grossSales: string
    totalPaid: string
    permits: PermitHistory[]
    payments: PaymentRecord[]
}
