import React from 'react';

const ContactPage = () => {
  return (
    <div id='fom' className='container bg-secondary rounded  mt-5 bg-light'>
      <div id='fom' className='row '>
        <div className='col-md-12 text-center text-secondary'>
          <h2 className='large  mt-3 text-dark'>We're Here For You!</h2>

          <p className='lead h4 '>
            We're happy to listen from you, More help please let us know...
          </p>
        </div>

        <div className='col-sm-12  '>
          <form
            className='form w-75 m-auto col-md-12'
            name='sentMessage'
            id='contactForm'
            method='POST'
            action='https://formspree.io/ishimweemmanuel417@gmail.com'
            role='form'
          >
            <div className='form-group rounded'>
              <input
                className='rounded '
                type='text'
                placeholder='Name'
                name='Name'
                required

                // required
              />
            </div>
            <div className='form-group'>
              <input
                className='rounded '
                type='email'
                placeholder='Email Address'
                name='Email'
                required
              />
            </div>

            <div className='form-group'>
              <input
                className='rounded '
                type='subject'
                placeholder='Subject'
                name='Subject'
                required
              />
            </div>
            <div className='form-group'>
              <textarea
                type='text'
                name='Message'
                placeholder='Message'
                rows='4'
                className='form-group'
                required
              />
            </div>

            <div className='w-75  m-auto '>
              <button type='submit' className='btn btn-block  h3 c'>
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
