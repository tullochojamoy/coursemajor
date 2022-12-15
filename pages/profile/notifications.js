import React from 'react';
import Link from 'next/link';
//import "./Notifications.css";

export default function Notifications() {
    return (   
        <>
          <section className="u-align-center u-clearfix u-section-96" id="sec-2ded">
            <div className="u-clearfix u-sheet u-valign-middle u-sheet-1">
              <h4 className="u-text u-text-default u-text-1"> Notifications</h4>
              <div className="u-border-1 u-border-grey-dark-1 u-line u-line-horizontal u-line-1"></div>
              <p className="u-text u-text-default u-text-2"> Turn promotional email notifications from CourseMajor on or off:</p>
              <div className="u-form u-form-1">
                <form action="#" method="POST" className="u-clearfix u-form-spacing-10 u-form-vertical u-inner-form" source="custom" name="form" style={{padding: "10px"}}>
                  <div className="u-form-checkbox u-form-group">
                    <input type="checkbox" placeholder="Enter your Name" id="name-36d3" name="name" className="u-block-bb81-11 u-border-1 u-border-grey-30 u-input-rectangle u-white" required="required"/>
                    <label htmlFor="name-36d3" className="u-label">All Notifications from CourseMajor.</label>
                  </div>
                  <div className="u-align-center u-form-group u-form-submit">
                    <Link href="#" className="u-btn u-btn-submit u-button-style u-btn-1">
                      <a>UPDATE</a>
                    </Link>
                    <input type="submit" value="submit" className="u-form-control-hidden"/>
                  </div>
                  <div className="u-form-send-message u-form-send-success"> Thank you! Your message has been sent. </div>
                  <div className="u-form-send-error u-form-send-message"> Unable to send your message. Please fix errors then try again. </div>
                  <input type="hidden" value="" name="recaptchaResponse"/>
                </form>
              </div>
            </div>
          </section> 
        </>     
  );
}