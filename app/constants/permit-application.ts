import type { TableColumn } from '@nuxt/ui'
import type { Task } from '~/types/model'

export const PERMIT_APPLICATION_COLUMNS: TableColumn<Task>[] = [
    { accessorKey: 'bin', header: 'BIN' },
    { accessorKey: 'title', header: 'Business' },
    { accessorKey: 'industry', header: 'Industry' },
    { accessorKey: 'type', header: 'Type' },
    { accessorKey: 'permit', header: 'Permit' },
    { accessorKey: 'status', header: 'Status' },
    { accessorKey: 'submitted', header: 'Submitted' },
    { accessorKey: 'actions', header: 'Actions' }
]
