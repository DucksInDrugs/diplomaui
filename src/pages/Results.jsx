import { useEffect, useState } from 'react';
import { useFetching } from '../hooks/useFetching';
import CategoryService from '../API/CategoryService';
import { Link } from 'react-router-dom';
import TestResultService from '../API/TestResultService';
import Select from 'react-select';


function Results() {
    const [results, setResults] = useState([])
    const [arrayCopy, setArrayCopy] = useState([])
    const [users, setUsers] = useState([]);
    const [groups, setGroups] = useState([]);
    const [categories, setCategories] = useState([]);
    const [settedUser, SetSettedUser] = useState(null);
    const [settedGroup, SetSettedGroup] = useState(null);
    const [settedCategory, SetSettedCategory] = useState(null);


    const [fetchResults, isResultsLoading, resultsError] = useFetching( async () => {
		const results = await TestResultService.getAll()
		setResults(results)
        setArrayCopy(results)

        const propUser = results.reduce((res, item) => {
            res.push({ value: item.userId, label: item.username });
            return res;
        }, []);
        let setUser = new Set(propUser.map(JSON.stringify));

        const propGroup = results.reduce((res, item) => {
            res.push({ value: item.groupId, label: item.name });
            return res;
        }, []);
        let setGroup = new Set(propGroup.map(JSON.stringify));
        setGroup.delete("{\"value\":null,\"label\":null}")

        const propCategory = results.reduce((res, item) => {
            res.push({ value: item.categoryId, label: item.title });
            return res;
        }, []);
        let setCategory = new Set(propCategory.map(JSON.stringify));

        setUsers(Array.from(setUser).map(JSON.parse));
        setCategories(Array.from(setCategory).map(JSON.parse))
        setGroups(Array.from(setGroup).map(JSON.parse))
	  })

  useEffect(() => {
    fetchResults()
  }, [])

    function sortByUser(user) {
        if (user == null) {
            if(settedCategory == null && settedGroup == null) {
                setArrayCopy(results)
            }
            else {
            let filteredResult = results.filter((result) => {
                return (settedCategory != null ? result.title === settedCategory.label : results) && (settedGroup != null ? result.name === settedGroup.label : results)
            })
            setArrayCopy(filteredResult)
        }
        }
        else {
            if(settedCategory == null && settedGroup == null) {
                let filteredResults = results.filter((result) => {
                    return result.username === user.label
                });
                setArrayCopy(filteredResults)
            }
            else {
        let filteredResults = arrayCopy.filter((result) => {
            return result.username === user.label
        });
        setArrayCopy(filteredResults)
    }
    }
    SetSettedUser(user);
    }
    
    function sortByCategory(category) {
        if (category == null) {
            if(settedUser == null && settedGroup == null) {
               setArrayCopy(results) 
            }
            else {
                let filteredResult = results.filter((result) => {
                return (settedUser != null ? result.username === settedUser.label : results) && (settedGroup != null ? result.name === settedGroup.label : results)
            })
            setArrayCopy(filteredResult)}
        }
        else {
            if (settedUser == null && settedGroup == null) {
                let filteredResults = results.filter((result) => {
                    return result.title === category.label
                });
                setArrayCopy(filteredResults)
            }
            else {
            let filteredResults = arrayCopy.filter((result) => {
            return result.title === category.label
        });
        setArrayCopy(filteredResults)
    }
    }
    SetSettedCategory(category);
    }  

    function sortByGroup(group) {
        if (group == null) {
            if (settedCategory == null && settedUser == null) {
                setArrayCopy(results)
            }
            else {
                let filteredResult = results.filter((result) => {
                return (settedCategory != null ? result.title === settedCategory.label : results) && (settedUser != null ? result.username === settedUser.label : results)
            })
            setArrayCopy(filteredResult)}
        }
        else {
            if (settedCategory == null && settedUser == null) {
                let filteredResults = results.filter((result) => {
                    return result.name === group.label
                });
                setArrayCopy(filteredResults)
            }
            else {
            let filteredResults = arrayCopy.filter((result) => {
            return result.name === group.label
        });
        setArrayCopy(filteredResults)
    }
    }
    SetSettedGroup(group)
    }  


    function getFormattedDate(date) {
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();

        day = (day < 10) ? '0' + day : day;
        month = (month < 10) ? '0' + month : month;
        hours = (hours < 10) ? '0' + hours : hours;
        minutes = (minutes < 10) ? '0' + minutes : minutes;
        seconds = (seconds < 10) ? '0' + seconds : seconds;

        return day + "/" + month + "/" + year + " " + hours + ":" + minutes + ":" + seconds;
    }

    return (
        <div className="content">
            <h1>Результаты тестирования</h1>
            <Link to={`/profile`} className="btn btn-sm btn-secondary mb-2">Вернуться</Link>
            {!isResultsLoading &&<div className="form-row">
                <div className="form-group col-4">
            <Select placeholder={"Поиск по пользователю"} options={users} onChange={e => sortByUser(e)}  isClearable={true} isSearchable={true} />
            </div>
            <div className="form-group col-4">
            <Select placeholder={"Поиск по группам"} options={groups} onChange={e => sortByGroup(e)}  isClearable={true} isSearchable={true} />
            </div>
            <div className="form-group col-4">
            <Select placeholder={"Поиск по темам"} options={categories} onChange={e => sortByCategory(e)}  isClearable={true} isSearchable={true} /></div></div>}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '25%' }}>Имя пользователя</th>
                        <th style={{ width: '25%' }}>Группа</th>
                        <th style={{ width: '25%' }}>Тема</th>
                        <th style={{ width: '20%' }}>Время выполнения</th>
                        <th style={{ width: '5%' }}>Результат</th>
                    </tr>
                </thead>
                <tbody>
                    {arrayCopy && arrayCopy.map(result =>
                        <tr key={result.id}>
                            <td>{result.username}</td>
                            <td>{result.name}</td>
                            <td>{result.title}</td>
                            <td>{getFormattedDate(new Date(result.passDate))}</td>
                            <td>{result.result}</td>
                        </tr>
                    )}
                    {!results &&
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

export default Results;