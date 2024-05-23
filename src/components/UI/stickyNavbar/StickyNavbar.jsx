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
import up from "../../../gif/up.gif";
import many from "../../../gif/many.gif";
import book from "../../../gif/book.gif";
import theme from "../../../gif/theme.gif";
import quit from "../../../gif/logout.gif";

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
                {!user || user.progress <= 0.95 ? <span>На главную</span> : <img className='gif' src={up}></img>}
                
            </NavLink>
            <NavLink to="/categories">
                <img src={categories} className={classes.images}></img>
                {!user || user.progress <= 0.25 ? <span>Темы</span> 
                : <>
                    <img className='gif' src={many}></img>
                    <img className='gif' src={theme}></img>
                </>}
            </NavLink>
            <NavLink to="/articles">
                <img src={books} className={classes.images}></img>
                {!user || user.progress <= 0.5 ? <span>Статьи</span> 
                : <>
                    <img className='gif' src={many}></img>
                    <img className='gif' src={book}></img>
                </>}
            </NavLink>
            {/* <NavLink to="#">   
                <img src={videos} className={classes.images}></img>
                Видео
            </NavLink> */}
            {/* <SearchInput/> */}
            { user ?
            <div className={classes.profilelink}>
            <NavLink to='/profile'>
                <img src={profile} className={classes.images}></img>
                {user.username}
            </NavLink>
            <NavLink onClick={userService.logout} to='/'>
                <img src={logout} className={classes.images}></img>
                {user.progress <= 0.25 ? <span>Выход</span> : <img className='gif' src={quit}></img>}
            </NavLink>
            </div> 
            : 
            <NavLink to='/login'>
                <img src={profile} className={classes.images}></img>
            </NavLink>}
        </nav>
    )
}

export default StickyNavbar;