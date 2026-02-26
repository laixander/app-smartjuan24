<template>
  <div>
    <!-- A button to trigger the preview -->
    <UButton @click="openPreview(sampleDocument)">
      View Document
    </UButton>

    <!-- The Document Preview Component -->
    <DocumentPreview 
      v-model="isOpen" 
      :document="activeDocument"
      :documents="documentList"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { DocItem } from '~/types/model'

// 1. State for opening/closing the modal
const isOpen = ref(false)

// 2. State for the currently selected document to view
const activeDocument = ref()

// 3. Your list of documents (matching the DocItem interface)
const documentList = ref<DocItem[]>([
  { 
    id: "doc-1", 
    name: "DTI / SEC Registration", 
    status: "verified", 
    verifiedBy: "BPLO", 
    type: "PDF", 
    fileSize: "2.4 MB", 
    uploadedBy: "Ricardo Villanueva", 
    uploadedDate: "Feb 5, 2026 — 8:30 AM", 
    verifiedDate: "Feb 6, 2026 — 10:15 AM", 
    pages: 4, 
    docNumber: "SEC-2024-001234567", 
    issuingAuthority: "Securities and Exchange Commission", 
    validUntil: "Dec 31, 2026", 
    remarks: "Corporate registration verified." 
  },
  { 
    id: "doc-2", 
    name: "Barangay Business Clearance", 
    status: "pending", 
    verifiedBy: "", 
    type: "PDF", 
    fileSize: "1.1 MB", 
    uploadedBy: "Ricardo Villanueva", 
    uploadedDate: "Feb 5, 2026 — 8:30 AM", 
    verifiedDate: "", 
    pages: 1, 
    docNumber: "BBC-2026-00456", 
    issuingAuthority: "Barangay San Lorenzo", 
    validUntil: "Dec 31, 2026", 
    remarks: "Pending barangay confirmation." 
  }
])

const sampleDocument = documentList.value[0]

// 4. Function to open the preview with a specific document
const openPreview = (doc: any) => {
  activeDocument.value = doc
  isOpen.value = true
}
</script>
