import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from 'yup';
import { alertService } from '../API/AlertService';
import VideoService from '../API/VideoService';
import { useFetching } from '../hooks/useFetching';
import CategoryService from '../API/CategoryService';


function AddOrEditVideo() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isAddMode = !id;
    let isFirstUpdate = true;
    const [categories, setCategories] = useState([])


  useEffect(() => {
    CategoryService.getAll().then(x => setCategories(x));
  }, [])
    
    const initialValues = {
        categoryId: '',
        link: '',
        title: '',
    };

    const validationSchema = Yup.object().shape({
        categoryId: Yup.string()
            .required('Тема - обязательное поле'),
        link: Yup.string()
            .required('Ссылка - обязательное поле'),
        title: Yup.string()
            .required('Название - обязательное поле'),
    });

    function onSubmit(fields, { setStatus, setSubmitting }) {
        setStatus();
        if (isAddMode) {
            createVideo(fields, setSubmitting);
        } else {
            updateVideo(id, fields, setSubmitting);
        }
    }

    function createVideo(fields, setSubmitting) {
        VideoService.create(fields)
            .then(() => {
                alertService.success('Видео успешно добавлено', { keepAfterRouteChange: true });
                navigate('/videos-admin');
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    function updateVideo(id, fields, setSubmitting) {
        VideoService.update(id, fields)
            .then(() => {
                alertService.success('Изменение успешно произведено', { keepAfterRouteChange: true });
                navigate("/videos-admin");
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }


    return (
        <div className="content">
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({errors, touched, isSubmitting, setFieldValue }) => {
                if(isFirstUpdate){
                    isFirstUpdate = false;
                if (!isAddMode) {
                    // get user and set form fields
                    VideoService.getById(id).then(Video => {
                        const fields = ['categoryId', 'link', 'title'];
                        fields.forEach(field => setFieldValue(field, Video[field], false));
                    });
                }
            };
            return (
                <Form>
                    <h1>{isAddMode ? 'Добавить видео' : 'Изменить видео'}</h1>
                    <div className="form-row">
                        <div className="form-group col-3">
                            <label>Тема</label>
                            <Field name="categoryId" as="select" className={'form-control' + (errors.categoryId && touched.categoryId ? ' is-invalid' : '')}>
                                <option value=""></option>
                                {categories && categories.map(category =>
                                <option value={category.id}>{category.title}</option>
                            )}
                            </Field>
                            <ErrorMessage name="categoryId" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group col-9">
                            <label>Ссылка на видео</label>
                            <Field name="link" type="text" className={'form-control' + (errors.link && touched.link ? ' is-invalid' : '')} />
                            <ErrorMessage name="link" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group col">
                            <label>Название</label>
                            <Field name="title" type="text" className={'form-control' + (errors.title && touched.title ? ' is-invalid' : '')} />
                            <ErrorMessage name="title" component="div" className="invalid-feedback" />
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Сохранить
                        </button>
                        <Link to={`/profile`} className="btn btn-secondary mr-1">Меню</Link>
                        <Link to='/videos-admin' className="btn btn-link">Отменить</Link>
                    </div>
                </Form>
    );
            }}
        </Formik>
        </div>
    );
}

export default AddOrEditVideo;