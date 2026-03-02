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
        <div v-if="activeTab === 'table'" class="border border-default rounded-xl overflow-hidden">
            <UTable ref="table" v-model:pagination="pagination" v-model:global-filter="globalFilter" :data="data"
                :columns="columns" :pagination-options="{
                    getPaginationRowModel: getPaginationRowModel()
                }" class="w-full whitespace-nowrap">
                <template #business-cell="{ row }">
                    <div class="flex items-center gap-3 w-80 truncate">
                        <UAvatar :alt="row.original.avatar.initials" :color="row.original.avatar.color" variant="soft"
                            size="md" />
                        <div class="truncate">
                            <div class="font-bold text-default uppercase truncate">{{ row.original.name }}</div>
                            <div class="text-xs text-dimmed mt-0.5 truncate">
                                {{ row.original.bin }} • {{ row.original.owner }}
                            </div>
                        </div>
                    </div>
                </template>
                <template #industry-cell="{ row }">
                    <UBadge :color="row.original.industry.color">
                        {{ row.original.industry.label }}
                    </UBadge>
                </template>
                <template #barangay-cell="{ row }">
                    <div class="flex items-center gap-1.5 text-dimmed text-sm">
                        <UIcon name="i-lucide-map-pin" class="size-4" />
                        {{ row.original.barangay }}
                    </div>
                </template>
                <template #status-cell="{ row }">
                    <UBadge :color="row.original.status.color" variant="subtle">
                        <UChip standalone inset :color="row.original.status.color" size="xs" />
                        {{ row.original.status.label }}
                    </UBadge>
                </template>
                <template #permit-cell="{ row }">
                    <div>
                        <div class="font-semibold text-green text-xs">{{ row.original.permitNo }}</div>
                        <div class="text-xs text-dimmed mt-0.5">Exp: {{ row.original.permitExp }}</div>
                    </div>
                </template>
                <template #released-cell="{ row }">
                    <div>
                        <div class="font-medium text-toned text-xs">{{ row.original.releasedDate }}</div>
                        <div class="text-xs text-dimmed mt-0.5">{{ row.original.releasedTime }}</div>
                    </div>
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
                        (table?.tableApi?.getState().pagination.pageSize || 5) + 1 }} – {{
                        Math.min(((table?.tableApi?.getState().pagination.pageIndex || 0) + 1) *
                            (table?.tableApi?.getState().pagination.pageSize || 5),
                    table?.tableApi?.getFilteredRowModel().rows.length || 0)
                    }} of {{ table?.tableApi?.getFilteredRowModel().rows.length || 0 }} businesses
                </div>
                <UPagination variant="ghost" :page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
                    :items-per-page="table?.tableApi?.getState().pagination.pageSize"
                    :total="table?.tableApi?.getFilteredRowModel().rows.length"
                    @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)" />
            </div>
        </div>
        
        <div v-if="activeTab === 'card'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <UCard v-for="(item, index) in paginatedData" :key="index" :ui="{ root: 'relative', body: 'sm:p-4 space-y-2', footer: 'sm:p-0' }">
                <div class="flex flex-col gap-4">
                    <div class="flex gap-4">
                        <UAvatar :color="item.avatar.color" variant="soft" :alt="item.avatar.initials" size="xl" :ui="{ fallback: 'font-bold' }" />
                        <div class="flex-1 min-w-0">
                            <h3 class="font-bold text-sm uppercase truncate">{{ item.name }}</h3>
                            <p class="text-xs text-dimmed truncate mt-0.5">{{ item.bin }} • {{ item.owner }}</p>
                        </div>
                    </div>
                    
                    <div class="flex flex-wrap items-center gap-2">
                        <UBadge :color="item.industry.color">
                            {{ item.industry.label }}
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

                    <div class="grid grid-cols-2 py-3 mt-1 bg-muted rounded-lg divide-x divide-neutral-200 dark:divide-neutral-700/50">
                        <div class="px-3 space-y-1 text-xs">
                            <p class="font-medium text-dimmed">Permit No.</p>
                            <p class="font-bold text-green">{{ item.permitNo }}</p>
                            <p class="text-dimmed">Exp: {{ item.permitExp }}</p>
                        </div>
                        <div class="px-3 space-y-1 text-xs">
                            <p class="font-medium text-dimmed">Released</p>
                            <p class="font-semibold text-default">{{ item.releasedDate }}</p>
                            <p class="text-dimmed">{{ item.releasedTime }}</p>
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
                Showing {{ (pagination.pageIndex) * pagination.pageSize + 1 }} – {{ Math.min((pagination.pageIndex + 1) * pagination.pageSize, filteredData.length) }} of {{ filteredData.length }} businesses
            </div>
            <UPagination variant="ghost" v-model:page="cardPageIndex" :items-per-page="pagination.pageSize" :total="filteredData.length" />
        </div>
    </div>

    <BusinessRegistryModal v-if="selectedBusiness" v-model:open="open" :business="selectedBusiness" />
</template>

<script setup lang="ts">
import { getPaginationRowModel } from '@tanstack/vue-table'
import { BUSINESS_REGISTRY_COLUMNS } from '~/constants/business-registry'

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
    selectedBusiness,
    openModal
} = useBusinessRegistry()

const columns = BUSINESS_REGISTRY_COLUMNS
</script>