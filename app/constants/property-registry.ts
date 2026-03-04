import type { TabsItem, TableColumn } from '@nuxt/ui'
import type { PropertyRegistry, TaxPaymentRecord } from '~/types/property-registry'

export const PROPERTY_REGISTRY_COLUMNS: TableColumn<PropertyRegistry>[] = [
    { accessorKey: 'property', header: 'Property' },
    { accessorKey: 'propertyKind', header: 'Type' },
    { accessorKey: 'barangay', header: 'Barangay' },
    { accessorKey: 'classification', header: 'Classification' },
    { accessorKey: 'assessment', header: 'Assessment' },
    { accessorKey: 'status', header: 'Status' },
    { accessorKey: 'actions', header: 'Actions' }
]

export const TAX_PAYMENT_COLUMNS: TableColumn<TaxPaymentRecord>[] = [
    { accessorKey: 'orNumber', header: 'OR Number' },
    { accessorKey: 'date', header: 'Date' },
    { accessorKey: 'description', header: 'Description' },
    { accessorKey: 'amount', header: 'Amount' }
]

export const PROPERTY_REGISTRY_MODAL_TABS: TabsItem[] = [
    { icon: 'i-lucide-home', label: 'Property Info', slot: 'info' as const },
    { icon: 'i-lucide-file-text', label: 'Assessment History', slot: 'assessment' as const },
    { icon: 'i-lucide-receipt', label: 'Tax Payments', slot: 'tax' as const }
]
