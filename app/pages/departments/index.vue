<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard v-for="stat in stats" :key="stat.title" v-bind="stat" orientation="horizontal" />
    </div>

    <div class="space-y-4">
        <!-- Toolbar -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div class="flex flex-col sm:flex-row items-center gap-2">
                <UInput
                    v-model="globalFilter"
                    icon="i-lucide-search"
                    placeholder="Search departments..."
                    color="neutral"
                    class="w-80"
                    size="lg"
                />

                <!-- Category Filter -->
                <USelect
                    v-model="categoryFilter"
                    :items="categoryOptions"
                    class="data-[state=open]:bg-elevated w-auto"
                    :ui="{ trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200' }"
                    placeholder="All Categories"
                    size="lg"
                />
            </div>

            <!-- View Toggle & Actions -->
            <div class="flex items-center gap-2 w-full sm:w-auto justify-end">
                <UButton icon="i-lucide-plus" size="lg" variant="ghost" @click="isAddOpen = true">Add Department</UButton>
                <UTabs 
                    v-model="activeTab" 
                    :content="false" 
                    :items="[
                        { icon: 'i-lucide-list', value: 'table' },
                        { icon: 'i-lucide-layout-grid', value: 'card' }
                    ]" 
                    :ui="{ list: 'w-auto' }" 
                    class="w-auto" 
                />
            </div>
        </div>

        <!-- Table View -->
        <div v-if="activeTab === 'table'" class="border border-default rounded-xl overflow-hidden bg-card">
            <UTable
                ref="table"
                v-model:pagination="pagination"
                v-model:global-filter="globalFilter"
                :data="data"
                :columns="columns"
                :pagination-options="{
                    getPaginationRowModel: getPaginationRowModel()
                }"
                class="w-full whitespace-nowrap"
            >
                <!-- Department Name -->
                <template #name-cell="{ row }">
                    <div class="flex items-center gap-3 w-72 truncate">
                        <UAvatar
                            :alt="row.original.name"
                            color="primary"
                            variant="soft"
                            size="md"
                        />
                        <div class="truncate">
                            <div class="font-medium text-default truncate">{{ row.original.name }}</div>
                            <div class="text-xs text-dimmed">{{ row.original.id }}</div>
                        </div>
                    </div>
                </template>

                 <!-- Category -->
                 <template #category-cell="{ row }">
                    <UBadge :color="row.original.category.color">
                        {{ row.original.category.label }}
                    </UBadge>
                </template>

                <!-- Head -->
                <template #head-cell="{ row }">
                 <div class="flex items-center gap-2">
                    <UAvatar
                        :alt="row.original.head"
                        color="neutral"
                        variant="soft"
                        size="xs"
                    />
                    <span class="text-sm font-medium text-default">{{ row.original.head }}</span>
                 </div>
                </template>

                <!-- Users Assigned -->
                <template #usersAssigned-cell="{ row }">
                    <div class="flex items-center gap-2">
                        <UAvatarGroup :max="3" size="xs">
                            <UAvatar v-for="i in Math.min(row.original.usersAssigned, 3)" :key="i" alt="User" color="neutral" variant="soft" />
                        </UAvatarGroup>
                        <span class="text-sm text-dimmed">+{{ Math.max(0, row.original.usersAssigned - 3) }}</span>
                    </div>
                </template>
                
                <!-- Performance -->
                <template #performance-cell="{ row }">
                    <div class="flex items-center gap-2 w-32">
                        <UProgress 
                            v-model="row.original.performance" 
                            :color="getPerformanceColor(row.original.performance)" 
                            size="sm" 
                            class="flex-1"
                        />
                        <span class="text-xs font-medium" :class="`text-${getPerformanceColor(row.original.performance)}-500 dark:text-${getPerformanceColor(row.original.performance)}-400`">{{ row.original.performance }}%</span>
                    </div>
                </template>

                <!-- Status -->
                <template #status-cell="{ row }">
                    <UBadge :color="row.original.status === 'Active' ? 'green' : 'neutral'" variant="subtle">
                        <UChip standalone inset :color="row.original.status === 'Active' ? 'green' : 'neutral'" size="xs" />
                        {{ row.original.status }}
                    </UBadge>
                </template>

                <!-- Actions -->
                <template #actions-cell="{ row }">
                    <div class="space-x-2">
                        <UButton icon="i-lucide-eye" color="neutral" variant="ghost" size="sm" title="View Details" @click="openViewSlideover(row.original)" />
                        <!-- <UButton icon="i-lucide-users" color="neutral" variant="ghost" size="sm" title="Assign Users" @click="toast.add({ title: 'Assign Users', description: 'User assignment modal triggered.' })" /> -->
                        <UButton icon="i-lucide-pencil" color="neutral" variant="ghost" size="sm" title="Edit Department" @click="openEditModal(row.original)" />
                        <UButton icon="i-lucide-trash-2" color="red" variant="ghost" size="sm" title="Remove" @click="openDeleteModal(row.original)" />
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
                    of {{ table?.tableApi?.getFilteredRowModel().rows.length || 0 }} departments
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

        <!-- Card View -->
        <div v-if="activeTab === 'card'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <UCard v-for="(item, index) in paginatedData" :key="index" :ui="{ root: 'relative overflow-hidden hover:ring-1 hover:ring-primary/50 transition-shadow transition-colors', body: 'sm:p-4 space-y-4', footer: 'sm:p-0' }">
                <div class="flex flex-col gap-4">
                    <!-- Header: Avatar + Title -->
                    <div class="flex gap-4">
                        <UAvatar color="primary" variant="soft" :alt="item.name" size="xl" :ui="{ fallback: 'font-bold' }" />
                        <div class="flex-1 min-w-0">
                            <h3 class="font-bold text-sm uppercase truncate text-default">{{ item.name }}</h3>
                            <p class="text-xs text-dimmed truncate mt-0.5">{{ item.id }}</p>
                        </div>
                    </div>
                    
                    <!-- Badges Row -->
                    <div class="flex flex-wrap items-center gap-2">
                        <UBadge :color="item.category.color">
                            {{ item.category.label }}
                        </UBadge>
                        <UBadge :color="item.status === 'Active' ? 'green' : 'neutral'" variant="subtle">
                            <UChip standalone inset :color="item.status === 'Active' ? 'green' : 'neutral'" size="xs" />
                            {{ item.status }}
                        </UBadge>
                    </div>

                    <!-- Metrics Grid -->
                    <div class="grid grid-cols-2 gap-3 *:p-3 *:bg-neutral-50 *:dark:bg-neutral-800/50 *:rounded-lg *:space-y-1 *:text-xs">
                        <!-- Personnel & Head -->
                        <div>
                            <p class="font-medium text-dimmed">Director</p>
                            <p class="font-bold text-default truncate" :title="item.head">{{ item.head }}</p>
                            <div class="flex items-center gap-2 mt-1">
                                <UIcon name="i-lucide-users" class="w-3.5 h-3.5 text-dimmed" />
                                <span class="text-dimmed">{{ item.usersAssigned }} Staff</span>
                            </div>
                        </div>
                        
                        <!-- Performance & Avg Time -->
                        <div>
                            <p class="font-medium text-dimmed">Performance</p>
                            <div class="flex items-center gap-2">
                                <p class="font-semibold" :class="`text-${getPerformanceColor(item.performance)}-500`">{{ item.performance }}%</p>
                                <UProgress v-model="item.performance" :color="getPerformanceColor(item.performance)" size="xs" class="flex-1" />
                            </div>
                            <div class="flex items-center gap-2 mt-1">
                                <UIcon name="i-lucide-clock" class="w-3.5 h-3.5 text-dimmed" />
                                <span class="text-dimmed">{{ item.avgTime }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <template #footer>
                    <UFieldGroup class="w-full divide-x divide-default *:p-3 *:rounded-none">
                         <UButton block color="neutral" variant="ghost" size="sm" icon="i-lucide-eye" title="View Details" @click="openViewSlideover(item)" />
                        <!-- <UButton block color="neutral" variant="ghost" size="sm" icon="i-lucide-users" title="Assign Users" @click="toast.add({ title: 'Assign Users', description: 'User assignment modal triggered.' })" /> -->
                        <UButton block color="neutral" variant="ghost" size="sm" icon="i-lucide-pencil" title="Edit Department" @click="openEditModal(item)" />
                        <UButton block color="red" variant="ghost" size="sm" icon="i-lucide-trash-2" title="Remove" @click="openDeleteModal(item)" />
                    </UFieldGroup>
                </template>
            </UCard>
        </div>
        
        <div v-if="activeTab === 'card'" class="flex justify-between items-center px-2 py-3">
            <div class="text-sm text-dimmed">
                Showing {{ (pagination.pageIndex) * pagination.pageSize + 1 }} – {{ Math.min((pagination.pageIndex + 1) * pagination.pageSize, filteredData.length) }} of {{ filteredData.length }} departments
            </div>
            <UPagination variant="ghost" v-model:page="cardPageIndex" :items-per-page="pagination.pageSize" :total="filteredData.length" />
        </div>

        <!-- Modals -->
        <DepartmentModalAdd v-model:open="isAddOpen" />
        <DepartmentModalEdit v-if="selectedDepartment" v-model:open="isEditOpen" :department="selectedDepartment" />
        <DepartmentModalDelete v-if="selectedDepartment" v-model:open="isDeleteOpen" :department="selectedDepartment" />

        <!-- Slideover -->
        <DepartmentSlideoverView v-if="selectedDepartment" v-model:open="isViewOpen" :department="selectedDepartment" />
    </div>
</template>

<script setup lang="ts">
import { getPaginationRowModel } from '@tanstack/vue-table'
import { useDepartments } from '~/composables/useDepartments'

definePageMeta({
    title: 'Departments',
    description: 'Manage city departments and personnel.',
})

const stats = [
    {
        title: "Total Departments",
        value: 8,
        subtitle: "active units",
        icon: "i-lucide-building",
        color: "blue",
    },
    {
        title: "Total Personnel",
        value: 368,
        subtitle: "assigned staff",
        icon: "i-lucide-users",
        color: "green"
    },
    {
        title: "Avg Performance",
        value: "88.5%",
        subtitle: "across all depts",
        icon: "i-lucide-activity",
        color: "purple"
    },
    {
        title: "Active Initiatives",
        value: 165,
        subtitle: "ongoing projects",
        icon: "i-lucide-folder-open",
        color: "orange"
    },
] as const

const toast = useToast()
const table = useTemplateRef('table')

const {
    data,
    pagination,
    globalFilter,
    activeTab,
    categoryFilter,
    cardPageIndex,
    filteredData,
    paginatedData,
    isAddOpen,
    isEditOpen,
    isDeleteOpen,
    isViewOpen,
    selectedDepartment,
    openEditModal,
    openDeleteModal,
    openViewSlideover
} = useDepartments()

const categoryOptions = [
    { label: 'All Categories', value: 'All' },
    { label: 'Regulatory', value: 'Regulatory' },
    { label: 'Finance', value: 'Finance' },
    { label: 'Inspection', value: 'Inspection' },
    { label: 'Support', value: 'Support' }
]

const columns = [
    {
        accessorKey: 'name',
        header: 'Department',
    },
    {
        accessorKey: 'category',
        header: 'Category',
    },
    {
        accessorKey: 'head',
        header: 'Department Head',
    },
    {
        accessorKey: 'usersAssigned',
        header: 'Personnel',
    },
    {
        accessorKey: 'performance',
        header: 'Performance',
    },
    {
        id: 'actions',
        header: '',
        meta: {
            class: {
                th: 'text-right',
                td: 'text-right font-medium'
            }
        }
    }
]

const getPerformanceColor = (value: number) => {
    if (value >= 90) return 'green'
    if (value >= 80) return 'blue'
    if (value >= 70) return 'amber'
    return 'red'
}
</script>