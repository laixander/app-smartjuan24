<template>
    <UModal :ui="{ header: 'flex items-center justify-between', body: 'p-0 sm:p-0' }" class="min-w-4xl">
        <template #header="{ close }">
            <div class="flex items-center gap-3 w-80 truncate">
                <UAvatar :alt="property.avatar.initials" :color="property.avatar.color" variant="soft" size="xl" />
                <div class="truncate">
                    <div class="flex items-center gap-1.5 text-dimmed text-sm">
                        <div class="font-bold text-default uppercase truncate">{{ property.owner }}</div>
                        <UBadge :color="property.status.color" variant="subtle">
                            <UChip standalone inset :color="property.status.color" size="xs" />
                            {{ property.status.label }}
                        </UBadge>
                    </div>
                    <div class="text-xs text-dimmed mt-0.5 truncate">
                        {{ property.tdNo }} • {{ property.pin }}
                    </div>
                </div>
            </div>
            <UButton icon="i-lucide-x" color="neutral" variant="ghost" size="sm" @click="close" />
        </template>
        <template #body>
            <UTabs :items="items" variant="link" class="w-full">
                <template #info>
                    <div class="p-5 space-y-6">
                        <!-- Owner Information -->
                        <div>
                            <h4 class="text-xs font-semibold text-dimmed uppercase tracking-wide mb-3">Owner Information</h4>
                            <div class="grid grid-cols-3 gap-4">
                                <InfoCardItem icon="i-lucide-user" label="Owner" :value="property.owner" />
                                <InfoCardItem icon="i-lucide-mail" label="Email" :value="property.email" />
                                <InfoCardItem icon="i-lucide-phone" label="Phone" :value="property.phone" />
                            </div>
                        </div>

                        <!-- Property Details -->
                        <div>
                            <h4 class="text-xs font-semibold text-dimmed uppercase tracking-wide mb-3">Property Details</h4>
                            <div class="grid grid-cols-3 gap-x-4 gap-y-4">
                                <InfoCardItem icon="i-lucide-home" label="Property Type" :value="property.propertyKind.label" />
                                <InfoCardItem icon="i-lucide-tag" label="Classification" :value="property.classification.label" />
                                <InfoCardItem icon="i-lucide-map-pin" label="Barangay" :value="property.barangay" />
                                <InfoCardItem icon="i-lucide-map-pin" label="Address" :value="property.address" />
                                <InfoCardItem icon="i-lucide-maximize" label="Lot Area" :value="property.lotArea" />
                                <InfoCardItem icon="i-lucide-building" label="Floor Area" :value="property.floorArea" />
                            </div>
                        </div>

                        <!-- Assessment Details -->
                        <div>
                            <h4 class="text-xs font-semibold text-dimmed uppercase tracking-wide mb-3">Assessment Details</h4>
                            <div class="grid grid-cols-3 gap-x-4 gap-y-4">
                                <InfoCardItem icon="i-lucide-trending-up" label="Market Value" :value="property.marketValue" />
                                <InfoCardItem icon="i-lucide-percent" label="Assessment Level" :value="property.assessmentLevel" />
                                <InfoCardItem icon="i-lucide-calculator" label="Assessed Value" :value="property.assessedValue" />
                                <InfoCardItem icon="i-lucide-calendar" label="Date Assessed" :value="property.assessedDate" />
                                <InfoCardItem icon="i-lucide-receipt" label="Tax Due" :value="property.taxDue" />
                                <InfoCardItem icon="i-lucide-check-circle" label="Total Paid" :value="property.totalPaid" />
                            </div>
                        </div>
                    </div>
                </template>
                <template #assessment>
                    <div class="p-4 space-y-3">
                        <div
                            v-for="(item, index) in property.assessments"
                            :key="index"
                            class="flex items-start justify-between p-4 rounded-xl border border-default gap-4"
                        >
                            <div class="flex items-center gap-3">
                                <div
                                    class="size-8 rounded-full flex items-center justify-center shrink-0"
                                    :class="item.status === 'current'
                                        ? 'bg-primary/10 text-primary'
                                        : 'bg-neutral-100 dark:bg-neutral-800 text-dimmed'"
                                >
                                    <UIcon
                                        :name="item.status === 'current' ? 'i-lucide-badge-check' : 'i-lucide-archive'"
                                        class="size-4"
                                    />
                                </div>
                                <div>
                                    <div class="font-semibold text-sm text-default">{{ item.taxDecNo }}</div>
                                    <div class="text-xs text-dimmed mt-0.5">Assessed: {{ item.assessedDate }}</div>
                                </div>
                            </div>
                            <div class="text-right">
                                <div class="font-bold text-sm" :class="item.status === 'current' ? 'text-primary' : 'text-default'">{{ item.assessedValue }}</div>
                                <UBadge
                                    :color="item.status === 'current' ? 'primary' : 'neutral'"
                                    variant="subtle"
                                    size="xs"
                                    class="mt-1"
                                >
                                    {{ item.status === 'current' ? 'Current' : 'Superseded' }}
                                </UBadge>
                            </div>
                        </div>
                        <div v-if="property.assessments.length === 0" class="text-center text-dimmed text-sm py-8">
                            No assessment history available.
                        </div>
                    </div>
                </template>
                <template #tax>
                    <div class="p-5 space-y-6">
                        <!-- Tax Summary Cards -->
                        <div class="grid grid-cols-3 gap-4">
                            <UCard variant="subtle" class="text-center">
                                <div class="text-xs text-dimmed mb-1">Assessed Value</div>
                                <div class="text-xl font-bold text-primary">{{ property.assessedValue }}</div>
                            </UCard>
                            <UCard variant="subtle" class="text-center">
                                <div class="text-xs text-dimmed mb-1">Annual Tax Due</div>
                                <div class="text-xl font-bold text-primary">{{ property.taxDue }}</div>
                            </UCard>
                            <UCard variant="subtle" class="text-center">
                                <div class="text-xs text-dimmed mb-1">Total Paid (2025)</div>
                                <div class="text-xl font-bold">{{ property.totalPaid }}</div>
                            </UCard>
                        </div>

                        <!-- Payment History -->
                        <div>
                            <h4 class="text-xs font-semibold text-dimmed uppercase tracking-wide mb-3">Payment History</h4>
                            <div v-if="property.payments.length > 0">
                                <UTable :data="property.payments" :columns="taxPaymentColumns" class="border border-default rounded-lg" />
                            </div>
                            <div v-else class="text-center text-dimmed text-sm py-8 border border-default rounded-lg">
                                No payment records found.
                            </div>
                        </div>
                    </div>
                </template>
            </UTabs>
        </template>
        <template #footer="{ close }">
            <div class="flex justify-between w-full">
                <UButton icon="i-lucide-printer" color="neutral" variant="outline">Print Profile</UButton>
                <div class="flex gap-2">
                    <UButton color="neutral" variant="ghost" @click="close">Close</UButton>
                    <UButton icon="i-lucide-pencil" color="primary" variant="solid">Edit Property</UButton>
                </div>
            </div>
        </template>
    </UModal>
</template>

<script setup lang="ts">
import type { PropertyRegistry } from '~/types/property-registry'
import { PROPERTY_REGISTRY_MODAL_TABS, TAX_PAYMENT_COLUMNS } from '~/constants/property-registry'

defineProps<{
    property: PropertyRegistry
}>()

const items = PROPERTY_REGISTRY_MODAL_TABS
const taxPaymentColumns = TAX_PAYMENT_COLUMNS
</script>
