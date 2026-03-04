// /types/property-registry.ts

import type { BadgeProps } from '@nuxt/ui'

// ── Shared sub-types ──────────────────────────────────────────────

export interface LabeledColor {
    label: string
    color: BadgeProps['color']
}

export interface AvatarConfig {
    initials: string
    color: BadgeProps['color']
}

// ── Domain interfaces ─────────────────────────────────────────────

export interface TaxPaymentRecord {
    orNumber: string
    date: string
    description: string
    amount: string
}

export interface AssessmentHistory {
    taxDecNo: string
    assessedDate: string
    assessedValue: string
    status: 'current' | 'superseded'
}

export interface PropertyRegistry {
    avatar: AvatarConfig
    // Property identity
    tdNo: string            // Tax Declaration No.
    pin: string             // Property Index Number
    owner: string
    email: string
    phone: string
    // Location
    barangay: string
    address: string
    // Property details
    propertyKind: LabeledColor   // Residential, Commercial, Agricultural, etc.
    classification: LabeledColor // Taxable / Exempt
    lotArea: string
    floorArea: string
    // Assessment
    assessedValue: string
    marketValue: string
    assessmentLevel: string
    assessedDate: string
    // Tax
    status: LabeledColor         // Current, Delinquent, Exempt
    totalPaid: string
    taxDue: string
    // History
    assessments: AssessmentHistory[]
    payments: TaxPaymentRecord[]
}
