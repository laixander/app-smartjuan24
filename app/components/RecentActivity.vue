<script setup lang="ts">
import { computed } from 'vue'
import type { Task } from '~/types/model'
import { useTimeline } from '~/composables/useTimeline'

const { data: tasks } = await useFetch<Task[]>('/api/task')
const { generateTimeline } = useTimeline()

const activities = computed(() => {
    if (!tasks.value) return []

    // Collect all timeline entries from all tasks
    const allEntries = tasks.value.flatMap(task => generateTimeline(task))

    // Sort by date desc (the date in TimelineEntry is a formatted string, 
    // so we might need to parse it or reuse the logic from generateTimeline)
    // However, the original logic used review.timestamp which is available in generateTimeline logic.
    // Let's refine the sorting by using the actual date if possible, 
    // but the formatDateTime in useTimeline produces 'MMM D, YYYY h:mm A'.
    // A better way would be to sort the entries based on their original timestamp.

    // For now, let's sort by parsing the date string or assuming they are already roughly ordered.
    // Re-calculating timestamp for sorting:
    return allEntries
        .filter(entry => entry.date)
        .sort((a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime())
        .slice(0, 5)
})
</script>

<template>
    <UCard :ui="{ body: 'px-4 py-5', header: 'px-4 py-5 border-none' }" class="h-full">
        <template #header>
            <div class="flex items-center justify-between">
                <h3 class="text-lg font-bold">Recent Activity</h3>
                <UIcon name="i-lucide-activity" class="text-dimmed size-5" />
            </div>
        </template>

        <div class="mt-2">
            <Timeline :items="activities" />
        </div>

        <template #footer>
            <UButton block variant="ghost" color="primary" size="lg" label="View All Applications"
                icon="i-lucide-chevron-right" to="/business-permits/permit-applications" />
        </template>
    </UCard>
</template>
