<template>
    <div class="space-y-8 h-full flex flex-col">
        <div class="text-center space-y-2">
            <div class="text-[11px] text-gray-400 tracking-widest uppercase">Republic of the Philippines</div>
            <div class="text-base text-gray-800 font-bold uppercase">{{ doc?.issuingAuthority }}</div>
        </div>
        <div class="text-center mt-8">
            <div class="text-sm text-gray-600 font-bold tracking-widest uppercase">{{ doc?.name }}</div>
            <div class="text-xs text-gray-400 mt-2">Document No. {{ doc?.docNumber }}</div>
        </div>
        <div class="px-6 space-y-4 text-xs text-gray-600 leading-relaxed mt-10">
            <p>This is to certify that <span class="font-bold">MANILA GRAND HOTEL CORP.</span>, represented by <span
                    class="font-bold">MR. RICARDO VILLANUEVA</span>, has been issued the above-referenced document.</p>
            <div class="grid grid-cols-2 gap-4 text-[11px] mt-8">
                <div class="p-4 rounded-lg bg-gray-50 border border-gray-100">
                    <div class="text-gray-400 font-semibold mb-1">Issue Date</div>
                    <div class="text-gray-700 font-medium">{{ doc?.uploadedDate.split(" — ")[0] }}</div>
                </div>
                <div class="p-4 rounded-lg bg-gray-50 border border-gray-100">
                    <div class="text-gray-400 font-semibold mb-1">Valid Until</div>
                    <div class="text-gray-700 font-medium">{{ doc?.validUntil }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { DocItem } from '~/types/model'

defineProps<{
    doc: DocItem
}>()
</script>
