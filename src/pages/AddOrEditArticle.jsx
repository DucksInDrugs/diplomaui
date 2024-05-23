import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { alertService } from '../API/AlertService';
import ArticleService from '../API/ArticleService';
import GroupService from '../API/GroupService';
import { Editor } from '@tinymce/tinymce-react';



function AddOrEditArticle() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isAddMode = !id;
    let isFirstUpdate = true;
    const [groups, setGroups] = useState([])

    useEffect (() => {
        GroupService.getAll().then(x => setGroups(x));
      }, [])
    
    const initialValues = {
        title: '',
        description: '',
        htmlText: '',
        imageUrl: '',
        role: '',
        groupId: ''
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .required('Название статьи - обязательное поле'),
        description: Yup.string()
            .required('Описание статьи - обязательное поле'),
        htmlText: Yup.string()
            .required('Текст статьи - обязательное поле'),
        imageUrl: Yup.string()
            .required('Ссылка на изображение - обязательное поле'),
        role: Yup.string()
            .required('Роль - обязательное поле'),
        groupId: Yup.string()
            .notRequired()
    });

    function onSubmit(fields, { setStatus, setSubmitting }) {
        setStatus();
        if (isAddMode) {
            createArticle(fields, setSubmitting);
        } else {
            updateArticle(id, fields, setSubmitting);
        }
    }

    function createArticle(fields, setSubmitting) {
        if (fields.role !== 'User') {
            fields.groupId = null;
        }
        ArticleService.create(fields)
            .then(() => {
                alert('Статья успешно добавлена');
                navigate('/articles-admin');
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    function updateArticle(id, fields, setSubmitting) {
        if (fields.role !== 'User') {
            fields.groupId = null;
        }
        ArticleService.update(id, fields)
            .then(() => {
                alertService.success('Изменение успешно', { keepAfterRouteChange: true });
                navigate("/articles-admin");
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
                    if(isFirstUpdate){
                        isFirstUpdate = false;
                    if (!isAddMode) {
                        ArticleService.getById(id).then(article => {
                            const fields = ['title', 'description', 'htmlText', 'imageUrl', 'role', 'groupId'];
                            fields.forEach(field => setFieldValue(field, article[field], false));
                        });
                    }
                };
                return (

                <Form>
                    <h1>{isAddMode ? 'Добавить статью' : 'Изменить статью'}</h1>
                    <div className="form-row">
                        <div className="form-group col">
                            <label>Название статьи</label>
                            <Field name="title" type="text" className={'form-control' + (errors.title && touched.title ? ' is-invalid' : '')} />
                            <ErrorMessage name="title" component="div" className="invalid-feedback" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col">
                            <label>Ссылка на изображение</label>
                            <Field name="imageUrl" type="text" className={'form-control' + (errors.imageUrl && touched.imageUrl ? ' is-invalid' : '')} />
                            <ErrorMessage name="imageUrl" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group col">
                            <label>Для кого создана статья</label>
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
                    <div className='form-row'>
                        <div className='form-group col'>
                            <label>Описание статьи</label>
                            
                                <Editor
                                    apiKey='4rdfq7hp8wmx338wr1qxlgz986lgbcc1i7vet45yp3ci01il'
                                    init={{
                                        height: 300,
                                        menubar: true,
                                        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
                                        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                                        tinycomments_mode: 'embedded',
                                        ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
                                    }}
                                    value={values.description}
                                    onEditorChange={(htmlValue) => {
                                        setFieldValue('description', htmlValue);
                                    }}
                                />
                            
                            <ErrorMessage name="description" component="div" className="invalid-feedback"/>
                        </div>
                    </div>
                    <div className='form-row'>
                        <div className='form-group col'>
                            <label>Содержимое статьи</label>
                            
                                <Editor
                                    apiKey='4rdfq7hp8wmx338wr1qxlgz986lgbcc1i7vet45yp3ci01il'
                                    init={{
                                        height: 500,
                                        menubar: true,
                                        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
                                        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                                        tinycomments_mode: 'embedded',
                                        ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
                                    }}
                                    value={values.htmlText}
                                    onEditorChange={(htmlValue) => {
                                        setFieldValue('htmlText', htmlValue);
                                    }}
                                />
                            
                            <ErrorMessage name="htmlText" component="div" className="invalid-feedback"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Сохранить
                        </button>
                        <Link to={`/profile`} className="btn btn-secondary mr-1">Меню</Link>
                        <Link to='/aricles-admin' className="btn btn-link">Отменить</Link>
                    </div>
                </Form>
                );
}}
        </Formik>
        </div>
    );
}

export default AddOrEditArticle;