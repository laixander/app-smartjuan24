<script setup lang="ts">
import type { PropertyAssessment } from '~/types/model'
import { usePropertyAssessmentConfig } from '~/composables/usePropertyAssessmentConfig'

const props = defineProps<{
    assessment: PropertyAssessment
}>()

const emit = defineEmits<{
    (e: 'open', assessment: PropertyAssessment): void
    (e: 'dragstart', assessment: PropertyAssessment): void
}>()

const { propertyTypeBadge, getAgingConfig } = usePropertyAssessmentConfig()
</script>

<template>
    <UCard draggable="true" class="hover:shadow-lg transition cursor-move"
        @dragstart="emit('dragstart', assessment)"
        @click="emit('open', assessment)"
        :ui="{ body: 'sm:p-4 space-y-2.5 dark:bg-neutral-800/50' }">

        <!-- Header: RPT number + property type badge -->
        <div class="flex justify-between items-center">
            <span class="text-xs font-mono text-dimmed font-medium">{{ assessment.rptNumber }}</span>
            <UBadge
                :label="propertyTypeBadge[assessment.propertyType].label"
                :color="propertyTypeBadge[assessment.propertyType].color"
                size="sm"
                :ui="{ label: 'uppercase font-bold' }" />
        </div>

        <!-- Owner name -->
        <div class="text-sm font-semibold">
            {{ assessment.ownerName }}
        </div>

        <!-- Location + Engineer -->
        <div class="bg-neutral-50 dark:bg-neutral-900/60 rounded-md px-3 divide-y divide-default">
            <div class="flex items-center gap-2 py-2">
                <UIcon name="i-lucide-map-pin" class="size-3.5 text-dimmed shrink-0" />
                <span class="text-xs text-toned truncate">{{ assessment.location }}</span>
            </div>
            <div class="flex items-center gap-2 py-2">
                <UIcon name="i-lucide-user-round" class="size-3.5 text-dimmed shrink-0" />
                <span class="text-xs text-toned truncate">{{ assessment.engineer }}</span>
            </div>
        </div>

        <!-- Aging + optional TO number -->
        <div class="flex justify-between items-center pt-0.5">
            <span :class="getAgingConfig(assessment.aging).class" class="text-xs font-semibold flex items-center gap-1">
                <UIcon :name="getAgingConfig(assessment.aging).icon" />
                {{ assessment.aging }} Days
            </span>
            <UBadge v-if="assessment.toNumber"
                :label="assessment.toNumber"
                color="green"
                variant="subtle"
                size="xs"
                icon="i-lucide-receipt"
                :ui="{ label: 'font-mono text-[10px]' }" />
        </div>
    </UCard>
</template>
