import React from "react";
import CategoryItem from "./CategoryItem";

const CategoriesList = ({categories}) => {
    return (
        <div>
            <h1>Список категорий</h1>
            <ul className="cards">
                {categories.map((category) =>
                    <CategoryItem props={category} key={category.id}/>
                )}
            </ul>
        </div>
    )
}

export default CategoriesList;