<script setup lang="ts">
import type { TimelineEntry } from '~/types/timeline'

interface Props extends TimelineEntry {
    isLast?: boolean
}

defineProps<Props>()
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
        <div class="pb-8 space-y-1 min-w-0">
            <div class="text-sm font-semibold">
                {{ title }}
            </div>

            <div v-if="actor" class="text-xs text-muted">
                {{ actor }}
            </div>

            <div v-if="date" class="text-xs text-muted">
                {{ date }}
            </div>

            <p v-if="description" class="text-xs text-dimmed bg-elevated/50 rounded-md px-2 py-1">
                {{ description }}
            </p>
        </div>
    </div>
</template>