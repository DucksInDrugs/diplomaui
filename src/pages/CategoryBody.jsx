import React from "react";
import { useParams } from "react-router-dom";

function CategoryBody() {

    const { id } = useParams();

    return (
        <div>
            <h1>
                Тут {id}
            </h1>
        </div>
    );
}

export default CategoryBody;