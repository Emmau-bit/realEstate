import React, { useState } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { createStatus } from './apiAdmin';

const AddStatus = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // destructure user and token from localstorage
  const { user, token } = isAuthenticated();

  const handleChange = e => {
    setError('');
    setName(e.target.value);
  };

  const clickSubmit = e => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    // make request to api to create category
    createStatus(user._id, token, { name }).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setError('');
        setSuccess(true);
      }
    });
  };

  const newCategoryFom = () => (
    <form onSubmit={clickSubmit}>
      <div className='form-group'>
        <label className='text-muted'>Name</label>
        <input
          type='text'
          className='form-control'
          onChange={handleChange}
          value={name}
          autoFocus
          required
        />
      </div>
      <button className='btn btn-outline-primary'>Add Status</button>
    </form>
  );

  const showSuccess = () => {
    if (success) {
      return <h3 className='text-success'>{name} Is Created</h3>;
    }
  };

  const showError = () => {
    if (error) {
      return <h3 className='text-danger'>Category Should Be Unique</h3>;
    }
  };

  const goBack = () => (
    <div className='mt-5'>
      <Link to='/admin/dashboard' className='bg-dark text-light'>
        Back to Dashboard
      </Link>
    </div>
  );

  return (
    <Layout title='Create Status' description='' className='container'>
      <div className='row'>
        <div className='col-md-5 m-auto offset-md-2'>
          {showSuccess()}
          {showError()}
          {newCategoryFom()}
          {goBack()}
        </div>
      </div>
    </Layout>
  );
};

export default AddStatus;
