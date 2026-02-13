<template>
    <UDashboardPanel>
        <template #header>
            <UDashboardNavbar title="Platform Overview">
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
            <Overview />
            
            <h3 class="text-lg font-bold">Key Capabilities</h3>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <Feature
                    v-for="(feature, index) in capabilities"
                    :key="index"
                    v-bind="feature"
                />
            </div>

            <h3 class="text-lg font-bold">Design Principles</h3>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-3">
                <Feature
                    v-for="(feature, index) in principles"
                    :key="index"
                    v-bind="feature"
                    orientation="vertical"
                />
            </div>

        </template>
    </UDashboardPanel>
</template>
<script setup lang="ts">
import Overview from '~/components/documentation/Overview.vue';
import Feature from '~/components/documentation/Feature.vue';

definePageMeta({
    layout: 'doc'
})

const capabilities = [
    {
        icon: 'i-lucide-git-branch',
        title: 'Smart Approvals Engine',
        description:
            "6-stage Kanban workflow with drag-and-drop, department routing, and Mayor's Decision Panel for final disposition.",
        badges: ['Kanban', 'Drag & Drop', 'Modal']
    },
    {
        icon: 'i-lucide-file-text',
        title: 'Application Lifecycle',
        description:
            'End-to-end application tracking from submission to permit issuance with 5-stage workflow stepper and 4 tabbed review sections.',
        badges: ['Stepper', 'Tabs', 'Review']
    },
    {
        icon: 'i-lucide-building-2',
        title: 'Business Registry',
        description:
            'Comprehensive registry with table/card views, KPI stat cards, industry distribution analytics, and full business profile modals.',
        badges: ['Table', 'Cards', 'KPI']
    },
    {
        icon: 'i-lucide-calculator',
        title: 'Financial Configuration',
        description:
            'Fee matrices, additional fees management, tax rules, and automated computation engine for permit fee assessment.',
        badges: ['Fees', 'Tax', 'Computation']
    },
    {
        icon: 'i-lucide-shield-check',
        title: 'RBAC Access Control',
        description:
            'Role-based permission system with granular module-level access, user management, and audit trail logging.',
        badges: ['Roles', 'Permissions', 'Audit']
    },
    {
        icon: 'i-lucide-chart-column',
        title: 'Reports & Analytics',
        description:
            'Executive dashboards, city-wide analytics, permit trends, revenue tracking, and exportable reports center.',
        badges: ['Charts', 'Export', 'KPI']
    }
]

const principles = [
    {
        icon: 'i-lucide-eye',
        title: 'Executive-Grade UI',
        description: "Clean white backgrounds, structured card layouts, and premium typography. Every screen is designed for decision-makers, not data entry clerks."
    },
    {
        icon: 'i-lucide-component',
        title: 'Modular Architecture',
        description: 'Related screens are consolidated into tabbed modules (e.g., System Management, Analytics) to keep the sidebar clean and navigable.'
    },
    {
        icon: 'i-lucide-database',
        title: 'Mock-First Development',
        description: 'All modules use comprehensive mock data that mirrors real LGU data structures, enabling full frontend development before Supabase integration.'
    }
]
</script>