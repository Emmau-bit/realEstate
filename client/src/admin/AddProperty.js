import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { createProperty, getStatuses } from './apiAdmin';

const AddProduct = () => {
  const [values, setValues] = useState({
    title: '',
    description: '',
    price: '',
    email: '',
    address: '',
    contact: '',
    city: '',
    hosted: '',
    statuses: [],
    status: '',
    photo: '',
    loading: false,
    error: '',
    createdProperty: '',
    redirectToProfile: false,
    formData: ''
  });

  const { user, token } = isAuthenticated();
  const {
    title,
    description,
    price,
    email,
    address,
    contact,
    city,
    hosted,
    statuses,
    status,
    loading,
    error,
    createdProperty,
    redirectToProfile,
    formData
  } = values;

  // load categories and set form data
  const init = () => {
    getStatuses().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          statuses: data,
          formData: new FormData()
        });
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const handleChange = name => e => {
    const value = name === 'photo' ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = e => {
    e.preventDefault();
    setValues({ ...values, error: '', loading: true });

    createProperty(user._id, token, formData).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          title: '',
          description: '',
          price: '',
          email: '',
          address: '',
          contact: '',
          city: '',
          hosted: '',
          statuses: [],
          status: '',
          photo: '',
          loading: false,
          createdProperty: data.title
        });
      }
    });
  };

  const newPostForm = () => (
    <form className='container mb-3 border p-4' onSubmit={clickSubmit}>
      <h4>Add Photo</h4>
      <div className='form-group'>
        <label className='btn btn-secondary'>
          <input
            onChange={handleChange('photo')}
            type='file'
            name='photo'
            accept='image/*'
          />
        </label>
      </div>

      <div className='form-group'>
        <label className='text-muted'>Title</label>
        <input
          onChange={handleChange('title')}
          type='text'
          className='form-control'
          value={title}
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>Description</label>
        <textarea
          onChange={handleChange('description')}
          className='form-control'
          value={description}
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Price</label>
        <input
          onChange={handleChange('price')}
          type='number'
          className='form-control'
          value={price}
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Status</label>
        <select onChange={handleChange('status')} className='form-control'>
          <option>Please Select</option>
          {statuses &&
            statuses.map((c, i) => (
              <option key={i} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>
      <div className='form-group'>
        <label className='text-muted'>Email</label>
        <input
          onChange={handleChange('email')}
          type='email'
          className='form-control'
          value={email}
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Address</label>
        <input
          onChange={handleChange('address')}
          type='text'
          className='form-control'
          value={address}
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Contact</label>
        <input
          onChange={handleChange('contact')}
          type='number'
          className='form-control'
          value={contact}
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>City</label>
        <input
          onChange={handleChange('city')}
          type='text'
          className='form-control'
          value={city}
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Host By</label>
        <input
          onChange={handleChange('hosted')}
          type='text'
          className='form-control'
          value={hosted}
        />
      </div>

      <button className='btn btn-success rounded'>Create Property</button>
    </form>
  );

  const showError = () => (
    <div
      className='alert alert-danger'
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className='alert alert-info'
      style={{ display: createdProperty ? '' : 'none' }}
    >
      <h2>{`${createdProperty}`} is Created!</h2>
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className='alert alert-success'>
        <h2>Loading...</h2>
      </div>
    );

  return (
    <Layout
      title=''
      description={`Welcome ${user.name}, Add A New Property`}
      className='container'
    >
      <div className='row'>
        <div className='col-md-8 offset-md-2'>
          {showLoading()}
          {showSuccess()}
          {showError()}
          {newPostForm()}
        </div>
      </div>
    </Layout>
  );
};

export default AddProduct;
