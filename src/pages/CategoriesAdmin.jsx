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
        console.log('Удалил, но есть нюанс');
        // setUsers(users.map(x => {
        //     if (x.id === id) { x.isDeleting = true; }
        //     return x;
        // }));
        // userService.delete(id).then(() => {
        //     setUsers(users => users.filter(x => x.id !== id));
        // });
    }

    return (
        <div>
            <h1>Categories</h1>
            <p>All categories from secure (admin only) api end point:</p>
            <Link to='/category-add' className="btn btn-sm btn-success mb-2">Add Category</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '45%' }}>Title</th>
                        <th style={{ width: '45%' }}>PhoroURL</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {categories && categories.map(category =>
                        <tr key={category.id}>
                            <td>{category.title}</td>
                            <td>{category.photourl}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`/category-edit/${category.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteCategory(category.id)} className="btn btn-sm btn-danger" style={{ width: '60px' }} disabled={category.isDeleting}>
                                    {category.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
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