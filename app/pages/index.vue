<template>
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
            App Content Goes Here
        </template>
    </UDashboardPanel>
</template>
<script setup lang="ts">
// This is the index page of the application. You can add your content here.
</script>