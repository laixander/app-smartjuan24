// /types/model.ts

export type ColumnKey =
    | 'assessment'
    | 'processing'
    | 'approval'
    | 'done'

export interface Task {
    id: number
    title: string
    description?: string
    status: ColumnKey
    type: 'renewal' | 'new'
    aging: number
    permit: string
    submitted: string
    industry: string
    reviews?: DeptReview[]
    ownerInfo?: OwnerInfo
    businessDetails?: BusinessDetails
    businessActivities?: BusinessActivity[]
    documents?: Document[]
    feeItems?: FeeItem[]
    totalFees?: number
    paymentInfo?: PaymentInfo
}

export type DeptReviewStatus = 'cleared' | 'pending' | 'with issue'

export interface DeptReview {
    department: string
    officer: string
    status: DeptReviewStatus
    timestamp: string
    remarks: string
}
export interface OwnerInfo {
    fullName: string
    contactNumber: string
    email: string
    nationality: string
    address: string
    location: {
        name: string
        image: string
    }
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

export type DocumentStatus = 'Verified' | 'Pending' | 'Missing'

export interface Document {
    title: string
    status: DocumentStatus
    verifiedBy?: string
    icon?: string
}

export interface FeeItem {
    description: string
    amount: number
}

export interface PaymentInfo {
    status: string
    orNumber: string
    paymentDate: string
    paymentMode: string
    amountPaid: number
}

