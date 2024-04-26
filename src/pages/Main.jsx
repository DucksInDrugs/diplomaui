import '../styles/App.css';
import { Component, useEffect, useState } from 'react';
import { useFetching } from '../hooks/useFetching';
import CategoriesList from '../components/CategoriesList';
import CategoryService from '../API/CategoryService';
import StickyNavbar from '../components/UI/stickyNavbar/StickyNavbar';
import { Link } from 'react-router-dom';
import Menu from '../components/UI/menu/Menu'
import BooksList from '../components/BooksList';


function Main() {

  const [categories, setCategories] = useState([])
  
  const [fetchCategories, isCategoriesLoading, categoriesError] = useFetching( async () => {
    const categories = await CategoryService.getAll();//Заменить на getFirst
    setCategories(categories)
  })

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <div className="App">
      <StickyNavbar/>
      <div className='content'>
        {categoriesError &&
          <h1>Произошла ошибка ${categoriesError}</h1>
        }
        {isCategoriesLoading
          ? <h1>Идет загрузка</h1>
          : <CategoriesList categories={categories}/>
        }
        <Link to='/categories'>
          <span className='links-to-list'>Смотреть все категории</span>
        </Link>
        <h1>Последние книги</h1>
        <BooksList books={categories}/>
        <Link to='/books'>
          <span className='links-to-list'>Смотреть все книги</span>
        </Link>
      </div>
    </div>
  );
}

export default Main;