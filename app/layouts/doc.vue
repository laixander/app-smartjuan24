<template>
    <UDashboardGroup>
        <UDashboardSidebar resizable collapsible class="bg-elevated/25"
            :ui="{ root: 'w-auto', header: 'border-b border-default' }">
            <template #header="{ collapsed }">
                <div v-if="!collapsed" class="px-2.5">
                    <AppLogo class="h-5 w-auto shrink-0" />
                </div>
                <div v-else class="mx-auto">
                    <UIcon name="i-simple-icons-nuxtdotjs" class="flex size-6 text-primary" />
                </div>
            </template>
            <template #default="{ collapsed }">
                <UNavigationMenu
                    :ui="{ root: 'gap-2.5', label: 'text-default uppercase tracking-widest py-2.5', link: 'p-2.5', list: 'space-y-0.5' }"
                    :collapsed="collapsed" :items="items[0]" orientation="vertical" tooltip popover />
            </template>
        </UDashboardSidebar>
        <slot />
    </UDashboardGroup>
</template>
<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items: NavigationMenuItem[][] = [
    [
        {
            label: 'Platform Overview',
            icon: 'i-lucide-book-open',
            to: '/documentation/platform-overview'
        },
        {
            label: 'System Architecture',
            icon: 'i-lucide-server',
            to: '/documentation/system-architecture'
        },
        {
            label: 'Module Reference',
            icon: 'i-lucide-layers',
            to: '/documentation/module-reference'
        },
        {
            label: 'Data Models & Schema',
            icon: 'i-lucide-database',
            to: '/documentation/data-models'
        },
        {
            label: 'Workflow Engine',
            icon: 'i-lucide-workflow',
            to: '/documentation/workflow-engine'
        },
        {
            label: 'API Reference',
            icon: 'i-lucide-code',
            to: '/documentation/api-reference'
        },
        {
            label: 'Design Guidelines',
            icon: 'i-lucide-palette',
            to: '/documentation/design-guidelines'
        },
        {
            label: 'Changelog',
            icon: 'i-lucide-clock',
            to: '/documentation/changelog'
        }
    ]
]
</script>