<template>
    <UDashboardPanel>
        <template #header>
            <UDashboardNavbar title="Executive Dashboard" :ui="{ title: 'text-default' }">
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
            <Welcome />
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                <StatCard v-for="stat in stats" :key="stat.title" v-bind="stat" />
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <RevenueTrend />
                <BusinessGrowth />
            </div>
        </template>
    </UDashboardPanel>
</template>
<script setup lang="ts">
import Welcome from '~/components/Welcome.vue';
import RevenueTrend from '~/components/chart/RevenueTrend.vue';
import BusinessGrowth from '~/components/chart/BusinessGrowth.vue';
const stats = [
    {
        title: "Total City Revenue",
        value: "₱142.8M",
        subtitle: "vs last year",
        icon: "i-lucide-philippine-peso",
        color: "green",
    },
    {
        title: "Active Businesses",
        value: "5,860",
        subtitle: "registered",
        icon: "i-lucide-building-2",
        color: "red",
    },
    {
        title: "New Registrations",
        value: "198",
        subtitle: "this month",
        icon: "i-lucide-file-check",
        color: "blue",
    },
    {
        title: "Pending Approvals",
        value: "47",
        subtitle: "awaiting action",
        icon: "i-lucide-clock",
        color: "purple",
    },
    {
        title: "Expiring Permits",
        value: "23",
        subtitle: "within 30 days",
        icon: "i-lucide-triangle-alert",
        color: "indigo",
    },
    {
        title: "Avg Processing",
        value: "3.2 days",
        subtitle: "target: 5 days",
        icon: "i-lucide-timer",
        color: "orange",
    },
] as const;
</script>