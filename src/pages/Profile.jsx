import React from "react";
import { userService } from "../API/UserService";
import { Link } from "react-router-dom";
import { Role } from "../helpers/role";
import Menu from "../components/UI/menu/Menu";

function Profile() {
    const user = userService.userValue;
    const categories = user.role !== Role.Admin ? [
        {
            id: 1,
            title: "Изменить профиль",
            link: "/"
        }
    ] :
    [
        {
            id: 1,
            title: "Изменить профиль",
            link: "/"
        },
        {
            id: 2,
            title: "Пользователи",
            link: "/users"
        },
        {
            id: 3,
            title: "Изменить категории",
            link: "/categories-admin"
        },
        {
            id: 4,
            title: "Изменить тесты",
            link: "/tests-admin"
        },
    ]

    return (
        <div className="content">
            <Menu menuCategory="Profile" categories={categories}/>
            <div style={{marginLeft: "300px"}}>
            <h1>My Profile</h1>
            <p>
                <strong>Username: </strong> {user.username}<br />
                <strong>Email: </strong> {user.email}
            </p>
            </div>
        </div>
    );
}

export default Profile;