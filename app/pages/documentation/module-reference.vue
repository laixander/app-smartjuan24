<template>
    <UDashboardPanel>
        <template #header>
            <UDashboardNavbar title="Module Reference">
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
            <div>
                Module Reference content goes here
            </div>
        </template>
    </UDashboardPanel>
</template>
<script setup lang="ts">
definePageMeta({
    layout: 'doc'
})
</script>