<script setup lang="ts">
import type { Task, DeptReview } from '~/types/model'

const props = defineProps<{
    task: Task
}>()

const emit = defineEmits(['close'])

const { data: reviews } = await useFetch<DeptReview[]>('/api/business')
</script>

<template>
    <div class="space-y-6">
        <UButton icon="i-lucide-arrow-left" label="Back to Board" variant="ghost" @click="emit('close')" />

        <div class="flex justify-between">
            <div>
                <h3 class="text-lg font-bold">
                    {{ task.title }}
                </h3>
                <div class="text-xs text-dimmed">
                    #0000{{ task.id }} • {{ task.industry }}
                </div>
            </div>

            <div class="flex gap-2">
                <UButton color="green" label="Approve" />
                <UButton color="red" label="Reject" />
            </div>
        </div>

        <UCard>
            <template #header>
                <h3 class="font-bold">Department Reviews</h3>
            </template>

            <UTable v-if="reviews" :data="reviews" />
        </UCard>
    </div>
</template>
