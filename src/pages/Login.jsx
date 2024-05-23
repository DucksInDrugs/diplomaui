import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { userService } from "../API/UserService";

import StickyNavbar from '../components/UI/stickyNavbar/StickyNavbar';

function Login() {
    const navigate = useNavigate()

    const initialValues = {
        email: '',
        password: ''
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Email невалиден')
            .required('Email - обязательное поле'),
        password: Yup.string().required('Пароль - обязательное поле')
    });

    function onSubmit({ email, password }, { setSubmitting }) {
        userService.login(email, password)
            .then(() => {
                navigate('/');
            })
            .catch(error => {
                setSubmitting(false);
                alert(error);
            });
    }

    return (
        <div className="content">
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, touched, isSubmitting }) => (
                <Form>
                    <h3 className="card-header">Войти</h3>
                    <div className="card-body">
                        <div className="form-group">
                            <label>Email</label>
                            <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label>Пароль</label>
                            <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-row">
                            <div className="form-group col">
                                <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                                    {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                    Войти
                                </button>
                                <Link to="/register" className="btn btn-link">Регистрация</Link>
                            </div>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
        </div>
    )
}

export default Login;