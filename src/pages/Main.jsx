import '../styles/App.css';
import { Component, useEffect, useState } from 'react';
import { useFetching } from '../hooks/useFetching';
import CategoriesList from '../components/CategoriesList';
import CategoryService from '../API/CategoryService';
import StickyNavbar from '../components/UI/stickyNavbar/StickyNavbar';
import { Link } from 'react-router-dom';
import Menu from '../components/UI/menu/Menu'
import BooksList from '../components/BooksList';
import { userService } from '../API/UserService';
import list from "../gif/list.gif";
import theme from "../gif/theme.gif";
import see from "../gif/see.gif";
import all from "../gif/all.gif";
import many from "../gif/many.gif";
import last from "../gif/last.gif";
import book from "../gif/book.gif";


function Main() {
  const user = userService.userValue;
  const [categories, setCategories] = useState([])
  
  const [fetchCategories, isCategoriesLoading, categoriesError] = useFetching( async () => {
    const categories = await CategoryService.getAll();//Заменить на getFirst
    setCategories(categories)
  })

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
      <div className='content'>
        {categoriesError &&
          <h1>Произошла ошибка ${categoriesError}</h1>
        }
        {isCategoriesLoading
          ? <h1>Идет загрузка</h1>
          : <>
          {!user || user.progress <= 0.5 ? <h1>Список тем</h1>
          : <h1>
            <img className='gif' src={list}></img>
            <img className='gif' src={theme}></img>
          </h1> }
          <CategoriesList categories={categories}/>
          </>
        }
        <Link to='/categories'>
          {!user || user.progress <= 0.95 ? <span className='links-to-list'>Смотреть все темы</span> 
          : <span className='links-to-list'>
            <img className='gif' src={see}></img>
            <img className='gif' src={all}></img>
            <img className='gif' src={theme}></img>
          </span>}
        </Link>
        {!user || user.progress <= 0.5 ? <h1>Последние книги</h1> 
        : <h1>
        <img className='gif' src={many}></img>
        <img className='gif' src={last}></img>
        <img className='gif' src={book}></img>
        </h1>}
        <BooksList books={categories}/>
        <Link to='/books'>
        {!user || user.progress <= 0.95 ? <span className='links-to-list'>Смотреть все книги</span> 
          : <span className='links-to-list'>
            <img className='gif' src={see}></img>
            <img className='gif' src={all}></img>
            <img className='gif' src={book}></img>
          </span>}
        </Link>
      </div>
  );
}

export default Main;