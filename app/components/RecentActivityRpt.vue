<script setup lang="ts">
import { computed } from 'vue'
import type { PropertyAssessment } from '~/types/model'
import type { TimelineEntry } from '~/types/timeline'

const { data: assessments } = await useFetch<PropertyAssessment[]>('/api/property-assessment')

const activities = computed<TimelineEntry[]>(() => {
    if (!assessments.value) return []

    // Collect all timeline entries from all assessments
    const allEntries: TimelineEntry[] = []

    for (const assessment of assessments.value) {
        if (assessment.timeline) {
            for (const entry of assessment.timeline) {
                // parse color mapping if needed, e.g., 'text-primary-500' -> 'primary'
                let parsedColor: TimelineEntry['color'] = 'primary'
                if (entry.color) {
                    const match = entry.color.match(/text-([a-z]+)-/)
                    if (match && match[1]) {
                        parsedColor = match[1] as TimelineEntry['color']
                    }
                }

                allEntries.push({
                    title: entry.event,
                    subtitle: assessment.rptNumber,
                    actor: entry.actor,
                    date: entry.date, // timeline array provides string dates like 'Feb 22, 2025'
                    icon: entry.icon || 'i-lucide-circle',
                    color: parsedColor,
                })
            }
        }
    }

    return allEntries
        .sort((a, b) => {
            const dateA = a.date ? new Date(a.date).getTime() : 0
            const dateB = b.date ? new Date(b.date).getTime() : 0
            return dateB - dateA
        })
        .slice(0, 5)
})
</script>

<template>
    <UCard class="flex flex-col" :ui="{ body: 'flex-1' }">
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
            <UButton block variant="ghost" color="primary" size="lg" label="View All Assessments"
                icon="i-lucide-chevron-right" to="/real-property/property-assessment" />
        </template>
    </UCard>
</template>
