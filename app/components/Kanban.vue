<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Task, ColumnKey } from '~/types/model'
import { useKanbanDrag } from '~/composables/useKanbanDrag'

const { data: tasks } = await useFetch<Task[]>('/api/task')

const columns: { key: ColumnKey; label: string }[] = [
    { key: 'assessment', label: 'For Assessment' },
    { key: 'processing', label: 'Processing' },
    { key: 'approval', label: "Mayor's Approval" },
    { key: 'done', label: 'Done' }
]

function getTasksByColumn(key: ColumnKey) {
    return computed(() =>
        tasks.value?.filter(t => t.status === key) ?? []
    )
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

function openTask(task: Task) {
    navigateTo(`/business-permits/permit-applications/${task.id}`)
}

// ✅ composable
const {
    hoveredColumn,
    onDragStart,
    onDragOver,
    onDragLeave,
    onDrop
} = useKanbanDrag(tasks)
</script>

<template>
    <div class="flex overflow-x-auto h-[calc(100vh-150px)] pb-2 gap-4">
        <div v-for="column in columns" :key="column.key" class="min-w-[320px] min-h-0 overflow-y-auto flex flex-col gap-2 rounded-lg transition-colors duration-200"
            :class="{
                'bg-neutral-100 dark:bg-neutral-800':
                    hoveredColumn === column.key
            }" @dragover.prevent="onDragOver(column.key)" @dragleave="onDragLeave" @drop="onDrop(column.key)" @scroll="onColumnScroll($event, column.key)">
            <div class="flex justify-between items-center p-3 sticky top-0 z-10"
                :class="{ 'bg-default shadow-md': columnScrollStates[column.key] }">
                <h3 class="font-bold text-sm uppercase">
                    {{ column.label }}
                </h3>
                <UBadge color="neutral" variant="soft">
                        {{ getTasksByColumn(column.key).value.length }}
                    </UBadge>
            </div>
            <div class="space-y-3 flex-1 px-2 p-[1px]">
                <KanbanCard v-for="task in getTasksByColumn(column.key).value" :key="task.id" :task="task"
                    @open="openTask" @dragstart="onDragStart" />
            </div>
        </div>
    </div>
</template>
