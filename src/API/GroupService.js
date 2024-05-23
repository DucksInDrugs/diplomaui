import { userService } from "./UserService";

export default class GroupService {
    static async getAll() {
        const response = await fetch(
            'http://localhost:33998/api/Groups',
            {
                method: 'get',
                headers: userService.authHeader(`http://localhost:33998/api/Groups`)
            }
        )
        return response.json();
    }

    static async getById(id) {
        const response = await fetch(
            `http://localhost:33998/api/Groups/${id}`,
            {
                method: 'get',
                headers: userService.authHeader(`http://localhost:33998/api/Groups/${id}`)
            }
        )
        return response.json();
    }

    static async create(body) {
        const response = await fetch(
            'http://localhost:33998/api/Groups/',
            {
                method: 'post',
                headers: { 'Content-Type': 'application/json', ...userService.authHeader(`http://localhost:33998/api/Groups`) },
                credentials: 'include',
                body: JSON.stringify(body)
            }
        )
        return response.json();
    }

    static async update(id, body) {
        const response = await fetch(
            `http://localhost:33998/api/Groups/${id}`,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', ...userService.authHeader(`http://localhost:33998/api/Groups/${id}`) },
                body: JSON.stringify(body)
            }
        )
        return response.json();
    }

    static async delete(id) {
        const response = await fetch(
            `http://localhost:33998/api/Groups/${id}`,
            {
                method: 'DELETE',
                headers: userService.authHeader(`http://localhost:33998/api/Groups/${id}`)
            }
        )
        return response.json();
    }
}