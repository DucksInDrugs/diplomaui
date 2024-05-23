import React from "react";
import { Link } from "react-router-dom";
import parse from 'html-react-parser';

const ArticleItem = ({props}) => {
    return (
        <div className="box">
            <div className="box-top">
                <img className="box-image" src={props.imageUrl}/>
                <div className="title-flex">
                    <h3 className="box-title">{props.title}</h3>
                </div>
                <p className="description">{parse(props.description)}</p>
            </div>
            <Link to={`/article/${props.id}`} className="button">Перейти</Link>
        </div>
    )
}

export default ArticleItem;