<template>
    <UCard>
        <div
            :class="[
                'gap-3',
                orientation === 'vertical'
                ? 'flex flex-col items-start'
                : 'flex items-start'
            ]"
        >
            <UAvatar v-if="icon" class="rounded-lg" size="xl" :ui="{
                root: 'bg-primary/10',
                icon: 'text-primary',
            }" :icon="icon" />
            <div class="min-w-0">
                <div class="text-sm font-semibold">
                    {{ title }}
                </div>
                <div class="text-xs text-muted mt-0.5 leading-relaxed">
                    {{ description }}
                </div>
                <div v-if="badges?.length" class="flex flex-wrap gap-1 mt-3">
                    <UBadge
                        v-for="(badge, index) in badges"
                        :key="index"
                        :label="badge"
                        variant="soft"
                        size="sm"
                        color="neutral"
                        :ui="{ label: 'uppercase' }"
                    />
                </div>
            </div>
        </div>
    </UCard>
</template>
<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        icon?: string
        title?: string
        description?: string
        badges?: string[]
        orientation?: 'horizontal' | 'vertical'
    }>(),
    {
        orientation: 'horizontal'
    }
)
</script>