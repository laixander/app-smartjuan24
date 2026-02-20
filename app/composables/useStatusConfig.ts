export function useStatusConfig() {
    function getStatusConfig(status?: string) {
        switch (status) {
            case 'completed':
                return { icon: 'i-lucide-circle-check-big', color: 'text-primary' }
            case 'pending':
                return { icon: 'i-lucide-clock', color: 'text-yellow-500' }
            case 'rejected':
                return { icon: 'i-lucide-circle-x', color: 'text-red-500' }
            case 'info':
                return { icon: 'i-lucide-info', color: 'text-blue-500' }
            default:
                return { icon: 'i-lucide-circle-check-big', color: 'text-primary' }
        }
    }

    return { getStatusConfig }
}
