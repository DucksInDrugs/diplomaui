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
import * as xlsx from "xlsx";

function Profile() {
    const user = userService.userValue;
    let categories = [{
        id: 1,
        title: "Изменить профиль",
        link: "/profile-update"
    }]
    if (user.role === Role.SuperTeacher) {
        categories.push({
            id: 2,
            title: "Изменить темы",
            link: "/categories-admin"
        },
        {
            id: 3,
            title: "Изменить тесты",
            link: "/tests-admin"
        },
        {
            id: 4,
            title: "Изменить видео",
            link: "/videos-admin"
        },
        {
            id: 5,
            title: "Изменить группы",
            link: "/groups-admin"
        },
        {
            id: 6,
            title: "Изменить случайные задачи",
            link: "/randomtasks-admin"
        },
        {
            id: 7,
            title: "Изменить статьи",
            link: "/articles-admin"
        })
    }
    else if (user.role === Role.Admin) {
        categories.push(
        {
            id: 2,
            title: "Пользователи",
            link: "/users"
        },
        {
            id: 3,
            title: "Изменить темы",
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
        },
        {
            id: 6,
            title: "Изменить группы",
            link: "/groups-admin"
        },
        {
            id: 7,
            title: "Изменить случайные задачи",
            link: "/randomtasks-admin"
        },
        {
            id: 8,
            title: "Изменить статьи",
            link: "/articles-admin"
        })
    }

    function forgetProgress() {
        CompletedTasksService.delete(user.id);
        userService.updateProgress(user.id, {progress: 0});
    }

    function readFile(e) {
        e.preventDefault();
    if (e.target.files) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = xlsx.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = xlsx.utils.sheet_to_json(worksheet);
            console.log(json);
            const editedJson = json.reduce((res, item) => {
                res.push({ username: item["ФИО "], email: item.Почта, group: item.Направление });
                return res;
            }, []);
            console.log(editedJson)
            userService.uploadUsers(editedJson)
        };
        reader.readAsArrayBuffer(e.target.files[0]);
    }
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
                {user.progress <= 0.5 ? <strong>Прогресс: </strong> : <><img className="gif" src={progress}></img> :</>} {user.progress === 0 ? 0 : user.progress * 100}
            </p>
            {(user.role === Role.Admin || user.role === Role.SuperTeacher) && <Link to={`/results`} className="btn btn-sm btn-secondary mb-2">Результаты</Link>}
            {(user.role === Role.Admin || user.role === Role.SuperTeacher) &&
            <div className="mx-auto">
                <label htmlFor="upload" className="form-label">Добавить пользователей:</label>
                <input className="form-control col-5" type="file" id="upload" onChange={readFile} accept=".xls,.xlsx" />
            </div>}
            <button type="button" className="btn btn-link" onClick={() => forgetProgress()}>
                Забыть прогресс
            </button>
            </div>
        </div>
    );
}

export default Profile;