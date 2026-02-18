<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Task, ColumnKey } from '~/types/model'
import { useKanbanDrag } from '~/composables/useKanbanDrag'

const { data: tasks } = await useFetch<Task[]>('/api/task')

const selectedTask = ref<Task | null>(null)

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
    <div v-if="!selectedTask" class="flex gap-4 overflow-x-auto">
        <div class="flex overflow-x-auto h-[calc(100vh-150px)] pb-2 gap-4">
            <div v-for="column in columns" :key="column.key" class="min-w-[320px] space-y-3 rounded-lg p-2 transition"
                :class="{
                    'bg-neutral-100 dark:bg-neutral-800':
                        hoveredColumn === column.key
                }" @dragover.prevent="onDragOver(column.key)" @dragleave="onDragLeave" @drop="onDrop(column.key)">
                <h3 class="font-bold text-sm uppercase">
                    {{ column.label }}
                </h3>

                <KanbanCard v-for="task in getTasksByColumn(column.key).value" :key="task.id" :task="task"
                    @open="selectedTask = $event" @dragstart="onDragStart" />
            </div>
        </div>
    </div>

    <Details v-else :task="selectedTask" @close="selectedTask = null" />
</template>
