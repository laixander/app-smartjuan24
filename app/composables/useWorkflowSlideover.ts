export const useWorkflowSlideover = () => {
    const isOpen = useState('workflow-slideover-open', () => false)

    const openSlideover = () => {
        isOpen.value = true
    }

    const closeSlideover = () => {
        isOpen.value = false
    }

    return {
        isOpen,
        openSlideover,
        closeSlideover
    }
}
