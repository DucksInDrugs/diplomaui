import React from "react";

const CategoryItem = ({props}) => {
    return (
        <div>
            <strong>{props.title}</strong>
            <div>{props.photoUrl}</div>
        </div>
    )
}

export default CategoryItem;