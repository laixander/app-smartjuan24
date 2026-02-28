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

const industries = [
    { label: 'Retail Trade', value: 42, color: '#84cc16' },
    { label: 'Food & Beverage', value: 18, color: '#ca8a04' },
    { label: 'Services', value: 15, color: '#3b82f6' },
    { label: 'Education', value: 10, color: '#8b5cf6' },
    { label: 'Healthcare', value: 8, color: '#ef4444' }
]

const totalValue = industries.reduce((acc, curr) => acc + curr.value, 0)
const otherValue = 100 - totalValue // The image shows a gray segment for the remaining portion

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
        labels: [...industries.map(i => i.label), 'Others'],
        datasets: [
            {
                data: [...industries.map(i => i.value), otherValue],
                backgroundColor: [
                    ...industries.map(i => i.color),
                    isDark ? '#4b5563' : '#9ca3af' // Others (Gray)
                ],
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
        // Update "Others" color on theme change
        const datasets = chartInstance.data.datasets;
        if (datasets && datasets[0] && Array.isArray(datasets[0].backgroundColor)) {
            datasets[0].backgroundColor[5] = mode === 'dark' ? '#4b5563' : '#9ca3af'
        }
        chartInstance.update()
    }
)

onUnmounted(() => {
    chartInstance?.destroy()
})
</script>

<template>
    <UCard>
        <div class="mb-8">
            <h3 class="text-lg font-bold text-toned">
                Industry Breakdown
            </h3>
            <p class="text-sm text-dimmed">
                By business classification
            </p>
        </div>

        <div class="flex justify-around items-center gap-4">
            <div class="h-48 w-48 relative">
                <canvas ref="canvasRef"></canvas>
            </div>

            <div class="space-y-3">
                <div v-for="industry in industries" :key="industry.label"
                    class="flex items-center justify-between gap-8">
                    <div class="flex items-center gap-3">
                        <div class="w-2.5 h-2.5 rounded-full" :style="{ backgroundColor: industry.color }"></div>
                        <span class="text-sm text-toned">{{ industry.label }}</span>
                    </div>
                    <span class="text-sm font-bold text-toned">{{ industry.value }}%</span>
                </div>
            </div>
        </div>
    </UCard>
</template>
