// /composables/usePropertyAssessmentConfig.ts

import type { PropertyType, RptColumnKey } from '~/types/model'

export function usePropertyAssessmentConfig() {
    const propertyTypeBadge: Record<PropertyType, { label: string; color: 'blue' | 'orange' | 'green' | 'violet' }> = {
        Residential: { label: 'Residential', color: 'blue' },
        Commercial: { label: 'Commercial', color: 'orange' },
        Agricultural: { label: 'Agricultural', color: 'green' },
        Industrial: { label: 'Industrial', color: 'violet' }
    }

    const columnLabels: Record<RptColumnKey, string> = {
        'draft': 'Draft',
        'for-review': 'For Review',
        'dept-clearance': 'Dept. Clearance',
        'inspection': 'Inspection',
        'evaluation': 'Evaluation',
        'assessment': 'Assessment',
        'completed': 'Completed'
    }

    const columnColors: Record<RptColumnKey, string> = {
        'draft': 'text-neutral-500',
        'for-review': 'text-yellow-500',
        'dept-clearance': 'text-purple-500',
        'inspection': 'text-blue-500',
        'evaluation': 'text-pink-500',
        'assessment': 'text-orange-500',
        'completed': 'text-green-500'
    }

    const columnDotColors: Record<RptColumnKey, string> = {
        'draft': 'bg-neutral-400',
        'for-review': 'bg-yellow-400',
        'dept-clearance': 'bg-purple-400',
        'inspection': 'bg-blue-400',
        'evaluation': 'bg-pink-400',
        'assessment': 'bg-orange-400',
        'completed': 'bg-green-400'
    }

    return { propertyTypeBadge, columnLabels, columnColors, columnDotColors }
}
