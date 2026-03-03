<template>
    <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
            <UInput placeholder="Search..." icon="i-lucide-search" class="w-80" />
            <USelect
                :default-value="'All'"
                :items="['All', 'Residential', 'Commercial', 'Agricultural', 'Industrial']"
            class="data-[state=open]:bg-elevated w-36"
            :ui="{ trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200' }" />
    </div>
    <UTabs v-model="activeTab" :content="false" :items="items" :ui="{ list: 'w-auto' }" class="w-auto" />
    </div>
    <div v-if="activeTab === 'table'">
        <TableRpt />
    </div>
    <div v-if="activeTab === 'card'">
        <KanbanRpt />
    </div>
</template>

<script setup lang="ts">
const activeTab = ref('table')
const items = ref([
    {
        icon: 'i-lucide-list',
        value: 'table'
    },
    {
        icon: 'i-lucide-layout-grid',
        value: 'card'
    }
])
</script>