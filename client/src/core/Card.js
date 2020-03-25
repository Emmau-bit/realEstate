import React from 'react';
import { Link } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
// import { addItem, updateItem, removeItem } from './cartHelpers';

const Card = ({
  property,
  showViewPropertyButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemovePropertyButton = false,
  setRun = f => f,
  run = undefined
  // changeCartSizesss
}) => {
  const showViewButton = showViewPropertyButton => {
    return (
      showViewPropertyButton && (
        <div className='text-center'>
          <Link to={`/property/${property._id}`} className='mr-2'>
            <button
              id='r'
              className='btn mt-2 mb-2 bg-dark'
              style={{ color: 'yellowgreen' }}
            >
              View Property
            </button>
          </Link>
        </div>
      )
    );
  };

  return (
    <div className='card-animation'>
      <div id='sh' className='col-md-12 bg-light mb-3  border'>
        <div className=''>
          <div className='h1 mb-3 mt-3 text-center'>{property.title}</div>
          <ShowImage item={property} url='property' />
          <div className='border'>
            <p id='d' className='text-center lead  mt-2'>
              {property.description.substring(0, 100)}{' '}
            </p>
            <div className='row m-auto'>
              <div className='col-md-6 col-sm-6'>
                <small className=''>
                  Status: {property.status && property.status.name}
                </small>
                <br />
                <small className=''>
                  Price:{' '}
                  <span className='badge badge-success p-1'>
                    ${property.price}
                  </span>
                </small>
                <br />
                <small className=' '>
                  Address:{' '}
                  <span id='size' className='badge badge-dark p-1'>
                    {property.address}
                  </span>
                </small>
                <br />
              </div>

              <div className='col-md-6 col-sm-6'>
                <small className=' '>
                  Email:{' '}
                  <span id='size' className='badge badge-dark p-1'>
                    {property.email}
                  </span>
                </small>
                <br />
                <small className=' '>
                  Contact:{' '}
                  <span id='size' className='badge badge-dark p-1'>
                    {property.contact}
                  </span>
                </small>
                <br />
                <small className=' '>
                  City:{' '}
                  <span id='size' className='badge badge-dark p-1'>
                    {property.city}
                  </span>
                </small>
                <br />
                <small className=' '>
                  Hosted By{' '}
                  <span id='size' className='badge badge-dark p-1'>
                    {property.hosted}
                  </span>
                </small>
                <br />
              </div>

              <small className='shadow ml-3 mt-3 text-secondary border p-2'>
                Added on {moment(property.createdAt).fromNow()}
              </small>
              <br />
            </div>
            <br />

            {showViewButton(showViewPropertyButton)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
