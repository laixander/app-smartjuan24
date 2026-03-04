<script setup lang="ts">
import { computed, ref } from 'vue'
import type { PropertyAssessment, RptColumnKey } from '~/types/model'
import { usePropertyAssessmentConfig } from '~/composables/usePropertyAssessmentConfig'
import { useRptKanbanDrag } from '~/composables/useRptKanbanDrag'

const { data: assessments } = await useFetch<PropertyAssessment[]>('/api/property-assessment')

const { columnLabels, columnColors, columnDotColors } = usePropertyAssessmentConfig()

const columns: { key: RptColumnKey; label: string }[] = [
    { key: 'draft', label: 'Draft' },
    { key: 'for-review', label: 'For Review' },
    { key: 'dept-clearance', label: 'Dept. Clearance' },
    { key: 'inspection', label: 'Inspection' },
    { key: 'evaluation', label: 'Evaluation' },
    { key: 'assessment', label: 'Assessment' },
    { key: 'completed', label: 'Completed' }
]

function getByColumn(key: RptColumnKey) {
    return computed(() =>
        assessments.value?.filter(a => a.status === key) ?? []
    )
}

const columnScrollStates = ref<Record<RptColumnKey, boolean>>({
    'draft': false,
    'for-review': false,
    'dept-clearance': false,
    'inspection': false,
    'evaluation': false,
    'assessment': false,
    'completed': false
})

function onColumnScroll(e: Event, key: RptColumnKey) {
    const target = e.target as HTMLElement
    columnScrollStates.value[key] = target.scrollTop > 0
}

function openAssessment(assessment: PropertyAssessment) {
    navigateTo(`/real-property/property-assessment/${assessment.id}`)
}

const {
    hoveredColumn,
    onDragStart,
    onDragOver,
    onDragLeave,
    onDrop
} = useRptKanbanDrag(assessments)

const mouseHoveredColumn = ref<RptColumnKey | null>(null)
</script>

<template>
    <div class="flex overflow-x-auto h-[calc(100vh-230px)] pb-2 gap-4">
        <div
            v-for="column in columns"
            :key="column.key"
            class="min-w-[280px] min-h-0 overflow-y-auto flex flex-col gap-2 rounded-lg transition-colors duration-200"
            :class="{
                'bg-neutral-100 dark:bg-neutral-800': hoveredColumn === column.key,
                'bg-neutral-50 dark:bg-neutral-800/40': mouseHoveredColumn === column.key && hoveredColumn !== column.key
            }"
            @mouseenter="mouseHoveredColumn = column.key"
            @mouseleave="mouseHoveredColumn = null"
            @dragover.prevent="onDragOver(column.key)"
            @dragleave="onDragLeave"
            @drop="onDrop(column.key)"
            @scroll="onColumnScroll($event, column.key)">

            <!-- Column header -->
            <div
                class="flex justify-between items-center p-3 sticky top-0 z-10"
                :class="{ 'bg-default shadow-md': columnScrollStates[column.key] }">
                <div class="flex items-center gap-2">
                    <span class="size-2 rounded-full" :class="columnDotColors[column.key]" />
                    <h3 class="font-bold text-sm">{{ column.label }}</h3>
                </div>
                <UBadge color="neutral" variant="soft">
                    {{ getByColumn(column.key).value.length }}
                </UBadge>
            </div>

            <!-- Cards -->
            <div class="space-y-3 flex-1 px-2 p-[1px]">
                <KanbanRptCard
                    v-for="assessment in getByColumn(column.key).value"
                    :key="assessment.id"
                    :assessment="assessment"
                    @open="openAssessment"
                    @dragstart="onDragStart" />
            </div>
        </div>
    </div>
</template>
