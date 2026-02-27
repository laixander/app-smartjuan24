<template>
    <div class="space-y-8 h-full flex flex-col">
        <div class="text-center space-y-1.5">
            <div class="text-[10px] text-gray-400 tracking-widest uppercase">Republic of the Philippines</div>
            <div class="text-lg text-gray-800 font-bold uppercase tracking-tight">SECURITIES AND EXCHANGE COMMISSION
            </div>
            <div class="text-[11px] text-gray-400">SEC Building, EDSA Greenhills, Mandaluyong City</div>
        </div>
        <div class="text-center mt-8">
            <div class="text-sm text-gray-600 font-bold tracking-widest uppercase">CERTIFICATE OF INCORPORATION</div>
            <div class="w-16 h-0.5 bg-[#B9A22C] mx-auto mt-3" />
        </div>
        <div class="space-y-4 text-xs text-gray-600 px-6 leading-relaxed mt-4">
            <p>This is to certify that the articles of incorporation and by-laws of</p>
            <p class="text-center text-base text-gray-900 font-bold my-6 uppercase">MANILA GRAND HOTEL CORP.</p>
            <p>duly signed and acknowledged by the incorporators, have been filed with this Commission on <span
                    class="font-bold">March 15, 2024</span> and registered under</p>
            <p class="text-center mt-6">SEC Registration No.: <span class="text-[#B9A22C] font-bold">{{ doc.docNumber
                    }}</span></p>
        </div>
        <div class="grid grid-cols-2 gap-4 px-6 text-[11px] mt-8">
            <div class="border border-gray-100 rounded-lg p-4 bg-gray-50/50">
                <div class="text-gray-400 font-semibold mb-1">Primary Purpose</div>
                <div class="text-gray-700 leading-relaxed">To engage in the hotel and hospitality business</div>
            </div>
            <div class="border border-gray-100 rounded-lg p-4 bg-gray-50/50">
                <div class="text-gray-400 font-semibold mb-1">Authorized Capital Stock</div>
                <div class="text-gray-700 leading-relaxed">₱500,000,000.00</div>
            </div>
            <div class="border border-gray-100 rounded-lg p-4 bg-gray-50/50">
                <div class="text-gray-400 font-semibold mb-1">Term of Existence</div>
                <div class="text-gray-700 leading-relaxed">Perpetual</div>
            </div>
            <div class="border border-gray-100 rounded-lg p-4 bg-gray-50/50">
                <div class="text-gray-400 font-semibold mb-1">Principal Office</div>
                <div class="text-gray-700 leading-relaxed">Unit 2401, One Ayala Tower, Makati City</div>
            </div>
        </div>
        <div class="flex items-end justify-between px-6 pt-12 mt-auto">
            <div class="text-[10px] text-gray-400 leading-relaxed">
                <div>Given under my hand and the seal of this</div>
                <div>Commission on March 15, 2024</div>
            </div>
            <div class="text-center">
                <div class="w-32 border-b border-gray-300 mb-2" />
                <div class="text-[10px] text-gray-500 font-medium">Commissioner</div>
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
