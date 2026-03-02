// /server/api/business-registry/index.ts

import type { BusinessRegistry } from '~/types/business-registry'

export default defineEventHandler((): BusinessRegistry[] => {
    return businessRegistryData
})
