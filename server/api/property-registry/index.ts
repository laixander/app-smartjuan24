// /server/api/property-registry/index.ts

import type { PropertyRegistry } from '~/types/property-registry'

export default defineEventHandler((): PropertyRegistry[] => {
    return propertyRegistryData
})
