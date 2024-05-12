import { userService } from "./UserService";

export default class TestService {
    static async getAll() {
        const response = await fetch(
            'http://localhost:5071/api/Tests',
            {
                method: 'get'
            }
        )
        return response.json();
    }

    static async getById(id) {
        const response = await fetch(
            `http://localhost:5071/api/Tests/${id}`,
            {
                method: 'get',
            }
        )
        return response.json();
    }

    static async getByCategoryId(categoryId) {
        const response = await fetch(
            `http://localhost:5071/api/Tests/GetByСategory/${categoryId}`,
            {
                method: 'get',
            }
        )
        return response.json();
    }

    static async create(body) {
        const response = await fetch(
            'http://localhost:5071/api/Tests/',
            {
                method: 'post',
                headers: { 'Content-Type': 'application/json', ...userService.authHeader(`http://localhost:5071/api/Tests/`) },
                credentials: 'include',
                body: JSON.stringify(body)
            }
        )
        return response.json();
    }

    static async update(id, body) {
        const response = await fetch(
            `http://localhost:5071/api/Tests/${id}`,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', ...userService.authHeader(`http://localhost:5071/api/Tests/${id}`) },
                body: JSON.stringify(body)
            }
        )
        return response.json();
    }

    static async delete(id) {
        const response = await fetch(
            `http://localhost:5071/api/Tests/${id}`,
            {
                method: 'DELETE',
                headers: userService.authHeader(`http://localhost:5071/api/Tests/${id}`)
            }
        )
        return response.json();
    }
}