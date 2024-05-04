export default class VideoService {
    static async getAll() {
        const response = await fetch(
            'http://localhost:33998/api/Video',
            {
                method: 'get'
            }
        )
        return response.json();
    }

    static async getById(id) {
        const response = await fetch(
            `http://localhost:33998/api/Video/${id}`,
            {
                method: 'get',
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
}