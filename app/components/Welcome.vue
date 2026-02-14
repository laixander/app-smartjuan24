<template>
    <UCard :ui="uiCardConfig">
        <div class="absolute top-0 right-0 w-64 h-64 bg-white/15 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div class="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/3 -translate-x-1/3"></div>
        <div class="flex items-center gap-1 mb-2 text-amber-300">
            <UIcon name="i-lucide-zap" class="size-4" />
            <span class="uppercase text-xs font-bold">SmartJuan Command Center</span>
        </div>
        <div class="text-3xl text-white font-extrabold mb-2.5">
            Good Morning, Mayor Rodriguez
        </div>
        <div class="text-sm text-white/90 leading-relaxed">
            Here's your city overview for February 9, 2026. You have
            <UBadge label="7 pending approvals" variant="soft" :ui="uiBadgeConfig" /> and
            <UBadge label="₱2.4M in revenue today" variant="soft" :ui="uiBadgeConfig" />
        </div>
    </UCard>
</template>
<script setup lang="ts">
const uiCardConfig = {
    root: 'bg-linear-to-r from-primary-700 to-primary',
    body: 'relative',
}

const uiBadgeConfig = {
    base: 'px-3 py-2 text-white bg-white/20 backdrop-blur-sm',
}
</script>