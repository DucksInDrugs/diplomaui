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
        testBody: [
            {
            answerText: '',
            isCorrect: false
        },
    ]
    };

    const validationSchema = Yup.object().shape({
        categoryId: Yup.string()
            .required('category is required'),
        question: Yup.string()
            .required('Question is required'),
        testName: Yup.string()
            .required('Title is required'),
        testBody: Yup.array()
        .of(
            Yup.object().shape({
                answerText: Yup.string()
                .required('Answer is required'),
                isCorrect: Yup.boolean(),
            })
        )
        .test('only-one-true',
        'Only one boolean value should be true',
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
                alertService.success('Test added successfully', { keepAfterRouteChange: true });
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
                alertService.success('Update successful', { keepAfterRouteChange: true });
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
                        const fields = ['categoryId', 'question', 'testName', 'testBody'];
                        console.log(test)
                        fields.forEach(field => setFieldValue(field, test[field], false));
                    });
                }
            };
            return (
                <Form>
                    <h1>{isAddMode ? 'Add Test question' : 'Edit Test question'}</h1>
                    <div className="form-row">
                        <div className="form-group col-3">
                            <label>Category</label>
                            <Field name="categoryId" as="select" className={'form-control' + (errors.categoryId && touched.categoryId ? ' is-invalid' : '')}>
                                <option value=""></option>
                                {categories && categories.map(category =>
                                <option value={category.id}>{category.title}</option>
                            )}
                            </Field>
                            <ErrorMessage name="categoryId" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group col-9">
                            <label>question</label>
                            <Field name="question" type="text" className={'form-control' + (errors.question && touched.question ? ' is-invalid' : '')} />
                            <ErrorMessage name="question" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group col">
                            <label>testName</label>
                            <Field name="testName" type="text" className={'form-control' + (errors.testName && touched.testName ? ' is-invalid' : '')} />
                            <ErrorMessage name="testName" component="div" className="invalid-feedback" />
                        </div>
                    </div>
                    <FieldArray name="testBody">
                    {({ insert, remove, push }) => (
                        <div>
                            {values.testBody.length > 0 &&
                            values.testBody.map((answer, index) => (
                                <>
                            <div className="form-row" key={index}>
                                <div className="form-group col-11">
                                    <label htmlFor={`testBody.${index}.answerText`}>answerText</label>
                                    <Field name={`testBody.${index}.answerText`} type="text" className={'form-control' + (errors.answerText && touched.answerText ? ' is-invalid' : '')} />
                                    <ErrorMessage name={`testBody.${index}.answerText`} component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group col-1">
                                    <label htmlFor={`testBody.${index}.isCorrect`}>isCorrect</label>
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
                            Save
                        </button>
                        <Link to={`/profile`} className="btn btn-secondary mr-1">Меню</Link>
                        <Link to='/tests-admin' className="btn btn-link">Cancel</Link>
                    </div>
                </Form>
    );
            }}
        </Formik>
        </div>
    );
}

export default AddOrEditTest;