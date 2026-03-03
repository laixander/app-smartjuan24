<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useColorMode } from '#imports'
import {
    Chart,
    BarController,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    type ChartData,
    type ChartOptions
} from 'chart.js'

Chart.register(
    BarController,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
)

Chart.defaults.font.family = 'Inter';

const colorMode = useColorMode()

const canvasRef = ref<HTMLCanvasElement | null>(null)
let chartInstance: Chart<'bar'> | null = null

function getOptions(isDark: boolean): ChartOptions<'bar'> {
    return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: isDark ? '#1f2937' : '#111827',
                padding: 10
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                border: { display: false },
                ticks: {
                    color: isDark ? '#9ca3af' : '#6b7280'
                }
            },
            y: {
                min: 0,
                max: 2,
                ticks: {
                    stepSize: 0.5,
                    color: isDark ? '#9ca3af' : '#6b7280'
                },
                border: { display: false },
                grid: {
                    color: isDark
                        ? 'rgba(255,255,255,0.05)'
                        : 'rgba(0,0,0,0.05)',
                    drawTicks: false
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

    const data: ChartData<'bar'> = {
        labels: ['Draft', 'Review', 'Inspection', 'Evaluation', 'Assessment', 'Completed'],
        datasets: [
            {
                data: [1, 2, 1, 1, 1, 2],
                backgroundColor: [
                    '#9ca3af', // Draft (Gray)
                    '#f59e0b', // Review (Orange/Amber)
                    '#3b82f6', // Inspection (Blue)
                    '#8b5cf6', // Evaluation (Purple)
                    '#f97316', // Assessment (Orange)
                    '#22c55e'  // Completed (Green)
                ],
                borderRadius: 8,
                barThickness: 32,
                maxBarThickness: 40
            }
        ]
    }

    chartInstance = new Chart(ctx, {
        type: 'bar',
        data,
        options: getOptions(isDark)
    })
})

watch(
    () => colorMode.value,
    (mode) => {
        if (!chartInstance) return
        chartInstance.options = getOptions(mode === 'dark')
        chartInstance.update()
    }
)

onUnmounted(() => {
    chartInstance?.destroy()
})
</script>

<template>
    <UCard :ui="{ body: 'lg:flex flex-col lg:h-full' }">
        <div class="flex justify-between items-start mb-6">
            <div>
                <h3 class="text-lg font-bold text-toned">
                    Assessment Pipeline
                </h3>
                <p class="text-sm text-dimmed">
                    Current properties across workflow stages
                </p>
            </div>
            <UBadge color="gray" variant="soft" class="rounded-full px-3 py-1">
                8 total properties
            </UBadge>
        </div>
        <div class="flex-1 flex items-center justify-center">
            <div class="w-full h-64">
                <canvas ref="canvasRef"></canvas>
            </div>
        </div>
    </UCard>
</template>
