<script setup lang="ts">
import type { TableColumn, TabsItem } from '@nuxt/ui'
import type { Task, DeptReview, FeeItem, Document, DocItem } from '~/types/model'
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
        if (step.title === 'Payment') {
            const isPaid = paymentInfo.value?.status === 'Fully Paid' || paymentInfo.value?.status === 'Paid'
            return {
                ...step,
                description: paymentInfo.value?.status ?? 'Unpaid',
                status: isPaid ? 'done' : 'pending'
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

// Decisions Modal
type DecisionType = 'approve' | 'return' | 'reject'
const isDecisionModalOpen = ref(false)
const decisionType = ref<DecisionType>('approve')
const remarks = ref('')
const conditions = ref('')
const affixSignature = ref(false)

const decisionConfig = computed(() => {
    switch (decisionType.value) {
        case 'approve':
            return {
                title: 'Approve Application',
                buttonLabel: 'Approve Permit',
                color: 'green' as const,
                icon: 'i-lucide-circle-check',
                description: 'Are you sure you want to approve this application?'
            }
        case 'return':
            return {
                title: 'Return Application',
                buttonLabel: 'Return Application',
                color: 'amber' as const,
                icon: 'i-lucide-undo-2',
                description: 'Please provide a reason for returning this application.'
            }
        case 'reject':
            return {
                title: 'Reject Application',
                buttonLabel: 'Reject Application',
                color: 'red' as const,
                icon: 'i-lucide-circle-x',
                description: 'Are you sure you want to reject this application? This action cannot be undone.'
            }
    }
})

const openDecision = (type: DecisionType) => {
    decisionType.value = type
    isDecisionModalOpen.value = true
}

const handleConfirmDecision = () => {
    console.log(`Action: ${decisionType.value}`, {
        remarks: remarks.value,
        conditions: conditions.value,
        affixSignature: affixSignature.value
    })
    isDecisionModalOpen.value = false
    // Reset state
    remarks.value = ''
    conditions.value = ''
    affixSignature.value = false
}

const { openSlideover } = useWorkflowSlideover()

// Document Preview
const isPreviewOpen = ref(false)
const selectedDocumentId = ref<string>('')

const mappedDocuments = computed<DocItem[]>(() => {
    if (!task.value?.documents) return []
    return task.value.documents.map((doc, index) => ({
        id: `doc-${index + 1}`,
        name: doc.title,
        status: (doc.status.toLowerCase() === 'missing' ? 'missing' : doc.status.toLowerCase() === 'verified' ? 'verified' : 'pending') as any,
        verifiedBy: doc.verifiedBy || 'System',
        type: 'PDF',
        fileSize: '1.2 MB',
        uploadedBy: task.value?.ownerInfo?.fullName || 'Applicant',
        uploadedDate: task.value?.submitted || '',
        verifiedDate: doc.status === 'Verified' ? new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '',
        pages: 1,
        docNumber: `DOC-${task.value?.id}-00${index + 1}`,
        issuingAuthority: 'Standard Authority',
        validUntil: 'N/A',
        remarks: ''
    }))
})

const selectedDocItem = computed(() => {
    return mappedDocuments.value.find(d => d.id === selectedDocumentId.value) || mappedDocuments.value[0]
})

const handleViewDocument = (doc: Document) => {
    const index = task.value?.documents?.findIndex(d => d.title === doc.title) ?? 0
    const mapped = mappedDocuments.value[index]
    if (mapped) {
        selectedDocumentId.value = mapped.id
    }
    isPreviewOpen.value = true
}

</script>

<template>
    <div v-if="task" class="space-y-6">
        <!-- <div class="flex justify-between items-center">
            <UButton icon="i-lucide-arrow-left" label="Back to Board" variant="ghost" to="/business-permits/permit-applications" />
            <div class="flex gap-2">
                <UButton label="Activity Timeline" color="neutral" variant="outline" @click="openSlideover" />
                <UButton label="Export PDF" color="neutral" variant="outline" />
            </div>
        </div> -->
        <div class="flex justify-between items-center">
            <div class="flex items-center gap-4">
                <UButton icon="i-lucide-arrow-left" color="neutral" variant="ghost"
                    to="/business-permits/permit-applications" />
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
            </div>

            <div class="flex items-center gap-2">
                <UButton label="Activity Timeline" color="neutral" variant="outline" @click="openSlideover" />
                <UButton label="Export PDF" color="neutral" variant="outline" />
                <!-- action buttons -->
                <UButton color="amber" icon="i-lucide-undo-2" label="Return" @click="openDecision('return')" />
                <UButton color="red" icon="i-lucide-circle-x" label="Reject" @click="openDecision('reject')" />
                <UButton color="green" icon="i-lucide-circle-check" label="Approve" @click="openDecision('approve')" />
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
                <div class="flex flex-col gap-4">
                    <OwnerInfoCard v-if="ownerInfo" :owner="ownerInfo" />
                    <BusinessDetailsCard v-if="businessDetails" :details="businessDetails" />
                    <BusinessActivityCard v-if="businessActivities" :activities="businessActivities" />
                </div>
                <!-- <UTabs :items="businessInfoTabs" variant="link" orientation="vertical"
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
</UTabs> -->
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
                        <DocumentCard v-for="doc in task.documents" :key="doc.title" :document="doc"
                            @view="handleViewDocument" />
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
            <Timeline :items="dynamicTimeline" hide-subtitle />
        </template>
    </USlideover>

    <!-- Consolidated Decision Modal -->
    <UModal v-model:open="isDecisionModalOpen">
        <template #title>
            <div class="flex items-center gap-3">
                <UBadge icon="i-lucide-award" :color="decisionConfig.color" variant="soft" size="lg"
                    :ui="{ base: 'p-3 rounded-full' }" />
                <div>
                    <h3 class="text-lg font-bold leading-none">Mayor's Decision</h3>
                    <p class="text-sm font-normal text-dimmed mt-1 leading-none">Submit your final decision for this
                        application</p>
                </div>
            </div>
        </template>
        <template #body>
            <div class="space-y-6">
                <!-- Decision Toggles -->
                <div class="grid grid-cols-3 gap-2 p-1 bg-neutral-100/50 dark:bg-neutral-800/100 rounded-lg">
                    <UButton :color="decisionType === 'approve' ? 'green' : 'neutral'"
                        :variant="decisionType === 'approve' ? 'soft' : 'ghost'" label="Approve"
                        icon="i-lucide-circle-check" block @click="decisionType = 'approve'" />
                    <UButton :color="decisionType === 'return' ? 'amber' : 'neutral'"
                        :variant="decisionType === 'return' ? 'soft' : 'ghost'" label="Return" icon="i-lucide-undo-2"
                        block @click="decisionType = 'return'" />
                    <UButton :color="decisionType === 'reject' ? 'red' : 'neutral'"
                        :variant="decisionType === 'reject' ? 'soft' : 'ghost'" label="Reject" icon="i-lucide-circle-x"
                        block @click="decisionType = 'reject'" />
                </div>

                <!-- decision description -->
                <UAlert :title="decisionConfig.description" :color="decisionConfig.color" variant="subtle" />

                <div class="space-y-4">
                    <UFormField label="Remarks">
                        <UTextarea v-model="remarks" placeholder="Add your remarks here..." class="w-full" :rows="4"
                            autofocus />
                    </UFormField>

                    <!-- <UFormField label="Conditions (optional)">
                        <UTextarea v-model="conditions" placeholder="e.g., Subject to environmental compliance..."
                            class="w-full" :rows="3" />
                    </UFormField> -->

                    <UCard variant="subtle"
                        :ui="{ root: 'rounded-lg', body: 'sm:p-4 flex items-center justify-between' }">
                        <div class="flex items-center gap-3">
                            <UIcon name="i-lucide-signature" class="size-5 text-toned" />
                            <span class="text-sm font-bold text-toned">Affix Digital Signature</span>
                        </div>
                        <USwitch v-model="affixSignature" color="neutral" />
                    </UCard>

                    <!-- <div class="flex gap-2">
                        <UButton icon="i-lucide-at-sign" label="Tag Dept" variant="soft" color="neutral" size="sm" />
                        <UButton icon="i-lucide-message-square-more" label="Request Info" variant="soft" color="neutral"
                            size="sm" />
                        <UButton icon="i-lucide-paperclip" label="Attach" variant="soft" color="neutral" size="sm" />
                    </div> -->
                </div>
            </div>
        </template>
        <template #footer>
            <div class="flex w-full gap-2">
                <UButton color="neutral" variant="ghost" size="lg" label="Cancel"
                    @click="isDecisionModalOpen = false" />
                <UButton block size="lg" :color="decisionConfig.color" :label="decisionConfig.buttonLabel"
                    :icon="decisionConfig.icon" @click="handleConfirmDecision" />
            </div>
        </template>
    </UModal>

    <DocumentPreview v-if="task?.documents" v-model="isPreviewOpen" :document="selectedDocItem"
        :documents="mappedDocuments" />
</template>
