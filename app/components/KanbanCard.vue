<script setup lang="ts">
import type { Task } from '~/types/model'
import { useTaskConfig } from '~/composables/useTaskConfig'

const props = defineProps<{
    task: Task
}>()

const emit = defineEmits<{
    (e: 'open', task: Task): void
    (e: 'dragstart', task: Task): void
}>()

const { badgeConfig, statusLabels, getAgingConfig } = useTaskConfig()
</script>

<template>
    <UCard draggable="true" class="hover:shadow-lg transition cursor-move" @dragstart="emit('dragstart', task)"
        @click="emit('open', task)" :ui="{ body: 'sm:p-4 space-y-2 dark:bg-neutral-800/50' }">
        <div class="flex justify-between">
            <UBadge :label="badgeConfig[task.type].label" :color="badgeConfig[task.type].color" size="sm" :ui="{ label: 'uppercase font-bold' }" />
            <span class="text-xs text-dimmed">#0000{{ task.id }}</span>
        </div>

        <div class="text-sm font-semibold flex items-center gap-2 pb-1">
            <UIcon name="i-lucide-building-2" class="size-5" />
            {{ task.title }}
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
</template>
