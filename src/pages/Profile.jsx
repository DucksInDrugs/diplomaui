import React from "react";
import { userService } from "../API/UserService";
import { Link } from "react-router-dom";
import { Role } from "../helpers/role";

function Profile() {
    const user = userService.userValue;

    return (
        <div>
            <h1>My Profile</h1>
            <p>
                <strong>Username: </strong> {user.Username}<br />
                <strong>Email: </strong> {user.email}
            </p>
            <p><Link to='/'>Update Profile</Link></p>
            {user.role === Role.Admin &&
            <ul>
                <li>
                    <Link to='/users'>
                        Пользователи
                    </Link>
                </li>
                <li>
                    <Link to='/categories-admin'>
                        Категории
                    </Link>
                </li>
                <li>
                    <Link to='/tests-admin'>
                        Тесты
                    </Link>
                </li>
            </ul>
            }
        </div>
    );
}

export default Profile;