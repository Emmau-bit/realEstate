import React from 'react';
import img from '../img/cm2.jpg';
import Menu from './Menu';

const AboutPage = () => {
  return (
    <div>
      <Menu />
      <div id='contt' className='container'>
        <div className='row '>
          <div className='col-md-12 mt-3 '>
            <h1 id='about-h' className='display-5 text-center mb-5'>
              It's Our Pleasure To Give You What Best For You
            </h1>
          </div>

          <div class='col-md-6 mb-3'>
            <img src={img} alt='Ima' className=' rounded' />
          </div>
          <div className='col-md-5 ml-auto'>
            <h2 className='text-center mb-2'>Our Company</h2>
            <hr />
            <p className='lead'>
              We care people First. The client is a King. We always worry about
              our people, thinking about our people, happy people is our
              mission. Come and get your dream car...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
