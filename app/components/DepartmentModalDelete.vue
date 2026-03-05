<template>
    <UModal :ui="{ header: 'flex items-center justify-between' }">
        <template #header="{close}">
            <h3 class="text-lg font-semibold text-red-500">Remove Department</h3>
            <UButton icon="i-lucide-x" color="neutral" variant="ghost" size="sm" @click="close" />
        </template>
        <template #body>
            <div class="flex items-start gap-4">
                <div class="p-3 bg-red-100 dark:bg-red-900/20 text-red-600 rounded-full flex-shrink-0">
                    <UIcon name="i-lucide-alert-triangle" class="w-6 h-6" />
                </div>
                <div>
                     <h4 class="font-medium text-default text-lg mb-1">Remove {{ department.name }}?</h4>
                     <p class="text-sm text-dimmed">This will permanently delete this department and requires reassigning all {{ department.usersAssigned }} personnel. This action cannot be undone.</p>
                </div>
            </div>
        </template>
        <template #footer="{ close }">
            <div class="flex justify-end gap-2 w-full">
                <UButton color="neutral" variant="ghost" @click="close">Cancel</UButton>
                <UButton color="red" @click="close">Yes, remove department</UButton>
            </div>
        </template>
    </UModal>
</template>

<script setup lang="ts">
import type { Department } from '~/types/department'

defineProps<{
    department: Department
}>()
</script>
