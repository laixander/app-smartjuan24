<template>
    <UCard>
        <div class="flex justify-between items-center mb-4">
            <div>
                <h3 class="text-lg font-bold text-toned">
                    Revenue Trend
                </h3>
                <p class="text-sm text-dimmed">
                    Monthly revenue vs target (in millions ₱)
                </p>
            </div>
            <USelect v-model="value" :items="items" class="w-48" />
        </div>

        <div class="h-72">
            <canvas ref="canvasRef"></canvas>
        </div>
    </UCard>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useColorMode } from '#imports'
import {
    Chart,
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Filler,
    Tooltip,
    type ChartConfiguration,
    type ChartData
} from 'chart.js'

Chart.register(
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Filler,
    Tooltip
)

Chart.defaults.font.family = 'Inter';

const colorMode = useColorMode()

const canvasRef = ref<HTMLCanvasElement | null>(null)
let chartInstance: Chart<'line'> | null = null

function createGradient(ctx: CanvasRenderingContext2D, isDark: boolean) {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400)

    if (isDark) {
        gradient.addColorStop(0, 'rgba(132, 204, 22, 0.25)')
        gradient.addColorStop(1, 'rgba(132, 204, 22, 0.02)')
    } else {
        gradient.addColorStop(0, 'rgba(132, 204, 22, 0.35)')
        gradient.addColorStop(1, 'rgba(132, 204, 22, 0.03)')
    }

    return gradient
}

function getChartOptions(isDark: boolean): ChartConfiguration<'line'>['options'] {
    return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: isDark ? '#1f2937' : '#111827',
                padding: 10,
                displayColors: false,
                callbacks: {
                    label: (context) => `₱${context.parsed.y}M`
                }
            }
        },
        scales: {
            x: {
                border: { display: false },
                grid: {
                    color: isDark
                        ? 'rgba(255,255,255,0.05)'
                        : 'rgba(0,0,0,0.05)'
                },
                ticks: {
                    color: isDark ? '#9ca3af' : '#6b7280'
                }
            },
            y: {
                min: 0,
                max: 24,
                ticks: {
                    stepSize: 6,
                    color: isDark ? '#9ca3af' : '#6b7280'
                },
                border: { display: false },
                grid: {
                    color: isDark
                        ? 'rgba(255,255,255,0.05)'
                        : 'rgba(0,0,0,0.05)'
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

    const data: ChartData<'line'> = {
        labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
        datasets: [
            {
                data: [12, 14, 11.5, 15, 15.5, 18, 23, 20],
                borderColor: '#84cc16',
                backgroundColor: createGradient(ctx, isDark),
                fill: true,
                tension: 0.45,
                pointRadius: 0,
                borderWidth: 3
            }
        ]
    }

    chartInstance = new Chart(ctx, {
        type: 'line',
        data,
        options: getChartOptions(isDark)
    })
})

watch(
    () => colorMode.value,
    (mode) => {
        if (!chartInstance || !canvasRef.value) return

        const ctx = canvasRef.value.getContext('2d')
        if (!ctx) return

        const isDark = mode === 'dark'

        if (chartInstance.data.datasets[0]) {
            chartInstance.data.datasets[0].backgroundColor = createGradient(
                ctx,
                isDark
            )
        }

        chartInstance.options = {
            ...chartInstance.options,
            ...getChartOptions(isDark)
        }

        chartInstance.update()
    }
)

onUnmounted(() => {
    chartInstance?.destroy()
})

const value = ref('last-8-months')
const items = [
    { label: 'Last 8 months', value: 'last-8-months' },
    { label: 'Last 12 months', value: 'last-12-months' },
    { label: 'Last 24 months', value: 'last-24-months' }
]
</script>