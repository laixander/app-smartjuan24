<template>
    <UDashboardPanel>
        <template #header>
            <UDashboardNavbar title="Department Directory" :ui="{ title: 'text-default' }">
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
            <NuxtPage />
        </template>
    </UDashboardPanel>
</template>
<script setup lang="ts">

</script>