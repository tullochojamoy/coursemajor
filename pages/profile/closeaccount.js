import React from 'react';
import Link from 'next/link';
//import "./Close-Account.css";

export default function CloseAccount() {
    return (
      <>
        <section
          className='u-align-center u-clearfix u-section-116'
          id='sec-49f9'
        >
          <div className='u-clearfix u-sheet u-valign-middle u-sheet-1'>
            <h4 className='u-text u-text-default u-text-1'>Close Account</h4>
            <div className='u-align-center u-border-1 u-border-grey-dark-1 u-line u-line-horizontal u-line-1'></div>
            <p className='u-text u-text-2'>
              Sample text. Click to select the text box. Click again or double
              click to start editing the text.
            </p>
            <Link
              href='https://nicepage.com/k/infographic-html-templates'
              className='u-border-2 u-border-palette-2-base u-btn u-btn-round u-button-style u-hover-palette-2-base u-none u-radius-6 u-text-body-color u-text-hover-white u-btn-1'
            >
              <a>Close your account permanently.</a>
            </Link>
          </div>
        </section>
      </>
    );
}