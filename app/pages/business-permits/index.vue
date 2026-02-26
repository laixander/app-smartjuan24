<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard v-for="stat in stats" :key="stat.title" v-bind="stat" orientation="horizontal" />
    </div>  
</template>

<script setup lang="ts">

const stats = [
    {
        title: "Total Businesses",
        value: "5,860",
        subtitle: "registered",
        icon: "i-lucide-building-2",
        color: "blue",
    },
    {
        title: "New Registrations",
        value: "198",
        subtitle: "this month",
        icon: "i-lucide-file-check",
        color: "green"
    },
    {
        title: "Pending Approvals",
        value: "47",
        subtitle: "awaiting action",
        icon: "i-lucide-clock",
        color: "purple"
    },
    {
        title: "Expiring Permits",
        value: "23",
        subtitle: "within 30 days",
        icon: "i-lucide-triangle-alert",
        color: "orange"
    },
] as const
</script>