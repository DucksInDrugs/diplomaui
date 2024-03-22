import logo from './logo.svg';
import './styles/App.css';
import { Component, useEffect, useState } from 'react';
import CategoriesList from './components/CategoriesList';
import CategoryService from './API/CategoryService';
import { useFetching } from './hooks/useFetching';
import BackToTopButton from './components/UI/backToTopButton/BackToTopButton';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import StickyNavbar from './components/UI/stickyNavbar/StickyNavbar';
import Main from './pages/Main';

function App() {

  const [categories, setCategories] = useState([])
  
  const [fetchCategories, isCategoriesLoading, categoriesError] = useFetching( async () => {
    const categories = await CategoryService.getAll();
    setCategories(categories)
  })

  useEffect(() => {
    //fetchCategories()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main/>}>
        </Route>
        {/* <Route>
          <Categories/>
        </Route>
        <Route path='/infobycategory'>
          <CategoriesItems/>
        </Route> */}
      </Routes>
      <BackToTopButton/>
    </BrowserRouter>
      
      // {categoriesError &&
      //   <h1>Произошла ошибка ${categoriesError}</h1>
      // }
      // {isCategoriesLoading
      //   ? <h1>Идет загрузка</h1>
      //   : <CategoriesList categories={categories}/>
      // }
      // 
  );
}


export default App;