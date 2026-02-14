<template>
    <UDashboardGroup>
        <UDashboardSidebar resizable collapsible class="bg-elevated/25"
            :ui="{ root: 'w-auto', header: 'border-b border-default', footer: 'border-t border-default' }">
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
                    :ui="{ root: 'gap-2.5', label: 'uppercase tracking-widest py-2.5', link: 'p-2.5', list: 'space-y-0.5' }"
                    :collapsed="collapsed" :items="items[0]" orientation="vertical" tooltip popover />
                <!-- <UNavigationMenu :ui="{ root: 'gap-2.5', link: 'p-2.5', list: 'space-y-0.5' }" :collapsed="collapsed" :items="items[1]" orientation="vertical" tooltip class="mt-auto" /> -->
            </template>
            <template #footer="{ collapsed }">
                <UNavigationMenu :ui="{ root: 'w-full gap-2.5', link: 'p-2.5', list: 'space-y-0.5' }"
                    :collapsed="collapsed" :items="items[1]" orientation="vertical" tooltip class="mt-auto" />
            </template>
        </UDashboardSidebar>
        <slot />
    </UDashboardGroup>
</template>
<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items: NavigationMenuItem[][] = [
    [
        [
            {
                label: 'Main',
                type: 'label'
            },
            {
                label: 'Executive Dashboard',
                icon: 'i-lucide-pie-chart',
                to: '/'
            },
            {
                label: 'Smart Workflow',
                icon: 'i-lucide-workflow',
                to: '/smart-workflow'
            },
            {
                label: 'Applications',
                icon: 'i-lucide-app-window'
            },
            {
                label: 'Business Registry',
                icon: 'i-lucide-scroll-text'
            }
        ],
        [
            {
                label: 'System Management',
                type: 'label'
            },
            {
                label: 'Configuration',
                icon: 'i-lucide-settings-2'
            }
        ],
        [
            {
                label: 'User & Access',
                type: 'label'
            },
            {
                label: 'User Management',
                icon: 'i-lucide-users'
            },
            {
                label: 'Roles & Permissions',
                icon: 'i-lucide-shield-check'
            }
        ],
        [
            {
                label: 'Reports',
                type: 'label'
            },
            {
                label: 'Analytics Center',
                icon: 'i-lucide-chart-column'
            }
        ],
        [
            {
                label: 'System',
                type: 'label'
            },
            {
                label: 'Activity Logs',
                icon: 'i-lucide-activity'
            },
            {
                label: 'System Settings',
                icon: 'i-lucide-settings'
            }
        ]
    ],
    [
        {
            label: 'Documentation',
            icon: 'i-lucide-book-marked',
            to: '/documentation/platform-overview',
            target: '_blank'
        }
    ]
]
</script>