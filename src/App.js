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
import Articles from './pages/Articles';
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
import UpdateProfile from './pages/UpdateProfile';
import VideosAdmin from './pages/VideosAdmin';
import AddOrEditVideo from './pages/AddOrEditVideo';
import Results from './pages/Results';
import GroupsAdmin from './pages/GroupsAdmin';
import AddOrEditGroup from './pages/AddOrEditGroup';
import AddOrEditRandomTask from './pages/AddOrEditRandomTask';
import RandomTasksAdmin from './pages/RandomTasksAdmin';
import ArticlesAdmin from './pages/ArticlesAdmin';
import AddOrEditArticle from './pages/AddOrEditArticle';
import ArticleBody from './pages/ArticleBody';

function App() {
  const [user, setUser] = useState({});

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
        <Route path='/category/:id' element={<PrivateRoute roles={[Role.Admin, Role.User, Role.SpecialUser, Role.SuperTeacher, Role.Teacher]} component={CategoryBody}/>}/>
        <Route path='/articles' element={<Articles/>}/>
        <Route path='/article/:id' element={<ArticleBody/>}/>

        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/profile' element={<PrivateRoute roles={[Role.Admin, Role.User, Role.SpecialUser, Role.SuperTeacher, Role.Teacher]} component={Profile}/>}/>
        <Route path='/profile-update' element={<PrivateRoute roles={[Role.Admin, Role.User, Role.SpecialUser, Role.SuperTeacher, Role.Teacher]} component={UpdateProfile}/>}/>
        <Route path='/users' element={<PrivateRoute roles={[Role.Admin]} component={UsersList}/>}/>
        <Route path='/user-add' element={<PrivateRoute roles={[Role.Admin]} component={AddOrEditProfile}/>}/>
        <Route path='/user-edit/:id' element={<PrivateRoute roles={[Role.Admin]} component={AddOrEditProfile}/>}/>

        <Route path='/categories-admin' element={<PrivateRoute roles={[Role.Admin, Role.SuperTeacher]} component={CategoriesAdmin}/>}/>
        <Route path='/category-add' element={<PrivateRoute roles={[Role.Admin, Role.SuperTeacher]} component={AddOrEditCategory}/>}/>
        <Route path='/category-edit/:id' element={<PrivateRoute roles={[Role.Admin, Role.SuperTeacher]} component={AddOrEditCategory}/>}/>

        <Route path='/tests-admin' element={<PrivateRoute roles={[Role.Admin, Role.SuperTeacher]} component={TestsAdmin}/>}/>
        <Route path='/test-add' element={<PrivateRoute roles={[Role.Admin, Role.SuperTeacher]} component={AddOrEditTest}/>}/>
        <Route path='/test-edit/:id' element={<PrivateRoute roles={[Role.Admin, Role.SuperTeacher]} component={AddOrEditTest}/>}/>

        <Route path='/videos-admin' element={<PrivateRoute roles={[Role.Admin, Role.SuperTeacher]} component={VideosAdmin}/>}/>
        <Route path='/video-add' element={<PrivateRoute roles={[Role.Admin, Role.SuperTeacher]} component={AddOrEditVideo}/>}/>
        <Route path='/video-edit/:id' element={<PrivateRoute roles={[Role.Admin, Role.SuperTeacher]} component={AddOrEditVideo}/>}/>

        <Route path='/groups-admin' element={<PrivateRoute roles={[Role.Admin, Role.SuperTeacher]} component={GroupsAdmin}/>}/>
        <Route path='/group-add' element={<PrivateRoute roles={[Role.Admin, Role.SuperTeacher]} component={AddOrEditGroup}/>}/>
        <Route path='/group-edit/:id' element={<PrivateRoute roles={[Role.Admin, Role.SuperTeacher]} component={AddOrEditGroup}/>}/>

        <Route path='/randomtasks-admin' element={<PrivateRoute roles={[Role.Admin, Role.SuperTeacher]} component={RandomTasksAdmin}/>}/>
        <Route path='/randomtask-add' element={<PrivateRoute roles={[Role.Admin, Role.SuperTeacher]} component={AddOrEditRandomTask}/>}/>
        <Route path='/randomtask-edit/:id' element={<PrivateRoute roles={[Role.Admin, Role.SuperTeacher]} component={AddOrEditRandomTask}/>}/>

        <Route path='/articles-admin' element={<PrivateRoute roles={[Role.Admin, Role.SuperTeacher]} component={ArticlesAdmin}/>}/>
        <Route path='/article-add' element={<PrivateRoute roles={[Role.Admin, Role.SuperTeacher]} component={AddOrEditArticle}/>}/>
        <Route path='/article-edit/:id' element={<PrivateRoute roles={[Role.Admin, Role.SuperTeacher]} component={AddOrEditArticle}/>}/>

        <Route path='/results' element={<PrivateRoute roles={[Role.Admin]} component={Results}/>}/>

        <Route path='*' element={<Navigate to='/error' replace/>}/>
      </Routes>
      <BackToTopButton/>
    </BrowserRouter>
    </>
  );
}


export default App;