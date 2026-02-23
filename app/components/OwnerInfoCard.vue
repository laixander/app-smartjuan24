<script setup lang="ts">
import type { OwnerInfo } from '~/types/model'

defineProps<{
    owner: OwnerInfo
}>()
</script>

<template>
    <UCard>
        <template #header>
            <div class="flex items-center gap-2">
                <h3 class="font-bold">Owner Information</h3>
            </div>
        </template>
        <div class="grid grid-cols-3 gap-5">
            <div class="col-span-2 grid grid-cols-2 gap-x-5 gap-y-3">
                <div class="">
                    <div class="text-xs text-dimmed">Full Name</div>
                    <div class="text-sm">{{ owner.fullName }}</div>
                </div>
                <div class="">
                    <div class="text-xs text-dimmed">Contact Number</div>
                    <div class="text-sm">{{ owner.contactNumber }}</div>
                </div>
                <div class="">
                    <div class="text-xs text-dimmed">Email Address</div>
                    <div class="text-sm">{{ owner.email }}</div>
                </div>
                <div class="">
                    <div class="text-xs text-dimmed">Nationality</div>
                    <div class="text-sm">{{ owner.nationality }}</div>
                </div>
                <div class="col-span-2">
                    <div class="text-xs text-dimmed">Address</div>
                    <div class="text-sm">{{ owner.address }}</div>
                </div>
            </div>
            <div
                class="rounded-lg overflow-hidden border border-default h-[160px] bg-elevated flex items-center justify-center relative">
                <img :src="owner.location.image"
                    alt="Map" class="w-full h-full object-cover">
                <div class="absolute inset-0 flex items-center justify-center">
                    <div
                        class="bg-elevated/90 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-sm flex items-center gap-1.5">
                        <UIcon name="i-lucide-map-pin" class="size-5 text-primary" /><span
                            class="text-xs font-semibold">{{ owner.location.name }}</span>
                    </div>
                </div>
            </div>
        </div>
    </UCard>
</template>
