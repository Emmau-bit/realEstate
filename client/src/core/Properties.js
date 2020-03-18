import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProperties } from './apiCore';
import Card from './Card';
import Search from './Search';

const Home = () => {
  const [propertiesByArrival, setPropertiesByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadPropertiesByArrival = () => {
    getProperties('createdAt').then(data => {
      console.log(data);
      if (data.error) {
        setError(data.error);
      } else {
        setPropertiesByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadPropertiesByArrival();
  }, []);

  return (
    <Layout
      title='Take A Look On Our Properties'
      description='Choice Is In Your Hands'
      className='container-fluid'
    >
      <Search />
      <div className=''>
        <h2
          className='mb-4 bg-dark text-center'
          style={{ color: 'yellowgreen' }}
        >
          New Arrivals
        </h2>
      </div>
      <div className='row bg-dark'>
        {propertiesByArrival.map((property, i) => (
          <div key={i} className='col-md-4 col-sm-12 mb-3'>
            <Card property={property} />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
