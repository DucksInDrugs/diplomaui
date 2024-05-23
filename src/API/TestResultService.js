import { userService } from "./UserService";

export default class TestResultService {
    static async getAll() {
        const response = await fetch(
            'http://localhost:33998/api/TestResults',
            {
                method: 'get',
                headers: userService.authHeader(`http://localhost:33998/api/TestResults`)
            }
        )
        return response.json();
    }

    static async create(body) {
        const response = await fetch(
            'http://localhost:33998/api/TestResults/',
            {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(body)
            }
        )
        return response.json();
    }
}