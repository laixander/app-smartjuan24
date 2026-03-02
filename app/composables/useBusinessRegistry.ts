import type { BusinessRegistry } from '~/types/business-registry'

export function useBusinessRegistry() {
    const { data: rawData } = useFetch<BusinessRegistry[]>('/api/business-registry')

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
            item.name.toLowerCase().includes(search) ||
            item.owner.toLowerCase().includes(search) ||
            item.bin.toLowerCase().includes(search) ||
            item.permitNo.toLowerCase().includes(search)
        )
    })

    const paginatedData = computed(() => {
        const start = pagination.value.pageIndex * pagination.value.pageSize
        const end = start + pagination.value.pageSize
        return filteredData.value.slice(start, end)
    })

    const open = ref(false)
    const selectedBusiness = ref<BusinessRegistry | null>(null)

    function openModal(business: BusinessRegistry) {
        selectedBusiness.value = business
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
        selectedBusiness,
        openModal
    }
}
