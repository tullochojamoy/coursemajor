import React from 'react';


export default function PlaylistCreate() {
    return ( 
        <>
          <section className="u-align-center u-clearfix u-section-36" id="sec-9a8a">
            <div className="u-clearfix u-sheet u-sheet-1">
              <h1 className="u-text u-text-default u-text-1">Reset Password</h1>
              <div className="u-form u-form-1">
                <form action="#" method="POST" className="u-clearfix u-form-spacing-10 u-form-vertical u-inner-form" source="custom" name="form-1" style={{padding: "10px"}}>
                  <div className="u-form-group u-form-name">
                    <label htmlFor="name-d6d3" className="u-label">New Password *</label>
                    <input type="text" placeholder="Enter New Password" id="name-d6d3" name="Password" className="u-input u-input-rectangle u-palette-5-light-3" required/>
                  </div>
                  <div className="u-form-email u-form-group">
                    <label htmlFor="email-d6d3" className="u-label">Confirm New Password *</label>
                    <input type="email" placeholder="Confirm New Password" id="email-d6d3" name="ConfirmPassword" className="u-input u-input-rectangle u-palette-5-light-3" required/>
                  </div>
                  <div className="u-align-left u-form-group u-form-submit">
                    <button type="submit" className="u-btn u-btn-submit u-button-style u-btn-1">Reset Password</button>
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