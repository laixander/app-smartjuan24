<template>
  <div class="space-y-8 h-full flex flex-col">
    <div class="text-center space-y-1.5 mt-8">
      <div class="text-xl text-gray-800 font-bold uppercase tracking-widest">CONTRACT OF LEASE</div>
      <div class="w-16 h-0.5 bg-gray-300 mx-auto mt-4" />
    </div>
    <div class="text-xs text-gray-600 px-6 space-y-6 mt-8 leading-relaxed">
      <p class="font-bold tracking-widest uppercase text-gray-500">KNOW ALL MEN BY THESE PRESENTS:</p>
      <p>This Contract of Lease made and entered into by and between:</p>
      <div class="pl-4 space-y-4">
        <div class="p-4 bg-gray-50 rounded-xl border border-gray-100">
          <div class="text-[11px] text-gray-400 font-bold tracking-wider mb-2">LESSOR</div>
          <div class="text-gray-800 font-bold text-sm uppercase">AYALA LAND, INC.</div>
          <div class="text-xs text-gray-500 mt-1">represented by its authorized officer</div>
        </div>
        <div class="p-4 bg-gray-50 rounded-xl border border-gray-100">
          <div class="text-[11px] text-gray-400 font-bold tracking-wider mb-2">LESSEE</div>
          <div class="text-gray-800 font-bold text-sm uppercase">MANILA GRAND HOTEL CORP.</div>
          <div class="text-xs text-gray-500 mt-1">represented by Ricardo Villanueva, President</div>
        </div>
      </div>
      <div class="grid grid-cols-3 gap-3 text-[11px] mt-8">
        <div class="p-3 rounded-lg bg-gray-50 border border-gray-100">
          <div class="text-gray-400 font-semibold mb-1">Lease Period</div>
          <div class="text-gray-700 font-medium">5 years</div>
        </div>
        <div class="p-3 rounded-lg bg-gray-50 border border-gray-100">
          <div class="text-gray-400 font-semibold mb-1">Monthly Rental</div>
          <div class="text-gray-700 font-medium">₱1,500,000.00</div>
        </div>
        <div class="p-3 rounded-lg bg-gray-50 border border-gray-100">
          <div class="text-gray-400 font-semibold mb-1">Expiry</div>
          <div class="text-gray-700 font-medium">Feb 28, 2030</div>
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
