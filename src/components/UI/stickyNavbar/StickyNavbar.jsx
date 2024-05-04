import categories from './categories.svg';
import videos from './videos.svg';
import books from './books.svg';
import home from './home.svg';
import logout from './logout.svg';
import profile from './profile.svg';
import React from "react";
import { Link, NavLink } from "react-router-dom";
import classes from './StickyNavbar.module.css'
import SearchInput from '../searchInput/SearchInput';
import { userService } from '../../../API/UserService';
import { useState, useEffect } from 'react';

const StickyNavbar = () => {
    const [user, setUser] = useState({});

    useEffect(() => {
        const subscription = userService.user.subscribe(x => setUser(x));
        return subscription.unsubscribe;
    }, []);


    return (
        <nav className={classes.styckynav}>
            <NavLink to="/">
                <img src={home} className={classes.images}></img>
                На главную
            </NavLink>
            <NavLink to="/categories">
                <img src={categories} className={classes.images}></img>
                Категории
            </NavLink>
            <NavLink to="/books">
                <img src={books} className={classes.images}></img>
                Книги
            </NavLink>
            <NavLink to="#">   
                <img src={videos} className={classes.images}></img>
                Видео
            </NavLink>
            <SearchInput/>
            { user &&
            <>
            <NavLink to='/profile'>
                <img src={profile} className={classes.images}></img>
            </NavLink>
            <NavLink onClick={userService.logout}>
                <img src={logout} className={classes.images}></img>
                Выход
            </NavLink>
            </>}
        </nav>
    )
}

export default StickyNavbar;