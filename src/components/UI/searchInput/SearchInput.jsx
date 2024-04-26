import React from "react";
import classes from './SearchInput.module.css'

const SearchInput = () => {
    return (
        <div className={`${classes.form__group} ${classes.field}`}>
            <input type="input" className={classes.form__field} placeholder="Name" name="name" id='name' required />
            <label htmlFor="name" className={classes.form__label}>Поиск</label>
        </div>
    );
}

export default SearchInput;