<template>
    <UDashboardPanel>
        <template #header>
            <UDashboardNavbar title="Smart Workflow" :ui="{ title: 'text-default' }">
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
            <div class="mb-4">
                <h2 class="text-xl font-bold text-toned">
                    Task Management
                </h2>
                <p class="text-sm text-dimmed">
                    Manage your business permits and licenses
                </p>
            </div>
            <div>
                <KanbanBoard />
            </div>
        </template>
    </UDashboardPanel>
</template>
<script setup lang="ts">
</script>