<template>
    <UDashboardPanel>
        <template #header>
            <UDashboardNavbar title="Design Guidelines">
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
                Design Guidelines content goes here
            </div>
        </template>
    </UDashboardPanel>
</template>
<script setup lang="ts">
definePageMeta({
    layout: 'doc'
})
</script>