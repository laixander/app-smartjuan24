// /server/api/task/[id].ts

import type { Task } from '~/types/model'

export default defineEventHandler((event): Task => {
    const id = Number(getRouterParam(event, 'id'))
    const task = tasks.find((t: Task) => t.id === id)

    if (!task) {
        throw createError({ statusCode: 404, statusMessage: 'Task not found' })
    }

    return task
})
