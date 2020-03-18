import React from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import Contact from './contact';

const Dashboard = () => {
  const {
    user: { _id, name, email, role }
  } = isAuthenticated();

  const userLinks = () => {
    return (
      <div className=''>
        <ul className='list-group'>
          <li className='list-group-item'>
            <Link
              className='nav-link text-center text-dark'
              to={`/profile/${_id}`}
            >
              Update Profile
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const userInfo = () => {
    return (
      <div className='card mb-5'>
        <h3 className='card-header'>Profile Informatiom</h3>
        <ul className='list-group'>
          <li className='list-group-item'>{name}</li>
          <li className='list-group-item'>{email}</li>
          <li className='list-group-item'>{role === 1 ? 'Admin' : 'User'}</li>
        </ul>
      </div>
    );
  };

  return (
    <Layout
      title='User Profile'
      description={`Welcome ${name}!`}
      className='container-fluid'
    >
      <div className='row  '>
        <div id='con' className='col-md-6 mt-5'>
          {userInfo()}
          <div className='w-25 m-auto'>
            <button>{userLinks()}</button>
          </div>
        </div>
        <div className='col-md-6 '>
          <Contact />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
