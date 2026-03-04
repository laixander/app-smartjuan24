<template>
    <div class="space-y-4">
        <div class="flex items-center justify-between">
            <UInput v-model="globalFilter" placeholder="Search..." icon="i-lucide-search" variant="outline"
                class="w-80" />
            <UTabs v-model="activeTab" :content="false" :items="[
                {
                    icon: 'i-lucide-list',
                    value: 'table'
                },
                {
                    icon: 'i-lucide-layout-grid',
                    value: 'card'
                }
            ]" :ui="{ list: 'w-auto' }" class="w-auto" />
        </div>

        <!-- Table View -->
        <div v-if="activeTab === 'table'" class="border border-default rounded-xl overflow-hidden">
            <UTable ref="table" v-model:pagination="pagination" v-model:global-filter="globalFilter" :data="data"
                :columns="columns" :pagination-options="{
                    getPaginationRowModel: getPaginationRowModel()
                }" class="w-full whitespace-nowrap">
                <template #property-cell="{ row }">
                    <div class="flex items-center gap-3 w-80 truncate">
                        <UAvatar :alt="row.original.avatar.initials" :color="row.original.avatar.color" variant="soft"
                            size="md" />
                        <div class="truncate">
                            <div class="font-bold text-default uppercase truncate">{{ row.original.owner }}</div>
                            <div class="text-xs text-dimmed mt-0.5 truncate">
                                {{ row.original.tdNo }} • {{ row.original.pin }}
                            </div>
                        </div>
                    </div>
                </template>
                <template #propertyKind-cell="{ row }">
                    <UBadge :color="row.original.propertyKind.color">
                        {{ row.original.propertyKind.label }}
                    </UBadge>
                </template>
                <template #barangay-cell="{ row }">
                    <div class="flex items-center gap-1.5 text-dimmed text-sm">
                        <UIcon name="i-lucide-map-pin" class="size-4" />
                        {{ row.original.barangay }}
                    </div>
                </template>
                <template #classification-cell="{ row }">
                    <UBadge :color="row.original.classification.color" variant="outline">
                        {{ row.original.classification.label }}
                    </UBadge>
                </template>
                <template #assessment-cell="{ row }">
                    <div>
                        <div class="font-semibold text-primary text-xs">{{ row.original.assessedValue }}</div>
                        <div class="text-xs text-dimmed mt-0.5">MV: {{ row.original.marketValue }}</div>
                    </div>
                </template>
                <template #status-cell="{ row }">
                    <UBadge :color="row.original.status.color" variant="subtle">
                        <UChip standalone inset :color="row.original.status.color" size="xs" />
                        {{ row.original.status.label }}
                    </UBadge>
                </template>
                <template #actions-cell="{ row }">
                    <div class="flex items-center gap-1">
                        <UButton icon="i-lucide-eye" color="neutral" variant="ghost" size="sm" @click="openModal(row.original)" />
                        <UButton icon="i-lucide-pencil" color="neutral" variant="ghost" size="sm" />
                        <UButton icon="i-lucide-printer" color="neutral" variant="ghost" size="sm" />
                    </div>
                </template>
            </UTable>
            <div class="flex justify-between items-center border-t border-default px-4 sm:px-6 py-3">
                <div class="text-sm text-dimmed">
                    Showing {{ (table?.tableApi?.getState().pagination.pageIndex || 0) *
                        (table?.tableApi?.getState().pagination.pageSize || 6) + 1 }} – {{
                        Math.min(((table?.tableApi?.getState().pagination.pageIndex || 0) + 1) *
                            (table?.tableApi?.getState().pagination.pageSize || 6),
                    table?.tableApi?.getFilteredRowModel().rows.length || 0)
                    }} of {{ table?.tableApi?.getFilteredRowModel().rows.length || 0 }} properties
                </div>
                <UPagination variant="ghost" :page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
                    :items-per-page="table?.tableApi?.getState().pagination.pageSize"
                    :total="table?.tableApi?.getFilteredRowModel().rows.length"
                    @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)" />
            </div>
        </div>

        <!-- Card View -->
        <div v-if="activeTab === 'card'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <UCard v-for="(item, index) in paginatedData" :key="index" :ui="{ root: 'relative', body: 'sm:p-4 space-y-2', footer: 'sm:p-0' }">
                <div class="flex flex-col gap-4">
                    <div class="flex gap-4">
                        <UAvatar :color="item.avatar.color" variant="soft" :alt="item.avatar.initials" size="xl" :ui="{ fallback: 'font-bold' }" />
                        <div class="flex-1 min-w-0">
                            <h3 class="font-bold text-sm uppercase truncate">{{ item.owner }}</h3>
                            <p class="text-xs text-dimmed truncate mt-0.5">{{ item.tdNo }} • {{ item.pin }}</p>
                        </div>
                    </div>

                    <div class="flex flex-wrap items-center gap-2">
                        <UBadge :color="item.propertyKind.color">
                            {{ item.propertyKind.label }}
                        </UBadge>
                        <UBadge :color="item.status.color" variant="subtle">
                            <UChip standalone inset :color="item.status.color" size="xs" />
                            {{ item.status.label }}
                        </UBadge>
                        <div class="flex items-center gap-1 text-dimmed text-xs">
                            <UIcon name="i-lucide-map-pin" class="size-3" />
                            {{ item.barangay }}
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-3 *:p-3 *:bg-neutral-50 *:dark:bg-neutral-800/50 *:rounded-lg *:space-y-1 *:text-xs">
                        <div>
                            <p class="font-medium text-dimmed">Assessed Value</p>
                            <p class="font-bold text-primary">{{ item.assessedValue }}</p>
                            <p class="text-dimmed">Level: {{ item.assessmentLevel }}</p>
                        </div>
                        <div>
                            <p class="font-medium text-dimmed">Lot Area</p>
                            <p class="font-semibold text-default">{{ item.lotArea }}</p>
                            <p class="text-dimmed">{{ item.classification.label }}</p>
                        </div>
                    </div>
                </div>
                <template #footer>
                    <UFieldGroup class="w-full divide-x divide-default *:p-3 *:rounded-none">
                        <UButton block color="neutral" variant="ghost" size="sm" icon="i-lucide-eye" @click="openModal(item)" />
                        <UButton block color="neutral" variant="ghost" size="sm" icon="i-lucide-pencil" />
                        <UButton block color="neutral" variant="ghost" size="sm" icon="i-lucide-printer" />
                    </UFieldGroup>
                </template>
            </UCard>
        </div>
        <div v-if="activeTab === 'card'" class="flex justify-between items-center px-2 py-3">
            <div class="text-sm text-dimmed">
                Showing {{ (pagination.pageIndex) * pagination.pageSize + 1 }} – {{ Math.min((pagination.pageIndex + 1) * pagination.pageSize, filteredData.length) }} of {{ filteredData.length }} properties
            </div>
            <UPagination variant="ghost" v-model:page="cardPageIndex" :items-per-page="pagination.pageSize" :total="filteredData.length" />
        </div>
    </div>

    <PropertyRegistryModal v-if="selectedProperty" v-model:open="open" :property="selectedProperty" />
</template>

<script setup lang="ts">
import { getPaginationRowModel } from '@tanstack/vue-table'
import { PROPERTY_REGISTRY_COLUMNS } from '~/constants/property-registry'

const table = useTemplateRef('table')

const {
    data,
    pagination,
    globalFilter,
    activeTab,
    cardPageIndex,
    filteredData,
    paginatedData,
    open,
    selectedProperty,
    openModal
} = usePropertyRegistry()

const columns = PROPERTY_REGISTRY_COLUMNS
</script>