<template>
    <UCard
        class="bg-elevated/50 hover:bg-elevated/80 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-default group ring-1 ring-white/5 hover:ring-primary/20">
        <div :class="orientation === 'horizontal' ? 'flex items-center gap-4' : 'space-y-3'">
            <UBadge :icon="icon" :color="color" size="lg" variant="soft"
                :ui="{ base: 'p-2.5 rounded-lg shrink-0' + (orientation === 'vertical' ? ' mb-2' : '') }" />

            <div :class="orientation === 'horizontal' ? 'flex flex-col' : 'space-y-2'">
                <h3 class="text-sm font-bold text-toned uppercase">
                    {{ title }}
                </h3>

                <p :class="valueClasses">
                    {{ formattedValue }}
                </p>

                <p class="text-sm text-dimmed">
                    {{ subtitle }}
                </p>
            </div>
        </div>
    </UCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '#imports'

const appConfig = useAppConfig()

type UiColor = keyof typeof appConfig.ui.colors
type Orientation = 'vertical' | 'horizontal'

const props = withDefaults(defineProps<{
    title?: string
    value?: string | number
    subtitle?: string
    icon?: string
    color?: UiColor
    orientation?: Orientation
}>(), {
    color: 'primary',
    orientation: 'vertical'
})

const formattedValue = computed(() => {
    if (typeof props.value === 'number') {
        return new Intl.NumberFormat().format(props.value)
    }
    return props.value
})

const valueClasses = computed(() => [
    'text-2xl',
    'font-extrabold',
    `text-${props.color}`
])
</script>
