<template>
  <div class="space-y-8 h-full flex flex-col">
    <div class="text-center space-y-1.5 bg-red-50/50 py-6 -mx-12 -mt-[60px] px-12 rounded-t-xl border-b border-red-100">
      <div class="text-[10px] text-gray-400 tracking-widest uppercase">Republic of the Philippines</div>
      <div class="text-[12px] text-gray-500">Department of the Interior and Local Government</div>
      <div class="text-lg text-red-700 font-bold uppercase tracking-tight mt-1">BUREAU OF FIRE PROTECTION</div>
      <div class="text-[11px] text-gray-400">Makati City Fire Station</div>
    </div>
    <div class="text-center mt-8">
      <div class="inline-flex items-center gap-2 px-5 py-2 bg-red-50 border border-red-100 rounded-full">
        <UIcon name="i-lucide-flame" class="w-4 h-4 text-red-500" />
        <span class="text-xs text-red-700 font-bold tracking-widest uppercase">FIRE SAFETY INSPECTION CERTIFICATE</span>
      </div>
      <div class="text-xs text-gray-400 mt-3">FSIC No. {{ doc.docNumber }}</div>
    </div>
    <div class="px-6 space-y-6 mt-4">
      <div class="grid grid-cols-2 gap-4 text-[11px]">
        <div class="p-4 rounded-lg bg-gray-50 border border-gray-100">
          <div class="text-gray-400 font-semibold mb-1">Establishment</div>
          <div class="text-gray-700 font-medium">Manila Grand Hotel Corp.</div>
        </div>
        <div class="p-4 rounded-lg bg-gray-50 border border-gray-100">
          <div class="text-gray-400 font-semibold mb-1">Occupancy Type</div>
          <div class="text-gray-700 font-medium">Hotel / Commercial</div>
        </div>
        <div class="p-4 rounded-lg bg-gray-50 border border-gray-100">
          <div class="text-gray-400 font-semibold mb-1">Building Area</div>
          <div class="text-gray-700 font-medium">2,500 sqm (5 floors)</div>
        </div>
        <div class="p-4 rounded-lg bg-gray-50 border border-gray-100">
          <div class="text-gray-400 font-semibold mb-1">Inspection Date</div>
          <div class="text-gray-700 font-medium">January 28, 2026</div>
        </div>
      </div>
      <div class="text-xs text-gray-600 space-y-2 p-5 border border-green-200 bg-green-50/50 rounded-xl relative overflow-hidden">
        <div class="absolute right-0 top-0 w-32 h-32 bg-green-500/5 rounded-bl-full -z-10" />
        <div class="text-green-700 font-bold uppercase tracking-wider mb-3">Inspection Findings: COMPLIANT</div>
        <ul class="list-disc ml-5 text-gray-600 space-y-1.5">
          <li>Fire exits — adequate and accessible</li>
          <li>Sprinkler system — operational</li>
          <li>Fire alarm system — tested and working</li>
          <li>Fire extinguishers — properly placed and serviced</li>
        </ul>
      </div>
    </div>
    <div class="flex justify-between items-end px-6 pt-12 mt-auto">
      <div class="text-[10px] text-gray-400">Valid until: Dec 31, 2026</div>
      <div class="text-center">
        <div class="w-32 border-b border-gray-300 mb-2" />
        <div class="text-[10px] text-gray-700 font-bold uppercase">SFIRE LT. JUAN DELA CRUZ</div>
        <div class="text-[10px] text-gray-400 font-medium mt-0.5">Fire Marshal</div>
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
