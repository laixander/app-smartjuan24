// /composables/useRptKanbanDrag.ts

import { ref } from 'vue'
import type { PropertyAssessment, RptColumnKey } from '~/types/model'

export function useRptKanbanDrag(assessments: Ref<PropertyAssessment[] | undefined>) {
    const draggingItem = ref<PropertyAssessment | null>(null)
    const hoveredColumn = ref<RptColumnKey | null>(null)

    function onDragStart(item: PropertyAssessment) {
        draggingItem.value = item
    }

    function onDragOver(column: RptColumnKey) {
        hoveredColumn.value = column
    }

    function onDragLeave(event: DragEvent) {
        const relatedTarget = event.relatedTarget as Node | null
        const currentTarget = event.currentTarget as Node | null
        if (currentTarget && relatedTarget && currentTarget.contains(relatedTarget)) return
        hoveredColumn.value = null
    }

    async function onDrop(column: RptColumnKey) {
        if (!draggingItem.value || !assessments.value) return
        draggingItem.value.status = column
        hoveredColumn.value = null
        draggingItem.value = null
    }

    return { draggingItem, hoveredColumn, onDragStart, onDragOver, onDragLeave, onDrop }
}
