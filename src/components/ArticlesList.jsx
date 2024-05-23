import React from "react";
import ArticleItem from "./ArticleItem";

const ArticlesList = ({articles}) => {
    return (
            <div className="wrap">
                {articles.map((article) =>
                    <ArticleItem props={article} key={article.id}/>
                )}
            </div>
    )
}

export default ArticlesList;