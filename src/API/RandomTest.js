import { userService } from "./UserService";

export default class RandomTasksService {
    static async getAll() {
        const response = await fetch(
            'http://localhost:33998/api/RandomTasks',
            {
                method: 'get'
            }
        )
        return response.json();
    }

    static async getById(id) {
        const response = await fetch(
            `http://localhost:33998/api/RandomTasks/${id}`,
            {
                method: 'get',
                headers: userService.authHeader(`http://localhost:33998/api/RandomTasks/${id}`)
            }
        )
        return response.json();
    }

    static async create(body) {
        const response = await fetch(
            'http://localhost:33998/api/RandomTasks/',
            {
                method: 'post',
                headers: { 'Content-Type': 'application/json', ...userService.authHeader(`http://localhost:33998/api/RandomTasks`) },
                credentials: 'include',
                body: JSON.stringify(body)
            }
        )
        return response.json();
    }

    static async update(id, body) {
        const response = await fetch(
            `http://localhost:33998/api/RandomTasks/${id}`,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', ...userService.authHeader(`http://localhost:33998/api/RandomTasks/${id}`) },
                body: JSON.stringify(body)
            }
        )
        return response.json();
    }

    static async delete(id) {
        const response = await fetch(
            `http://localhost:33998/api/RandomTasks/${id}`,
            {
                method: 'DELETE',
                headers: userService.authHeader(`http://localhost:33998/api/RandomTasks/${id}`)
            }
        )
        return response.json();
    }
}