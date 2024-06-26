import { userService } from "./UserService";

export default class CategoryService {
    static async getAll() {
        const response = await fetch(
            'http://localhost:33998/api/Categories',
            {
                method: 'get'
            }
        )
        return response.json();
    }

    static async getById(id) {
        const response = await fetch(
            `http://localhost:33998/api/Categories/${id}`,
            {
                method: 'get',
                headers: userService.authHeader(`http://localhost:33998/api/Categories/${id}`)
            }
        )
        return response.json();
    }

    static async getFirstFour() {
        const response = await fetch(
            'http://localhost:33998/api/Categories/FirstCategories',
            {
                method: 'get'
            }
        )
        return response.json();
    }

    static async create(body) {
        const response = await fetch(
            'http://localhost:33998/api/Categories/',
            {
                method: 'post',
                headers: { 'Content-Type': 'application/json', ...userService.authHeader(`http://localhost:33998/api/Categories`) },
                credentials: 'include',
                body: JSON.stringify(body)
            }
        )
        return response.json();
    }

    static async update(id, body) {
        const response = await fetch(
            `http://localhost:33998/api/Categories/${id}`,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', ...userService.authHeader(`http://localhost:33998/api/Categories/${id}`) },
                body: JSON.stringify(body)
            }
        )
        return response.json();
    }

    static async delete(id) {
        const response = await fetch(
            `http://localhost:33998/api/Categories/${id}`,
            {
                method: 'DELETE',
                headers: userService.authHeader(`http://localhost:33998/api/Categories/${id}`)
            }
        )
        return response.json();
    }

    static async getByRole(role) {
        const response = await fetch(
            `http://localhost:33998/api/Categories/CategoriesByRole/${role}`,
            {
                method: 'get'
            }
        )
        return response.json();
    }
}