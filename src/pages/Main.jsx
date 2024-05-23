import '../styles/App.css';
import { Component, useEffect, useState } from 'react';
import { useFetching } from '../hooks/useFetching';
import CategoriesList from '../components/CategoriesList';
import CategoryService from '../API/CategoryService';
import StickyNavbar from '../components/UI/stickyNavbar/StickyNavbar';
import { Link } from 'react-router-dom';
import Menu from '../components/UI/menu/Menu'
import ArticlesList from '../components/ArticlesList';
import { userService } from '../API/UserService';
import list from "../gif/list.gif";
import theme from "../gif/theme.gif";
import see from "../gif/see.gif";
import all from "../gif/all.gif";
import many from "../gif/many.gif";
import last from "../gif/last.gif";
import book from "../gif/book.gif";
import RandomTasksService from '../API/RandomTest';
import ArticleService from '../API/ArticleService';


function Main() {
  const user = userService.userValue;
  const [categories, setCategories] = useState([])
  const [articles, setArticles] = useState([])
  const [randomTasks, setRandomTasks] = useState([])
  const [randomTask, setRandomTask] = useState([])
  const [inputValue, setInputValue] = useState("")
  const [showAnswer, setShowAnswer] = useState(false)
  
  const [fetchCategories, isCategoriesLoading, categoriesError] = useFetching( async () => {
    const categories = await CategoryService.getAll();//Заменить на getFirst
    setCategories(categories)
  })

  const [fetchRandomTasks, isRandomTasksLoading, randomTasksError] = useFetching( async () => {
    const randomTasks = await RandomTasksService.getAll();
    const startRandomTask = randomTasks[(Math.floor(Math.random() * randomTasks.length))]
    setRandomTask(startRandomTask)
    setRandomTasks(randomTasks.filter(x => x.id !== startRandomTask.id))
  })

  useEffect(() => {
    fetchCategories()
    fetchRandomTasks()
    ArticleService.getAll().then(x => setArticles(x));
  }, [])

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      setShowAnswer(true)      
    }
  }

  function nextRandomTask() {
    setRandomTask(randomTasks[(Math.floor(Math.random() * randomTasks.length))])
    setRandomTasks(randomTasks => randomTasks.filter(x => x.id !== randomTask.id))
    setShowAnswer(false)
  }

  return (
      <div className='content'>
        {isRandomTasksLoading ? <div className='random-task-body'><h1>Идет загрузка</h1></div>
        : <>{randomTasks.length === 0 ? <div className='random-task-body'><h1>Задачи закончились</h1></div> :
        <div className='random-task-body'>
          {showAnswer ? <>{inputValue.toLowerCase() === randomTask.correctAnswer.toLowerCase() ? <><h1>Верный ответ</h1><button type="button" className="btn btn-link" onClick={() => nextRandomTask()}>
                Следующая случайная задача
            </button></> : <><h1>Ответ неверный, верный ответ: {randomTask.correctAnswer}</h1><button type="button" className="btn btn-link" onClick={() => nextRandomTask()}>
                Следующая случайная задача
            </button></>}</>: <>
          {randomTask.imageUrl && <img src={randomTask.imageUrl}></img>}
          {randomTask.videoUrl && 
							<div className="video">
							  <iframe width="560" height="315" src={randomTask.videoUrl} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
							</div>}
              <input type="text" className="form-control" aria-describedby="inputGroup-sizing-default" onChange={e => setInputValue(e.target.value)} onKeyUp={event => handleKeyDown(event)}/>
              </>}
              </div> 
        }</>
        }
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
        {!user || user.progress <= 0.5 ? <h1>Последние статьи</h1> 
        : <h1>
        <img className='gif' src={many}></img>
        <img className='gif' src={last}></img>
        </h1>}
        <ArticlesList articles={articles}/>
        <Link to='/articles'>
        {!user || user.progress <= 0.95 ? <span className='links-to-list'>Смотреть все статьи</span> 
          : <span className='links-to-list'>
            <img className='gif' src={see}></img>
            <img className='gif' src={all}></img>
          </span>}
        </Link>
      </div>
  );
}

export default Main;