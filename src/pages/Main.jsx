import '../styles/App.css';
import { Component, useEffect, useState } from 'react';
import { useFetching } from '../hooks/useFetching';
import CategoriesList from '../components/CategoriesList';
import CategoryService from '../API/CategoryService';
import StickyNavbar from '../components/UI/stickyNavbar/StickyNavbar';


function Main() {

  const [categories, setCategories] = useState([])
  
  const [fetchCategories, isCategoriesLoading, categoriesError] = useFetching( async () => {
    const categories = await CategoryService.getAll();//Заменить на getFirst
    setCategories(categories)
  })

  useEffect(() => {
    //fetchCategories()
  }, [])

  return (
    <div className="App">
      <StickyNavbar/>
      <div style={{height: 2000}}>

      </div>
      {categoriesError &&
        <h1>Произошла ошибка ${categoriesError}</h1>
      }
      {isCategoriesLoading
        ? <h1>Идет загрузка</h1>
        : <CategoriesList categories={categories}/>
      }
      <a>Смотреть все категории</a>
    </div>
  );
}

export default Main;