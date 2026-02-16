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
    { id: 1, title: 'Sari-Sari Store ni Aling Nena', type: 'renewal', status: 'assessment', aging: 2, permit: 'Business Permit', submitted: '02/16/2026' },
    { id: 2, title: 'Jollibee Branch #123', type: 'new', status: 'assessment', aging: 6, permit: 'Building Permit', submitted: '02/15/2026' },
    { id: 3, title: 'SM Savemore Market', type: 'renewal', status: 'processing', aging: 12, permit: 'Mayor\'s Permit', submitted: '02/10/2026' },
    { id: 4, title: 'Mercury Drug Corporation', type: 'new', status: 'approval', aging: 4, permit: 'Business Permit', submitted: '02/14/2026' },
    { id: 5, title: 'Petron Gas Station', type: 'renewal', status: 'done', aging: 8, permit: 'Sanitary Permit', submitted: '02/12/2026' },
    { id: 6, title: '7-Eleven Convenience Store', type: 'new', status: 'done', aging: 15, permit: 'Business Permit', submitted: '02/01/2026' }
])

function getAgingConfig(days: number) {
    if (days < 5) return { color: 'primary' as const, icon: 'i-lucide-calendar', class: 'text-primary-500' }
    if (days < 10) return { color: 'orange' as const, icon: 'i-lucide-circle-alert', class: 'text-orange-500' }
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

function onDrop(column: ColumnKey) {
    if (draggingTask.value) {
        draggingTask.value.status = column
        draggingTask.value = null
    }
}

function getTasksByColumn(column: ColumnKey) {
    return tasks.value.filter(t => t.status === column)
}
</script>

<template>
    <div class="flex overflow-x-auto p-[1px] pb-4 gap-6">
        <div v-for="column in columns" :key="column.key" @dragover.prevent @drop="onDrop(column.key)"
            class="min-w-[320px] min-h-[500px] flex flex-col gap-2">
            <div class="flex justify-between items-center px-3 pb-2">
                <h3 class="font-bold text-sm uppercase tracking-widest">
                    {{ column.label }}
                </h3>
                <UBadge color="neutral" variant="soft">
                    {{ getTasksByColumn(column.key).length }}
                </UBadge>
            </div>
            <div class="space-y-3 flex-1">
                <div v-for="task in getTasksByColumn(column.key)" :key="task.id" draggable="true"
                    @dragstart="onDragStart(task)" class="cursor-move">
                    <UCard class="hover:shadow-lg transition" :ui="{ body: 'sm:p-4 space-y-2 dark:bg-neutral-800/50' }">
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
                        <div
                            class="bg-neutral-50 dark:bg-neutral-800 rounded-md px-3 divide-y divide-neutral-200 dark:divide-neutral-700">
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
