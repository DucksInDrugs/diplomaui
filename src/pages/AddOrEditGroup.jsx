import React  from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { alertService } from '../API/AlertService';
import CategoryService from '../API/CategoryService';
import GroupService from '../API/GroupService';



function AddOrEditGroup() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isAddMode = !id;
    let isFirstUpdate = true;
    
    const initialValues = {
        name: '',
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Название группы - обязательное поле'),
    });

    function onSubmit(fields, { setStatus, setSubmitting }) {
        setStatus();
        if (isAddMode) {
            createGroup(fields, setSubmitting);
        } else {
            updateGroup(id, fields, setSubmitting);
        }
    }

    function createGroup(fields, setSubmitting) {
        GroupService.create(fields)
            .then(() => {
                alert('Группа успешно добавлена')
                navigate('/groups-admin');
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    function updateGroup(id, fields, setSubmitting) {
        GroupService.update(id, fields)
            .then(() => {
                alert('Изменение успешно')
                navigate("/groups-admin");
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
                        GroupService.getById(id).then(group => {
                            const fields = ['name'];
                            fields.forEach(field => setFieldValue(field, group[field], false));
                        });
                    }
                };
                return (
                //}, []);

                <Form>
                    <h1>{isAddMode ? 'Добавить группу' : 'Изменить группу'}</h1>
                    <div className="form-row">
                        <div className="form-group col">
                            <label>Название группы</label>
                            <Field name="name" type="text" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                            <ErrorMessage name="name" component="div" className="invalid-feedback" />
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Сохранить
                        </button>
                        <Link to={`/profile`} className="btn btn-secondary mr-1">Меню</Link>
                        <Link to='/groups-admin' className="btn btn-link">Отменить</Link>
                    </div>
                </Form>
                );
}}
        </Formik>
        </div>
    );
}

export default AddOrEditGroup;