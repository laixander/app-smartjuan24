<template>
    <UDashboardPanel>
        <template #header>
            <UDashboardNavbar title="Real Property" :ui="{ title: 'text-default' }">
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
            <UDashboardToolbar>
                <UNavigationMenu :items="links" highlight class="-mx-1 flex-1" />
            </UDashboardToolbar>
        </template>
        <template #body>
            <NuxtPage />
        </template>
    </UDashboardPanel>
</template>
<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
const route = useRoute()
const links = computed(() => [[{
    label: 'Dashboard',
    icon: 'i-lucide-chart-line',
    to: '/real-property/',
    exact: true
}, {
    label: 'Property Assessment',
    icon: 'i-lucide-workflow',
    to: '/real-property/property-assessment',
    active: route.path.startsWith('/real-property/property-assessment')
}, {
    label: 'Property Registry',
    icon: 'i-lucide-database',
    to: '/real-property/property-registry'
}], [{
    label: 'Documentation',
    icon: 'i-lucide-book-open',
    to: '/documentation',
    target: '_blank'
}]] satisfies NavigationMenuItem[][])
</script>