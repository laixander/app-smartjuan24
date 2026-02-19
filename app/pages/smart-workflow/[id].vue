<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { Task, DeptReview } from '~/types/model'
import { WORKFLOW_TABS, STEP_CONFIG, WORKFLOW_STEPS, TIMELINE_DATA } from '~/constants/workflow'
import { useTaskConfig } from '~/composables/useTaskConfig'
import { ref } from 'vue'

const route = useRoute()
const taskId = route.params.id as string

const { data: task } = await useFetch<Task>(`/api/task/${taskId}`)
const { data: reviews } = await useFetch<DeptReview[]>('/api/business')

const { badgeConfig, statusLabels, getAgingConfig } = useTaskConfig()

// table config
const columns: TableColumn<DeptReview>[] = [
    {
        accessorKey: 'department',
        header: 'Department',
        cell: ({ row }) => {
            const statusIcon = {
                cleared: { icon: 'i-lucide-circle-check-big', color: 'text-green-500' },
                pending: { icon: 'i-lucide-clock', color: 'text-yellow-500' },
                'with issue': { icon: 'i-lucide-circle-alert', color: 'text-red-500' }
            }[row.getValue('status') as string] ?? { icon: '', color: '' }

            return h('div', { class: 'font-medium flex items-center gap-2' }, [
                h(resolveComponent('UIcon'), { name: statusIcon.icon, class: `size-4 ${statusIcon.color}` }),
                row.getValue('department') as string
            ])
        }
    },
    {
        accessorKey: 'officer',
        header: 'Officer'
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const color = {
                cleared: 'green' as const,
                pending: 'yellow' as const,
                'with issue': 'red' as const
            }[row.getValue('status') as string]

            return h(resolveComponent('UBadge'), { class: 'capitalize', variant: 'subtle', color }, () =>
                row.getValue('status')
            )
        }
    },
    {
        accessorKey: 'timestamp',
        header: 'Timestamp',
        cell: ({ row }) => {
            const val = row.getValue('timestamp') as string
            if (!val) return '–'
            const d = new Date(val)
            const date = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            const time = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
            return `${date} ${time}`
        }
    },
    {
        accessorKey: 'remarks',
        header: 'Remarks',
        cell: ({ row }) => {
            const val = row.getValue('remarks') as string
            if (!val) return '–'
            return h(resolveComponent('UTooltip'), { text: val }, {
                default: () => h('span', { class: 'block max-w-full truncate' }, val)
            })
        }
    }
]


const open = ref(false)
const openSlideover = () => {
    open.value = true
}
</script>

<template>
    <div v-if="task" class="space-y-6">
        <div class="flex justify-between items-center">
            <div class="space-y-1">
                <div class="flex items-center gap-2">
                    <UIcon name="i-lucide-building-2" class="size-5" />
                    <h3 class="text-lg font-bold">
                        {{ task.title }}
                    </h3>
                    <UBadge v-if="task" v-bind="badgeConfig[task.type]" size="sm" :ui="{ label: 'uppercase font-bold' }" />
                </div>
                <div class="text-xs text-dimmed">
                    #0000{{ task.id }} • {{ task.industry }} • <span :class="getAgingConfig(task.aging).class">{{ task.aging }} Days {{ statusLabels[task.status] }}</span>
                </div>
            </div>

            <div class="flex items-center gap-2">
                <UButton color="neutral" variant="outline" icon="i-lucide-history" label="Activity Timeline" @click="openSlideover" />
                <UButton color="neutral" variant="outline" icon="i-lucide-download" label="Export to PDF" />
                <USeparator orientation="vertical" class="h-6 px-2" />
                <UButton color="amber" variant="outline" icon="i-lucide-undo-2" label="Return" />
                <UButton color="red" variant="outline" icon="i-lucide-circle-x" label="Reject" />
                <UButton icon="i-lucide-circle-check" label="Approve" />
            </div>
        </div>

        <USeparator />
        <div class="flex gap-4">
            <template v-for="(step, index) in WORKFLOW_STEPS" :key="step.title">
                <UAlert :class="STEP_CONFIG[step.status].opacity" :color="STEP_CONFIG[step.status].color" variant="soft" :title="step.title" :description="step.description"
                    :ui="{ root: 'items-center', title: 'font-bold', description: 'mt-0 text-xs', icon: 'size-6' }">
                    <template #leading>
                        <UBadge v-if="step.status === 'done'" icon="i-lucide-circle-check-big" :color="STEP_CONFIG[step.status].color" class="rounded-full" :ui="{ leadingIcon: 'size-4', base: 'p-2' }" />
                        <UBadge v-else :color="STEP_CONFIG[step.status].color" class="rounded-full" :ui="{ base: 'p-0' }">
                            <div class="flex items-center justify-center w-8 h-8">{{ index + 1 }}</div>
                        </UBadge>
                    </template>
                </UAlert>
                <div v-if="index < WORKFLOW_STEPS.length - 1" class="flex items-center gap-2">
                    <UIcon name="i-lucide-chevron-right" class="size-5 text-dimmed" />
                </div>
            </template>
        </div>
        <USeparator />

        <UTabs :items="WORKFLOW_TABS" :ui="{ root: 'gap-4', trailingBadge: 'rounded-full' }" class="w-full mb-4">
            <template #dept-clearances>
                <UCard :ui="{ body: 'p-0 sm:p-0' }">
                    <template #header>
                        <div class="flex items-center gap-2">
                            <h3 class="font-bold">Department Reviews</h3>
                            <UBadge icon="i-lucide-circle-check-big" label="5" color="green" variant="soft" size="sm" class="rounded-full" />
                            <UBadge icon="i-lucide-clock" label="1" color="yellow" variant="soft" size="sm" class="rounded-full" />
                            <UBadge icon="i-lucide-circle-alert" label="1" color="red" variant="soft" size="sm" class="rounded-full" />
                        </div>
                    </template>
                    <UTable v-if="reviews" :data="reviews" :columns="columns" />
                </UCard>
            </template>
            <template #business-info>
                <UCard :ui="{ body: 'p-0 sm:p-0' }">
                    <template #header>
                        <div class="flex items-center gap-2">
                            <h3 class="font-bold">Owner Information</h3>
                        </div>
                    </template>
                </UCard>
                <UCard :ui="{ body: 'p-0 sm:p-0' }" class="mt-4">
                    <template #header>
                        <div class="flex items-center gap-2">
                            <h3 class="font-bold">Business Details</h3>
                        </div>
                    </template>
                </UCard>
                <UCard :ui="{ body: 'p-0 sm:p-0' }" class="mt-4">
                    <template #header>
                        <div class="flex items-center gap-2">
                            <h3 class="font-bold">Business Activities</h3>
                        </div>
                    </template>
                </UCard>
            </template>
            <template #documents>
                <UCard :ui="{ body: 'p-0 sm:p-0' }">
                    <template #header>
                        <div class="flex items-center gap-2">
                            <h3 class="font-bold">Documents</h3>
                        </div>
                    </template>
                </UCard>
            </template>
            <template #fees-payment>
                <UCard :ui="{ body: 'p-0 sm:p-0' }">
                    <template #header>
                        <div class="flex items-center gap-2">
                            <h3 class="font-bold">Fees & Payment</h3>
                        </div>
                    </template>
                </UCard>
            </template>
        </UTabs>
    </div>

    <USlideover v-model:open="open" :title="task?.title" description="Activity Timeline">
        <template #body>
            <Timeline :items="TIMELINE_DATA" />
        </template>
    </USlideover>
</template>
