import React from 'react';
import Link from 'next/link';

export default function NotFound() {
    return (
      <>
        <section
          className='u-align-center u-clearfix u-palette-5-light-1 u-section-91'
          id='carousel_8514'
        >
          <div className='u-clearfix u-sheet u-sheet-1'>
            <h5 className='u-custom-font u-font-pt-sans u-text u-text-palette-5-dark-2 u-text-1'>
              Oops!
            </h5>
            <img
              src='/images/dd1.png'
              alt='404 Not Found'
              className='u-image u-image-default u-image-1'
              data-image-width='1104'
              data-image-height='699'
            />
            <h1 className='u-custom-font u-font-pt-sans u-text u-text-grey-60 u-text-2'>
              Page not found
            </h1>
            <p className='u-custom-font u-font-montserrat u-text u-text-grey-70 u-text-3'>
              Sorry, the page you&apos;re looking for doesn&apos;t exist. If you think
              something is broken, report a problem.
            </p>
            <div className='u-clearfix u-expanded-width-sm u-expanded-width-xs u-gutter-0 u-layout-wrap u-layout-wrap-1'>
              <div className='u-layout'>
                <div className='u-layout-row'>
                  <div className='u-align-center-sm u-align-center-xs u-align-right-lg u-align-right-md u-align-right-xl u-container-style u-layout-cell u-left-cell u-size-30 u-layout-cell-1'>
                    <div className='u-container-layout u-valign-middle u-container-layout-1'>
                      <Link href='/'>
                        <a className='u-active-white u-btn u-btn-round u-button-style u-grey-70 u-hover-white u-radius-50 u-text-active-grey-70 u-text-body-alt-color u-text-hover-grey-70 u-btn-1'>
                          Go Home
                        </a>
                      </Link>
                    </div>
                  </div>
                  <div className='u-align-center-sm u-align-center-xs u-align-left-lg u-align-left-md u-align-left-xl u-container-style u-layout-cell u-right-cell u-size-30 u-layout-cell-2'>
                    <div className='u-container-layout u-valign-middle u-container-layout-2'>
                      <Link href='/contactus'>
                        <a className='u-active-white u-border-2 u-border-active-white u-border-grey-70 u-border-hover-white u-btn u-btn-round u-button-style u-hover-white u-none u-radius-50 u-text-active-grey-70 u-text-grey-70 u-text-hover-grey-70 u-btn-2'>
                          Contact Us
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );  
}