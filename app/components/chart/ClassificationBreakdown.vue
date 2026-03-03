<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useColorMode } from '#imports'
import {
    Chart,
    DoughnutController,
    ArcElement,
    Tooltip,
    Legend,
    type ChartData,
    type ChartOptions
} from 'chart.js'

Chart.register(
    DoughnutController,
    ArcElement,
    Tooltip,
    Legend
)

Chart.defaults.font.family = 'Inter';

const colorMode = useColorMode()
const canvasRef = ref<HTMLCanvasElement | null>(null)
let chartInstance: Chart<'doughnut'> | null = null

const classifications = [
    { label: 'Residential', value: 45, color: '#3b82f6' },
    { label: 'Commercial', value: 25, color: '#ef4444' },
    { label: 'Agricultural', value: 15, color: '#22c55e' },
    { label: 'Industrial', value: 10, color: '#8b5cf6' },
    { label: 'Others', value: 5, color: '#9ca3af' }
]

function getOptions(isDark: boolean): ChartOptions<'doughnut'> {
    return {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: isDark ? '#1f2937' : '#111827',
                padding: 10,
                callbacks: {
                    label: (context) => ` ${context.label}: ${context.raw}%`
                }
            }
        }
    }
}

onMounted(() => {
    if (!canvasRef.value) return
    const ctx = canvasRef.value.getContext('2d')
    if (!ctx) return

    const isDark = colorMode.value === 'dark'

    const data: ChartData<'doughnut'> = {
        labels: classifications.map(c => c.label),
        datasets: [
            {
                data: classifications.map(c => c.value),
                backgroundColor: classifications.map((c) =>
                    c.label === 'Others'
                        ? (isDark ? '#4b5563' : '#9ca3af')
                        : c.color
                ),
                hoverOffset: 4,
                borderWidth: 0
            }
        ]
    }

    chartInstance = new Chart(ctx, {
        type: 'doughnut',
        data,
        options: getOptions(isDark)
    })
})

watch(
    () => colorMode.value,
    (mode) => {
        if (!chartInstance) return
        chartInstance.options = getOptions(mode === 'dark')
        const datasets = chartInstance.data.datasets
        if (datasets && datasets[0] && Array.isArray(datasets[0].backgroundColor)) {
            const othersIndex = classifications.findIndex(c => c.label === 'Others')
            datasets[0].backgroundColor[othersIndex] = mode === 'dark' ? '#4b5563' : '#9ca3af'
        }
        chartInstance.update()
    }
)

onUnmounted(() => {
    chartInstance?.destroy()
})
</script>

<template>
    <UCard :ui="{ body: 'flex flex-col h-full' }">
        <div class="mb-6">
            <h3 class="text-lg font-bold text-toned">
                Classification Breakdown
            </h3>
            <p class="text-sm text-dimmed">
                By property type
            </p>
        </div>

        <div class="flex justify-around items-center gap-4 flex-1">
            <div class="h-48 w-48 relative">
                <canvas ref="canvasRef"></canvas>
            </div>

            <div class="space-y-3">
                <div v-for="item in classifications" :key="item.label"
                    class="flex items-center justify-between gap-8">
                    <div class="flex items-center gap-3">
                        <div class="w-2.5 h-2.5 rounded-full" :style="{ backgroundColor: item.color }"></div>
                        <span class="text-sm text-toned">{{ item.label }}</span>
                    </div>
                    <span class="text-sm font-bold text-toned">{{ item.value }}%</span>
                </div>
            </div>
        </div>
    </UCard>
</template>
