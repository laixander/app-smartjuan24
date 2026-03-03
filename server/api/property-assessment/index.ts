// /server/api/property-assessment/index.ts

import type { PropertyAssessment } from '~/types/model'

export default defineEventHandler((): PropertyAssessment[] => {
    return propertyAssessments
})
