<script setup lang="ts">
import { getPaginationRowModel } from '@tanstack/vue-table'
import { PERMIT_APPLICATION_COLUMNS } from '~/constants/permit-application'
import { usePermitApplicationConfig } from '~/composables/usePermitApplicationConfig'
import type { Task } from '~/types/model'

const { data: applications } = await useFetch<Task[]>('/api/permit-application')

const { statusColors, statusLabels, typeBadge } = usePermitApplicationConfig()

const table = useTemplateRef('table')

const pagination = ref({ pageIndex: 0, pageSize: 10 })
const globalFilter = ref('')

const columns = PERMIT_APPLICATION_COLUMNS
</script>

<template>
    <div class="border border-default rounded-xl overflow-hidden">
        <UTable
            ref="table"
            v-model:pagination="pagination"
            v-model:global-filter="globalFilter"
            :data="applications ?? []"
            :columns="columns"
            :pagination-options="{
                getPaginationRowModel: getPaginationRowModel()
            }"
            class="w-full whitespace-nowrap"
        >
            <!-- BIN -->
            <template #bin-cell="{ row }">
                <div class="font-mono font-semibold text-sm text-highlighted">
                    {{ row.original.bin ?? '—' }}
                </div>
            </template>

            <!-- Business -->
            <template #title-cell="{ row }">
                <div class="flex items-center gap-2">
                    <UAvatar
                        :alt="row.original.title"
                        color="primary"
                        variant="soft"
                        size="sm"
                    />
                    <span class="font-medium text-default">{{ row.original.title }}</span>
                </div>
            </template>

            <!-- Industry -->
            <template #industry-cell="{ row }">
                <div class="text-sm text-dimmed">
                    {{ row.original.industry }}
                </div>
            </template>

            <!-- Type -->
            <template #type-cell="{ row }">
                <UBadge
                    :color="typeBadge[row.original.type].color"
                    size="sm"
                    class="uppercase font-bold"
                >
                    {{ typeBadge[row.original.type].label }}
                </UBadge>
            </template>

            <!-- Permit -->
            <template #permit-cell="{ row }">
                <div class="text-sm text-default">
                    {{ row.original.permit }}
                </div>
            </template>

            <!-- Status -->
            <template #status-cell="{ row }">
                <UBadge :color="statusColors[row.original.status]" variant="subtle">
                    <UChip standalone inset :color="statusColors[row.original.status]" size="xs" />
                    {{ statusLabels[row.original.status] }}
                </UBadge>
            </template>

            <!-- Submitted -->
            <template #submitted-cell="{ row }">
                <div class="text-sm text-dimmed">
                    {{ row.original.submitted }}
                </div>
            </template>

            <!-- Actions -->
            <template #actions-cell="{ row }">
                <div class="flex items-center gap-1">
                    <UButton
                        icon="i-lucide-eye"
                        color="neutral"
                        variant="ghost"
                        size="sm"
                        @click="navigateTo(`/business-permits/permit-applications/${row.original.id}`)"
                    />
                    <UButton icon="i-lucide-pencil" color="neutral" variant="ghost" size="sm" />
                    <UButton icon="i-lucide-printer" color="neutral" variant="ghost" size="sm" />
                </div>
            </template>
        </UTable>

        <!-- Footer / Pagination -->
        <div class="flex justify-between items-center border-t border-default px-4 sm:px-6 py-3">
            <div class="text-sm text-dimmed">
                Showing
                {{ (table?.tableApi?.getState().pagination.pageIndex || 0) * (table?.tableApi?.getState().pagination.pageSize || 10) + 1 }}
                –
                {{ Math.min(
                    ((table?.tableApi?.getState().pagination.pageIndex || 0) + 1) * (table?.tableApi?.getState().pagination.pageSize || 10),
                    table?.tableApi?.getFilteredRowModel().rows.length || 0
                ) }}
                of {{ table?.tableApi?.getFilteredRowModel().rows.length || 0 }} records
            </div>
            <UPagination
                variant="ghost"
                :page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
                :items-per-page="table?.tableApi?.getState().pagination.pageSize"
                :total="table?.tableApi?.getFilteredRowModel().rows.length"
                @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)"
            />
        </div>
    </div>
</template>
