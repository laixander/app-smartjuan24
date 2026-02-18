<script setup lang="ts">
import { ref } from 'vue'

type ColumnKey =
    | 'assessment'
    | 'processing'
    | 'approval'
    | 'done'

interface Task {
    id: number
    title: string
    description?: string
    status: ColumnKey
    type: 'renewal' | 'new'
    aging: number
    permit: string
    submitted: string
    industry: string
}

const columns: { key: ColumnKey; label: string }[] = [
    { key: 'assessment', label: 'For Assessment' },
    { key: 'processing', label: 'Processing' },
    { key: 'approval', label: 'Mayor\'s Approval' },
    { key: 'done', label: 'Done' }
]

const statusLabels: Record<ColumnKey, string> = {
    assessment: 'Pending Assessment',
    processing: 'Processing',
    approval: 'Pending Mayor',
    done: 'Completed'
}

const tasks = ref<Task[]>([
    { id: 1, title: 'Sari-Sari Store ni Aling Nena', type: 'renewal', status: 'assessment', aging: 2, permit: 'Business Permit', submitted: '02/16/2026', industry: 'Retail' },
    { id: 2, title: 'Jollibee Branch #123', type: 'new', status: 'assessment', aging: 6, permit: 'Building Permit', submitted: '02/15/2026', industry: 'Food & Beverage' },
    { id: 3, title: 'SM Savemore Market', type: 'renewal', status: 'processing', aging: 12, permit: 'Mayor\'s Permit', submitted: '02/10/2026', industry: 'Retail' },
    { id: 4, title: 'Mercury Drug Corporation', type: 'new', status: 'approval', aging: 4, permit: 'Business Permit', submitted: '02/14/2026', industry: 'Pharmacy' },
    { id: 5, title: 'Petron Gas Station', type: 'renewal', status: 'done', aging: 8, permit: 'Sanitary Permit', submitted: '02/12/2026', industry: 'Energy' },
    { id: 6, title: '7-Eleven Convenience Store', type: 'new', status: 'done', aging: 15, permit: 'Business Permit', submitted: '02/01/2026', industry: 'Retail' }
])

function getAgingConfig(days: number) {
    if (days < 5) return { color: 'primary' as const, icon: 'i-lucide-calendar', class: 'text-primary-500' }
    if (days < 10) return { color: 'yellow' as const, icon: 'i-lucide-circle-alert', class: 'text-yellow-500' }
    return { color: 'red' as const, icon: 'i-lucide-circle-alert', class: 'text-red-500' }
}

const badgeConfig = {
    renewal: { label: 'Renewal', color: 'orange' },
    new: { label: 'New', color: 'primary' }
} as const

const draggingTask = ref<Task | null>(null)

function onDragStart(task: Task) {
    draggingTask.value = task
}

const hoveredColumn = ref<ColumnKey | null>(null)

function onDragLeave(event: DragEvent) {
    const relatedTarget = event.relatedTarget as Node
    const currentTarget = event.currentTarget as Node
    if (currentTarget && relatedTarget && currentTarget.contains(relatedTarget)) return
    hoveredColumn.value = null
}

function onDrop(column: ColumnKey) {
    hoveredColumn.value = null
    if (draggingTask.value) {
        draggingTask.value.status = column
        draggingTask.value = null
    }
}

function getTasksByColumn(column: ColumnKey) {
    return tasks.value.filter(t => t.status === column)
}

const columnScrollStates = ref<Record<ColumnKey, boolean>>({
    assessment: false,
    processing: false,
    approval: false,
    done: false
})

function onColumnScroll(e: Event, key: ColumnKey) {
    const target = e.target as HTMLElement
    columnScrollStates.value[key] = target.scrollTop > 0
}

const selectedTask = ref<Task | null>(null)

function openTaskDetails(task: Task) {
    selectedTask.value = task
}

const stepConfig = {
    done: { color: 'green', opacity: 'opacity-100' },
    pending: { color: 'amber', opacity: 'opacity-100' },
    waiting: { color: 'neutral', opacity: 'opacity-50' }
} as const

const steps = [
    { title: 'Submission', description: 'Feb 5, 2026', status: 'done' },
    { title: 'Assessment', description: 'Validated', status: 'done' },
    { title: 'Department Reviews', description: '5/7 Cleared', status: 'pending' },
    { title: 'Payment', description: 'Paid', status: 'done' },
    { title: 'Mayor Approval', description: 'Waiting', status: 'waiting' }
] as const

import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'

const UBadge = resolveComponent('UBadge')

type dept_review = {
  department: string
  officer: string
  status: 'cleared' | 'pending' | 'with issue'
  timestamp: string
  remarks: string
}

const data = ref<dept_review[]>([
  {
    department: 'BPLO',
    officer: 'Maria Santos',
    status: 'cleared',
    timestamp: '2026-02-07 09:15',
    remarks: 'All documents complete and verified.'
  },
  {
    department: 'City Treasurer',
    officer: 'Roberto Cruz',
    status: 'cleared',
    timestamp: '2026-02-07 10:00',
    remarks: 'Tax assessment completed. Payment confirmed.'
  },
  {
    department: 'Zoning',
    officer: 'Carlos Reyes',
    status: 'cleared',
    timestamp: '2026-02-07 10:15',
    remarks: 'Location compliant with zoning ordinance.'
  },
  {
    department: 'Bureau of Fire',
    officer: 'Lt. Juan Dela Cruz',
    status: 'cleared',
    timestamp: '2026-02-07 11:00',
    remarks: 'Fire safety inspection passed.'
  },
  {
    department: 'City Health',
    officer: 'Dr. Elena Ramos',
    status: 'pending',
    timestamp: '',
    remarks: ''
  },
  {
    department: 'City Engineering',
    officer: 'Engr. Paulo Tan',
    status: 'cleared',
    timestamp: '2026-02-07 11:30',
    remarks: 'Building permit verified. Structural clearance OK.'
  },
  {
    department: 'Environmental',
    officer: 'Ana Villanueva',
    status: 'with issue',
    timestamp: '2026-02-07 12:00',
    remarks: 'Waste management plan needs revision. See attached memo.'
  }
])

const cols: TableColumn<dept_review>[] = [
  {
    accessorKey: 'department',
    header: 'Department',
    cell: ({ row }) => {
      const statusIcon = {
        cleared: { icon: 'i-lucide-circle-check-big', color: 'text-green-500' },
        pending: { icon: 'i-lucide-clock', color: 'text-yellow-500' },
        'with issue': { icon: 'i-lucide-circle-alert', color: 'text-red-500' }
      }[row.getValue('status') as string] ?? { icon: '', color: '' }

      return h('div', { class: 'font-medium flex items-center gap-2' }, [
        h(resolveComponent('UIcon'), { name: statusIcon.icon, class: `size-4 ${statusIcon.color}` }),
        row.getValue('department') as string
      ])
    }
  },
  {
    accessorKey: 'officer',
    header: 'Officer'
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const color = {
        cleared: 'green' as const,
        pending: 'yellow' as const,
        'with issue': 'red' as const
      }[row.getValue('status') as string]

      return h(UBadge, { class: 'capitalize', variant: 'subtle', color }, () =>
        row.getValue('status')
      )
    }
  },
  {
    accessorKey: 'timestamp',
    header: 'Timestamp',
    cell: ({ row }) => {
      const val = row.getValue('timestamp') as string
      if (!val) return '–'
      const d = new Date(val)
      const date = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      const time = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
      return `${date} ${time}`
    }
  },
  {
    accessorKey: 'remarks',
    header: 'Remarks',
    cell: ({ row }) => {
      const val = row.getValue('remarks') as string
      if (!val) return '–'
      return h(resolveComponent('UTooltip'), { text: val }, {
        default: () => h('span', { class: 'block max-w-[200px] truncate' }, val)
      })
    }
  }
]

const items: any[] = [
    { label: 'Dept. Clearances', icon: 'i-lucide-shield-check', badge: { label: '5/7', color: 'yellow' as const, variant: 'solid' as const }, slot: 'dept-clearances' as const },
    { label: 'Business Info', icon: 'i-lucide-building-2', slot: 'business-info' as const },
    { label: 'Documents', icon: 'i-lucide-paperclip', badge: { label: '6/8', color: 'yellow' as const, variant: 'solid' as const }, slot: 'documents' as const },
    { label: 'Fees & Payment', icon: 'i-lucide-philippine-peso', slot: 'fees-payment' as const },
]
</script>

<template>
    <template v-if="!selectedTask">
        <div class="flex items-center gap-4 mb-6">
            <UInput placeholder="Search..." icon="i-lucide-search" variant="soft" class="w-80" />
            <USelect
                :default-value="'All'"
                :items="['All', 'New', 'Renewal']"
                variant="ghost"
                class="data-[state=open]:bg-elevated w-28"
                :ui="{ trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200' }" 
            />
        </div>
        <div class="flex overflow-x-auto h-[calc(100vh-150px)] pb-2 gap-4">
            <div v-for="column in columns" :key="column.key" @dragover.prevent="hoveredColumn = column.key"
                @dragleave="onDragLeave" @drop="onDrop(column.key)" @scroll="onColumnScroll($event, column.key)"
                class="min-w-[320px] min-h-0 overflow-y-auto flex flex-col gap-2 rounded-lg transition-colors duration-200"
                :class="{ 'bg-neutral-100/50 dark:bg-neutral-800/100': hoveredColumn === column.key }">
                <div class="flex justify-between items-center p-3 sticky top-0 z-10"
                    :class="{ 'bg-default shadow-md': columnScrollStates[column.key] }">
                    <h3 class="font-bold text-sm uppercase tracking-widest">
                        {{ column.label }}
                    </h3>
                    <UBadge color="neutral" variant="soft">
                        {{ getTasksByColumn(column.key).length }}
                    </UBadge>
                </div>
                <div class="space-y-3 flex-1 px-2 p-[1px]">
                    <div v-for="task in getTasksByColumn(column.key)" :key="task.id" draggable="true"
                        @dragstart="onDragStart(task)" @dragend="hoveredColumn = null" class="cursor-move">
                        <UCard @click="openTaskDetails(task)" class="hover:shadow-lg transition"
                            :ui="{ body: 'sm:p-4 space-y-2 dark:bg-neutral-800/50' }">
                            <div class="flex justify-between items-center">
                                <UBadge v-bind="badgeConfig[task.type]" size="sm" :ui="{ label: 'uppercase font-bold' }" />
                                <span class="text-xs text-dimmed">#0000{{ task.id }}</span>
                            </div>
                            <div class="text-sm font-semibold flex items-center gap-2 pb-1">
                                <UIcon name="i-lucide-building-2" class="size-5" />
                                {{ task.title }}
                            </div>
                            <div v-if="task.description" class="text-sm text-gray-500">
                                {{ task.description }}
                            </div>
                            <div class="bg-neutral-50 dark:bg-neutral-900/60 rounded-md px-3 divide-y divide-default">
                                <div class="flex justify-between items-center py-3">
                                    <div class="flex items-center gap-2">
                                        <UIcon name="i-lucide-file-text" />
                                        <span class="text-xs text-toned">Permit</span>
                                    </div>
                                    <div class="text-xs text-toned">
                                        {{ task.permit }}
                                    </div>
                                </div>
                                <div class="flex justify-between items-center py-3">
                                    <div class="flex items-center gap-2">
                                        <UIcon name="i-lucide-clock" />
                                        <span class="text-xs text-toned">Submitted</span>
                                    </div>
                                    <div class="text-xs text-toned">
                                        {{ task.submitted }}
                                    </div>
                                </div>
                            </div>
                            <div class="flex justify-between items-center pt-2">
                                <span class="text-xs text-toned flex items-center gap-2">
                                    <UChip standalone inset :color="getAgingConfig(task.aging).color" />
                                    {{ statusLabels[task.status] }}
                                </span>
                                <span :class="getAgingConfig(task.aging).class"
                                    class="text-xs font-semibold flex items-center gap-1">
                                    <UIcon :name="getAgingConfig(task.aging).icon" />
                                    {{ task.aging }} Days
                                </span>
                            </div>
                        </UCard>
                    </div>
                </div>
            </div>
        </div>
    </template>

    <!-- Details -->
    <div v-if="selectedTask" class="space-y-6">
        <div class="space-y-4">
            <UButton icon="i-lucide-arrow-left" label="Back to Board" variant="ghost" @click="selectedTask = null" />
            <div class="flex justify-between items-center">
                <div class="space-y-1">
                    <div class="flex items-center gap-2">
                        <UIcon name="i-lucide-building-2" class="size-5" />
                        <h3 class="text-lg font-bold">{{ selectedTask?.title }}</h3>
                        <UBadge v-if="selectedTask" v-bind="badgeConfig[selectedTask.type]" size="sm"
                            :ui="{ label: 'uppercase font-bold' }" />
                    </div>
                    <div class="flex items-center gap-3">
                        <span class="text-xs text-dimmed">#0000{{ selectedTask?.id }}</span>
                        <span class="text-xs text-dimmed flex items-center gap-1">
                            <UIcon name="i-lucide-briefcase" />{{ selectedTask?.industry }}
                        </span>
                        <span v-if="selectedTask" :class="getAgingConfig(selectedTask?.aging).class"
                            class="text-xs flex items-center gap-1">
                            <UIcon :name="getAgingConfig(selectedTask?.aging).icon" />
                            {{ selectedTask?.aging }} Days {{ statusLabels[selectedTask?.status] }}
                        </span>
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <UButton color="neutral" variant="outline" icon="i-lucide-download" label="Export to PDF" />
                    <UButton color="amber" variant="subtle" icon="i-lucide-undo-2" label="Return" />
                    <UButton color="red" variant="subtle" icon="i-lucide-circle-x" label="Reject" />
                    <UButton color="green" icon="i-lucide-circle-check" label="Approve" />
                </div>
            </div>
        </div>
        <USeparator />
        <div class="flex gap-4">
            <template v-for="(step, index) in steps" :key="step.title">
                <UAlert :class="stepConfig[step.status].opacity" :color="stepConfig[step.status].color" variant="soft" :title="step.title" :description="step.description"
                    :ui="{ root: 'items-center', title: 'font-bold', description: 'mt-0 text-xs', icon: 'size-6' }">
                    <template #leading>
                        <UBadge v-if="step.status === 'done'" icon="i-lucide-circle-check-big" :color="stepConfig[step.status].color" class="rounded-full" :ui="{ leadingIcon: 'size-4', base: 'p-2' }" />
                        <UBadge v-else :color="stepConfig[step.status].color" class="rounded-full" :ui="{ base: 'p-0' }">
                            <div class="flex items-center justify-center w-8 h-8">{{ index + 1 }}</div>
                        </UBadge>
                    </template>
                </UAlert>
                <div v-if="index < steps.length - 1" class="flex items-center gap-2">
                    <UIcon name="i-lucide-chevron-right" class="size-5 text-dimmed" />
                </div>
            </template>
        </div>
        <div class="flex gap-4">
            <div class="flex-1 min-w-0">
                <UTabs :items="items" :ui="{ trailingBadge: 'rounded-full' }" class="w-full mb-4">
                    <template #dept-clearances>
                        <UCard :ui="{ body: 'p-0 sm:p-0' }">
                            <template #header>
                                <div class="flex items-center gap-2">
                                    <h3 class="font-bold">Department Reviews</h3>
                                    <UBadge icon="i-lucide-circle-check-big" label="5" color="green" variant="soft" size="sm" class="rounded-full" />
                                    <UBadge icon="i-lucide-clock" label="1" color="yellow" variant="soft" size="sm" class="rounded-full" />
                                    <UBadge icon="i-lucide-circle-alert" label="1" color="red" variant="soft" size="sm" class="rounded-full" />
                                </div>
                            </template>
                            <UTable :data="data" :columns="cols" class="flex-1" />
                        </UCard>
                    </template>
                    <template #business-info>
                        <UCard :ui="{ root: 'divide-y-0', header: 'sm:px-4', body: 'p-0 sm:p-0' }">
                            <template #header>
                                <div class="flex items-center gap-2">
                                    <h3 class="font-bold">Business Information</h3>
                                </div>
                            </template>
                        </UCard>
                    </template>
                    <template #documents>
                        <UCard :ui="{ root: 'divide-y-0', header: 'sm:px-4', body: 'p-0 sm:p-0' }">
                            <template #header>
                                <div class="flex items-center gap-2">
                                    <h3 class="font-bold">Documents</h3>
                                </div>
                            </template>
                        </UCard>
                    </template>
                    <template #fees-payment>
                        <UCard :ui="{ root: 'divide-y-0', header: 'sm:px-4', body: 'p-0 sm:p-0' }">
                            <template #header>
                                <div class="flex items-center gap-2">
                                    <h3 class="font-bold">Fees & Payment</h3>
                                </div>
                            </template>
                        </UCard>
                    </template>
                </UTabs>
            </div>
            <div class="w-[320px] flex-shrink-0 space-y-5">
                <UCard>
                    <h3 class="font-bold">Recent Activity</h3>
                </UCard>
            </div>
        </div>
    </div>
</template>
