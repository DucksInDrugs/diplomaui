import { userService } from "./UserService";

export default class VideoService {
    static async getAll() {
        const response = await fetch(
            'http://localhost:33998/api/Video',
            {
                method: 'get',
                headers: userService.authHeader(`http://localhost:33998/api/Video`)
            }
        )
        return response.json();
    }

    static async getById(id) {
        const response = await fetch(
            `http://localhost:33998/api/Video/${id}`,
            {
                method: 'get',
                headers: userService.authHeader(`http://localhost:33998/api/Video/${id}`)
            }
        )
        return response.json();
    }

    static async getByCategoryId(categoryId) {
        const response = await fetch(
            `http://localhost:33998/api/Video/GetByСategory/${categoryId}`,
            {
                method: 'get',
            }
        )
        return response.json();
    }

    static async create(body) {
        const response = await fetch(
            'http://localhost:33998/api/Video',
            {
                method: 'post',
                headers: { 'Content-Type': 'application/json', ...userService.authHeader(`http://localhost:33998/api/Video`) },
                credentials: 'include',
                body: JSON.stringify(body)
            }
        )
        return response.json();
    }

    static async update(id, body) {
        const response = await fetch(
            `http://localhost:33998/api/Video/${id}`,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', ...userService.authHeader(`http://localhost:33998/api/Video/${id}`) },
                body: JSON.stringify(body)
            }
        )
        return response.json();
    }

    static async delete(id) {
        const response = await fetch(
            `http://localhost:33998/api/Video/${id}`,
            {
                method: 'DELETE',
                headers: userService.authHeader(`http://localhost:33998/api/Video/${id}`)
            }
        )
        return response.json();
    }
}