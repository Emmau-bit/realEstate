import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { getProperties, deleteProperty } from './apiAdmin';

const ManageProperties = () => {
  const [properties, setProperties] = useState([]);

  const { user, token } = isAuthenticated();

  const loadProperties = () => {
    getProperties().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProperties(data);
      }
    });
  };

  const destroy = propertyId => {
    deleteProperty(propertyId, user._id, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadProperties();
      }
    });
  };

  useEffect(() => {
    loadProperties();
  }, []);

  const goBack = () => (
    <div className='mt-5'>
      <Link to='/admin/dashboard' className='bg-dark text-light'>
        Back to Dashboard
      </Link>
    </div>
  );

  return (
    <Layout
      title='Properties Management'
      description='Update or Delete Property'
      className='container-fluid'
    >
      <div className='row container'>
        <div className='col-md-8 m-auto'>
          <h2 className='text-center'>
            In Stock There Is {properties.length} Properties
          </h2>
          <hr />
          <ul className='list-group'>
            {properties.map((p, i) => (
              <li
                key={i}
                className='list-group-item d-flex justify-content-between align-items-center'
              >
                <strong>{p.title}</strong>
                <button>
                  <Link to={`/admin/property/update/${p._id}`}>
                    <span className='text-success p-3 rounded'>Update</span>
                  </Link>
                </button>

                <button className='btn'>
                  <span onClick={() => destroy(p._id)} className='text-danger'>
                    Delete
                  </span>
                </button>
              </li>
            ))}
            {goBack()}
          </ul>
          <br />
        </div>
      </div>
    </Layout>
  );
};

export default ManageProperties;
