import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { userService } from '../API/UserService';
import { alertService } from '../API/AlertService';
import GroupService from '../API/GroupService';


function AddOrEditProfile() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isAddMode = !id;
    let isFirstUpdate = true;
    const [groups, setGroups] = useState([])

    useEffect (() => {
        GroupService.getAll().then(x => setGroups(x));
      }, [])
    
    const initialValues = {
        username: '',
        email: '',
        role: '',
        groupId: '',
        password: '',
        confirmPassword: ''
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Имя пользователя - обязательное поле'),
        email: Yup.string()
            .email('Email невалиден')
            .required('Email - обязательное поле'),
        role: Yup.string()
            .required('Роль - обязательное поле'),
        groupId: Yup.string()
        .notRequired(),
        password: Yup.string()
            .concat(isAddMode ? Yup.string().required('Пароль - обязательное поле') : null)
            .min(6, 'Пароль должен состоять не менее чем из 6ти символов'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], "Пароли не совпадают")
    });

    function onSubmit(fields, { setStatus, setSubmitting }) {
        setStatus();
        if (isAddMode) {
            createUser(fields, setSubmitting);
        } else {
            updateUser(id, fields, setSubmitting);
        }
    }

    function createUser(fields, setSubmitting) {
        if (fields.role !== 'User') {
            fields.groupId = null;
        }
        userService.create(fields)
            .then(() => {
                alert('Пользователь успешно добавлен')
                navigate('/users');
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    function updateUser(id, fields, setSubmitting) {
        if (fields.role !== 'User') {
            fields.groupId = null;
        }
        userService.update(id, fields)
            .then(() => {
                alert('Изменение успешно')
                navigate("/users");
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    return (
        <div className="content">
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, touched, isSubmitting, values, setFieldValue }) => {
                //useEffect(() => {
                    if(isFirstUpdate){
                        isFirstUpdate = false;
                    if (!isAddMode) {
                        // get user and set form fields
                        userService.getById(id).then(user => {
                            const fields = ['username', 'email', 'role', 'groupId'];
                            fields.forEach(field => setFieldValue(field, user[field], false));
                        });
                    }
                };
                return (
                //}, []);

                <Form>
                    <h1>{isAddMode ? 'Добавить пользователя' : 'Изменить пользователя'}</h1>
                    <div className="form-row">
                        <div className="form-group col-7">
                            <label>Имя пользователя</label>
                            <Field name="username" type="text" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                            <ErrorMessage name="username" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group col">
                            <label>Группа</label>
                            <Field name="groupId" as="select" disabled={values.role === 'User' ? false : true} className={'form-control' + (errors.groupId && touched.groupId ? ' is-invalid' : '')}>
                                <option value=""></option>
                                {values.role === 'User' && groups && groups.map(group =>
                                <option value={group.id}>{group.name}</option>
                            )}
                            </Field>
                            <ErrorMessage name="groupId" component="div" className="invalid-feedback" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-7">
                            <label>Email</label>
                            <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group col">
                            <label>Роль пользователя</label>
                            <Field name="role" as="select" className={'form-control' + (errors.role && touched.role ? ' is-invalid' : '')}>
                                <option value=""></option>
                                <option value="User">Пользователь</option>
                                <option value="SuperTeacher">Супер учитель</option>
                                <option value="Teacher">Учитель</option>
                                <option value="Admin">Админ</option>
                                <option value="SpecialUser">Специальный пользователь</option>
                            </Field>
                            <ErrorMessage name="role" component="div" className="invalid-feedback" />
                        </div>
                    </div>
                    {!isAddMode &&
                        <div>
                            <h3 className="pt-3">Изменить пароль</h3>
                            <p>Оставьте поля пустыми, чтобы сохранить предыдущий пароль</p>
                        </div>
                    }
                    <div className="form-row">
                        <div className="form-group col">
                            <label>Пароль</label>
                            <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group col">
                            <label>Повторите пароль</label>
                            <Field name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                            <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Сохранить
                        </button>
                        <Link to={`/profile`} className="btn btn-secondary mr-1">Меню</Link>
                        <Link to='/users' className="btn btn-link">Отменить</Link>
                    </div>
                </Form>
                );
}}
        </Formik>
        </div>
    )
}

export default AddOrEditProfile;