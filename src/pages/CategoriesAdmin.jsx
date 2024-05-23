import { useEffect, useState } from 'react';
import { useFetching } from '../hooks/useFetching';
import CategoryService from '../API/CategoryService';
import { Link } from 'react-router-dom';



function CategoriesAdmin() {
    const [categories, setCategories] = useState([])

    const [fetchCategories, isCategoriesLoading, categoriesError] = useFetching( async () => {
        const categories = await CategoryService.getAll();
    setCategories(categories)
    })

  useEffect(() => {
    fetchCategories()
  }, [])

    function deleteCategory(id) {
        setCategories(categories.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        CategoryService.delete(id).then(() => {
            setCategories(categories => categories.filter(x => x.id !== id));
        });
    }

    return (
        <div className="content">
            <h1>Темы</h1>
            <Link to='/category-add' className="btn btn-sm btn-success mb-2">Создать</Link>
            <Link to={`/profile`} className="btn btn-sm btn-secondary mb-2">Меню</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '45%' }}>Название категории</th>
                        <th style={{ width: '45%' }}>Ссылка на фото</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {categories && categories.map(category =>
                        <tr key={category.id}>
                            <td>{category.title}</td>
                            <td>{category.photoUrl}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`/category-edit/${category.id}`} className="btn btn-sm btn-primary mr-1">Изменить</Link>
                                <button onClick={() => deleteCategory(category.id)} className="btn btn-sm btn-danger" style={{ width: '65px' }} disabled={category.isDeleting}>
                                    {category.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Удалить</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!categories &&
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

export default CategoriesAdmin;