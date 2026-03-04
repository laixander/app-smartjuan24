import type { PropertyRegistry } from '~/types/property-registry'

export function usePropertyRegistry() {
    const { data: rawData } = useFetch<PropertyRegistry[]>('/api/property-registry')

    const data = computed(() => rawData.value ?? [])

    const pagination = ref({
        pageIndex: 0,
        pageSize: 6
    })

    const globalFilter = ref('')
    const activeTab = ref('table')

    const cardPageIndex = computed({
        get: () => pagination.value.pageIndex + 1,
        set: (val) => pagination.value.pageIndex = val - 1
    })

    const filteredData = computed(() => {
        if (!globalFilter.value) return data.value
        const search = globalFilter.value.toLowerCase()
        return data.value.filter(item =>
            item.owner.toLowerCase().includes(search) ||
            item.tdNo.toLowerCase().includes(search) ||
            item.pin.toLowerCase().includes(search) ||
            item.barangay.toLowerCase().includes(search)
        )
    })

    const paginatedData = computed(() => {
        const start = pagination.value.pageIndex * pagination.value.pageSize
        const end = start + pagination.value.pageSize
        return filteredData.value.slice(start, end)
    })

    const open = ref(false)
    const selectedProperty = ref<PropertyRegistry | null>(null)

    function openModal(property: PropertyRegistry) {
        selectedProperty.value = property
        open.value = true
    }

    return {
        data,
        pagination,
        globalFilter,
        activeTab,
        cardPageIndex,
        filteredData,
        paginatedData,
        open,
        selectedProperty,
        openModal
    }
}
