<template>
    <UModal :ui="{ header: 'flex items-center justify-between' }">
        <template #header="{close}">
            <h3 class="text-lg font-semibold text-default">Edit Department</h3>
            <UButton icon="i-lucide-x" color="neutral" variant="ghost" size="sm" @click="close" />
        </template>
        <template #body>
            <div class="space-y-4">
                <UFormField label="Department Name" required>
                    <UInput :model-value="department.name" class="w-full" />
                </UFormField>
                <div class="grid grid-cols-2 gap-4">
                    <UFormField label="Department Head" required>
                        <UInput :model-value="department.head" class="w-full" />
                    </UFormField>
                    <UFormField label="Category" required>
                        <USelect :items="categories" :model-value="department.category.label" class="w-full" />
                    </UFormField>
                </div>
                <div class="grid grid-cols-2 gap-4">
                     <UFormField label="Staff Count">
                        <UInput type="number" :model-value="department.usersAssigned" class="w-full" />
                    </UFormField>
                    <UFormField label="Status">
                         <USelect :items="['Active', 'Inactive']" :model-value="department.status" class="w-full" />
                    </UFormField>
                </div>
            </div>
        </template>
        <template #footer="{ close }">
            <div class="flex justify-end gap-2 w-full">
                <UButton color="neutral" variant="ghost" @click="close">Cancel</UButton>
                <UButton color="primary" @click="close">Save Changes</UButton>
            </div>
        </template>
    </UModal>
</template>

<script setup lang="ts">
import type { Department } from '~/types/department'

defineProps<{
    department: Department
}>()

const categories = ['Regulatory', 'Finance', 'Inspection', 'Support']
</script>
