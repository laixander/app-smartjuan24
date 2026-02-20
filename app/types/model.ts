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
}

export type DeptReviewStatus = 'cleared' | 'pending' | 'with issue'

export interface DeptReview {
    department: string
    officer: string
    status: DeptReviewStatus
    timestamp: string
    remarks: string
}
