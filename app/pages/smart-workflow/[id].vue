<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { Task, DeptReview } from '~/types/model'
import { WORKFLOW_TABS, STEP_CONFIG, WORKFLOW_STEPS } from '~/constants/workflow'
import { useTimeline } from '~/composables/useTimeline'
import { useTaskConfig } from '~/composables/useTaskConfig'
import { ref, computed } from 'vue'

const route = useRoute()
const taskId = route.params.id as string

const { data: task } = await useFetch<Task>(`/api/task/${taskId}`)

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


const { isOpen } = useWorkflowSlideover()

const reviewStats = computed(() => {
    const stats = {
        cleared: 0,
        pending: 0,
        'with issue': 0
    }

    task.value?.reviews?.forEach(review => {
        if (review.status in stats) {
            stats[review.status as keyof typeof stats]++
        }
    })

    return stats
})

const dynamicTabs = computed(() => {
    return WORKFLOW_TABS.map(tab => {
        if (tab.slot === 'dept-clearances') {
            const total = task.value?.reviews?.length || 0
            const cleared = reviewStats.value.cleared
            return {
                ...tab,
                badge: {
                    ...tab.badge,
                    label: `${cleared}/${total}`,
                    color: (cleared === total ? 'green' : 'yellow') as any
                }
            }
        }
        return tab
    })
})

const dynamicSteps = computed(() => {
    return WORKFLOW_STEPS.map(step => {
        if (step.title === 'Department Reviews') {
            const total = task.value?.reviews?.length || 0
            const cleared = reviewStats.value.cleared
            return {
                ...step,
                description: `${cleared}/${total} Cleared`,
                status: cleared === total ? 'done' : 'pending'
            }
        }
        return step
    })
})

const { generateTimeline } = useTimeline()
const dynamicTimeline = computed(() => {
    if (!task.value) return []
    return generateTimeline(task.value)
})

type businessActivity = {
    lineOfBusiness: string
    units: number
    capitalization: number
}


const data = ref<businessActivity[]>([
    {
        lineOfBusiness: 'Hotel Operations',
        units: 1,
        capitalization: 180000000.00
    },
    {
        lineOfBusiness: 'Restaurant / Food Service',
        units: 3,
        capitalization: 25000000.00
    },
    {
        lineOfBusiness: 'Convention / Events Center',
        units: 1,
        capitalization: 45000000.00
    },
    {
        lineOfBusiness: 'Spa & Wellness',
        units: 1,
        capitalization: 12000000.00
    }
])

const businessActivityColumns: TableColumn<businessActivity>[] = [
    {
        accessorKey: 'lineOfBusiness',
        header: 'Line of Business',
        footer: 'Total'
    },
    {
        accessorKey: 'units',
        header: 'Units',
        footer: ({ table }) => {
            const total = table.getFilteredRowModel().rows.reduce((sum, row) => sum + Number.parseFloat(row.getValue('units')), 0)
            return total
        }
    },
    {
        accessorKey: 'capitalization',
        header: 'Capitalization',
        footer: ({ table }) => {
            const total = table.getFilteredRowModel().rows.reduce((sum, row) => sum + Number.parseFloat(row.getValue('capitalization')), 0)
            const formatted = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'PHP'
            }).format(total)
            return h('span', { class: 'text-primary' }, formatted)
        },
        cell: ({ row }) => {
            const amount = Number.parseFloat(row.getValue('capitalization'))
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'PHP'
            }).format(amount)
        }
    }
]
</script>

<template>
    <div v-if="task" class="space-y-6">
        <div class="flex justify-between items-center">
            <div class="space-y-1">
                <div class="flex items-center gap-2">
                    <UIcon name="i-lucide-building-2" class="size-5" />
                    <h3 class="text-xl font-bold">
                        {{ task.title }}
                    </h3>
                    <UBadge v-if="task" v-bind="badgeConfig[task.type]" size="sm"
                        :ui="{ label: 'uppercase font-bold' }" />
                </div>

                <!-- <div class="text-xs text-dimmed">
                    #0000{{ task.id }} • {{ task.industry }} • <span :class="getAgingConfig(task.aging).class">{{
                        task.aging }} Days {{ statusLabels[task.status] }}</span>
                </div> -->

                <div class="flex items-center gap-4 flex-wrap text-xs text-dimmed">
                    <span class="inline-flex items-center gap-1.5">
                        <UIcon name="i-lucide-tag" />{{ task.permit }}
                    </span>
                    <span class="inline-flex items-center gap-1.5">
                        <UIcon name="i-lucide-hash" />BP-2026-000{{ task.id }}
                    </span>
                    <span class="inline-flex items-center gap-1.5">
                        <UIcon name="i-lucide-briefcase" />{{ task.industry }}
                    </span>
                    <span class="inline-flex items-center gap-1.5" :class="getAgingConfig(task.aging).class">
                        <UIcon name="i-lucide-clock" />{{ task.aging }} Days {{ statusLabels[task.status] }}
                    </span>
                </div>
            </div>

            <div class="flex items-center gap-2">
                <!-- <UButton icon="i-lucide-list-todo" color="neutral" variant="subtle" @click="openSlideover" />
                <UButton icon="i-lucide-download" color="neutral" variant="subtle" /> -->
                <!-- <UButton color="neutral" icon="i-lucide-list-check" variant="subtle" label="Activity Timeline"
                    @click="openSlideover" />
                <UButton color="neutral" icon="i-lucide-file-input" variant="subtle" label="Export to PDF" />
                <USeparator orientation="vertical" class="h-6 px-2" /> -->
                <UButton color="amber" icon="i-lucide-rotate-ccw" label="Return" />
                <UButton color="red" icon="i-lucide-circle-x" label="Reject" />
                <UButton color="green" icon="i-lucide-circle-check" label="Approve" />
            </div>
        </div>

        <USeparator />
        <div class="flex gap-4">
            <template v-for="(step, index) in dynamicSteps" :key="step.title">
                <UAlert :class="(STEP_CONFIG as any)[step.status].opacity"
                    :color="(STEP_CONFIG as any)[step.status].color" variant="soft" :title="step.title"
                    :description="step.description"
                    :ui="{ root: 'items-center', title: 'font-bold', description: 'mt-0 text-xs', icon: 'size-6' }">
                    <template #leading>
                        <UBadge v-if="step.status === 'done'" icon="i-lucide-circle-check-big"
                            :color="(STEP_CONFIG as any)[step.status].color" class="rounded-full"
                            :ui="{ leadingIcon: 'size-4', base: 'p-2' }" />
                        <UBadge v-else :color="(STEP_CONFIG as any)[step.status].color" class="rounded-full"
                            :ui="{ base: 'p-0' }">
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

        <UTabs variant="link" :items="dynamicTabs"
            :ui="{ root: 'gap-4', list: 'lg:gap-6', trailingBadge: 'rounded-full' }" class="w-full">
            <template #dept-clearances>
                <UCard :ui="{ body: 'p-0 sm:p-0' }">
                    <template #header>
                        <div class="flex items-center gap-2">
                            <h3 class="font-bold">Department Reviews</h3>

                            <!-- review stat -->
                            <!-- cleared -->
                            <UBadge v-if="reviewStats.cleared > 0" icon="i-lucide-circle-check-big"
                                :label="reviewStats.cleared.toString()" color="green" variant="soft" size="sm"
                                class="rounded-full" />
                            <!-- pending -->
                            <UBadge v-if="reviewStats.pending > 0" icon="i-lucide-clock"
                                :label="reviewStats.pending.toString()" color="yellow" variant="soft" size="sm"
                                class="rounded-full" />
                            <!-- with issue -->
                            <UBadge v-if="reviewStats['with issue'] > 0" icon="i-lucide-circle-alert"
                                :label="reviewStats['with issue'].toString()" color="red" variant="soft" size="sm"
                                class="rounded-full" />
                        </div>
                    </template>
                    <UTable v-if="task?.reviews" :data="task.reviews" :columns="columns" />
                </UCard>
            </template>
            <template #business-info>
                <UCard>
                    <template #header>
                        <div class="flex items-center gap-2">
                            <h3 class="font-bold">Owner Information</h3>
                        </div>
                    </template>
                    <div class="grid grid-cols-3 gap-5">
                        <div class="col-span-2 grid grid-cols-2 gap-x-5 gap-y-3">
                            <div class="">
                                <div class="text-xs text-dimmed">Full Name</div>
                                <div class="text-sm">Angela Santos</div>
                            </div>
                            <div class="">
                                <div class="text-xs text-dimmed">Contact Number</div>
                                <div class="text-sm">+63 917 812 3456</div>
                            </div>
                            <div class="">
                                <div class="text-xs text-dimmed">Email Address</div>
                                <div class="text-sm">angela@email.com</div>
                            </div>
                            <div class="">
                                <div class="text-xs text-dimmed">Nationality</div>
                                <div class="text-sm">Filipino</div>
                            </div>
                            <div class="col-span-2">
                                <div class="text-xs text-dimmed">Address</div>
                                <div class="text-sm">Unit 2401, One Ayala Tower, Makati Avenue cor. Edsa, Makati City
                                    1227</div>
                            </div>
                        </div>
                        <div
                            class="rounded-lg overflow-hidden border border-default h-[160px] bg-elevated flex items-center justify-center relative">
                            <img src="https://images.unsplash.com/photo-1723002093542-807b783ccf07?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5pbGElMjBjaXR5JTIwbWFwJTIwc2F0ZWxsaXRlJTIwdmlld3xlbnwxfHx8fDE3NzA2MjAwODF8MA&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=1080&amp;utm_source=figma&amp;utm_medium=referral"
                                alt="Map" class="w-full h-full object-cover">
                            <div class="absolute inset-0 flex items-center justify-center">
                                <div
                                    class="bg-elevated/90 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-sm flex items-center gap-1.5">
                                    <UIcon name="i-lucide-map-pin" class="size-5 text-primary" /><span
                                        class="text-xs font-semibold">Makati City</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </UCard>
                <UCard class="mt-4">
                    <template #header>
                        <div class="flex items-center gap-2">
                            <h3 class="font-bold">Business Details</h3>
                        </div>
                    </template>
                    <div class="grid grid-cols-3 gap-x-5 gap-y-3">
                        <div class="">
                            <div class="text-xs text-dimmed">Application Type
                            </div>
                            <div class="text-sm text-primary">Business Permit Renewal
                            </div>
                        </div>
                        <div class="">
                            <div class="text-xs text-dimmed">Business Name</div>
                            <div class="text-sm">Metro Pharma Inc.</div>
                        </div>
                        <div class="">
                            <div class="text-xs text-dimmed">Ownership Type</div>
                            <div class="text-sm">Corporation</div>
                        </div>
                        <div class="">
                            <div class="text-xs text-dimmed">DTI/SEC Number</div>
                            <div class="text-sm">SEC-2024-001234567</div>
                        </div>
                        <div class="">
                            <div class="text-xs text-dimmed">DTI/SEC Date</div>
                            <div class="text-sm">March 15, 2024</div>
                        </div>
                        <div class="">
                            <div class="text-xs text-dimmed">TIN</div>
                            <div class="text-sm">123-456-789-000</div>
                        </div>
                        <div class="">
                            <div class="text-xs text-dimmed">Business Area</div>
                            <div class="text-sm">2,500 sqm</div>
                        </div>
                        <div class="">
                            <div class="text-xs text-dimmed">No. of Employees
                            </div>
                            <div class="text-sm">245</div>
                        </div>
                        <div class="">
                            <div class="text-xs text-dimmed">Ownership of Space
                            </div>
                            <div class="text-sm">Rented</div>
                        </div>
                        <div class="col-span-2">
                            <div class="text-xs text-dimmed">Business Address
                            </div>
                            <div class="text-sm">123 Ayala Avenue, Makati
                                City 1227
                            </div>
                        </div>
                        <div class="">
                            <div class="text-xs text-dimmed">Gov't Incentive
                            </div>
                            <div class="text-sm text-primary">Yes — BOI Registered</div>
                        </div>
                    </div>
                </UCard>
                <UCard :ui="{ body: 'p-0 sm:p-0' }" class="mt-4">
                    <template #header>
                        <div class="flex items-center gap-2">
                            <h3 class="font-bold">Business Activities</h3>
                        </div>
                    </template>
                    <UTable :data="data" :columns="businessActivityColumns" class="flex-1" />
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

    <USlideover v-model:open="isOpen" :title="task?.title" description="Activity Timeline">
        <template #body>
            <Timeline :items="dynamicTimeline" />
        </template>
    </USlideover>
</template>
