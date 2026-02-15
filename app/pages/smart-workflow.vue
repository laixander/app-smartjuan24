<template>
    <UDashboardPanel>
        <template #header>
            <UDashboardNavbar title="Smart Workflow">
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
            <!-- <UDashboardToolbar>
                <template #left>
                    Hello World
                </template>
                <template #right>
                    <UTabs :items="items" size="sm" class="w-full" />
                </template>
            </UDashboardToolbar> -->
        </template>
        <template #body>
            smart workflow
        </template>
    </UDashboardPanel>
</template>
<script setup lang="ts">
const items = [
    {
        // label: 'Dashboard',
        icon: 'i-lucide-kanban',
        to: '/'
    },
    {
        // label: 'Smart Workflow',
        icon: 'i-lucide-list',
        to: '/'
    }
]
</script>