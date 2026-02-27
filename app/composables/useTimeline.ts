import type { Task, DeptReview } from '~/types/model'
import type { TimelineEntry } from '~/types/timeline'

export function useTimeline() {
    const formatDateTime = (val?: string) => {
        if (!val) return ''
        const d = new Date(val)
        const date = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        const time = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
        return `${date} ${time}`
    }

    const getDeptConfig = (dept: string) => {
        const configs: Record<string, { icon: string, color: TimelineEntry['color'] }> = {
            'BPLO': { icon: 'i-lucide-shield', color: 'purple' },
            'City Treasurer': { icon: 'i-lucide-credit-card', color: 'yellow' },
            'Zoning': { icon: 'i-lucide-map-pin', color: 'blue' },
            'Bureau of Fire': { icon: 'i-lucide-flame', color: 'orange' },
            'City Health': { icon: 'i-lucide-stethoscope', color: 'green' },
            'City Engineering': { icon: 'i-lucide-hard-hat', color: 'amber' },
            'Environmental': { icon: 'i-lucide-leaf', color: 'emerald' }
        }
        return configs[dept] || { icon: 'i-lucide-circle', color: 'neutral' }
    }

    const mapReviewToTimeline = (review: DeptReview, taskTitle?: string): TimelineEntry => {
        const config = getDeptConfig(review.department)

        let status: TimelineEntry['status'] = 'pending'
        if (review.status === 'cleared') status = 'completed'
        else if (review.status === 'with issue') status = 'rejected'

        return {
            icon: config.icon,
            color: config.color,
            status,
            title: `${review.department} Review`,
            subtitle: taskTitle,
            actor: review.officer,
            date: formatDateTime(review.timestamp),
            description: review.remarks || 'Awaiting review'
        }
    }

    const generateTimeline = (task: Task): TimelineEntry[] => {
        const timeline: TimelineEntry[] = []

        // 1. Initial Submission
        timeline.push({
            icon: 'i-lucide-file-text',
            color: 'blue',
            status: 'info',
            statusConfig: { icon: 'i-lucide-upload-cloud', color: 'text-blue-400' },
            title: 'Application Submitted',
            subtitle: task.title,
            actor: 'System', // Could be dynamic if we had user info
            date: formatDateTime(task.submitted),
            description: `Online submission for ${task.permit}`
        })

        // 2. Department Reviews (only those with timestamps or status not pending)
        if (task.reviews) {
            const reviewEntries = task.reviews
                .filter(r => r.timestamp || r.status !== 'pending')
                .map(r => mapReviewToTimeline(r, task.title))

            timeline.push(...reviewEntries)
        }

        // 3. Final Step (if done)
        if (task.status === 'done') {
            timeline.push({
                icon: 'i-lucide-party-popper',
                color: 'green',
                status: 'completed',
                title: 'Application Approved',
                subtitle: task.title,
                actor: "Mayor's Office",
                date: '', // No final timestamp in model yet
                description: 'Final business permit issued'
            })
        }

        return timeline
    }

    return { generateTimeline }
}
