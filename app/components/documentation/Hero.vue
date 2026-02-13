<template>
    <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#7AA541] to-[#5d8030] p-8 text-white">
        <div class="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div class="absolute bottom-0 left-0 w-48 h-48 bg-[#B9A22C]/15 rounded-full translate-y-1/3 -translate-x-1/3">
        </div>
        <div class="relative">
            <div class="flex items-center gap-2 mb-3">
                <div
                    class="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-bold text-lg backdrop-blur-sm">
                    S</div>
                <div>
                    <h2 class="text-2xl font-bold">SMARTJUAN</h2>
                    <p class="text-xs text-white/70 font-semibold tracking-wider uppercase">Mayor Super-Admin Control
                        Panel</p>
                </div>
            </div>
            <p class="text-white/90 max-w-2xl mt-4 leading-relaxed">A premium eGovernment platform for Philippine Local
                Government Units (LGUs), designed to digitize, streamline, and provide executive oversight over
                municipal operations — from business permit processing to revenue analytics. Built with React, Tailwind
                CSS v4, and planned Supabase backend integration.</p>
            <div class="flex items-center gap-4 mt-6 flex-wrap">
                <UBadge label="NuxtJS + TypeScript" icon="i-lucide-code-xml" variant="subtle" />
                <UBadge label="Tailwind CSS v4" icon="i-lucide-paintbrush" variant="subtle" />
                <UBadge label="NodeJS" icon="i-lucide-git-branch" variant="subtle" />
                <UBadge label="Digital Ocean (Planned)" icon="i-lucide-database" variant="subtle" />


                <div class="flex items-center gap-2 px-3 py-1.5 bg-white/15 rounded-lg backdrop-blur-sm text-sm"><svg
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-database w-4 h-4">
                        <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                        <path d="M3 5V19A9 3 0 0 0 21 19V5"></path>
                        <path d="M3 12A9 3 0 0 0 21 12"></path>
                    </svg> Supabase (Planned)</div>
            </div>
        </div>
    </div>

    <UCard :ui="uiCardConfig">
        <div class="relative">
            <div class="flex items-center gap-2 mb-3">
                <div
                    class="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-bold text-lg backdrop-blur-sm">
                    S</div>
                <div>
                    <h2 class="text-2xl font-bold">SMARTJUAN</h2>
                    <p class="text-xs font-semibold tracking-wider uppercase">Mayor Super-Admin Control
                        Panel</p>
                </div>
            </div>
            <p class="text-white/90 max-w-2xl mt-4 leading-relaxed">A premium eGovernment platform for Philippine Local
                Government Units (LGUs), designed to digitize, streamline, and provide executive oversight over
                municipal operations — from business permit processing to revenue analytics. Built with React, Tailwind
                CSS v4, and planned Supabase backend integration.</p>
            <div class="flex items-center gap-4 mt-6 flex-wrap">
                <UBadge label="NuxtJS + TypeScript" icon="i-lucide-code-xml" :ui="uiBadgeConfig" />
                <UBadge label="Tailwind CSS v4" icon="i-lucide-paintbrush" />
                <UBadge label="NodeJS" icon="i-lucide-git-branch" />
                <UBadge label="Digital Ocean (Planned)" icon="i-lucide-database" />
            </div>
        </div>
    </UCard>
</template>

<script setup lang="ts">
const uiBadgeConfig = {
    base: 'px-3 py-2'
}

const uiCardConfig = {
    root: 'bg-linear-to-r from-primary-600 to-emerald-500'
}
</script>