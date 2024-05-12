import React from "react";
import { userService } from "../API/UserService";
import { Link } from "react-router-dom";
import { Role } from "../helpers/role";
import Menu from "../components/UI/menu/Menu";
import CompletedTasksService from "../API/CompletedTasksService";
import my from "../gif/my.gif";
import profile from "../gif/profile.gif";
import progress from "../gif/progress.gif";
import mail from "../gif/mail.gif";
import username from "../gif/username.gif";

function Profile() {
    const user = userService.userValue;
    const categories = user.role !== Role.Admin ? [
        {
            id: 1,
            title: "Изменить профиль",
            link: "/profile-update"
        }
    ] :
    [
        {
            id: 1,
            title: "Изменить профиль",
            link: "/profile-update"
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
        {
            id: 5,
            title: "Изменить видео",
            link: "/videos-admin"
        }
    ]

    function forgetProgress() {
        CompletedTasksService.delete(user.id);
        userService.updateProgress(user.id, {progress: 0});
    }

    return (
        <div className="content">
            <Menu menuCategory="Профиль" categories={categories}/>
            <div style={{marginLeft: "300px"}}>
            {user.progress <= 0.25 
            ? <h1>Мой профиль</h1> 
            :   <div style={{display: "flex", justifyContent: "center"}}>
                    <img className="gif" src={my}></img>
                    <img className="gif" src={profile}></img>
                </div>}
            <p>
                {user.progress <= 0.25 ? <strong>Имя пользователя: </strong> : <><img className="gif" src={username}></img> :</>} {user.username}<br />
                {user.progress <= 0.95 ? <strong>Email: </strong> : <><img className="gif" src={mail}></img> :</>} {user.email}<br />
                {user.progress <= 0.5 ? <strong>Прогресс: </strong> : <><img className="gif" src={progress}></img> :</>} {user.progress}
            </p>
            <button type="button" className="btn btn-link" onClick={() => forgetProgress()}>
                Забыть прогресс
            </button>
            </div>
        </div>
    );
}

export default Profile;