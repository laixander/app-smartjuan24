import type { TableColumn } from '@nuxt/ui'
import type { PropertyAssessment } from '~/types/model'

export const PROPERTY_ASSESSMENT_COLUMNS: TableColumn<PropertyAssessment>[] = [
    { accessorKey: 'rptNumber', header: 'RPT Number' },
    { accessorKey: 'owner', header: 'Owner' },
    { accessorKey: 'location', header: 'Location' },
    { accessorKey: 'propertyType', header: 'Type' },
    { accessorKey: 'status', header: 'Status' },
    { accessorKey: 'date', header: 'Date' },
    { accessorKey: 'actions', header: 'Actions' }
]
