<script setup lang="ts">
import type { TimelineEntry } from '~/types/timeline'
import type { PropertyAssessment } from '~/types/model'
import { usePropertyAssessmentConfig } from '~/composables/usePropertyAssessmentConfig'

const route = useRoute()
const id = route.params.id as string

const { data: assessment } = await useFetch<PropertyAssessment>(`/api/property-assessment/${id}`)

const { propertyTypeBadge, columnLabels, columnColors, columnDotColors, getAgingConfig } = usePropertyAssessmentConfig()

// Workflow steps derived from RPT statuses
const RPT_STEPS = [
    { key: 'draft', title: 'Draft' },
    { key: 'for-review', title: 'For Review' },
    { key: 'dept-clearance', title: 'Dept. Clearance' },
    { key: 'inspection', title: 'Inspection' },
    { key: 'evaluation', title: 'Evaluation' },
    { key: 'assessment', title: 'Assessment' },
    { key: 'completed', title: 'Completed' }
] as const

const currentStepIndex = computed(() => {
    return RPT_STEPS.findIndex(s => s.key === assessment.value?.status)
})

const dynamicSteps = computed(() => {
    return RPT_STEPS.map((step, index) => {
        const isCurrent = step.key === assessment.value?.status
        const isDone = index < currentStepIndex.value
        return {
            ...step,
            status: isDone ? 'done' : isCurrent ? 'active' : 'pending'
        }
    })
})

const STEP_CONFIG = {
    done: { color: 'green' as const, opacity: '' },
    active: { color: 'primary' as const, opacity: '' },
    pending: { color: 'neutral' as const, opacity: 'opacity-40' }
}

// Tabs
const tabs = [
    { label: 'Property Info', slot: 'property-info', icon: 'i-lucide-home' },
    { label: 'Appraisal', slot: 'appraisal', icon: 'i-lucide-calculator' },
    { label: 'Documents', slot: 'documents', icon: 'i-lucide-folder-open' },
    { label: 'Inspection', slot: 'inspection', icon: 'i-lucide-search' }
]

const dynamicTabs = computed(() => {
    return tabs.map(tab => {
        if (tab.slot === 'documents') {
            const total = assessment.value?.documents?.length || 0
            const verified = assessment.value?.documents?.filter(d => d.status === 'Verified').length || 0
            return {
                ...tab,
                badge: {
                    label: `${verified}/${total}`,
                    color: (verified === total ? 'green' : 'yellow') as any
                }
            }
        }
        return tab
    })
})

// Document stats
const documentStats = computed(() => {
    const stats = { Verified: 0, Pending: 0, Missing: 0 }
    assessment.value?.documents?.forEach(doc => {
        if (doc.status in stats) {
            stats[doc.status as keyof typeof stats]++
        }
    })
    return stats
})

// Currency formatter
const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(val)

// Extract NuxtUI color name from a CSS class like "text-blue-500" → "blue"
const extractColor = (cssClass?: string): TimelineEntry['color'] => {
    if (!cssClass) return 'neutral'
    const match = cssClass.match(/text-([a-z]+)-\d+/)
    return (match?.[1] ?? 'neutral') as TimelineEntry['color']
}

// Map PropertyTimeline → TimelineEntry for the Timeline component
const dynamicTimeline = computed<TimelineEntry[]>(() => {
    return (assessment.value?.timeline ?? []).map(item => ({
        icon: item.icon ?? 'i-lucide-circle',
        color: extractColor(item.color),
        title: item.event,
        actor: item.actor,
        date: item.date
    }))
})

// Activity slideover
const { isOpen, openSlideover } = useWorkflowSlideover()

// Decision modal
type DecisionType = 'approve' | 'return' | 'reject'
const isDecisionModalOpen = ref(false)
const decisionType = ref<DecisionType>('approve')
const remarks = ref('')
const affixSignature = ref(false)

const decisionConfig = computed(() => {
    switch (decisionType.value) {
        case 'approve':
            return {
                title: 'Approve Assessment',
                buttonLabel: 'Approve Assessment',
                color: 'green' as const,
                icon: 'i-lucide-circle-check',
                description: 'Are you sure you want to approve this property assessment?'
            }
        case 'return':
            return {
                title: 'Return Assessment',
                buttonLabel: 'Return Assessment',
                color: 'amber' as const,
                icon: 'i-lucide-undo-2',
                description: 'Please provide a reason for returning this assessment.'
            }
        case 'reject':
            return {
                title: 'Reject Assessment',
                buttonLabel: 'Reject Assessment',
                color: 'red' as const,
                icon: 'i-lucide-circle-x',
                description: 'Are you sure you want to reject this assessment? This action cannot be undone.'
            }
    }
})

const openDecision = (type: DecisionType) => {
    decisionType.value = type
    isDecisionModalOpen.value = true
}

const handleConfirmDecision = () => {
    console.log(`Action: ${decisionType.value}`, { remarks: remarks.value, affixSignature: affixSignature.value })
    isDecisionModalOpen.value = false
    remarks.value = ''
    affixSignature.value = false
}
</script>

<template>
    <div v-if="assessment" class="space-y-6">
        <!-- Header -->
        <div class="flex justify-between items-center">
            <div class="flex items-center gap-4">
                <UButton icon="i-lucide-arrow-left" color="neutral" variant="ghost"
                    to="/real-property/property-assessment" />
                <div class="space-y-1">
                    <div class="flex items-center gap-2">
                        <UIcon name="i-lucide-landmark" class="size-5" />
                        <h3 class="text-xl font-bold">{{ assessment.ownerName }}</h3>
                        <UBadge
                            :color="propertyTypeBadge[assessment.propertyType].color"
                            size="sm"
                            :ui="{ label: 'uppercase font-bold' }"
                        >
                            {{ propertyTypeBadge[assessment.propertyType].label }}
                        </UBadge>
                    </div>
                    <div class="flex items-center gap-4 flex-wrap text-xs text-dimmed">
                        <span class="inline-flex items-center gap-1.5">
                            <UIcon name="i-lucide-hash" />{{ assessment.rptNumber }}
                        </span>
                        <span class="inline-flex items-center gap-1.5">
                            <UIcon name="i-lucide-map-pin" />{{ assessment.location }}
                        </span>
                        <span class="inline-flex items-center gap-1.5">
                            <UIcon name="i-lucide-hard-hat" />{{ assessment.engineer }}
                        </span>
                        <span class="inline-flex items-center gap-1.5" :class="getAgingConfig(assessment.aging).class">
                            <UIcon name="i-lucide-clock" />{{ assessment.aging }} Days
                        </span>
                        <span v-if="assessment.toNumber" class="inline-flex items-center gap-1.5 text-green-500">
                            <UIcon name="i-lucide-receipt" />{{ assessment.toNumber }}
                        </span>
                    </div>
                </div>
            </div>

            <div class="flex items-center gap-2">
                <UButton label="Activity Timeline" color="neutral" variant="outline" @click="openSlideover" />
                <UButton label="Export PDF" color="neutral" variant="outline" />
                <UButton color="amber" icon="i-lucide-undo-2" label="Return" @click="openDecision('return')" />
                <UButton color="red" icon="i-lucide-circle-x" label="Reject" @click="openDecision('reject')" />
                <UButton color="green" icon="i-lucide-circle-check" label="Approve" @click="openDecision('approve')" />
            </div>
        </div>

        <USeparator />

        <!-- Workflow Steps -->
        <div class="flex gap-3 overflow-x-auto">
            <template v-for="(step, index) in dynamicSteps" :key="step.title">
                <UAlert
                    :class="STEP_CONFIG[step.status as keyof typeof STEP_CONFIG].opacity"
                    :color="STEP_CONFIG[step.status as keyof typeof STEP_CONFIG].color"
                    variant="soft"
                    :title="step.title"
                    :ui="{ root: 'items-center', title: 'font-bold', description: 'mt-0 text-xs', icon: 'size-6' }"
                >
                    <template #leading>
                        <UBadge v-if="step.status === 'done'" icon="i-lucide-circle-check-big"
                            :color="STEP_CONFIG[step.status as keyof typeof STEP_CONFIG].color"
                            class="rounded-full"
                            :ui="{ leadingIcon: 'size-4', base: 'p-2' }" />
                        <UBadge v-else
                            :color="STEP_CONFIG[step.status as keyof typeof STEP_CONFIG].color"
                            class="rounded-full"
                            :ui="{ base: 'p-0' }">
                            <div class="flex items-center justify-center w-8 h-8">{{ index + 1 }}</div>
                        </UBadge>
                    </template>
                </UAlert>
                <div v-if="index < RPT_STEPS.length - 1" class="flex items-center gap-2">
                    <UIcon name="i-lucide-chevron-right" class="size-5 text-dimmed" />
                </div>
            </template>
        </div>

        <USeparator />

        <!-- Tabs -->
        <UTabs variant="link" :items="dynamicTabs"
            :ui="{ root: 'gap-4', list: 'lg:gap-6', trailingBadge: 'rounded-full' }" class="w-full">

            <!-- Property Info Tab -->
            <template #property-info>
                <div class="grid grid-cols-2 gap-4">
                    <!-- Owner Info -->
                    <UCard v-if="assessment.ownerInfo">
                        <template #header>
                            <div class="flex items-center gap-2">
                                <UIcon name="i-lucide-user" class="size-4" />
                                <h3 class="font-bold">Owner Information</h3>
                            </div>
                        </template>
                        <dl class="space-y-3 text-sm">
                            <div class="flex justify-between">
                                <dt class="text-dimmed">Full Name</dt>
                                <dd class="font-medium">{{ assessment.ownerInfo.fullName }}</dd>
                            </div>
                            <USeparator />
                            <div class="flex justify-between">
                                <dt class="text-dimmed">Contact Number</dt>
                                <dd class="font-medium">{{ assessment.ownerInfo.contactNumber }}</dd>
                            </div>
                            <USeparator />
                            <div class="flex justify-between">
                                <dt class="text-dimmed">Email</dt>
                                <dd class="font-medium">{{ assessment.ownerInfo.email }}</dd>
                            </div>
                            <USeparator />
                            <div class="flex justify-between">
                                <dt class="text-dimmed">TIN</dt>
                                <dd class="font-mono font-medium">{{ assessment.ownerInfo.tin }}</dd>
                            </div>
                            <USeparator />
                            <div class="flex justify-between gap-4">
                                <dt class="text-dimmed shrink-0">Address</dt>
                                <dd class="font-medium text-right">{{ assessment.ownerInfo.address }}</dd>
                            </div>
                        </dl>
                    </UCard>

                    <!-- Property Details -->
                    <UCard v-if="assessment.propertyDetails">
                        <template #header>
                            <div class="flex items-center gap-2">
                                <UIcon name="i-lucide-land-plot" class="size-4" />
                                <h3 class="font-bold">Property Details</h3>
                            </div>
                        </template>
                        <dl class="space-y-3 text-sm">
                            <div class="flex justify-between">
                                <dt class="text-dimmed">Lot / Block</dt>
                                <dd class="font-medium">{{ assessment.propertyDetails.lotNumber }}, {{ assessment.propertyDetails.blockNumber }}</dd>
                            </div>
                            <USeparator />
                            <div class="flex justify-between">
                                <dt class="text-dimmed">Survey Number</dt>
                                <dd class="font-mono font-medium">{{ assessment.propertyDetails.surveyNumber }}</dd>
                            </div>
                            <USeparator />
                            <div class="flex justify-between">
                                <dt class="text-dimmed">Title Number</dt>
                                <dd class="font-mono font-medium">{{ assessment.propertyDetails.titleNumber }}</dd>
                            </div>
                            <USeparator />
                            <div class="flex justify-between">
                                <dt class="text-dimmed">Land Area</dt>
                                <dd class="font-medium">{{ assessment.propertyDetails.landArea.toLocaleString() }} {{ assessment.propertyDetails.landAreaUnit }}</dd>
                            </div>
                            <USeparator />
                            <div class="flex justify-between">
                                <dt class="text-dimmed">Location</dt>
                                <dd class="font-medium text-right">
                                    {{ assessment.propertyDetails.barangay }},
                                    {{ assessment.propertyDetails.municipality }},
                                    {{ assessment.propertyDetails.province }}
                                </dd>
                            </div>
                            <USeparator />
                            <div class="flex justify-between">
                                <dt class="text-dimmed">Classification</dt>
                                <dd>
                                    <UBadge :color="propertyTypeBadge[assessment.propertyType].color" size="sm" :ui="{ label: 'uppercase font-bold' }">
                                        {{ assessment.propertyDetails.classification }}
                                    </UBadge>
                                </dd>
                            </div>
                        </dl>
                    </UCard>
                </div>
            </template>

            <!-- Appraisal Tab -->
            <template #appraisal>
                <UCard v-if="assessment.appraisal">
                    <template #header>
                        <div class="flex items-center gap-2">
                            <UIcon name="i-lucide-calculator" class="size-4" />
                            <h3 class="font-bold">Appraisal & Assessment</h3>
                            <UBadge color="neutral" variant="subtle" size="sm">
                                Effectivity Year: {{ assessment.appraisal.effectivityYear }}
                            </UBadge>
                        </div>
                    </template>
                    <div class="grid grid-cols-3 gap-4">
                        <UCard variant="subtle">
                            <div class="text-center space-y-1">
                                <p class="text-xs text-dimmed uppercase font-semibold tracking-wide">Market Value</p>
                                <p class="text-2xl font-bold text-highlighted">{{ formatCurrency(assessment.appraisal.marketValue) }}</p>
                            </div>
                        </UCard>
                        <UCard variant="subtle">
                            <div class="text-center space-y-1">
                                <p class="text-xs text-dimmed uppercase font-semibold tracking-wide">Assessment Level</p>
                                <p class="text-2xl font-bold text-highlighted">{{ assessment.appraisal.assessmentLevel }}%</p>
                            </div>
                        </UCard>
                        <UCard variant="subtle">
                            <div class="text-center space-y-1">
                                <p class="text-xs text-dimmed uppercase font-semibold tracking-wide">Assessed Value</p>
                                <p class="text-2xl font-bold text-primary">{{ formatCurrency(assessment.appraisal.assessedValue) }}</p>
                            </div>
                        </UCard>
                        <UCard variant="subtle">
                            <div class="text-center space-y-1">
                                <p class="text-xs text-dimmed uppercase font-semibold tracking-wide">Taxable Value</p>
                                <p class="text-2xl font-bold text-highlighted">{{ formatCurrency(assessment.appraisal.taxableValue) }}</p>
                            </div>
                        </UCard>
                        <UCard variant="subtle" class="col-span-2">
                            <div class="text-center space-y-1">
                                <p class="text-xs text-dimmed uppercase font-semibold tracking-wide">Annual Real Property Tax</p>
                                <p class="text-3xl font-bold text-green-500">{{ formatCurrency(assessment.appraisal.annualTax) }}</p>
                                <p class="text-xs text-dimmed">Basic Tax at 1% of Assessed Value</p>
                            </div>
                        </UCard>
                    </div>
                </UCard>
            </template>

            <!-- Documents Tab -->
            <template #documents>
                <UCard>
                    <template #header>
                        <div class="flex items-center gap-2">
                            <h3 class="font-bold">Documents</h3>
                            <UBadge v-if="documentStats.Verified > 0" icon="i-lucide-circle-check-big"
                                :label="documentStats.Verified.toString()" color="green" variant="soft" size="sm"
                                class="rounded-full" />
                            <UBadge v-if="documentStats.Pending > 0" icon="i-lucide-clock"
                                :label="documentStats.Pending.toString()" color="yellow" variant="soft" size="sm"
                                class="rounded-full" />
                            <UBadge v-if="documentStats.Missing > 0" icon="i-lucide-circle-alert"
                                :label="documentStats.Missing.toString()" color="red" variant="soft" size="sm"
                                class="rounded-full" />
                        </div>
                    </template>
                    <div class="grid grid-cols-2 gap-2.5">
                        <UCard v-for="doc in assessment.documents" :key="doc.title" variant="subtle">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-3">
                                    <UBadge
                                        :color="doc.status === 'Verified' ? 'green' : doc.status === 'Missing' ? 'red' : 'yellow'"
                                        variant="soft"
                                        :icon="doc.icon ?? 'i-lucide-file'"
                                        :ui="{ base: 'p-2.5 rounded-lg' }"
                                    />
                                    <div>
                                        <p class="font-medium text-sm">{{ doc.title }}</p>
                                        <p v-if="doc.verifiedBy" class="text-xs text-dimmed">Verified by {{ doc.verifiedBy }}</p>
                                        <p v-else class="text-xs text-dimmed">Not yet verified</p>
                                    </div>
                                </div>
                                <UBadge
                                    :color="doc.status === 'Verified' ? 'green' : doc.status === 'Missing' ? 'red' : 'yellow'"
                                    variant="subtle"
                                    size="sm"
                                >
                                    {{ doc.status }}
                                </UBadge>
                            </div>
                        </UCard>
                    </div>
                </UCard>
            </template>

            <!-- Inspection Tab -->
            <template #inspection>
                <UCard v-if="assessment.inspection">
                    <template #header>
                        <div class="flex items-center gap-2">
                            <UIcon name="i-lucide-search" class="size-4" />
                            <h3 class="font-bold">Inspection Report</h3>
                        </div>
                    </template>
                    <dl class="space-y-4 text-sm">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <dt class="text-xs text-dimmed uppercase font-semibold tracking-wide mb-1">Inspected By</dt>
                                <dd class="font-medium">{{ assessment.inspection.inspectedBy }}</dd>
                            </div>
                            <div>
                                <dt class="text-xs text-dimmed uppercase font-semibold tracking-wide mb-1">Inspection Date</dt>
                                <dd class="font-medium">{{ assessment.inspection.inspectionDate }}</dd>
                            </div>
                        </div>
                        <USeparator />
                        <div>
                            <dt class="text-xs text-dimmed uppercase font-semibold tracking-wide mb-2">Findings</dt>
                            <UCard variant="subtle" :ui="{ body: 'sm:p-4' }">
                                <p class="text-sm leading-relaxed">{{ assessment.inspection.findings }}</p>
                            </UCard>
                        </div>
                        <div>
                            <dt class="text-xs text-dimmed uppercase font-semibold tracking-wide mb-2">Recommendation</dt>
                            <UCard variant="subtle" :ui="{ body: 'sm:p-4' }">
                                <p class="text-sm leading-relaxed">{{ assessment.inspection.recommendation }}</p>
                            </UCard>
                        </div>
                    </dl>
                </UCard>
            </template>
        </UTabs>
    </div>

    <!-- Activity Slideover -->
    <USlideover v-model:open="isOpen" :title="assessment?.rptNumber" description="Activity Timeline">
        <template #body>
            <Timeline :items="dynamicTimeline" hide-subtitle />
        </template>
    </USlideover>

    <!-- Decision Modal -->
    <UModal v-model:open="isDecisionModalOpen">
        <template #title>
            <div class="flex items-center gap-3">
                <UBadge icon="i-lucide-landmark" :color="decisionConfig.color" variant="soft" size="lg"
                    :ui="{ base: 'p-3 rounded-full' }" />
                <div>
                    <h3 class="text-lg font-bold leading-none">Assessor's Decision</h3>
                    <p class="text-sm font-normal text-dimmed mt-1 leading-none">Submit your final decision for this assessment</p>
                </div>
            </div>
        </template>
        <template #body>
            <div class="space-y-6">
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

                <UAlert :title="decisionConfig.description" :color="decisionConfig.color" variant="subtle" />

                <div class="space-y-4">
                    <UFormField label="Remarks">
                        <UTextarea v-model="remarks" placeholder="Add your remarks here..." class="w-full" :rows="4" autofocus />
                    </UFormField>

                    <UCard variant="subtle" :ui="{ root: 'rounded-lg', body: 'sm:p-4 flex items-center justify-between' }">
                        <div class="flex items-center gap-3">
                            <UIcon name="i-lucide-signature" class="size-5 text-toned" />
                            <span class="text-sm font-bold text-toned">Affix Digital Signature</span>
                        </div>
                        <USwitch v-model="affixSignature" color="neutral" />
                    </UCard>
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
</template>