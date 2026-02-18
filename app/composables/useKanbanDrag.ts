// /composables/useKanbanDrag.ts

import { ref } from 'vue'
import type { Task, ColumnKey } from '~/types/model'

export function useKanbanDrag(tasks: Ref<Task[] | undefined>) {
    const draggingTask = ref<Task | null>(null)
    const hoveredColumn = ref<ColumnKey | null>(null)

    function onDragStart(task: Task) {
        draggingTask.value = task
    }

    function onDragOver(column: ColumnKey) {
        hoveredColumn.value = column
    }

    function onDragLeave(event: DragEvent) {
        const relatedTarget = event.relatedTarget as Node | null
        const currentTarget = event.currentTarget as Node | null

        if (currentTarget && relatedTarget && currentTarget.contains(relatedTarget)) {
            return
        }

        hoveredColumn.value = null
    }

    async function onDrop(column: ColumnKey) {
        if (!draggingTask.value || !tasks.value) return

        const task = draggingTask.value

        // 🔥 optimistic update
        task.status = column

        hoveredColumn.value = null
        draggingTask.value = null

        // 🔥 optional future API persistence
        // await $fetch('/api/task/update', {
        //   method: 'POST',
        //   body: { id: task.id, status: column }
        // })
    }

    return {
        draggingTask,
        hoveredColumn,
        onDragStart,
        onDragOver,
        onDragLeave,
        onDrop
    }
}
