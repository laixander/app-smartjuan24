// /server/api/task/index.ts

import type { Task } from '~/types/model'

export default defineEventHandler((): Task[] => {
    return tasks
})
