<script setup lang="ts">
import type { TableColumn, TabsItem } from '@nuxt/ui'
import type { Task, DeptReview, FeeItem } from '~/types/model'
import { WORKFLOW_TABS, STEP_CONFIG, WORKFLOW_STEPS, BUSINESS_INFO_TABS } from '~/constants/workflow'
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

const feeColumns: TableColumn<FeeItem>[] = [
    {
        accessorKey: 'description',
        header: 'Description',
        footer: 'Total',
        cell: ({ row }) => h('div', { class: 'font-medium' }, row.getValue('description') as string)
    },
    {
        accessorKey: 'amount',
        header: () => h('div', { class: 'text-right' }, 'Amount'),
        footer: ({ table }) => {
            const total = table.getFilteredRowModel().rows.reduce((sum: number, row: any) => sum + Number.parseFloat(row.getValue('amount')), 0)
            const formatted = new Intl.NumberFormat('en-PH', {
                style: 'currency',
                currency: 'PHP'
            }).format(total)
            return h('div', { class: 'text-primary text-right' }, formatted)
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue('amount') as string)
            const formatted = new Intl.NumberFormat('en-PH', {
                style: 'currency',
                currency: 'PHP'
            }).format(amount)
            return h('div', { class: 'text-right font-bold' }, formatted)
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

const documentStats = computed(() => {
    const stats = {
        Verified: 0,
        Pending: 0,
        Missing: 0
    }

    task.value?.documents?.forEach(doc => {
        if (doc.status in stats) {
            stats[doc.status as keyof typeof stats]++
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
        if (tab.slot === 'documents') {
            const total = task.value?.documents?.length || 0
            const verified = documentStats.value.Verified
            return {
                ...tab,
                badge: {
                    ...tab.badge,
                    label: `${verified}/${total}`,
                    color: (verified === total ? 'green' : 'yellow') as any
                }
            }
        }
        if (tab.slot === 'fees-payment') {
            const isPaid = paymentInfo.value?.status === 'Fully Paid' || paymentInfo.value?.status === 'Paid'
            const label = isPaid ? 'Paid' : 'Unpaid'
            return {
                ...tab,
                badge: {
                    ...tab.badge,
                    label,
                    color: (isPaid ? 'green' : 'red') as any
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


const businessInfoTabs = ref<TabsItem[]>(BUSINESS_INFO_TABS as TabsItem[])
const ownerInfo = computed(() => task.value?.ownerInfo)
const businessDetails = computed(() => task.value?.businessDetails)
const businessActivities = computed(() => task.value?.businessActivities || [])
const feeItems = computed(() => task.value?.feeItems || [])
const paymentInfo = computed(() => task.value?.paymentInfo)

// Modal states
const isReturnModalOpen = ref(false)
const isRejectModalOpen = ref(false)
const isApproveModalOpen = ref(false)

const returnReason = ref('')
const rejectReason = ref('')

const handleConfirmReturn = () => {
    console.log('Returning with reason:', returnReason.value)
    isReturnModalOpen.value = false
    returnReason.value = ''
}

const handleConfirmReject = () => {
    console.log('Rejecting with reason:', rejectReason.value)
    isRejectModalOpen.value = false
    rejectReason.value = ''
}

const handleConfirmApprove = () => {
    console.log('Approving application')
    isApproveModalOpen.value = false
}
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
                <!-- action buttons -->
                <UButton color="amber" icon="i-lucide-rotate-ccw" label="Return" @click="isReturnModalOpen = true" />
                <UButton color="red" icon="i-lucide-circle-x" label="Reject" @click="isRejectModalOpen = true" />
                <UButton color="green" icon="i-lucide-circle-check" label="Approve" @click="isApproveModalOpen = true" />
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
                <UTabs :items="businessInfoTabs" variant="link" orientation="vertical"
                    :ui="{ root: 'items-stretch gap-4', indicator: 'start-auto end-0', list: ' gap-2 flex-1 border-s-0 border-e' }"
                    class="w-full">
                    <template #owner-info>
                        <OwnerInfoCard v-if="ownerInfo" :owner="ownerInfo" />
                    </template>
                    <template #business-details>
                        <BusinessDetailsCard v-if="businessDetails" :details="businessDetails" />
                    </template>
                    <template #business-activity>
                        <BusinessActivityCard v-if="businessActivities" :activities="businessActivities" />
                    </template>
                </UTabs>
            </template>
            <template #documents>
                <UCard>
                    <template #header>
                        <div class="flex items-center gap-2">
                            <h3 class="font-bold">Documents</h3>

                            <!-- document stat -->
                            <!-- verified -->
                            <UBadge v-if="documentStats.Verified > 0" icon="i-lucide-circle-check-big"
                                :label="documentStats.Verified.toString()" color="green" variant="soft" size="sm"
                                class="rounded-full" />
                            <!-- pending -->
                            <UBadge v-if="documentStats.Pending > 0" icon="i-lucide-clock"
                                :label="documentStats.Pending.toString()" color="yellow" variant="soft" size="sm"
                                class="rounded-full" />
                            <!-- missing -->
                            <UBadge v-if="documentStats.Missing > 0" icon="i-lucide-circle-alert"
                                :label="documentStats.Missing.toString()" color="red" variant="soft" size="sm"
                                class="rounded-full" />
                        </div>
                    </template>
                    <div class="grid grid-cols-2 gap-2.5">
                        <DocumentCard v-for="doc in task.documents" :key="doc.title" :document="doc" />
                    </div>
                </UCard>
            </template>
            <template #fees-payment>
                <div class="grid grid-cols-5 gap-4 mb-5">
                    <UCard :ui="{ body: 'p-0 sm:p-0' }" class="col-span-3">
                        <template #header>
                            <div class="flex items-center gap-2">
                                <h3 class="font-bold">Fees & Payment</h3>
                            </div>
                        </template>
                        <UTable :data="feeItems" :columns="feeColumns" class="w-full" />
                    </UCard>
                    <div class="col-span-2">
                        <!-- payment status -->
                        <PaymentStatusCard v-if="paymentInfo" :payment="paymentInfo" />
                    </div>
                </div>
            </template>
        </UTabs>
    </div>

    <USlideover v-model:open="isOpen" :title="task?.title" description="Activity Timeline">
        <template #body>
            <Timeline :items="dynamicTimeline" />
        </template>
    </USlideover>

    <!-- Create UModal for each of action buttons -->
    <!-- Return Modal -->
    <UModal v-model:open="isReturnModalOpen" title="Return Application" description="Please provide a reason for returning this application.">
        <template #body>
            <div class="space-y-4">
                <UFormField label="Remarks/Reason" required>
                    <UTextarea v-model="returnReason" placeholder="Enter reason for returning..." class="w-full" autofocus />
                </UFormField>
            </div>
        </template>
        <template #footer>
            <div class="flex justify-end gap-2">
                <UButton color="neutral" variant="ghost" label="Cancel" @click="isReturnModalOpen = false" />
                <UButton color="amber" label="Confirm Return" @click="handleConfirmReturn" />
            </div>
        </template>
    </UModal>

    <!-- Reject Modal -->
    <UModal v-model:open="isRejectModalOpen" title="Reject Application" description="Are you sure you want to reject this application? This action cannot be undone.">
        <template #body>
            <div class="space-y-4">
                <UFormField label="Remarks/Reason" required>
                    <UTextarea v-model="rejectReason" placeholder="Enter reason for rejection..." class="w-full" autofocus />
                </UFormField>
            </div>
        </template>
        <template #footer>
            <div class="flex justify-end gap-2">
                <UButton color="neutral" variant="ghost" label="Cancel" @click="isRejectModalOpen = false" />
                <UButton color="red" label="Reject Application" @click="handleConfirmReject" />
            </div>
        </template>
    </UModal>

    <!-- Approve Modal -->
    <UModal v-model:open="isApproveModalOpen" title="Approve Application" description="Are you sure you want to approve this application?">
        <template #footer>
            <div class="flex justify-end gap-2">
                <UButton color="neutral" variant="ghost" label="Cancel" @click="isApproveModalOpen = false" />
                <UButton color="green" label="Approve Application" @click="handleConfirmApprove" />
            </div>
        </template>
    </UModal>
</template>
