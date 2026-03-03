<script setup lang="ts">
import { getPaginationRowModel } from '@tanstack/vue-table'
import { PROPERTY_ASSESSMENT_COLUMNS } from '~/constants/property-assessment'
import { usePropertyAssessmentConfig } from '~/composables/usePropertyAssessmentConfig'
import type { PropertyAssessment } from '~/types/model'

const { data: assessments } = await useFetch<PropertyAssessment[]>('/api/property-assessment')

const { propertyTypeBadge, columnLabels, columnColors } = usePropertyAssessmentConfig()

const table = useTemplateRef('table')

const pagination = ref({ pageIndex: 0, pageSize: 10 })
const globalFilter = ref('')

const columns = PROPERTY_ASSESSMENT_COLUMNS

const statusColors: Record<string, 'neutral' | 'yellow' | 'purple' | 'blue' | 'pink' | 'orange' | 'green'> = {
    'draft': 'neutral',
    'for-review': 'yellow',
    'dept-clearance': 'purple',
    'inspection': 'blue',
    'evaluation': 'pink',
    'assessment': 'orange',
    'completed': 'green'
}
</script>

<template>
    <div class="border border-default rounded-xl overflow-hidden">
        <UTable
            ref="table"
            v-model:pagination="pagination"
            v-model:global-filter="globalFilter"
            :data="assessments ?? []"
            :columns="columns"
            :pagination-options="{
                getPaginationRowModel: getPaginationRowModel()
            }"
            class="w-full whitespace-nowrap"
        >
            <!-- RPT Number -->
            <template #rptNumber-cell="{ row }">
                <div class="font-mono font-semibold text-sm text-highlighted">
                    {{ row.original.rptNumber }}
                </div>
            </template>

            <!-- Owner -->
            <template #owner-cell="{ row }">
                <div class="flex items-center gap-2">
                    <UAvatar
                        :alt="row.original.ownerName.split(',')[0]?.trim()"
                        color="primary"
                        variant="soft"
                        size="sm"
                    />
                    <span class="font-medium text-default">{{ row.original.ownerName }}</span>
                </div>
            </template>

            <!-- Location -->
            <template #location-cell="{ row }">
                <div class="flex items-center gap-1.5 text-dimmed text-sm">
                    <UIcon name="i-lucide-map-pin" class="size-4 shrink-0" />
                    {{ row.original.location }}
                </div>
            </template>

            <!-- Property Type -->
            <template #propertyType-cell="{ row }">
                <UBadge :color="propertyTypeBadge[row.original.propertyType].color" size="sm" class="uppercase font-bold">
                    {{ propertyTypeBadge[row.original.propertyType].label }}
                </UBadge>
            </template>

            <!-- Status -->
            <template #status-cell="{ row }">
                <UBadge :color="statusColors[row.original.status]" variant="subtle">
                    <UChip standalone inset :color="statusColors[row.original.status]" size="xs" />
                    {{ columnLabels[row.original.status] }}
                </UBadge>
            </template>

            <!-- Date -->
            <template #date-cell="{ row }">
                <div class="text-sm text-dimmed">
                    {{ row.original.date }}
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
                        @click="navigateTo(`/real-property/property-assessment/${row.original.id}`)"
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
