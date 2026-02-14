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
                <Stat
                    title="Revenue"
                    value="₱2.4M"
                    subtitle="+15% from yesterday"
                    icon="i-lucide-philippine-peso"
                    color="green"
                />

                <Stat
                    title="Expenses"
                    value="₱1.2M"
                    subtitle="-5% from yesterday"
                    icon="i-lucide-trending-down"
                    color="red"
                />

                <Stat
                    title="Users"
                    value="1,248"
                    subtitle="+8% from yesterday"
                    icon="i-lucide-users"
                    color="blue"
                />
            </div>
        </template>
    </UDashboardPanel>
</template>
<script setup lang="ts">
import Welcome from '~/components/Welcome.vue';

// This is the index page of the application. You can add your content here.
</script>