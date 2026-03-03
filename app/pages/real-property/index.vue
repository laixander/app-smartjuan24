<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard v-for="stat in stats" :key="stat.title" v-bind="stat" orientation="horizontal" />
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:col-span-3">
            <AssessmentPipeline />
            <ClassificationBreakdown />
            <MonthlyAssessments class="lg:col-span-2" />
        </div>
        <!-- Recent Activity -->
    </div>
</template>
<script setup lang="ts">
import AssessmentPipeline from '~/components/chart/AssessmentPipeline.vue';
import ClassificationBreakdown from '~/components/chart/ClassificationBreakdown.vue';
import MonthlyAssessments from '~/components/chart/MonthlyAssessments.vue';
const stats = [
    {
        title: "Total Properties",
        value: 8,
        subtitle: "registered",
        icon: "i-lucide-map-pin",
        color: "blue",
    },
    {
        title: "Completed Assessments",
        value: 2,
        subtitle: "this month",
        icon: "i-lucide-file-check",
        color: "green"
    },
    {
        title: "In Pipeline",
        value: 5,
        subtitle: "awaiting action",
        icon: "i-lucide-clock",
        color: "purple"
    },
    {
        title: "Total Assessed Value",
        value: "₱12.4M",
        subtitle: "Cumulative valuation",
        icon: "i-lucide-philippine-peso",
        color: "orange"
    },
] as const
</script>