// /types/model.ts

// ── Kanban / Workflow status ──────────────────────────────────────

export type ColumnKey =
    | 'assessment'
    | 'processing'
    | 'approval'
    | 'done'

export type TaskType = 'renewal' | 'new'

// ── Task (top-level aggregate) ────────────────────────────────────

export interface Task {
    id: number
    title: string
    description?: string
    status: ColumnKey
    type: TaskType
    aging: number
    permit: string
    submitted: string
    industry: string
    bin?: string
    reviews?: DeptReview[]
    ownerInfo?: OwnerInfo
    businessDetails?: BusinessDetails
    businessActivities?: BusinessActivity[]
    documents?: Document[]
    feeItems?: FeeItem[]
    totalFees?: number
    paymentInfo?: PaymentInfo
}

// ── Department review ─────────────────────────────────────────────

export type DeptReviewStatus = 'cleared' | 'pending' | 'with issue'

export interface DeptReview {
    department: string
    officer: string
    status: DeptReviewStatus
    timestamp: string
    remarks: string
}

// ── Owner & business information ──────────────────────────────────

export interface OwnerLocation {
    name: string
    image: string
}

export interface OwnerInfo {
    fullName: string
    contactNumber: string
    email: string
    nationality: string
    address: string
    location: OwnerLocation
}

export interface BusinessDetails {
    applicationType: string
    businessName: string
    ownershipType: string
    dtiSecNumber: string
    dtiSecDate: string
    tin: string
    businessArea: string
    employeeCount: number
    spaceOwnership: string
    address: string
    govtIncentive: string
}

export interface BusinessActivity {
    lineOfBusiness: string
    units: number
    capitalization: number
}

// ── Documents ─────────────────────────────────────────────────────

export type DocumentStatus = 'Verified' | 'Pending' | 'Missing'

export interface Document {
    title: string
    status: DocumentStatus
    verifiedBy?: string
    icon?: string
}

export type DocItemStatus = 'verified' | 'pending' | 'missing'

export interface DocItem {
    id: string
    name: string
    status: DocItemStatus
    verifiedBy: string
    type: string
    fileSize: string
    uploadedBy: string
    uploadedDate: string
    verifiedDate: string
    pages: number
    docNumber: string
    issuingAuthority: string
    validUntil: string
    remarks: string
}

// ── Fees & payments ───────────────────────────────────────────────

export interface FeeItem {
    description: string
    amount: number
}

export type PaymentStatus = 'Fully Paid' | 'Unpaid'

export interface PaymentInfo {
    status: PaymentStatus
    orNumber: string
    paymentDate: string
    paymentMode: string
    amountPaid: number
}

// ── Real Property Assessment ─────────────────────────────────────

export type RptColumnKey =
    | 'draft'
    | 'for-review'
    | 'dept-clearance'
    | 'inspection'
    | 'evaluation'
    | 'assessment'
    | 'completed'

export type PropertyType = 'Residential' | 'Commercial' | 'Agricultural' | 'Industrial'

export interface PropertyAssessment {
    id: number
    rptNumber: string
    ownerName: string
    location: string
    engineer: string
    propertyType: PropertyType
    status: RptColumnKey
    date: string
    toNumber?: string
}
