import { useEffect, useState } from 'react';
import { useFetching } from '../hooks/useFetching';
import GroupService from '../API/GroupService';
import { Link } from 'react-router-dom';
import RandomTestService from '../API/RandomTest';



function RandomTasksAdmin() {
    const [randomTasks, setRandomTasks] = useState([])

  useEffect(() => {
    RandomTestService.getAll().then(x => setRandomTasks(x));
  }, [])

    function deleteTask(id) {
        setRandomTasks(randomTasks.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        RandomTestService.delete(id).then(() => {
            setRandomTasks(randomTasks => randomTasks.filter(x => x.id !== id));
        });
    }

    return (
        <div className="content">
            <h1>Случайные задачи</h1>
            <Link to='/randomtask-add' className="btn btn-sm btn-success mb-2">Создать</Link>
            <Link to={`/profile`} className="btn btn-sm btn-secondary mb-2">Меню</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Ссылка на видео</th>
                        <th style={{ width: '30%' }}>Ссылка на картинку</th>
                        <th style={{ width: '30%' }}>Правильный ответ</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {randomTasks && randomTasks.map(task =>
                        <tr key={task.id}>
                            <td>{task.videoUrl}</td>
                            <td>{task.imageUrl}</td>
                            <td>{task.correctAnswer}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`/randomtask-edit/${task.id}`} className="btn btn-sm btn-primary mr-1">Изменить</Link>
                                <button onClick={() => deleteTask(task.id)} className="btn btn-sm btn-danger" style={{ width: '65px' }} disabled={task.isDeleting}>
                                    {task.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Удалить</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!randomTasks &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <span className="spinner-border spinner-border-lg align-center"></span>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export default RandomTasksAdmin;