<template>
    <UDashboardPanel>
        <template #header>
            <UDashboardNavbar title="Data Models & Schema">
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
                Data Models & Schema content goes here
            </div>
        </template>
    </UDashboardPanel>
</template>
<script setup lang="ts">
definePageMeta({
    layout: 'doc'
})
</script>