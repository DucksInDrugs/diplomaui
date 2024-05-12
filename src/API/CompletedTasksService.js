import { userService } from "./UserService";

export default class CompletedTasksService {
    static async getAll() {
        const response = await fetch(
            'http://localhost:5071/api/CompletedTasks',
            {
                method: 'get'
            }
        )
        return response.json();
    }

    static async getByIds(userId, categoryId) {
        const response = await fetch(
            `http://localhost:5071/api/CompletedTasks/TasksByIds/${userId}/${categoryId}`,
            {
                method: 'get',
            }
        )
        return response.json();
    }

    static async create(body) {
        const response = await fetch(
            'http://localhost:5071/api/CompletedTasks/',
            {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(body)
            }
        )
        return response.json();
    }

    static async delete(userId) {
        const response = await fetch(
            `http://localhost:5071/api/CompletedTasks/${userId}`,
            {
                method: 'DELETE'
            }
        )
        return response.json();
    }
}