export default class TestService {
    static async getAll() {
        const response = await fetch(
            'http://localhost:33998/api/Tests',
            {
                method: 'get'
            }
        )
        return response.json();
    }

    static async getById(id) {
        const response = await fetch(
            `http://localhost:33998/api/Tests/${id}`,
            {
                method: 'get',
            }
        )
        return response.json();
    }

    static async getByCategoryId(categoryId) {
        const response = await fetch(
            `http://localhost:33998/api/Tests/GetByСategory/${categoryId}`,
            {
                method: 'get',
            }
        )
        return response.json();
    }
}