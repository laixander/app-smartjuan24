<template>
    <UDashboardGroup>
        <UDashboardSidebar resizable collapsible :ui="{ root: 'w-auto', header: 'border-b border-default' }">
            <template #header="{ collapsed }">
                <div v-if="!collapsed" class="px-2.5">
                    <AppLogo class="h-5 w-auto shrink-0" />
                </div>
                <div v-else class="mx-auto">
                    <UIcon name="i-simple-icons-nuxtdotjs" class="flex size-6 text-primary" />
                </div>
            </template>
            <template #default="{ collapsed }">
                <UNavigationMenu :ui="{ root: 'gap-2.5', label: 'uppercase tracking-widest py-2.5', link: 'p-2.5', list: 'space-y-0.5' }" :collapsed="collapsed" :items="items[0]" orientation="vertical" tooltip
          popover />
            </template>
        </UDashboardSidebar>
        <UDashboardPanel>
            <template #header>
                <UDashboardNavbar title="Dashboard">
                    <template #leading>
                        <UDashboardSidebarCollapse />
                    </template>
                    <template #trailing>
                        <!-- <UBadge label="4" variant="subtle" /> -->
                    </template>
                    <template #right>
                        <UColorModeButton />
                        <UserMenu />
                    </template>
                </UDashboardNavbar>
            </template>
            <template #body>
                <slot />
            </template>
        </UDashboardPanel>
    </UDashboardGroup>
</template>
<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items: NavigationMenuItem[][] = [
    [
        {
            label: 'Platform Overview',
            icon: 'i-lucide-book-open',
            to: '/documentation'
        }, 
        {
            label: 'System Architecture',
            icon: 'i-lucide-server'
        }, 
        {
            label: 'Module Reference',
            icon: 'i-lucide-layers'
        },
        {
            label: 'Data Models & Schema',
            icon: 'i-lucide-database'
        },
        {
            label: 'Workflow Engine',
            icon: 'i-lucide-workflow'
        },
        {
            label: 'API Reference',
            icon: 'i-lucide-code'
        },
        {
            label: 'Design Guidelines',
            icon: 'i-lucide-palette'
        },
        {
            label: 'Changelog',
            icon: 'i-lucide-clock'
        }
    ]
]
</script>