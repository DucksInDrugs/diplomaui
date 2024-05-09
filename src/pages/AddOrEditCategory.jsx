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
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .required('Title is required'),
        photoUrl: Yup.string()
            .required('PhotoURL is required'),
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
                alertService.success('Category added successfully', { keepAfterRouteChange: true });
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
                alertService.success('Update successful', { keepAfterRouteChange: true });
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
                            const fields = ['title', 'photoUrl'];
                            fields.forEach(field => setFieldValue(field, category[field], false));
                        });
                    }
                };
                return (
                //}, []);

                <Form>
                    <h1>{isAddMode ? 'Add Category' : 'Edit Category'}</h1>
                    <div className="form-row">
                        <div className="form-group col-7">
                            <label>Title</label>
                            <Field name="title" type="text" className={'form-control' + (errors.title && touched.title ? ' is-invalid' : '')} />
                            <ErrorMessage name="title" component="div" className="invalid-feedback" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-7">
                            <label>PhotoURL</label>
                            <Field name="photoUrl" type="text" className={'form-control' + (errors.photoUrl && touched.photoUrl ? ' is-invalid' : '')} />
                            <ErrorMessage name="photoUrl" component="div" className="invalid-feedback" />
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Save
                        </button>
                        <Link to={`/profile`} className="btn btn-secondary mr-1">Меню</Link>
                        <Link to='/categories-admin' className="btn btn-link">Cancel</Link>
                    </div>
                </Form>
                );
}}
        </Formik>
        </div>
    );
}

export default AddOrEditCategory;