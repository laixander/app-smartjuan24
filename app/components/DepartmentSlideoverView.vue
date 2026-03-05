<template>
    <USlideover v-model:open="isOpen" :ui="{ content: 'max-w-2xl', header: 'flex items-center justify-between' }">
        <template #header="{ close }">
            <div class="flex items-center gap-4">
                <UAvatar
                    :alt="department.name"
                    color="primary"
                    variant="soft"
                    size="xl"
                />
                <div>
                    <div class="flex items-center gap-2">
                        <h1 class="font-semibold">{{ department.name }}</h1>
                        <UBadge :color="department.category.color">{{ department.category.label }}</UBadge>
                    </div>
                    <p class="text-sm text-dimmed">{{ department.id }} • Director {{ department.head }}</p>
                </div>
            </div>
            <UButton
                color="neutral"
                variant="link"
                icon="i-lucide-x"
                aria-label="Close"
                @click="close"
            />
        </template>
        <template #body>
            <div class="flex-1 flex flex-col focus:outline-none overflow-y-auto">
                <div class="space-y-6">

                    <div class="flex gap-2">
                        <UButton block class="flex-1" icon="i-lucide-pencil" color="neutral" variant="outline">Edit Info</UButton>
                        <UButton block class="flex-1" icon="i-lucide-download" color="primary">Export Report</UButton>
                    </div>

                    <!-- KPI Cards -->
                    <div class="grid grid-cols-2 gap-4">
                        <UCard variant="subtle" :ui="{ body: 'p-4 sm:p-4' }">
                            <div class="text-xs font-medium text-dimmed mb-1 truncate">Total Personnel</div>
                            <div class="text-2xl font-bold text-default">{{ department.usersAssigned }}</div>
                            <div class="text-xs text-green-500 mt-2 flex items-center gap-1">
                                <UIcon name="i-lucide-trending-up" /> +2 this month
                            </div>
                        </UCard>
                        <UCard variant="subtle" :ui="{ body: 'p-4 sm:p-4' }">
                            <div class="text-xs font-medium text-dimmed mb-1 truncate">Overall Performance</div>
                            <div class="text-2xl font-bold" :class="`text-${performanceColor}-500`">{{ department.performance }}%</div>
                            <div class="mt-2">
                                <UProgress v-model="department.performance" :color="performanceColor" size="sm" />
                            </div>
                        </UCard>
                        <UCard variant="subtle" :ui="{ body: 'p-4 sm:p-4' }">
                            <div class="text-xs font-medium text-dimmed mb-1 truncate">Average Time</div>
                            <div class="text-2xl font-bold text-default">{{ department.avgTime }}</div>
                            <div class="text-xs text-green-500 mt-2 flex items-center gap-1">
                                <UIcon name="i-lucide-trending-down" /> -0.4 days
                            </div>
                        </UCard>
                        <UCard variant="subtle" :ui="{ body: 'p-4 sm:p-4' }">
                            <div class="text-xs font-medium text-dimmed mb-1 truncate">Status</div>
                            <div class="flex items-center gap-2 mt-2">
                                <UChip standalone inset :color="department.status === 'Active' ? 'green' : 'neutral'" size="md" />
                                <span class="text-base font-semibold">{{ department.status }}</span>
                            </div>
                        </UCard>
                    </div>

                    <div class="space-y-4">
                        <div class="flex justify-between items-center mb-4">
                            <h3 class="text-sm font-semibold">Assigned Personnel ({{ department.usersAssigned }})</h3>
                            <UButton icon="i-lucide-plus" color="neutral" variant="outline" size="sm">Assign</UButton>
                        </div>
                        <div class="divide-y divide-default border border-default rounded-lg">
                            <div v-for="i in 5" :key="i" class="p-3 flex items-center justify-between gap-4">
                                <div class="flex items-center gap-3">
                                    <UAvatar alt="User" color="neutral" variant="soft" size="sm" />
                                    <div>
                                        <p class="font-medium text-sm text-default">Staff Member {{ i }}</p>
                                        <p class="text-xs text-dimmed">Processing Officer</p>
                                    </div>
                                </div>
                                <div class="flex items-center gap-2">
                                    <UBadge color="green" variant="subtle" size="sm">Active</UBadge>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </USlideover>
</template>

<script setup lang="ts">
import type { Department } from '~/types/department'

const props = defineProps<{
    department: Department
}>()

const isOpen = defineModel<boolean>('open', { default: false })

const tabs = [
    { label: 'Personnel', icon: 'i-lucide-users', slot: 'personnel' },
    { label: 'Metrics', icon: 'i-lucide-bar-chart-2', slot: 'metrics' },
    { label: 'Activity', icon: 'i-lucide-activity', slot: 'activity' }
]

const performanceColor = computed(() => {
    const val = props.department.performance
    if (val >= 90) return 'green'
    if (val >= 80) return 'blue'
    if (val >= 70) return 'amber'
    return 'red'
})
</script>
