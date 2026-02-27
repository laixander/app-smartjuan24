<template>
    <div v-if="modelValue" class="fixed inset-0 z-[100] flex font-sans text-sm">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="close" />

        <!-- Viewer Container -->
        <div class="relative flex w-full h-full max-w-full">

            <!-- Main Viewer Area -->
            <div class="flex-1 flex flex-col min-w-0 bg-white">

                <!-- Toolbar -->
                <div
                    class="flex items-center justify-between px-5 py-3 bg-neutral-900 border-b border-neutral-800 shrink-0">

                    <div class="flex items-center gap-4">
                        <UButton icon="i-lucide-arrow-left" label="Back to Documents" variant="link" color="neutral"
                            size="sm" class="p-0" @click="close" />
                        <USeparator orientation="vertical" :ui="{ border: 'border-neutral-700' }" class="h-4" />
                        <div class="flex items-center gap-3">
                            <UBadge icon="i-lucide-file-text" variant="soft"
                                :color="currentDoc?.status === 'verified' ? 'green' : 'yellow'"
                                class="p-2 rounded-lg" />
                            <!-- <div class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                                :class="currentDoc?.status === 'verified' ? 'bg-[#7AA541]/20' : 'bg-amber-500/20'">
                                <UIcon name="i-lucide-file-text" class="w-4 h-4"
                                    :class="currentDoc?.status === 'verified' ? 'text-[#7AA541]' : 'text-amber-400'" />
                            </div> -->
                            <div class="flex flex-col">
                                <div class="text-sm text-white font-semibold leading-tight">{{ currentDoc?.name }}</div>
                                <div
                                    class="text-xs text-white/30 mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
                                    {{ currentDoc?.docNumber }} &middot; {{ currentDoc?.pages }} page{{
                                        currentDoc?.pages !== 1 ? 's' : '' }} &middot; {{ currentDoc?.fileSize }}</div>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center gap-2">
                        <!-- Navigation -->
                        <button @click="navigate('prev')" :disabled="!hasPrev"
                            class="p-2 rounded-md transition-colors flex items-center justify-center"
                            :class="hasPrev ? 'text-neutral-400 hover:text-white hover:bg-white/10' : 'text-neutral-600 cursor-not-allowed'"
                            title="Previous document">
                            <UIcon name="i-lucide-chevron-left" class="w-4 h-4" />
                        </button>
                        <span class="text-xs text-neutral-400 font-medium px-2 min-w-[3rem] text-center">
                            {{ currentIndex + 1 }} / {{ viewableDocs.length }}
                        </span>
                        <button @click="navigate('next')" :disabled="!hasNext"
                            class="p-2 rounded-md transition-colors flex items-center justify-center"
                            :class="hasNext ? 'text-neutral-400 hover:text-white hover:bg-white/10' : 'text-neutral-600 cursor-not-allowed'"
                            title="Next document">
                            <UIcon name="i-lucide-chevron-right" class="w-4 h-4" />
                        </button>

                        <USeparator orientation="vertical" :ui="{ border: 'border-neutral-700' }" class="h-4 mx-2" />

                        <!-- Zoom -->
                        <button @click="zoom = Math.max(50, zoom - 10)"
                            class="p-2 rounded-md text-neutral-400 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center"
                            title="Zoom out">
                            <UIcon name="i-lucide-zoom-out" class="w-4 h-4" />
                        </button>
                        <span class="text-xs text-neutral-300 w-12 text-center font-medium">{{ zoom }}%</span>
                        <button @click="zoom = Math.min(150, zoom + 10)"
                            class="p-2 rounded-md text-neutral-400 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center"
                            title="Zoom in">
                            <UIcon name="i-lucide-zoom-in" class="w-4 h-4" />
                        </button>
                        <button @click="zoom = 100"
                            class="p-2 rounded-md text-neutral-400 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center"
                            title="Reset zoom">
                            <UIcon name="i-lucide-maximize-2" class="w-4 h-4" />
                        </button>

                        <USeparator orientation="vertical" :ui="{ border: 'border-neutral-700' }" class="h-4 mx-2" />

                        <!-- Actions -->
                        <button
                            class="p-2 rounded-md text-neutral-400 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center"
                            title="Print">
                            <UIcon name="i-lucide-printer" class="w-4 h-4" />
                        </button>
                        <button
                            class="p-2 rounded-md text-neutral-400 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center"
                            title="Download">
                            <UIcon name="i-lucide-download" class="w-4 h-4" />
                        </button>
                        <button
                            class="p-2 rounded-md text-neutral-400 hover:text-red-400 hover:bg-white/10 transition-colors flex items-center justify-center"
                            title="Flag issue">
                            <UIcon name="i-lucide-flag" class="w-4 h-4" />
                        </button>

                        <USeparator orientation="vertical" :ui="{ border: 'border-neutral-700' }" class="h-4 mx-2" />

                        <button @click="close"
                            class="p-2 rounded-md text-neutral-400 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center"
                            title="Close viewer">
                            <UIcon name="i-lucide-x" class="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <!-- Document Preview Canvas -->
                <div class="flex-1 overflow-auto bg-neutral-900/10 dark:bg-neutral-900/30 view-bg">
                    <div class="min-h-full min-w-full flex py-10 px-8">
                        <div class="transition-all duration-200 flex-shrink-0 m-auto" :style="{
                            width: `${600 * zoom / 100}px`,
                            height: `${docBaseHeight * zoom / 100}px`
                        }">
                            <div ref="docRef"
                                class="bg-white rounded-xl shadow-lg transition-transform origin-top-left flex flex-col relative"
                                :style="{
                                    width: '600px',
                                    minHeight: '800px',
                                    padding: '60px 48px',
                                    transform: `scale(${zoom / 100})`
                                }">
                                <!-- Watermark for verified -->
                                <div v-if="currentDoc?.status === 'verified'"
                                    class="absolute bottom-12 left-0 right-0 flex justify-center pointer-events-none opacity-90">
                                    <div
                                        class="flex items-center gap-2 px-6 py-3 border-2 border-green-300/40 rounded-xl -rotate-2">
                                        <UIcon name="i-lucide-check-circle" class="size-5 text-green-500" />
                                        <span
                                            class="text-sm text-green-600 font-bold tracking-widest uppercase">Verified</span>
                                    </div>
                                </div>
                                <div v-if="currentDoc?.status === 'pending'"
                                    class="absolute bottom-12 left-0 right-0 flex justify-center pointer-events-none opacity-90">
                                    <div
                                        class="flex items-center gap-2 px-6 py-3 border-2 border-amber-300/50 rounded-xl -rotate-2">
                                        <UIcon name="i-lucide-clock" class="size-5 text-amber-500" />
                                        <span class="text-sm text-amber-600 tracking-widest font-bold uppercase">Pending
                                            Verification</span>
                                    </div>
                                </div>

                                <!-- Custom doc content based on ID -->
                                <template v-if="currentDoc">
                                    <DocsDoc1 v-if="currentDoc.id === 'doc-1'" :doc="currentDoc" />
                                    <DocsDoc2 v-else-if="currentDoc.id === 'doc-2'" :doc="currentDoc" />
                                    <DocsDoc4 v-else-if="currentDoc.id === 'doc-4'" :doc="currentDoc" />
                                    <DocsDoc7 v-else-if="currentDoc.id === 'doc-7'" :doc="currentDoc" />
                                    <DocsDoc8 v-else-if="currentDoc.id === 'doc-8'" :doc="currentDoc" />
                                    <DocsDocGeneric v-else :doc="currentDoc" />
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right Side Panel -->
            <div class="w-[360px] flex-shrink-0 bg-default border-l border-default flex flex-col z-10 shadow-xl">

                <!-- Panel Tabs -->
                <UTabs :items="[
                    { label: 'Details', slot: 'details' as const },
                    { label: 'Audit Trail', slot: 'history' as const },
                ]" variant="link" class="w-full pt-5 flex-1 flex flex-col min-h-0"
                    :ui="{ trigger: 'w-full', content: 'flex-1 overflow-y-auto min-h-0' }">
                    <template #details>
                        <div class="px-6 py-6 space-y-8">

                            <!-- Verification Status -->
                            <UCard :ui="{ body: 'sm:p-4 space-y-3' }">
                                <div class="flex items-center justify-between">
                                    <span class="text-xs font-semibold tracking-wider uppercase">Verification
                                        Status</span>
                                    <UBadge :label="currentDoc?.status"
                                        :color="currentDoc?.status === 'verified' ? 'green' : currentDoc?.status === 'pending' ? 'yellow' : 'red'"
                                        variant="subtle" class="rounded-full capitalize tracking-wide" />
                                </div>

                                <div v-if="currentDoc?.status === 'verified'" class="flex items-start gap-3 mt-1">
                                    <UBadge icon="i-lucide-check-circle" color="green" variant="soft"
                                        class="rounded-full p-2" />
                                    <div>
                                        <div class="text-xs font-bold">Verified by {{
                                            currentDoc?.verifiedBy }}</div>
                                        <div class="text-xs text-muted mt-0.5">{{ currentDoc?.verifiedDate }}
                                        </div>
                                        <div class="text-xs text-dimmed mt-2 leading-relaxed">{{
                                            currentDoc?.remarks }}</div>
                                    </div>
                                </div>

                                <div v-if="currentDoc?.status === 'pending'" class="flex items-start gap-3 mt-1">
                                    <UBadge icon="i-lucide-clock" color="yellow" variant="soft"
                                        class="rounded-full p-2" />
                                    <div>
                                        <div class="text-xs font-bold">Pending Verification</div>
                                        <div class="text-xs text-muted mt-0.5">{{
                                            currentDoc?.remarks }}</div>
                                    </div>
                                </div>
                            </UCard>

                            <!-- Document Info -->
                            <div class="space-y-4">
                                <h4 class="text-xs text-dimmed font-semibold tracking-wider uppercase">Document
                                    Information</h4>
                                <div class="space-y-5">
                                    <div class="flex items-start gap-3">
                                        <div class="w-5 flex justify-center text-dimmed pt-0.5">
                                            <UIcon name="i-lucide-hash" class="w-4 h-4" />
                                        </div>
                                        <div>
                                            <div class="text-xs text-dimmed mb-0.5">Document No.</div>
                                            <div class="text-xs font-semibold">{{ currentDoc?.docNumber }}</div>
                                        </div>
                                    </div>
                                    <div class="flex items-start gap-3">
                                        <div class="w-5 flex justify-center text-dimmed pt-0.5">
                                            <UIcon name="i-lucide-landmark" class="w-4 h-4" />
                                        </div>
                                        <div>
                                            <div class="text-xs text-dimmed mb-0.5">Issuing Authority</div>
                                            <div class="text-xs font-semibold">{{ currentDoc?.issuingAuthority
                                                }}</div>
                                        </div>
                                    </div>
                                    <div class="flex items-start gap-3">
                                        <div class="w-5 flex justify-center text-dimmed pt-0.5">
                                            <UIcon name="i-lucide-calendar" class="w-4 h-4" />
                                        </div>
                                        <div>
                                            <div class="text-xs text-dimmed mb-0.5">Valid Until</div>
                                            <div class="text-xs font-semibold">{{ currentDoc?.validUntil }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex items-start gap-3">
                                        <div class="w-5 flex justify-center text-dimmed pt-0.5">
                                            <UIcon name="i-lucide-file-text" class="w-4 h-4" />
                                        </div>
                                        <div>
                                            <div class="text-xs text-dimmed mb-0.5">File Type</div>
                                            <div class="text-xs font-semibold">{{ currentDoc?.type }} &middot;
                                                {{ currentDoc?.pages }} page{{ currentDoc?.pages !== 1 ? 's' : '' }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex items-start gap-3">
                                        <div class="w-5 flex justify-center text-dimmed pt-0.5">
                                            <UIcon name="i-lucide-scale" class="w-4 h-4" />
                                        </div>
                                        <div>
                                            <div class="text-xs text-dimmed mb-0.5">File Size</div>
                                            <div class="text-xs font-semibold">{{ currentDoc?.fileSize }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Upload Info -->
                            <div class="space-y-4">
                                <h4 class="text-xs text-dimmed font-semibold tracking-wider uppercase">UPLOAD
                                    INFORMATION</h4>
                                <div class="space-y-5">
                                    <div class="flex items-start gap-3">
                                        <div class="w-5 flex justify-center text-dimmed pt-0.5">
                                            <UIcon name="i-lucide-user" class="w-4 h-4" />
                                        </div>
                                        <div>
                                            <div class="text-xs text-dimmed mb-0.5">Uploaded By</div>
                                            <div class="text-xs font-semibold">{{ currentDoc?.uploadedBy }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex items-start gap-3">
                                        <div class="w-5 flex justify-center text-dimmed pt-0.5">
                                            <UIcon name="i-lucide-upload" class="w-4 h-4" />
                                        </div>
                                        <div>
                                            <div class="text-xs text-dimmed mb-0.5">Upload Date</div>
                                            <div class="text-xs font-semibold">{{ currentDoc?.uploadedDate }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Sticky Footer Actions -->
                            <div class="border-t border-default pt-4 space-y-3">
                                <UButton label="Download Document" color="green" icon="i-lucide-download" size="lg"
                                    block />
                                <UButton label="Flag Issue" color="red" icon="i-lucide-flag" size="lg" variant="soft"
                                    block />
                            </div>

                        </div>
                    </template>
                    <template #history>
                        <div class="px-6 py-2">
                            <Timeline :items="timelineItems" hide-subtitle />
                        </div>
                    </template>
                </UTabs>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import type { DocItem } from '~/types/model'
import type { TimelineEntry } from '~/types/timeline'

const mockDocuments: DocItem[] = [
    { id: "doc-1", name: "DTI / SEC / CDA Registration", status: "verified", verifiedBy: "BPLO", type: "PDF", fileSize: "2.4 MB", uploadedBy: "Ricardo Villanueva", uploadedDate: "Feb 5, 2026 — 8:30 AM", verifiedDate: "Feb 6, 2026 — 10:15 AM", pages: 4, docNumber: "SEC-2024-001234567", issuingAuthority: "Securities and Exchange Commission", validUntil: "Dec 31, 2026", remarks: "Corporate registration verified against SEC database." },
    { id: "doc-2", name: "Barangay Business Clearance", status: "verified", verifiedBy: "BPLO", type: "PDF", fileSize: "1.1 MB", uploadedBy: "Ricardo Villanueva", uploadedDate: "Feb 5, 2026 — 8:30 AM", verifiedDate: "Feb 6, 2026 — 10:20 AM", pages: 1, docNumber: "BBC-2026-00456", issuingAuthority: "Barangay San Lorenzo, Makati City", validUntil: "Dec 31, 2026", remarks: "Clearance confirmed with barangay records." }
]

const props = withDefaults(defineProps<{
    modelValue?: boolean,
    document?: DocItem,
    documents?: DocItem[]
}>(), {
    modelValue: false,
})

const emit = defineEmits(['update:modelValue'])

const zoom = ref(100)
const activePanel = ref<'details' | 'history'>('details')

const docRef = ref<HTMLElement | null>(null)
const docBaseHeight = ref(800)
let resizeObserver: ResizeObserver | null = null

onMounted(() => {
    if (docRef.value) {
        resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                docBaseHeight.value = (entry.target as HTMLElement).offsetHeight
            }
        })
        resizeObserver.observe(docRef.value)
    }
})

onUnmounted(() => {
    if (resizeObserver) {
        resizeObserver.disconnect()
    }
})

const allDocs = computed(() => props.documents || mockDocuments)
const viewableDocs = computed(() => allDocs.value.filter(d => d.status !== 'missing'))

const currentId = ref<string>(props.document?.id || mockDocuments[0]?.id || '')

const currentDoc = computed(() => {
    return viewableDocs.value.find(d => d.id === currentId.value) || viewableDocs.value[0]
})

const currentIndex = computed(() => {
    return viewableDocs.value.findIndex(d => d.id === currentDoc.value?.id)
})

const hasPrev = computed(() => currentIndex.value > 0)
const hasNext = computed(() => currentIndex.value < viewableDocs.value.length - 1)

const timelineItems = computed<TimelineEntry[]>(() => {
    if (!currentDoc.value) return []

    const items: TimelineEntry[] = []

    if (currentDoc.value.status === 'verified') {
        items.push({
            icon: 'i-lucide-check-circle',
            color: 'green',
            title: 'Document Verified',
            actor: currentDoc.value.verifiedBy,
            date: currentDoc.value.verifiedDate,
            description: currentDoc.value.remarks
        })
    }

    items.push({
        icon: 'i-lucide-upload',
        color: 'blue',
        title: 'Document Uploaded',
        actor: currentDoc.value.uploadedBy,
        date: currentDoc.value.uploadedDate
    })

    return items
})

const navigate = (dir: 'prev' | 'next') => {
    if (dir === 'prev' && hasPrev.value) {
        const prevDoc = viewableDocs.value[currentIndex.value - 1]
        if (prevDoc) currentId.value = prevDoc.id
    } else if (dir === 'next' && hasNext.value) {
        const nextDoc = viewableDocs.value[currentIndex.value + 1]
        if (nextDoc) currentId.value = nextDoc.id
    }
}

const close = () => {
    emit('update:modelValue', false)
}

watch(() => props.document, (newDoc) => {
    if (newDoc) {
        currentId.value = newDoc.id
    }
})

watch(() => props.modelValue, (isOpen) => {
    if (isOpen) {
        zoom.value = 100
        activePanel.value = 'details'
    }
})
</script>

<style scoped>
.view-bg {
    background-image: radial-gradient(circle at 1px 1px, #d1d5db 1px, transparent 0);
    background-size: 20px 20px;
}
</style>
