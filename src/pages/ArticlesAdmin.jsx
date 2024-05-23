import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ArticleService from '../API/ArticleService';



function ArticlesAdmin() {
    const [articles, setArticles] = useState([])

  useEffect(() => {
    ArticleService.getAll().then(x => setArticles(x));
  }, [])

    function deleteArticle(id) {
        setArticles(articles.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        ArticleService.delete(id).then(() => {
            setArticles(articles => articles.filter(x => x.id !== id));
        });
    }

    return (
        <div className="content">
            <h1>Статьи</h1>
            <Link to='/article-add' className="btn btn-sm btn-success mb-2">Создать</Link>
            <Link to={`/profile`} className="btn btn-sm btn-secondary mb-2">Меню</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '90%' }}>Название статьи</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {articles && articles.map(article =>
                        <tr key={article.id}>
                            <td>{article.title}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`/article-edit/${article.id}`} className="btn btn-sm btn-primary mr-1">Изменить</Link>
                                <button onClick={() => deleteArticle(article.id)} className="btn btn-sm btn-danger" style={{ width: '65px' }} disabled={article.isDeleting}>
                                    {article.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Удалить</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!articles &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <span className="spinner-border spinner-border-lg align-center"></span>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export default ArticlesAdmin;