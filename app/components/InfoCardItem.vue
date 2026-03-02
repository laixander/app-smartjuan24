<script setup lang="ts">
defineProps<{
    icon: string
    label: string
    value: string
}>()
</script>

<template>
    <div class="flex items-start gap-2.5 bg-muted p-3 rounded-lg">
        <UIcon :name="icon" class="text-dimmed mt-0.5 shrink-0" />
        <div>
            <div class="text-xs text-dimmed">{{ label }}</div>
            <div class="text-sm font-medium truncate">{{ value }}</div>
        </div>
    </div>
</template>
