import categories from './categories.svg';
import videos from './videos.svg';
import books from './books.svg';
import home from './home.svg';
import React from "react";
import { Link } from "react-router-dom";
import classes from './StickyNavbar.module.css'
import SearchInput from '../searchInput/SearchInput';

const StickyNavbar = () => {
    return (
        <nav className={classes.styckynav}>
            <Link to="/">
                <img src={home} className={classes.images}></img>
                На главную
            </Link>
            <Link to="/categories">
                <img src={categories} className={classes.images}></img>
                Категории
            </Link>
            <Link to="/books">
                <img src={books} className={classes.images}></img>
                Книги
            </Link>
            <Link to="#">   
                <img src={videos} className={classes.images}></img>
                Видео
            </Link>
            <SearchInput/>
        </nav>
    )
}

export default StickyNavbar;