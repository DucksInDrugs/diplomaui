import React  from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { alertService } from '../API/AlertService';
import CategoryService from '../API/CategoryService';



function AddOrEditCategory() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isAddMode = !id;
    let isFirstUpdate = true;
    
    const initialValues = {
        title: '',
        photoUrl: '',
        role: '',
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .required('Название темы - обязательное поле'),
        photoUrl: Yup.string()
            .required('Ссылка на фото - обязательное поле'),
        role: Yup.string()
            .required('Роль - обязательное поле'),
    });

    function onSubmit(fields, { setStatus, setSubmitting }) {
        setStatus();
        if (isAddMode) {
            createCategory(fields, setSubmitting);
        } else {
            updateCategory(id, fields, setSubmitting);
        }
    }

    function createCategory(fields, setSubmitting) {
        CategoryService.create(fields)
            .then(() => {
                alertService.success('Тема успешно добавлена', { keepAfterRouteChange: true });
                navigate('/categories-admin');
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    function updateCategory(id, fields, setSubmitting) {
        CategoryService.update(id, fields)
            .then(() => {
                alertService.success('Изменение успешно', { keepAfterRouteChange: true });
                navigate("/categories-admin");
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    return (
        <div className="content">
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, touched, isSubmitting, setFieldValue }) => {
                //useEffect(() => {
                    if(isFirstUpdate){
                        isFirstUpdate = false;
                    if (!isAddMode) {
                        // get user and set form fields
                        CategoryService.getById(id).then(category => {
                            const fields = ['title', 'photoUrl', 'role'];
                            fields.forEach(field => setFieldValue(field, category[field], false));
                        });
                    }
                };
                return (
                //}, []);

                <Form>
                    <h1>{isAddMode ? 'Добавить тему' : 'Изменить тему'}</h1>
                    <div className="form-row">
                        <div className="form-group col">
                            <label>Название темы</label>
                            <Field name="title" type="text" className={'form-control' + (errors.title && touched.title ? ' is-invalid' : '')} />
                            <ErrorMessage name="title" component="div" className="invalid-feedback" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col">
                            <label>Ссылка на фото</label>
                            <Field name="photoUrl" type="text" className={'form-control' + (errors.photoUrl && touched.photoUrl ? ' is-invalid' : '')} />
                            <ErrorMessage name="photoUrl" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group col">
                            <label>Для кого создана тема</label>
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
                    <div className="form-group">
                        <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Сохранить
                        </button>
                        <Link to={`/profile`} className="btn btn-secondary mr-1">Меню</Link>
                        <Link to='/categories-admin' className="btn btn-link">Отменить</Link>
                    </div>
                </Form>
                );
}}
        </Formik>
        </div>
    );
}

export default AddOrEditCategory;