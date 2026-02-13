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
            <Hero />
        </template>
    </UDashboardPanel>
</template>
<script setup lang="ts">
import Hero from '~/components/documentation/Hero.vue';
definePageMeta({
    layout: 'doc'
})
</script>