<template>
    <UCard>
        <div>
            <UBadge :icon="icon" :color="color" size="lg" variant="soft" :ui="{ base: 'p-2.5 rounded-lg mb-2' }" />

            <h3 class="text-sm font-bold text-toned uppercase mb-1">
                {{ title }}
            </h3>

            <p :class="valueClasses">
                {{ value }}
            </p>

            <p class="text-sm text-dimmed mt-1">
                {{ subtitle }}
            </p>
        </div>
    </UCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '#imports'

const appConfig = useAppConfig()

type UiColor = keyof typeof appConfig.ui.colors

const props = withDefaults(defineProps<{
    title?: string
    value?: string
    subtitle?: string
    icon?: string
    color?: UiColor
}>(), {
    color: 'primary'
})

const valueClasses = computed(() => [
    'text-2xl',
    'font-extrabold',
    `text-${props.color}`
])
</script>
