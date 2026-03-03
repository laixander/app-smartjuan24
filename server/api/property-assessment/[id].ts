// /server/api/property-assessment/[id].ts

import type { PropertyAssessment } from '~/types/model'

export default defineEventHandler((event): PropertyAssessment | undefined => {
    const id = Number(getRouterParam(event, 'id'))
    return propertyAssessments.find(a => a.id === id)
})
