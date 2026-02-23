<script setup lang="ts">
import type { BusinessDetails } from '~/types/model'

defineProps<{
    details: BusinessDetails
}>()
</script>

<template>
    <UCard>
        <template #header>
            <div class="flex items-center gap-2">
                <h3 class="font-bold">Business Details</h3>
            </div>
        </template>
        <div class="grid grid-cols-3 gap-x-5 gap-y-3">
            <div class="">
                <div class="text-xs text-dimmed">Application Type</div>
                <div class="text-sm text-primary">{{ details.applicationType }}</div>
            </div>
            <div class="">
                <div class="text-xs text-dimmed">Business Name</div>
                <div class="text-sm">{{ details.businessName }}</div>
            </div>
            <div class="">
                <div class="text-xs text-dimmed">Ownership Type</div>
                <div class="text-sm">{{ details.ownershipType }}</div>
            </div>
            <div class="">
                <div class="text-xs text-dimmed">DTI/SEC Number</div>
                <div class="text-sm">{{ details.dtiSecNumber }}</div>
            </div>
            <div class="">
                <div class="text-xs text-dimmed">DTI/SEC Date</div>
                <div class="text-sm">{{ details.dtiSecDate }}</div>
            </div>
            <div class="">
                <div class="text-xs text-dimmed">TIN</div>
                <div class="text-sm">{{ details.tin }}</div>
            </div>
            <div class="">
                <div class="text-xs text-dimmed">Business Area</div>
                <div class="text-sm">{{ details.businessArea }}</div>
            </div>
            <div class="">
                <div class="text-xs text-dimmed">No. of Employees</div>
                <div class="text-sm">{{ details.employeeCount }}</div>
            </div>
            <div class="">
                <div class="text-xs text-dimmed">Ownership of Space</div>
                <div class="text-sm">{{ details.spaceOwnership }}</div>
            </div>
            <div class="col-span-2">
                <div class="text-xs text-dimmed">Business Address</div>
                <div class="text-sm">{{ details.address }}</div>
            </div>
            <div class="">
                <div class="text-xs text-dimmed">Gov't Incentive</div>
                <div class="text-sm text-primary">{{ details.govtIncentive }}</div>
            </div>
        </div>
    </UCard>
</template>
