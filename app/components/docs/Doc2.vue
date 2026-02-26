<template>
  <div class="space-y-8 h-full flex flex-col">
    <div class="text-center space-y-1.5">
      <div class="text-[10px] text-gray-400 tracking-widest uppercase">Republic of the Philippines</div>
      <div class="text-[12px] text-gray-500">City of Makati</div>
      <div class="text-lg text-gray-800 font-bold uppercase tracking-tight">BARANGAY SAN LORENZO</div>
      <div class="w-16 h-0.5 bg-blue-400 mx-auto mt-2" />
    </div>
    <div class="text-center mt-8">
      <div class="text-sm text-blue-700 font-bold tracking-widest uppercase">BARANGAY BUSINESS CLEARANCE</div>
      <div class="text-xs text-gray-400 mt-2">No. {{ doc.docNumber }}</div>
    </div>
    <div class="space-y-4 text-xs text-gray-600 px-6 leading-relaxed mt-4">
      <p>TO WHOM IT MAY CONCERN:</p>
      <p class="mt-4">This is to certify that <span class="font-bold">MANILA GRAND HOTEL CORP.</span>, represented by <span class="font-bold">MR. RICARDO VILLANUEVA</span>, has applied for a Barangay Business Clearance for the operation of their business within the jurisdiction of this Barangay.</p>
      <p class="mt-4">After thorough verification, the undersigned finds no derogatory records that would prevent the issuance of this clearance.</p>
      <p class="mt-4">This clearance is valid until <span class="font-bold">December 31, 2026</span>, unless sooner revoked for a valid cause.</p>
    </div>
    <div class="flex justify-between items-end px-6 pt-12 mt-auto">
      <div class="text-[10px] text-gray-400 leading-relaxed">
        <div>Issued on: February 3, 2026</div>
        <div>OR No.: 2026-00456</div>
      </div>
      <div class="text-center">
        <div class="w-32 border-b border-gray-300 mb-2" />
        <div class="text-[10px] text-gray-700 font-bold uppercase">HON. JOSE REYES</div>
        <div class="text-[10px] text-gray-400 font-medium mt-0.5">Barangay Captain</div>
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
