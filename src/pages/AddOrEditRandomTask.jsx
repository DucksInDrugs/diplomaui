import React  from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { alertService } from '../API/AlertService';
import CategoryService from '../API/CategoryService';
import GroupService from '../API/GroupService';
import RandomTestService from '../API/RandomTest';



function AddOrEditRandomTask() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isAddMode = !id;
    let isFirstUpdate = true;
    
    const initialValues = {
        correctAnswer: '',
        videoUrl: '',
        imageUrl: ''
    };

    const validationSchema = Yup.object().shape({
        correctAnswer: Yup.string()
            .required('Правильный ответ - обязательное поле'),
        videoUrl: Yup.string()
            .notRequired(),
        imageUrl: Yup.string()
            .notRequired(),
    });

    function onSubmit(fields, { setStatus, setSubmitting }) {
        setStatus();
        if (isAddMode) {
            createRandomTask(fields, setSubmitting);
        } else {
            updateRandomTask(id, fields, setSubmitting);
        }
    }

    function createRandomTask(fields, setSubmitting) {
        RandomTestService.create(fields)
            .then(() => {
                alertService.success('Случайная задача успешно добавлена', { keepAfterRouteChange: true });
                navigate('/randomtasks-admin');
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    function updateRandomTask(id, fields, setSubmitting) {
        RandomTestService.update(id, fields)
            .then(() => {
                alertService.success('Изменение успешно', { keepAfterRouteChange: true });
                navigate("/randomtasks-admin");
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
                        RandomTestService.getById(id).then(group => {
                            const fields = ['videoUrl', 'imageUrl', 'correctAnswer'];
                            fields.forEach(field => setFieldValue(field, group[field], false));
                        });
                    }
                };
                return (
                //}, []);

                <Form>
                    <h1>{isAddMode ? 'Добавить случайную задачу' : 'Изменить случайную задачу'}</h1>
                    <div className="form-row">
                        <div className="form-group col-6">
                            <label>Ссылка на видео</label>
                            <Field name="videoUrl" type="text" className={'form-control' + (errors.videoUrl && touched.videoUrl ? ' is-invalid' : '')} />
                            <ErrorMessage name="videoUrl" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group col-6">
                            <label>Ссылка на картинку</label>
                            <Field name="imageUrl" type="text" className={'form-control' + (errors.imageUrl && touched.imageUrl ? ' is-invalid' : '')} />
                            <ErrorMessage name="imageUrl" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group col">
                            <label>Правильный ответ</label>
                            <Field name="correctAnswer" type="text" className={'form-control' + (errors.correctAnswer && touched.correctAnswer ? ' is-invalid' : '')} />
                            <ErrorMessage name="correctAnswer" component="div" className="invalid-feedback" />
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Сохранить
                        </button>
                        <Link to={`/profile`} className="btn btn-secondary mr-1">Меню</Link>
                        <Link to='/randomtasks-admin' className="btn btn-link">Отменить</Link>
                    </div>
                </Form>
                );
}}
        </Formik>
        </div>
    );
}

export default AddOrEditRandomTask;