import React from "react";
import { Link } from "react-router-dom";

const CategoryItem = ({props}) => {
    return (
        <li className="card">
            <Link to={`/category/${props.id}`}>
                <img src="https://www.w3schools.com/images/picture.jpg"/>
                <div className="card-text">
                    <strong>{props.title}</strong>
                    <p className="card-description">Тут описание категории</p>
                    <div>{props.photoUrl}</div>
                </div>
            </Link>
        </li>
    )
}

export default CategoryItem;