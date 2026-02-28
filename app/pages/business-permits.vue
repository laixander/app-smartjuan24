<template>
    <UDashboardPanel>
        <template #header>
            <UDashboardNavbar title="Business Permits" :ui="{ title: 'text-default' }">
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
                <!-- workflow page toolbar -->
                <!-- <div class="flex items-center gap-4" v-if="$route.path === '/smart-workflow'">
                    <UInput placeholder="Search..." icon="i-lucide-search" variant="soft" class="w-80" />
                    <USelect :default-value="'All'" :items="['All', 'New', 'Renewal']" variant="ghost"
                        class="data-[state=open]:bg-elevated w-28"
                        :ui="{ trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200' }" />
                </div> -->

                <!-- details page toolbar -->
                <!-- <template v-if="$route.path.startsWith('/smart-workflow/')" #left>
                    <UButton icon="i-lucide-arrow-left" label="Back to Board" variant="ghost" to="/smart-workflow" />
                </template>
                <template v-if="$route.path.startsWith('/smart-workflow/')" #right>
                    <UFieldGroup>
                        <UTooltip text="Activity Timeline">
                            <UButton icon="i-lucide-history" color="neutral" variant="soft" @click="openSlideover" />
                        </UTooltip>
                        <UTooltip text="Export PDF">
                            <UButton icon="i-lucide-download" color="neutral" variant="soft" />
                        </UTooltip>
                    </UFieldGroup>
                </template> -->
                <UNavigationMenu :items="links" highlight class="-mx-1 flex-1" />
            </UDashboardToolbar>
        </template>
        <template #body>
            <NuxtPage />
        </template>
    </UDashboardPanel>
</template>
<script setup lang="ts">
const { openSlideover } = useWorkflowSlideover()

import type { NavigationMenuItem } from '@nuxt/ui'
const route = useRoute()
const links = computed(() => [[{
    label: 'Dashboard',
    icon: 'i-lucide-chart-line',
    to: '/business-permits/',
    exact: true
}, {
    label: 'Permit Applications',
    icon: 'i-lucide-workflow',
    to: '/business-permits/permit-applications',
    active: route.path.startsWith('/business-permits/permit-applications')
}, {
    label: 'Business Registry',
    icon: 'i-lucide-database',
    to: '/business-permits/business-registry'
}], [{
    label: 'Documentation',
    icon: 'i-lucide-book-open',
    to: '/documentation',
    target: '_blank'
}]] satisfies NavigationMenuItem[][])
</script>