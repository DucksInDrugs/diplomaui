import { userService } from "./UserService";

export default class ArticleService {
    static async getAll() {
        const response = await fetch(
            'http://localhost:33998/api/Articles',
            {
                method: 'get'
            }
        )
        return response.json();
    }

    static async getById(id) {
        const response = await fetch(
            `http://localhost:33998/api/Articles/${id}`,
            {
                method: 'get',
                headers: userService.authHeader(`http://localhost:33998/api/Articles/${id}`)
            }
        )
        return response.json();
    }

    static async getFirst() {
        const response = await fetch(
            'http://localhost:33998/api/Articles/FirstArticles',
            {
                method: 'get'
            }
        )
        return response.json();
    }

    static async create(body) {
        const response = await fetch(
            'http://localhost:33998/api/Articles/',
            {
                method: 'post',
                headers: { 'Content-Type': 'application/json', ...userService.authHeader(`http://localhost:33998/api/Articles`) },
                credentials: 'include',
                body: JSON.stringify(body)
            }
        )
        return response.json();
    }

    static async update(id, body) {
        const response = await fetch(
            `http://localhost:33998/api/Articles/${id}`,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', ...userService.authHeader(`http://localhost:33998/api/Articles/${id}`) },
                body: JSON.stringify(body)
            }
        )
        return response.json();
    }

    static async delete(id) {
        const response = await fetch(
            `http://localhost:33998/api/Articles/${id}`,
            {
                method: 'DELETE',
                headers: userService.authHeader(`http://localhost:33998/api/Articles/${id}`)
            }
        )
        return response.json();
    }

    static async getByRole(role) {
        const response = await fetch(
            `http://localhost:33998/api/Articles/ArticlesByRole/${role}`,
            {
                method: 'get'
            }
        )
        return response.json();
    }

    static async getByGroupId(groupId) {
        const response = await fetch(
            `http://localhost:33998/api/Articles/ArticlesByGroup/${groupId}`,
            {
                method: 'get'
            }
        )
        return response.json();
    }
}