import { useEffect, useState } from 'react';
import { useFetching } from '../hooks/useFetching';
import GroupService from '../API/GroupService';
import { Link } from 'react-router-dom';



function GroupsAdmin() {
    const [groups, setGroups] = useState([])

  useEffect(() => {
    GroupService.getAll().then(x => setGroups(x));
  }, [])

    function deleteGroup(id) {
        setGroups(groups.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        GroupService.delete(id).then(() => {
            setGroups(groups => groups.filter(x => x.id !== id));
        });
    }

    return (
        <div className="content">
            <h1>Группы</h1>
            <Link to='/group-add' className="btn btn-sm btn-success mb-2">Создать</Link>
            <Link to={`/profile`} className="btn btn-sm btn-secondary mb-2">Меню</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '90%' }}>Название группы</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {groups && groups.map(group =>
                        <tr key={group.id}>
                            <td>{group.name}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`/group-edit/${group.id}`} className="btn btn-sm btn-primary mr-1">Изменить</Link>
                                <button onClick={() => deleteGroup(group.id)} className="btn btn-sm btn-danger" style={{ width: '65px' }} disabled={group.isDeleting}>
                                    {group.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Удалить</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!groups &&
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

export default GroupsAdmin;