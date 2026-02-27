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
                position: 'bottom',
                align: 'center',
                labels: {
                    usePointStyle: true,
                    pointStyle: 'circle',
                    boxWidth: 6,
                    boxHeight: 6,
                    color: isDark ? '#d1d5db' : '#374151'
                }
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
                max: 80,
                ticks: {
                    stepSize: 20,
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
        labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
        datasets: [
            {
                label: 'New',
                data: [24, 32, 28, 18, 45, 32],
                backgroundColor: '#84cc16',
                borderRadius: 4,
                barPercentage: 0.6,
                categoryPercentage: 0.5
            },
            {
                label: 'Renewal',
                data: [38, 42, 35, 22, 62, 40],
                backgroundColor: '#ca8a04',
                borderRadius: 4,
                barPercentage: 0.6,
                categoryPercentage: 0.5
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
    <UCard>
        <div class="mb-6">
            <h3 class="text-lg font-bold text-toned">
                Monthly Applications
            </h3>
            <p class="text-sm text-dimmed">
                New vs renewal applications over time
            </p>
        </div>

        <div class="h-64">
            <canvas ref="canvasRef"></canvas>
        </div>
    </UCard>
</template>
