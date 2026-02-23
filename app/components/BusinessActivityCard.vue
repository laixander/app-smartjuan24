<script setup lang="ts">
import type { BusinessActivity } from '~/types/model'
import type { TableColumn } from '@nuxt/ui'
import { h } from 'vue'

defineProps<{
    activities: BusinessActivity[]
}>()

const columns: TableColumn<BusinessActivity>[] = [
    {
        accessorKey: 'lineOfBusiness',
        header: 'Line of Business',
        footer: 'Total'
    },
    {
        accessorKey: 'units',
        header: 'Units',
        footer: ({ table }) => {
            const total = table.getFilteredRowModel().rows.reduce((sum: number, row: any) => sum + Number.parseFloat(row.getValue('units')), 0)
            return total
        }
    },
    {
        accessorKey: 'capitalization',
        header: 'Capitalization',
        footer: ({ table }) => {
            const total = table.getFilteredRowModel().rows.reduce((sum: number, row: any) => sum + Number.parseFloat(row.getValue('capitalization')), 0)
            const formatted = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'PHP'
            }).format(total)
            return h('span', { class: 'text-primary' }, formatted)
        },
        cell: ({ row }) => {
            const amount = Number.parseFloat(row.getValue('capitalization'))
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'PHP'
            }).format(amount)
        }
    }
]
</script>

<template>
    <UCard :ui="{ body: 'p-0 sm:p-0' }">
        <template #header>
            <div class="flex items-center gap-2">
                <h3 class="font-bold">Business Activities</h3>
            </div>
        </template>
        <UTable :data="activities" :columns="columns" class="flex-1" />
    </UCard>
</template>
