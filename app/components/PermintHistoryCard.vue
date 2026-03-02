<script setup lang="ts">
const props = withDefaults(defineProps<{
    permitNumber: string
    issuedDate: string
    amount: string
    status: 'current' | 'completed'
}>(), {
    status: 'completed'
})

const statusColor = computed(() => props.status === 'current' ? 'green' : 'neutral')
const statusLabel = computed(() => props.status === 'current' ? 'Current' : 'Completed')
</script>

<template>
    <UCard :ui="{ body: 'sm:p-4' }">
        <div class="flex items-center gap-4">
            <UBadge icon="i-lucide-file-text" :color="statusColor" variant="soft" size="lg"
                :ui="{ base: 'p-2.5 rounded-lg' }" />
            <div class="flex flex-col gap-1 flex-1">
                <h3 class="font-bold text-sm">{{ permitNumber }}</h3>
                <p class="text-xs text-dimmed">Issued: {{ issuedDate }}</p>
            </div>
            <div class="flex flex-col items-end gap-1">
                <p class="text-xs text-dimmed">{{ amount }}</p>
                <UBadge :label="statusLabel" :color="statusColor" variant="subtle" size="sm" />
            </div>
        </div>
    </UCard>
</template>
