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
    type ChartConfiguration,
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
                stacked: false,
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
                max: 600,
                ticks: {
                    stepSize: 150,
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

    const data: ChartData<'bar'> = {
        labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
        datasets: [
            {
                label: 'New',
                data: [140, 160, 120, 180, 170, 200, 240, 190],
                backgroundColor: '#84cc16',
                borderRadius: 2,
                categoryPercentage: 0.7, // space between month groups
                barPercentage: 0.7       // space inside group
            },
            {
                label: 'Renewed',
                data: [310, 280, 330, 300, 350, 380, 420, 370],
                backgroundColor: '#ca8a04',
                borderRadius: 2,
                categoryPercentage: 0.7,
                barPercentage: 0.7
            },
            {
                label: 'Closed',
                data: [30, 40, 25, 35, 28, 22, 20, 26],
                backgroundColor: '#ef4444',
                borderRadius: 2,
                categoryPercentage: 0.7,
                barPercentage: 0.7
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
        <div class="mb-4">
            <h3 class="text-lg font-bold text-toned">
                Business Growth
            </h3>
            <p class="text-sm text-dimmed">
                New registrations vs renewals
            </p>
        </div>

        <div class="h-80">
            <canvas ref="canvasRef"></canvas>
        </div>
    </UCard>
</template>
