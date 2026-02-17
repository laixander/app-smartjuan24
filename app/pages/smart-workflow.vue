<template>
    <UDashboardPanel :ui="{ body: 'overflow-hidden' }">
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
            <UDashboardToolbar>
                <template #left>
                    <UInput placeholder="Search..." icon="i-lucide-search" />
                </template>
            </UDashboardToolbar>
        </template>
        <template #body>
            <!-- <header class="flex justify-between items-center">
                <div>
                    <h2 class="text-xl font-bold text-toned">
                        Task Management
                    </h2>
                    <p class="text-sm text-dimmed">
                        Manage your business permits and licenses
                    </p>
                </div>
                <div>
                    <UInput placeholder="Search..." size="lg" icon="i-lucide-search" />
                </div>
            </header> -->
            <div>
                <KanbanBoard />
            </div>
        </template>
    </UDashboardPanel>
</template>
<script setup lang="ts">
</script>