import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { userService } from '../API/UserService';
import {alertService} from "../API/AlertService";


function UpdateProfile() {
    const user = userService.userValue;
    const navigate = useNavigate();
    const initialValues = {
        username: user.username,
        email: user.email,
        role: user.role,
        password: '',
        confirmPassword: ''
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Имя пользователя - обязательное поле'),
        email: Yup.string()
            .email('Email невалиден')
            .required('Email - обязательное поле'),
        password: Yup.string()
            .min(6, 'Пароль должен состоять не менее чем из 6ти символов'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], "Пароль не совпадают")
    });

    function onSubmit(fields, { setStatus, setSubmitting }) {
        setStatus();
        userService.update(user.id, fields)
            .then(() => {
                alertService.success('Изменение успешно', { keepAfterRouteChange: true });
                navigate("/profile");
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    // const [isDeleting, setIsDeleting] = useState(false);
    // function onDelete() {
    //     if (confirm('Are you sure?')) {
    //         setIsDeleting(true);
    //         userService.delete(user.id)
    //             .then(() => alertService.success('Account deleted successfully'));
    //     }
    // }

    return (
        <div className="content">
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, touched, isSubmitting }) => (
                <Form>
                    <h1>Изменить профиль</h1>
                    <div className="form-row">
                        <div className="form-group col">
                            <label>Имя пользователя</label>
                            <Field name="username" type="text" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                            <ErrorMessage name="username" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group col">
                            <label>Email</label>
                            <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                        </div>
                    </div>
                    <h3 className="pt-3">Изменить пароль</h3>
                    <p>Оставьте поля пустыми, чтобы сохранить предыдущий пароль</p>
                    <div className="form-row">
                        <div className="form-group col">
                            <label>Пароль</label>
                            <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group col">
                            <label>Подтвердите пароль</label>
                            <Field name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                            <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="submit" disabled={isSubmitting} className="btn btn-primary mr-2">
                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Изменить
                        </button>
                        {/* <button type="button" onClick={() => onDelete()} className="btn btn-danger" style={{ width: '75px' }} disabled={isDeleting}>
                            {isDeleting
                                ? <span className="spinner-border spinner-border-sm"></span>
                                : <span>Delete</span>
                            }
                        </button> */}
                        <Link to="/profile" className="btn btn-link">Отменить</Link>
                    </div>
                </Form>
            )}
        </Formik>
        </div>
    )
}

export default UpdateProfile;