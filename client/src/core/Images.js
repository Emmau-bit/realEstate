import React from 'react';
import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBView,
  MDBContainer
} from 'mdbreact';
import I1 from '../img/c1.jpg';
import I2 from '../img/c2.jpg';
import I3 from '../img/c3.jpg';
import I4 from '../img/c4.jpg';
import I5 from '../img/c5.jpg';
import I6 from '../img/c6.jpg';
import I7 from '../img/c7.jpeg';
import I8 from '../img/c8.jpg';
import I9 from '../img/c9.jpg';
import I10 from '../img/c10.jpg';
import I11 from '../img/c11.jpg';
import I12 from '../img/c12.jpg';
import I13 from '../img/c13.jpg';
import I14 from '../img/c14.jpg';

const Images = () => {
  return (
    <MDBContainer>
      <h1 className='bg-dark text-center'>Take A Look</h1>
      <MDBCarousel
        activeItem={1}
        length={14}
        showControls={true}
        showIndicators={false}
        className='z-depth-1'
        slide
      >
        <MDBCarouselInner>
          <MDBCarouselItem itemId='1'>
            <MDBView>
              <img className='d-block w-100' src={I1} alt='slide 1' />
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId='2'>
            <MDBView>
              <img className='d-block w-100' src={I2} alt='slide 2' />
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId='3'>
            <MDBView>
              <img className='d-block w-100' src={I3} alt='slide 3' />
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId='4'>
            <MDBView>
              <img className='d-block w-100' src={I4} alt='slide 4' />
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId='5'>
            <MDBView>
              <img className='d-block w-100' src={I5} alt='slide 5' />
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId='6'>
            <MDBView>
              <img className='d-block w-100' src={I6} alt='slide 6' />
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId='7'>
            <MDBView>
              <img className='d-block w-100' src={I7} alt='slide 7' />
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId='8'>
            <MDBView>
              <img className='d-block w-100' src={I8} alt='slide 8' />
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId='9'>
            <MDBView>
              <img className='d-block w-100' src={I9} alt='slide 9' />
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId='10'>
            <MDBView>
              <img className='d-block w-100' src={I10} alt='slide 10' />
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId='11'>
            <MDBView>
              <img className='d-block w-100' src={I11} alt='slide 11' />
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId='12'>
            <MDBView>
              <img className='d-block w-100' src={I12} alt='slide 12' />
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId='13'>
            <MDBView>
              <img className='d-block w-100' src={I13} alt='slide 13' />
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId='14'>
            <MDBView>
              <img className='d-block w-100' src={I14} alt='slide 14' />
            </MDBView>
          </MDBCarouselItem>
        </MDBCarouselInner>
      </MDBCarousel>
    </MDBContainer>
  );
};

export default Images;
