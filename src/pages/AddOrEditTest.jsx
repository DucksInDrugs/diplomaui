import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from 'yup';
import { alertService } from '../API/AlertService';
import TestService from '../API/TestService';
import { useFetching } from '../hooks/useFetching';
import CategoryService from '../API/CategoryService';


function AddOrEditTest() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isAddMode = !id;
    let isFirstUpdate = true;
    const [categories, setCategories] = useState([])

    const [fetchCategories, isCategoriesLoading, categoriesError] = useFetching( async () => {
        const categories = await CategoryService.getAll();
    setCategories(categories)
    })

  useEffect(() => {
    fetchCategories()
  }, [])
    
    const initialValues = {
        categoryId: '',
        question: '',
        testName: '',
        imageUrl: "",
        videoUrl: "",
        testBody: [
            {
            answerText: '',
            isCorrect: false
        },
    ]
    };

    const validationSchema = Yup.object().shape({
        categoryId: Yup.string()
            .required('Тема - обязательное поле'),
        question: Yup.string()
            .required('Вопрос - обязательное поле'),
        testName: Yup.string()
            .required('Название - обязательное поле'),
        imageUrl: Yup.string().notRequired(),
        videoUrl: Yup.string().notRequired(),
        testBody: Yup.array()
        .of(
            Yup.object().shape({
                answerText: Yup.string()
                .required('Ответ обязателен'),
                isCorrect: Yup.boolean(),
            })
        )
        .test('only-one-true',
        'Только один ответ верен',
        array => {
          const trueCount = array.filter(obj => obj.isCorrect === true).length;
          return trueCount === 1;
        })
    });

    function onSubmit(fields, { setStatus, setSubmitting }) {
        setStatus();
        if (isAddMode) {
            createTest(fields, setSubmitting);
        } else {
            updateTest(id, fields, setSubmitting);
        }
    }

    function createTest(fields, setSubmitting) {
        TestService.create(fields)
            .then(() => {
                alertService.success('Тест успешно добавлен', { keepAfterRouteChange: true });
                navigate('/tests-admin');
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    function updateTest(id, fields, setSubmitting) {
        TestService.update(id, fields)
            .then(() => {
                alertService.success('Изменение успешно', { keepAfterRouteChange: true });
                navigate("/tests-admin");
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }


    return (
        <div className="content">
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({errors, touched, values, isSubmitting, setFieldValue }) => {
                if(isFirstUpdate){
                    isFirstUpdate = false;
                if (!isAddMode) {
                    // get user and set form fields
                    TestService.getById(id).then(test => {
                        const fields = ['categoryId', 'question', 'testName', 'testBody', 'imageUrl', 'videoUrl'];
                        console.log(test)
                        fields.forEach(field => setFieldValue(field, test[field], false));
                    });
                }
            };
            return (
                <Form>
                    <h1>{isAddMode ? 'Добавить вопрос для теста' : 'Изменить вопрос для теста'}</h1>
                    <div className="form-row">
                        <div className="form-group col-3">
                            <label>Название темы</label>
                            <Field name="categoryId" as="select" className={'form-control' + (errors.categoryId && touched.categoryId ? ' is-invalid' : '')}>
                                <option value=""></option>
                                {categories && categories.map(category =>
                                <option value={category.id}>{category.title}</option>
                            )}
                            </Field>
                            <ErrorMessage name="categoryId" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group col-9">
                            <label>Вопрос</label>
                            <Field name="question" type="text" className={'form-control' + (errors.question && touched.question ? ' is-invalid' : '')} />
                            <ErrorMessage name="question" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group col">
                            <label>Название теста</label>
                            <Field name="testName" type="text" className={'form-control' + (errors.testName && touched.testName ? ' is-invalid' : '')} />
                            <ErrorMessage name="testName" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group col">
                            <label>Ссылка на картинку</label>
                            <Field name="imageUrl" type="text" className={'form-control' + (errors.imageUrl && touched.imageUrl ? ' is-invalid' : '')} />
                            <ErrorMessage name="imageUrl" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group col">
                            <label>Ссылка на видео</label>
                            <Field name="videoUrl" type="text" className={'form-control' + (errors.videoUrl && touched.videoUrl ? ' is-invalid' : '')} />
                            <ErrorMessage name="videoUrl" component="div" className="invalid-feedback" />
                        </div>
                    </div>
                    <FieldArray name="testBody">
                    {({ insert, remove, push }) => (
                        <div>
                            {values.testBody.length > 0 &&
                            values.testBody.map((answer, index) => (
                                <>
                            <div className="form-row" key={index}>
                                <div className="form-group col-10">
                                    <label htmlFor={`testBody.${index}.answerText`}>Ответ на вопрос</label>
                                    <Field name={`testBody.${index}.answerText`} type="text" className={'form-control' + (errors.answerText && touched.answerText ? ' is-invalid' : '')} />
                                    <ErrorMessage name={`testBody.${index}.answerText`} component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group col-2">
                                    <label htmlFor={`testBody.${index}.isCorrect`}>Правильный ответ</label>
                                    <Field name={`testBody.${index}.isCorrect`} type="checkbox"  className={'form-control' + (errors.isCorrect && touched.isCorrect ? ' is-invalid' : '')} />
                                    <ErrorMessage name={`testBody.${index}.isCorrect`} component="div" className="invalid-feedback" />
                                </div>
                                
                            </div>
                            <button type="button" className="btn btn-sm btn-primary mr-1" onClick={() => remove(index)}>
                                    Удалить вариант
                                </button>
                            </>
                            ))}
                            <button type="button" className="btn btn-link" onClick={() => push({ answerText: '', isCorrect: false })}>
                                Добавить вариант ответа
                            </button>
                        </div>
                    )}
                    </FieldArray>
                    <div className="form-group">
                        <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Сохранить
                        </button>
                        <Link to={`/profile`} className="btn btn-secondary mr-1">Меню</Link>
                        <Link to='/tests-admin' className="btn btn-link">Отменить</Link>
                    </div>
                </Form>
    );
            }}
        </Formik>
        </div>
    );
}

export default AddOrEditTest;