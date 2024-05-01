export default class CategoryService {
    static async getAll() {
        const response = await fetch(
            'http://localhost:5071/api/Categories',
            {
                method: 'get'
            }
        )
        return response.json();
    }

    static async getById(id) {
        const response = await fetch(
            `http://localhost:5071/api/Categories/${id}`,
            {
                method: 'get',
            }
        )
        return response.json();
    }

    static async getFirstFour() {
        const response = await fetch(
            'http://localhost:5071/api/Categories/',
            {
                method: 'get'
            }
        )
        return response.json();
    }
}