<template>
    <UModal :ui="{ header: 'flex items-center justify-between' }">
        <template #header="{close}">
            <h3 class="text-lg font-semibold text-default">Add Department</h3>
            <UButton icon="i-lucide-x" color="neutral" variant="ghost" size="sm" @click="close" />
        </template>
        <template #body>
            <div class="space-y-4">
                <UFormField label="Department Name" required>
                    <UInput placeholder="e.g. Assessor's Office" class="w-full" />
                </UFormField>
                <div class="grid grid-cols-2 gap-4">
                    <UFormField label="Department Head" required>
                        <UInput placeholder="e.g. John Doe" class="w-full" />
                    </UFormField>
                    <UFormField label="Category" required>
                        <USelect :items="categories" class="w-full" />
                    </UFormField>
                </div>
                <div class="grid grid-cols-2 gap-4">
                     <UFormField label="Initial Staff Count">
                        <UInput type="number" placeholder="0" class="w-full" />
                    </UFormField>
                    <UFormField label="Initial Status">
                         <USelect :items="['Active', 'Inactive']" class="w-full" />
                    </UFormField>
                </div>
            </div>
        </template>
        <template #footer="{ close }">
            <div class="flex justify-end gap-2 w-full">
                <UButton color="neutral" variant="ghost" @click="close">Cancel</UButton>
                <UButton color="primary" @click="close">Save Department</UButton>
            </div>
        </template>
    </UModal>
</template>

<script setup lang="ts">
const categories = ['Regulatory', 'Finance', 'Inspection', 'Support']
</script>
