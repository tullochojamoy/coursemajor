import React from 'react';
import Link from 'next/link';
//import "./Social-Links.css";
//import ProfileHeader from './ProfileHeader'

export default function SocialLinks() {
    return (   
          <>
            <section className="u-align-center u-clearfix u-section-121" id="sec-791a">
              <div className="u-clearfix u-sheet u-valign-middle u-sheet-1">
              <h4 className="u-text u-text-default u-text-1">PayPal<span style={{fontWeight: "700"}}></span>
              </h4>
              <div className="u-border-1 u-border-grey-dark-1 u-line u-line-horizontal u-line-1"></div>
              <div className="u-form u-form-1">
                  <form className="u-clearfix u-form-spacing-10 u-form-vertical u-inner-form"  name="form" style={{padding: "10px"}}>
                    <div className="u-form-group u-form-group-1">
                      <label htmlFor="text-59d2" className="u-form-control-hidden u-label"></label>
                      <input type="text" placeholder="Website: (http(s)://..)" id="text-59d2" name="text-2" className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-white"/>
                    </div>
                    <div className="u-form-group u-form-group-2">
                      <label htmlFor="text-1b17" className="u-form-control-hidden u-label"></label>
                      <input type="text" placeholder="Twitter: (https://twitter.com/johnsmith)" id="text-1b17" name="text" className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-white"/>
                    </div>
                    <div className="u-form-group u-form-group-3">
                      <label htmlFor="text-a420" className="u-form-control-hidden u-label"></label>
                      <input type="text" id="text-a420" name="text-1" className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-white" placeholder="Facebook: (https://www.facebook.com/johnsmith)"/>
                    </div>
                    <div className="u-form-group u-form-group-4">
                      <label htmlFor="text-a475" className="u-form-control-hidden u-label"></label>
                      <input type="text" placeholder="LinkedIn: (https://www.linkedin.com/in/johnsmith)" id="text-a475" name="text-3" className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-white"/>
                    </div>
                    <div className="u-form-group u-form-group-5">
                      <label htmlFor="text-fcde" className="u-form-control-hidden u-label"></label>
                      <input type="text" placeholder="Youtube: (https://www.youtube.com/johnsmith)" id="text-fcde" name="text-4" className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-white"/>
                    </div>
                    <div className="u-align-left u-form-group u-form-submit">
                      <Link href="#" className="u-btn u-btn-submit u-button-style u-btn-1">UPDATE</Link>
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