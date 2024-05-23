import CategoriesList from "../components/CategoriesList";
import { useEffect, useState } from 'react';
import { useFetching } from '../hooks/useFetching';
import CategoryService from '../API/CategoryService';
import StickyNavbar from '../components/UI/stickyNavbar/StickyNavbar';



function Categories() {
    const [categories, setCategories] = useState([])
  
    const [fetchCategories, isCategoriesLoading, categoriesError] = useFetching( async () => {
        const categories = await CategoryService.getAll();
    setCategories(categories)
    })

  useEffect(() => {
    fetchCategories()
  }, [])

    return (
        <div className="content">
            {categoriesError &&
                <h1>Произошла ошибка ${categoriesError}</h1>
            }
            {isCategoriesLoading
                ? <h1>Идет загрузка</h1>
                : <CategoriesList categories={categories}/>
            }

        </div>
    );
}

export default Categories;