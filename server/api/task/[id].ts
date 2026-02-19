// /server/api/task/[id].ts

export default defineEventHandler((event) => {
    const id = Number(getRouterParam(event, 'id'))
    const task = tasks.find((t: { id: number }) => t.id === id)

    if (!task) {
        throw createError({ statusCode: 404, statusMessage: 'Task not found' })
    }

    return task
})
