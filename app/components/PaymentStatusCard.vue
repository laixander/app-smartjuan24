<script setup lang="ts">
import type { PaymentInfo } from '~/types/model'

interface Props {
    payment: PaymentInfo
}

const props = defineProps<Props>()

const formattedAmount = computed(() => {
    return new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP'
    }).format(props.payment.amountPaid)
})

const statusColor = computed(() => props.payment.status === 'Fully Paid' ? 'green' : 'red')
</script>

<template>
    <UCard :class="[
        statusColor === 'green' ? 'ring-green/30 bg-linear-to-tl from-green/10 from-5% to-default' : 'ring-red/30 bg-linear-to-tl from-red/10 from-5% to-default'
    ]">
        <div class="flex items-center gap-4 mb-6">
            <UBadge icon="i-lucide-banknote" :color="statusColor" variant="soft" size="lg"
                :ui="{ base: 'p-2.5 rounded-lg' }" />
            <div>
                <p class="text-xs text-dimmed uppercase tracking-wider font-semibold">Payment Status</p>
                <h3 :class="[`font-extrabold text-${statusColor} leading-tight`]">
                    {{ payment.status }}
                </h3>
            </div>
        </div>

        <div class="space-y-3">
            <div class="flex justify-between items-center text-sm">
                <span class="text-muted">OR Number</span>
                <span class="font-semibold">{{ payment.orNumber }}</span>
            </div>
            <div class="flex justify-between items-center text-sm">
                <span class="text-muted">Payment Date</span>
                <span class="font-semibold">{{ payment.paymentDate }}</span>
            </div>
            <div class="flex justify-between items-center text-sm">
                <span class="text-muted">Payment Mode</span>
                <span class="font-semibold">{{ payment.paymentMode }}</span>
            </div>
            <USeparator :color="statusColor" class="opacity-30" />
            <div class="flex justify-between items-center">
                <span class="text-muted text-sm">Amount Paid</span>
                <span :class="[`font-extrabold text-${statusColor}`]">{{ formattedAmount }}</span>
            </div>
        </div>
    </UCard>
</template>
