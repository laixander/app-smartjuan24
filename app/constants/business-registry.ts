import type { TabsItem, TableColumn } from '@nuxt/ui'
import type { BusinessRegistry, PaymentRecord } from '~/types/business-registry'

export const BUSINESS_REGISTRY_COLUMNS: TableColumn<BusinessRegistry>[] = [
    { accessorKey: 'business', header: 'Business' },
    { accessorKey: 'industry', header: 'Industry' },
    { accessorKey: 'barangay', header: 'Barangay' },
    { accessorKey: 'status', header: 'Status' },
    { accessorKey: 'permit', header: 'Permit' },
    { accessorKey: 'released', header: 'Released' },
    { accessorKey: 'actions', header: 'Actions' }
]

export const PAYMENT_COLUMNS: TableColumn<PaymentRecord>[] = [
    { accessorKey: 'orNumber', header: 'OR Number' },
    { accessorKey: 'date', header: 'Date' },
    { accessorKey: 'description', header: 'Description' },
    { accessorKey: 'amount', header: 'Amount' }
]

export const BUSINESS_MODAL_TABS: TabsItem[] = [
    { icon: 'i-lucide-user', label: 'Business Info', slot: 'info' as const },
    { icon: 'i-lucide-file-text', label: 'Permit History', slot: 'permit' as const },
    { icon: 'i-lucide-file-text', label: 'Financials', slot: 'financial' as const }
]
