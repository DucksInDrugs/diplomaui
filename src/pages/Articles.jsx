import React, { useState, useEffect } from "react";
import StickyNavbar from "../components/UI/stickyNavbar/StickyNavbar";
import ArticlesList from "../components/ArticlesList";
import ArticleService from "../API/ArticleService";

function Articles() {
    const [articles, setArticles] = useState([])

    useEffect(() => {
        ArticleService.getAll().then(x => setArticles(x));
      }, [])

    return (
        <div className="content">
            <ArticlesList articles={articles} />
        </div>
    )
}

export default Articles;