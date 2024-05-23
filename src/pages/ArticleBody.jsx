import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArticleService from "../API/ArticleService";
import parse from 'html-react-parser';

function ArticleBody() {
    const { id } = useParams();
    const [article, setArticle] = useState(null)

    useEffect(() => {
		ArticleService.getById(id).then(x => setArticle(x));
	  }, [])

    return (
        <div className="content">
            <h1>{article && article.title}</h1>
            {article && parse(article.htmlText)}
        </div>
    );
}

export default ArticleBody;