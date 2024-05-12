import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { alertService } from "../API/AlertService";
import { userService } from '../API/UserService';

function Register({history}) {
    const initialValues = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    };
    const navigate = useNavigate()

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Имя пользователя - обязательное поле'),
        email: Yup.string()
            .email('Email невалиден')
            .required('Email - обязательное поле'),
        password: Yup.string()
            .min(6, 'Пароль должен состоять не менее чем из 6ти символов')
            .required('Пароль - обязательное поле'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Пароли не совпадают')
            .required('Подтвердите пароль'),
    });

    function onSubmit(fields, { setStatus, setSubmitting }) {
        setStatus();
        userService.register(fields)
            .then(() => {
                alertService.success('Регистрация успешна', { keepAfterRouteChange: true });
                navigate('/login');
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    return (
        <div className="content">
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, touched, isSubmitting }) => (
                <Form>
                    <h3 className="card-header">Регистрация</h3>
                    <div className="card-body">
                        <div className="form-group">
                            <label>Имя пользователя</label>
                            <Field name="username" type="text" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                            <ErrorMessage name="username" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                        </div>
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
                            <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                                {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Зарегистрироваться
                            </button>
                            <Link to="/Login" className="btn btn-link">Отменить</Link>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
        </div>
    )
}

export default Register;