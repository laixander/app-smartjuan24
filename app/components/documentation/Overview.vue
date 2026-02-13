<template>
    <div>
        <UCard :ui="uiCardConfig">
            <div class="absolute top-0 right-0 w-64 h-64 bg-white/15 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div class="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/3 -translate-x-1/3">
            </div>
            <div class="relative">
                <div class="flex items-center gap-2 mb-3">
                    <UUser
                        name="SmartJuan"
                        description="Mayor Super-Admin Control Panel"
                        :avatar="{
                            alt: 'SmartJuan',
                            class: 'rounded-none squircle',
                            ui: {
                                root: 'bg-white/20 backdrop-blur-sm',
                                fallback: 'text-white font-bold',
                            }
                        }"
                        size="3xl"
                        :ui="uiUserConfig"
                    />
                </div>
                <p class="text-sm text-white/90 max-w-2xl mt-4 leading-relaxed">A premium eGovernment platform for Philippine Local Government Units (LGUs), designed to digitize, streamline, and provide executive oversight over municipal operations — from business permit processing to revenue analytics. Built with NuxtJS, Tailwind CSS v4, and planned yugabyteDB backend integration.</p>
                <div class="flex items-center gap-4 mt-6 flex-wrap">
                    <UBadge v-for="(badge, index) in badges" :key="index" :label="badge.label" :icon="badge.icon" variant="soft" :ui="uiBadgeConfig" />
                </div>
            </div>
        </UCard>
    </div>
</template>

<script setup lang="ts">
const badges = [
    { label: 'NuxtJS + TypeScript', icon: 'i-lucide-code-xml' },
    { label: 'Tailwind CSS v4', icon: 'i-lucide-paintbrush' },
    { label: 'NodeJS', icon: 'i-lucide-git-branch' },
    { label: 'yugabyteDB (Planned)', icon: 'i-lucide-database' },
]

const uiBadgeConfig = {
    base: 'px-3 py-2 text-white bg-white/20 backdrop-blur-sm',
}

const uiCardConfig = {
    root: 'bg-linear-to-r from-primary-700 to-primary rounded-2xl',
    body: 'relative',
}

const uiUserConfig = {
    name: 'uppercase text-2xl text-white font-extrabold',
    description: 'uppercase text-xs font-semibold text-white/70',
}
</script>