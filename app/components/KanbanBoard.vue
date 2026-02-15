<script setup lang="ts">
import { ref } from 'vue'

type ColumnKey =
    | 'backlog'
    | 'todo'
    | 'in_progress'
    | 'review'
    | 'testing'
    | 'done'

interface Task {
    id: number
    title: string
    description?: string
    status: ColumnKey
}

const columns: { key: ColumnKey; label: string }[] = [
    { key: 'backlog', label: 'Backlog' },
    { key: 'todo', label: 'To Do' },
    { key: 'in_progress', label: 'In Progress' },
    { key: 'review', label: 'Review' },
    { key: 'testing', label: 'Testing' },
    { key: 'done', label: 'Done' }
]

const tasks = ref<Task[]>([
    { id: 1, title: 'Setup project', status: 'backlog' },
    { id: 2, title: 'Design UI', status: 'todo' },
    { id: 3, title: 'Build components', status: 'in_progress' },
    { id: 4, title: 'API integration', status: 'review' },
    { id: 5, title: 'QA Testing', status: 'testing' },
    { id: 6, title: 'Deployment', status: 'done' }
])

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
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4">
        <UCard v-for="column in columns" :key="column.key" class="min-h-[500px] flex flex-col" @dragover.prevent
            @drop="onDrop(column.key)">
            <template #header>
                <div class="flex justify-between items-center">
                    <h3 class="font-bold text-sm uppercase tracking-widest">
                        {{ column.label }}
                    </h3>
                    <UBadge color="neutral" variant="soft">
                        {{ getTasksByColumn(column.key).length }}
                    </UBadge>
                </div>
            </template>

            <div class="space-y-3 flex-1">
                <div v-for="task in getTasksByColumn(column.key)" :key="task.id" draggable="true"
                    @dragstart="onDragStart(task)" class="cursor-move">
                    <UCard class="hover:shadow-lg transition">
                        <div class="font-semibold">
                            {{ task.title }}
                        </div>
                        <div v-if="task.description" class="text-sm text-gray-500">
                            {{ task.description }}
                        </div>
                    </UCard>
                </div>
            </div>
        </UCard>
    </div>
</template>
