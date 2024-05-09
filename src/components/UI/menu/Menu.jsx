import React from "react";
import classes from './Menu.module.css'
import { useState } from "react";
import { Link } from "react-router-dom";

const Menu = ({categories, menuCategory}) => {
    const [idHover, setIdHover] = useState(null);
    const [taskIdHover, setTaskIdHover] = useState(null);
    const isTest = menuCategory === "Test";

    return (
        <nav className={classes.sidenav}>
    <ul className={classes.main_buttons}>
      {categories.map((category) =>
        <li onMouseEnter={() => setIdHover(category.id)} onMouseLeave={() => setIdHover(null)} key={category.id}>
          <Link to={isTest ? `/category/${category.id}` : category.link}>
          {category.title}
          </Link>
          
          {/* {idHover === category.id && (
            <ul className={classes.hidden}>
              {category.categoryTasks.map((task) =>
                <li onMouseEnter={() => setTaskIdHover(task.id)} onMouseLeave={() => setTaskIdHover(null)} key={task.id} style={taskIdHover === task.id ? {backgroundColor: '#40424b'} : {}}>{task.taskName}</li>
          )}
          </ul>
          )} */}
        </li>
      )}
    </ul>
</nav>
    );
}

export default Menu;