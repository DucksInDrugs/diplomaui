import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from 'yup';
import TestService from '../API/TestService';
import { useFetching } from '../hooks/useFetching';
import CategoryService from '../API/CategoryService';

function TestsAdmin() {
    const [tests, setTests] = useState(null);

    useEffect(() => {
        TestService.getAll().then(x => setTests(x));
    }, []);

    function deleteTest(id) {
        setTests(tests.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        TestService.delete(id).then(() => {
            setTests(tests => tests.filter(x => x.id !== id));
        });
    }


    return (
        <div className="content">
            <h1>Тесты</h1>
            <Link to='/test-add' className="btn btn-sm btn-success mb-2">Добавить тест</Link>
            <Link to={`/profile`} className="btn btn-sm btn-secondary mb-2">Меню</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '90%' }}>Название теста</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {tests && tests.map(test =>
                        <tr key={test.id}>
                            <td>{test.testName}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`/test-edit/${test.id}`} className="btn btn-sm btn-primary mr-1">Изменить</Link>
                                <button onClick={() => deleteTest(test.id)} className="btn btn-sm btn-danger" style={{ width: '65px' }} disabled={test.isDeleting}>
                                    {test.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Удалить</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!tests &&
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

export default TestsAdmin;