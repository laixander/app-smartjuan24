import { DEPARTMENTS } from '~/types/department'
import type { Department } from '~/types/department'

export function useDepartments() {
    // In a real app this would fetch, but we'll use our dummy DEPARTMENTS straight from types
    const data = computed(() => DEPARTMENTS)

    const pagination = ref({
        pageIndex: 0,
        pageSize: 6
    })

    const globalFilter = ref('')
    const activeTab = ref('table')
    const categoryFilter = ref('All')

    const cardPageIndex = computed({
        get: () => pagination.value.pageIndex + 1,
        set: (val) => pagination.value.pageIndex = val - 1
    })

    const filteredData = computed(() => {
        let result = data.value

        // Category Filter
        if (categoryFilter.value !== 'All') {
            result = result.filter(item => item.category.label === categoryFilter.value)
        }

        // Global Text Search Filter
        if (globalFilter.value) {
            const search = globalFilter.value.toLowerCase()
            result = result.filter(item =>
                item.name.toLowerCase().includes(search) ||
                item.head.toLowerCase().includes(search) ||
                item.id.toLowerCase().includes(search)
            )
        }

        return result
    })

    const paginatedData = computed(() => {
        const start = pagination.value.pageIndex * pagination.value.pageSize
        const end = start + pagination.value.pageSize
        return filteredData.value.slice(start, end)
    })

    const isAddOpen = ref(false)
    const isEditOpen = ref(false)
    const isDeleteOpen = ref(false)
    const isViewOpen = ref(false)
    const selectedDepartment = ref<Department | null>(null)

    function openEditModal(department: Department) {
        selectedDepartment.value = department
        isEditOpen.value = true
    }

    function openDeleteModal(department: Department) {
        selectedDepartment.value = department
        isDeleteOpen.value = true
    }

    function openViewSlideover(department: Department) {
        selectedDepartment.value = department
        isViewOpen.value = true
    }

    return {
        data,
        pagination,
        globalFilter,
        activeTab,
        categoryFilter,
        cardPageIndex,
        filteredData,
        paginatedData,
        isAddOpen,
        isEditOpen,
        isDeleteOpen,
        isViewOpen,
        selectedDepartment,
        openEditModal,
        openDeleteModal,
        openViewSlideover
    }
}
