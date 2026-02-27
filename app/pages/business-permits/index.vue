<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard v-for="stat in stats" :key="stat.title" v-bind="stat" orientation="horizontal" />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <PermitPipeline class="lg:col-span-3" />
        <IndustryBreakdown />
        <MonthlyApplications class="lg:col-span-3" />
        <RecentActivity />
    </div>
</template>

<script setup lang="ts">
import PermitPipeline from '~/components/chart/PermitPipeline.vue';
import IndustryBreakdown from '~/components/chart/IndustryBreakdown.vue';
import MonthlyApplications from '~/components/chart/MonthlyApplications.vue';
const stats = [
    {
        title: "Total Businesses",
        value: 5860,
        subtitle: "registered",
        icon: "i-lucide-building-2",
        color: "blue",
    },
    {
        title: "Active Permits",
        value: 5412,
        subtitle: "this month",
        icon: "i-lucide-file-check",
        color: "green"
    },
    {
        title: "Pending Applications",
        value: 47,
        subtitle: "awaiting action",
        icon: "i-lucide-clock",
        color: "purple"
    },
    {
        title: "Revenue (YTD)",
        value: "₱42.8M",
        subtitle: "vs last year",
        icon: "i-lucide-triangle-alert",
        color: "orange"
    },
] as const
</script>