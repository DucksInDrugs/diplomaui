import React from "react";
import CategoryItem from "./CategoryItem";

const CategoriesList = ({categories}) => {
    return (
        <div>
            <h1>Список категорий</h1>
            {categories.map((category) =>
                <CategoryItem props={category} key={category.id}/>
            )}
        </div>
    )
}

export default CategoriesList;