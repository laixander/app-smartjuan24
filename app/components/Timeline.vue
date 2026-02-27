<script setup lang="ts">
import type { TimelineEntry } from '~/types/timeline'

interface Props {
    items: readonly TimelineEntry[]
    hideSubtitle?: boolean
}

const props = defineProps<Props>()
</script>

<template>
    <div class="space-y-0">
        <TimelineItem v-for="(item, index) in items" :key="index" v-bind="item" :is-last="index === items.length - 1"
            :hide-subtitle="hideSubtitle" />
    </div>
</template>