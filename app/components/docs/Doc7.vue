<template>
  <div class="space-y-8 h-full flex flex-col">
    <div class="text-center space-y-1.5 bg-[#B9A22C]/5 py-6 -mx-12 -mt-[60px] px-12 rounded-t-xl border-b border-[#B9A22C]/20">
      <div class="text-[10px] text-gray-400 tracking-widest uppercase">Republic of the Philippines</div>
      <div class="text-lg text-[#B9A22C] font-bold uppercase tracking-tight mt-1">COMMUNITY TAX CERTIFICATE</div>
      <div class="text-[11px] text-gray-400">City Treasurer's Office — Makati City</div>
    </div>
    <div class="px-6 mt-8">
      <div class="text-xs text-gray-500 font-bold mb-6">CTC No.: {{ doc.docNumber }}</div>
      <div class="grid grid-cols-2 gap-6 text-xs">
        <div class="space-y-5">
          <div><span class="text-gray-400 block mb-1">Name:</span><div class="text-gray-800 font-semibold text-sm">Ricardo Villanueva</div></div>
          <div><span class="text-gray-400 block mb-1">Address:</span><div class="text-gray-800 font-medium leading-relaxed">Unit 2401, One Ayala Tower, Makati City</div></div>
          <div><span class="text-gray-400 block mb-1">Citizenship:</span><div class="text-gray-800 font-medium">Filipino</div></div>
        </div>
        <div class="space-y-5">
          <div><span class="text-gray-400 block mb-1">Date of Issue:</span><div class="text-gray-800 font-medium">January 15, 2026</div></div>
          <div><span class="text-gray-400 block mb-1">Place of Issue:</span><div class="text-gray-800 font-medium">Makati City</div></div>
          <div><span class="text-gray-400 block mb-1">Amount Paid:</span><div class="text-[#B9A22C] font-bold text-sm">₱10,005.00</div></div>
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
