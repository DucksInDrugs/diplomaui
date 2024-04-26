import React from "react";
import classes from './Menu.module.css'
import { useState } from "react";

const Menu = () => {
    const [idHover, setIdHover] = useState(null);
    const [taskIdHover, setTaskIdHover] = useState(null);

   const menu = [
    {
      id: 1,
      categoryName: 'Lorem Ipsum ',
      categoryTasks: [
        {taskName: 'TK-421', id: 1},
        {taskName: 'why aren\'t', id: 2},
        {taskName: 'you at', id: 3},
        {taskName: 'your post?', id: 4}
      ]
    },
    {
      id: 2,
      categoryName: 'Dolor Sit',
      categoryTasks: [
        {taskName: 'Dark', id: 1},
        {taskName: 'Wings', id: 2},
        {taskName: 'Dark', id: 3},
        {taskName: 'Words', id: 4},
        {taskName: 'John SNUUW', id: 5}
      ]
    },
    {
      id: 3,
      categoryName: 'Consectetur',
      categoryTasks: [
        {taskName: 'Lorem', id: 1},
        {taskName: 'Ipsum', id: 2},
        {taskName: 'Dolor', id: 3},
      ]
    },
   ]

    return (
        <nav className={classes.sidenav}>
    <ul className={classes.main_buttons}>
      {menu.map((category) =>
        <li onMouseEnter={() => setIdHover(category.id)} onMouseLeave={() => setIdHover(null)} key={category.id}>
          {category.categoryName}
          {idHover === category.id && (
            <ul className={classes.hidden}>
              {category.categoryTasks.map((task) =>
                <li onMouseEnter={() => setTaskIdHover(task.id)} onMouseLeave={() => setTaskIdHover(null)} key={task.id} style={taskIdHover === task.id ? {backgroundColor: '#40424b'} : {}}>{task.taskName}</li>
          )}
          </ul>
          )}
        </li>
      )}
    </ul>
</nav>
    );
}

export default Menu;