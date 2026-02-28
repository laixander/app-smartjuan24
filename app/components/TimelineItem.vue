<script setup lang="ts">
import { computed } from 'vue'
import { useStatusConfig } from '~/composables/useStatusConfig'
import type { TimelineEntry } from '~/types/timeline'

interface Props extends TimelineEntry {
    isLast?: boolean
    hideSubtitle?: boolean
}

const props = defineProps<Props>()
const { getStatusConfig } = useStatusConfig()

const statusConfig = computed(() => {
    return props.statusConfig || getStatusConfig(props.status)
})
</script>

<template>
    <div class="flex gap-3 group">
        <!-- Icon Column -->
        <div class="flex flex-col items-center">
            <UBadge :icon="icon" :color="color" variant="soft" class="rounded-full p-2" />
            <!-- <div class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" :class="iconBg">
                <UIcon :name="icon" class="size-5" :class="iconColor" />
            </div> -->

            <!-- Vertical line -->
            <div v-if="!isLast" class="w-px flex-1 bg-accented/50 my-1" />
        </div>

        <!-- Content -->
        <div :class="[isLast ? 'pb-0' : 'pb-8', 'space-y-1 min-w-0']">
            <div class="text-sm font-semibold">
                {{ title }}
            </div>

            <div v-if="!hideSubtitle && subtitle" class="text-xs font-medium text-primary">
                {{ subtitle }}
            </div>

            <div v-if="actor" class="text-xs text-muted">
                {{ actor }}
            </div>

            <div v-if="date" class="text-xs text-muted">
                {{ date }}
            </div>

            <p v-if="description"
                class="flex items-center gap-2 text-xs text-dimmed bg-elevated/50 rounded-md px-2 py-1">
                <!-- Icon configuration by status -->
                <UIcon :name="statusConfig.icon" :class="statusConfig.color" />{{ description }}
            </p>
        </div>
    </div>
</template>