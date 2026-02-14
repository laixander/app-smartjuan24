<template>
  <UCard>
    <div>
      <UAvatar
        class="rounded-lg mb-2"
        size="xl"
        :ui="avatarUi"
        :icon="icon"
      />

      <h3 class="text-sm font-bold text-toned uppercase mb-1">
        {{ title }}
      </h3>

      <p :class="['text-2xl font-extrabold', valueColorClass]">
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

const props = withDefaults(defineProps<{
  title?: string
  value?: string
  subtitle?: string
  icon?: string
  color?: 'green' | 'red' | 'blue'
}>(), {
  color: 'green'
})

const colorVariants = {
  green: {
    text: 'text-green-500',
    bg: 'bg-green-500/10'
  },
  red: {
    text: 'text-red-500',
    bg: 'bg-red-500/10'
  },
  blue: {
    text: 'text-blue-500',
    bg: 'bg-blue-500/10'
  }
} as const

const variant = computed(() => colorVariants[props.color])

const avatarUi = computed(() => ({
  root: variant.value.bg,
  icon: variant.value.text
}))

const valueColorClass = computed(() => variant.value.text)
</script>
