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
            <Welcome />
            <div class="grid grid-cols-6 gap-4">
                <StatCard v-for="stat in stats" :key="stat.title" v-bind="stat" />
            </div>
        </template>
    </UDashboardPanel>
</template>
<script setup lang="ts">
import Welcome from '~/components/Welcome.vue';

const stats = [
    {
        title: "Revenue",
        value: "₱2.4M",
        subtitle: "+15% from yesterday",
        icon: "i-lucide-philippine-peso",
        color: "green",
    },
    {
        title: "Expenses",
        value: "₱1.2M",
        subtitle: "-5% from yesterday",
        icon: "i-lucide-trending-down",
        color: "red",
    },
    {
        title: "Users",
        value: "1,248",
        subtitle: "+8% from yesterday",
        icon: "i-lucide-users",
        color: "blue",
    },
    {
        title: "Orders",
        value: "356",
        subtitle: "+12% from yesterday",
        icon: "i-lucide-shopping-cart",
        color: "purple",
    },
    {
        title: "New Signups",
        value: "89",
        subtitle: "+3% from yesterday",
        icon: "i-lucide-user-plus",
        color: "indigo",
    },
    {
        title: "Refunds",
        value: "₱75K",
        subtitle: "-2% from yesterday",
        icon: "i-lucide-rotate-ccw",
        color: "orange",
    },
] as const;
</script>