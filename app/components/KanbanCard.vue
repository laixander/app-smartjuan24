<script setup lang="ts">
import type { Task } from '~/types/model'

const props = defineProps<{
    task: Task
}>()

const emit = defineEmits<{
    (e: 'open', task: Task): void
    (e: 'dragstart', task: Task): void
}>()
</script>

<template>
    <UCard draggable="true" class="hover:shadow-lg transition cursor-move" @dragstart="emit('dragstart', task)"
        @click="emit('open', task)">
        <div class="flex justify-between">
            <UBadge :label="task.type" size="sm" />
            <span class="text-xs text-dimmed">#0000{{ task.id }}</span>
        </div>

        <div class="text-sm font-semibold mt-2">
            {{ task.title }}
        </div>
    </UCard>
</template>
