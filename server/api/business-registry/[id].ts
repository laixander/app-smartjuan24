// /server/api/business-registry/[id].ts

import type { BusinessRegistry } from '~/types/business-registry'

export default defineEventHandler((event): BusinessRegistry => {
    const id = getRouterParam(event, 'id')
    const business = businessRegistryData.find((b: BusinessRegistry) => b.bin === id)

    if (!business) {
        throw createError({ statusCode: 404, statusMessage: 'Business not found' })
    }

    return business
})
