<template>
    <div class="flex items-center gap-2">
        <UInput placeholder="Search..." icon="i-lucide-search" class="w-80" />
        <USelect :default-value="'All'" :items="['All', 'New', 'Renewal']"
            class="data-[state=open]:bg-elevated w-28"
            :ui="{ trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200' }" />
    </div>
    <Kanban />
</template>
