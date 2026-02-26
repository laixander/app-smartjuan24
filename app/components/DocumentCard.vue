<script setup lang="ts">
import type { Document } from '~/types/model'

interface Props {
    document: Document
}

const props = defineProps<Props>()

const emit = defineEmits<{
    (e: 'view', document: Document): void
}>()

const statusConfig = {
    Verified: { color: 'green', label: 'Verified' },
    Pending: { color: 'yellow', label: 'Pending' },
    Missing: { color: 'red', label: 'Missing' }
} as const

const config = computed(() => statusConfig[props.document.status])
</script>

<template>
    <UCard :ui="{ body: 'sm:p-4' }">
        <div class="flex items-center gap-4">
            <UBadge :icon="document.icon || 'i-lucide-file-text'" :color="config.color" variant="soft" size="lg"
                :ui="{ base: 'p-2.5 rounded-lg' }" />
            <div class="flex flex-col gap-1 flex-1">
                <h3 class="font-bold text-sm">{{ document.title }}</h3>
                <div class="flex items-center gap-2">
                    <UBadge :label="config.label" :color="config.color" variant="subtle" size="sm" />
                    <span v-if="document.verifiedBy" class="text-xs text-dimmed">by {{ document.verifiedBy }}</span>
                </div>
            </div>
            <UButton icon="i-lucide-eye" variant="link" size="sm" @click="emit('view', document)" />
        </div>
    </UCard>
</template>
