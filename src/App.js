import logo from './logo.svg';
import './styles/App.css';
import { Component, useEffect, useState } from 'react';
import CategoriesList from './components/CategoriesList';
import CategoryService from './API/CategoryService';
import { useFetching } from './hooks/useFetching';
import BackToTopButton from './components/UI/backToTopButton/BackToTopButton';
import { BrowserRouter, Link, Route, Routes, Navigate } from 'react-router-dom';
import StickyNavbar from './components/UI/stickyNavbar/StickyNavbar';
import Main from './pages/Main';
import Error from './pages/Error';
import Categories from './pages/Categories';
import CategoryBody from './pages/CategoryBody';
import Books from './pages/Books';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import UsersList from './pages/UsersList';
import AddOrEditProfile from './pages/AddOrEditProfile';
import AddOrEditCategory from './pages/AddOrEditCategory';
import AddOrEditTest from './pages/AddOrEditTest';
import TestsAdmin from './pages/TestsAdmin';
import CategoriesAdmin from './pages/CategoriesAdmin';
import { userService } from './API/UserService'
import { Role } from './helpers/role'

function App() {
  const [user, setUser] = useState({});


  const [categories, setCategories] = useState([])
  
  const [fetchCategories, isCategoriesLoading, categoriesError] = useFetching( async () => {
    const categories = await CategoryService.getAll();
    setCategories(categories)
  })

  useEffect(() => {
    const subscription = userService.user.subscribe(x => setUser(x));
    return subscription.unsubscribe;
}, []);

  return (
    <>
    <BrowserRouter>
    <StickyNavbar/>
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/error' element={<Error/>}/>
        <Route path='/categories' element={<Categories/>}/>
        <Route path='/category/:id' element={<PrivateRoute roles={[Role.Admin, Role.User, Role.SpecialUser]} component={CategoryBody}/>}/>
        <Route path='/books' element={<Books/>}/>

        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/users' element={<PrivateRoute roles={[Role.Admin]} component={UsersList}/>}/>
        <Route path='/user-add' element={<PrivateRoute roles={[Role.Admin]} component={AddOrEditProfile}/>}/>
        <Route path='/user-edit/:id' element={<PrivateRoute roles={[Role.Admin]} component={AddOrEditProfile}/>}/>

        <Route path='/categories-admin' element={<PrivateRoute roles={[Role.Admin]} component={CategoriesAdmin}/>}/>
        <Route path='/category-add' element={<PrivateRoute roles={[Role.Admin]} component={AddOrEditCategory}/>}/>
        <Route path='/category-edit/:id' element={<PrivateRoute roles={[Role.Admin]} component={AddOrEditCategory}/>}/>

        <Route path='/tests-admin' element={<PrivateRoute roles={[Role.Admin]} component={TestsAdmin}/>}/>
        <Route path='/test-add' element={<PrivateRoute roles={[Role.Admin]} component={AddOrEditTest}/>}/>
        <Route path='/test-edit/:id' element={<PrivateRoute roles={[Role.Admin]} component={AddOrEditTest}/>}/>

        <Route path='*' element={<Navigate to='/error' replace/>}/>
      </Routes>
      <BackToTopButton/>
    </BrowserRouter>
    </>
  );
}


export default App;