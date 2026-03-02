<template>
    <UModal :ui="{  header: 'flex items-center justify-between', body: 'p-0 sm:p-0' }" class="min-w-4xl">
        <template #header="{close}">
            <div class="flex items-center gap-3 w-80 truncate">
                <UAvatar :alt="business.avatar.initials" :color="business.avatar.color" variant="soft" size="xl" />
                <div class="truncate">
                    <div class="flex items-center gap-1.5 text-dimmed text-sm">
                        <div class="font-bold text-default uppercase truncate">{{ business.name }}</div>
                        <UBadge :color="business.status.color" variant="subtle">
                            <UChip standalone inset :color="business.status.color" size="xs" />
                            {{ business.status.label }}
                        </UBadge>
                    </div>
                    <div class="text-xs text-dimmed mt-0.5 truncate">
                        {{ business.bin }} • {{ business.owner }}
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
                                <InfoCardItem icon="i-lucide-user" label="Owner" :value="business.owner" />
                                <InfoCardItem icon="i-lucide-mail" label="Email" :value="business.email" />
                                <InfoCardItem icon="i-lucide-phone" label="Phone" :value="business.phone" />
                            </div>
                        </div>

                        <!-- Business Details -->
                        <div>
                            <h4 class="text-xs font-semibold text-dimmed uppercase tracking-wide mb-3">Business Details</h4>
                            <div class="grid grid-cols-3 gap-x-4 gap-y-4">
                                <InfoCardItem icon="i-lucide-briefcase" label="Industry" :value="business.industry.label" />
                                <InfoCardItem icon="i-lucide-hash" label="DTI/SEC No." :value="business.dtiSecNo" />
                                <InfoCardItem icon="i-lucide-hash" label="TIN" :value="business.tin" />
                                <InfoCardItem icon="i-lucide-map-pin" label="Address" :value="business.address" />
                                <InfoCardItem icon="i-lucide-map-pin" label="Barangay" :value="business.barangay" />
                                <InfoCardItem icon="i-lucide-maximize" label="Floor Area" :value="business.floorArea" />
                                <InfoCardItem icon="i-lucide-users" label="No. of Employees" :value="String(business.employees)" />
                                <InfoCardItem icon="i-lucide-calendar" label="Date Released" :value="`${business.releasedDate} at ${business.releasedTime}`" />
                                <InfoCardItem icon="i-lucide-calendar-x" label="Permit Expiry" :value="business.permitExp" />
                            </div>
                        </div>
                    </div>
                </template>
                <template #permit>
                    <div class="p-4 space-y-4">
                        <PermintHistoryCard
                            v-for="(permit, index) in business.permits"
                            :key="index"
                            :permit-number="permit.number"
                            :issued-date="permit.issuedDate"
                            :amount="permit.amount"
                            :status="permit.status"
                        />
                    </div>
                </template>
                <template #financial>
                    <div class="p-5 space-y-6">
                        <!-- Financial Summary Cards -->
                        <div class="grid grid-cols-3 gap-4">
                            <UCard variant="subtle" class="text-center">
                                <div class="text-xs text-dimmed mb-1">Capital Investment</div>
                                <div class="text-xl font-bold text-primary">{{ business.capitalInvestment }}</div>
                            </UCard>
                            <UCard variant="subtle" class="text-center">
                                <div class="text-xs text-dimmed mb-1">Gross Sales</div>
                                <div class="text-xl font-bold text-primary">{{ business.grossSales }}</div>
                            </UCard>
                            <UCard variant="subtle" class="text-center">
                                <div class="text-xs text-dimmed mb-1">Total Paid (2025)</div>
                                <div class="text-xl font-bold">{{ business.totalPaid }}</div>
                            </UCard>
                        </div>

                        <!-- Payment History -->
                        <div>
                            <h4 class="text-xs font-semibold text-dimmed uppercase tracking-wide mb-3">Payment History</h4>
                            <UTable :data="business.payments" :columns="paymentColumns" class="border border-default rounded-lg" />
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
                    <UButton icon="i-lucide-pencil" color="primary" variant="solid">Edit Business</UButton>
                </div>
            </div>
        </template>
    </UModal>
</template>

<script setup lang="ts">
import type { BusinessRegistry } from '~/types/business-registry'
import { BUSINESS_MODAL_TABS, PAYMENT_COLUMNS } from '~/constants/business-registry'

defineProps<{
    business: BusinessRegistry
}>()

const items = BUSINESS_MODAL_TABS
const paymentColumns = PAYMENT_COLUMNS
</script>