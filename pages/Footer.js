import Link from 'next/link';
import {memo} from 'react'

export default memo(function Footer() {

    function onClickHandler(){
      window.scroll({
        top: 0, 
        left: 0, 
        behavior: 'smooth'
      });
    }

    return (  
        <> 
   
          <footer className="u-align-center-sm u-align-center-xs u-clearfix u-footer u-grey-80" id="sec-6c66"><div className="u-clearfix u-sheet u-sheet-1">
        <div className="u-clearfix u-expanded-width u-gutter-6 u-layout-wrap u-layout-wrap-1">
          <div className="u-layout">
            <div className="u-layout-row">
              <div className="u-size-15">
                <div className="u-layout-col">
                  <div className="u-container-style u-layout-cell u-size-30 u-layout-cell-1">
                    <div className="u-container-layout u-valign-middle-lg u-container-layout-1">
                      <Link href="/" onClick={onClickHandler} className="u-align-center u-image u-logo u-image-1" data-image-width="253" data-image-height="39" title="Home">
                        <a>
                          <img src="/images/default-logo.png" alt="CourseMajor Logo" className="u-logo-image u-logo-image-1"/>
                        </a>
                      </Link>
                    </div>
                  </div>
                  <div className="u-align-center-sm u-align-center-xs u-container-style u-layout-cell u-size-30 u-layout-cell-2">
                    <div className="u-container-layout u-valign-middle-sm u-valign-middle-xs u-valign-top-md u-container-layout-2">
                      <div className="u-align-center-md u-align-center-sm u-align-center-xs u-social-icons u-spacing-10 u-social-icons-1">
                        <Link className="u-social-url" title="facebook"  target="_blank" href={{pathname:"https://facebook.com/coursemajor"}}>
                          <a>
                          <span className="u-icon u-social-facebook u-social-icon u-icon-1">
                            <svg className="u-svg-link" preserveAspectRatio="xMidYMin slice" viewBox="0 0 112 112">
                              <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#svg-dac3"></use>
                            </svg>
                            <svg className="u-svg-content" viewBox="0 0 112 112" x="0" y="0" id="svg-dac3">
                              <circle fill="currentColor" cx="56.1" cy="56.1" r="55"></circle>
                              <path fill="#FFFFFF" d="M73.5,31.6h-9.1c-1.4,0-3.6,0.8-3.6,3.9v8.5h12.6L72,58.3H60.8v40.8H43.9V58.3h-8V43.9h8v-9.2
            c0-6.7,3.1-17,17-17h12.5v13.9H73.5z"></path>
                            </svg>
                          </span>
                          </a>
                        </Link>
                        <Link className="u-social-url" title="instagram" target="_blank" href={{pathname:"https://www.instagram.com/coursemajor/"}}>
                          <a>
                          <span className="u-icon u-social-icon u-social-instagram u-icon-2">
                            <svg className="u-svg-link" preserveAspectRatio="xMidYMin slice" viewBox="0 0 112 112">
                              <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#svg-7c1d"></use>
                            </svg>
                            <svg className="u-svg-content" viewBox="0 0 112 112" x="0" y="0" id="svg-7c1d">
                              <circle fill="currentColor" cx="56.1" cy="56.1" r="55"></circle>
                              <path fill="#FFFFFF" d="M55.9,38.2c-9.9,0-17.9,8-17.9,17.9C38,66,46,74,55.9,74c9.9,0,17.9-8,17.9-17.9C73.8,46.2,65.8,38.2,55.9,38.2
            z M55.9,66.4c-5.7,0-10.3-4.6-10.3-10.3c-0.1-5.7,4.6-10.3,10.3-10.3c5.7,0,10.3,4.6,10.3,10.3C66.2,61.8,61.6,66.4,55.9,66.4z"></path>
                              <path fill="#FFFFFF" d="M74.3,33.5c-2.3,0-4.2,1.9-4.2,4.2s1.9,4.2,4.2,4.2s4.2-1.9,4.2-4.2S76.6,33.5,74.3,33.5z"></path><path fill="#FFFFFF" d="M73.1,21.3H38.6c-9.7,0-17.5,7.9-17.5,17.5v34.5c0,9.7,7.9,17.6,17.5,17.6h34.5c9.7,0,17.5-7.9,17.5-17.5V38.8
            C90.6,29.1,82.7,21.3,73.1,21.3z M83,73.3c0,5.5-4.5,9.9-9.9,9.9H38.6c-5.5,0-9.9-4.5-9.9-9.9V38.8c0-5.5,4.5-9.9,9.9-9.9h34.5
            c5.5,0,9.9,4.5,9.9,9.9V73.3z">
                                </path>
                              </svg>
                            </span>
                          </a>
                        </Link>
                        <Link className="u-social-url" target="_blank" title="Twitter" href={{pathname:"https://twitter.com/coursemajor"}}>
                          <a>
                            <span className="u-icon u-social-icon u-social-twitter u-icon-3">
                              <svg className="u-svg-link" preserveAspectRatio="xMidYMin slice" viewBox="0 0 112 112">
                                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#svg-7759"></use>
                              </svg>
                              <svg className="u-svg-content" viewBox="0 0 112 112" x="0" y="0" id="svg-7759"><circle fill="currentColor" className="st0" cx="56.1" cy="56.1" r="55"></circle><path fill="#FFFFFF" d="M83.8,47.3c0,0.6,0,1.2,0,1.7c0,17.7-13.5,38.2-38.2,38.2C38,87.2,31,85,25,81.2c1,0.1,2.1,0.2,3.2,0.2
              c6.3,0,12.1-2.1,16.7-5.7c-5.9-0.1-10.8-4-12.5-9.3c0.8,0.2,1.7,0.2,2.5,0.2c1.2,0,2.4-0.2,3.5-0.5c-6.1-1.2-10.8-6.7-10.8-13.1
              c0-0.1,0-0.1,0-0.2c1.8,1,3.9,1.6,6.1,1.7c-3.6-2.4-6-6.5-6-11.2c0-2.5,0.7-4.8,1.8-6.7c6.6,8.1,16.5,13.5,27.6,14
              c-0.2-1-0.3-2-0.3-3.1c0-7.4,6-13.4,13.4-13.4c3.9,0,7.3,1.6,9.8,4.2c3.1-0.6,5.9-1.7,8.5-3.3c-1,3.1-3.1,5.8-5.9,7.4
              c2.7-0.3,5.3-1,7.7-2.1C88.7,43,86.4,45.4,83.8,47.3z"></path></svg></span>
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="u-size-45">
                <div className="u-layout-row">
                  <div className="u-align-center-sm u-align-center-xs u-container-style u-layout-cell u-size-30 u-layout-cell-3">
                    <div className="u-container-layout u-valign-middle-sm u-valign-middle-xs u-valign-top-xl u-container-layout-3">
                      <div data-position="" className="u-position u-position-1">
                        <div className="u-block">
                          <div className="u-block-container u-clearfix">
                            <h5 className="u-align-center-xs u-block-header u-text u-text-1"> Our Company</h5>
                            <div className="u-align-center-xs u-block-content u-text">
                              <span className="u-text-white">
                                <Link href="/aboutus" className="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-palette-1-base u-btn-1">
                                  <a>About Us</a>
                                </Link>
                                
                                <br/>Contact Us<br/>
                                <Link href='#'
                                // href={{pathname:"https://blog.coursemajor.com/"}} target="_blank" 
                                className="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-palette-1-base u-btn-2">
                                  <a>Blog</a>
                                </Link>
                                <br/>
                                <Link href={{pathname:"https://play.google.com/store/apps/details?id=com.coursemajor.app"}} target="_blank" className="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-palette-1-base u-btn-3"><a>Get our App</a></Link>
                              </span>
                              <br/>Want Learning Materials? (Coming Soon)
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="u-align-center-sm u-align-center-xs u-container-style u-layout-cell u-size-30 u-layout-cell-4">
                    <div className="u-container-layout u-valign-middle-sm u-valign-top-lg u-valign-top-md u-valign-top-xl u-container-layout-4">
                      <div data-position="" className="u-position u-position-2">
                        <div className="u-block">
                          <div className="u-block-container u-clearfix">
                            <h5 className="u-align-center-xs u-block-header u-text u-text-3"> Help &amp; Support</h5>
                            <div className="u-align-center-xs u-block-content u-text">
                              <Link href="/termsandconditions" className="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-palette-1-base u-btn-4"><a>Terms &amp; Conditions</a></Link>
                              <br/>
                              <Link href="/privacypolicy" className="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-palette-1-base u-btn-5"><a>Privacy Policy</a></Link>
                              <br/>Refund Policy<br/>Contact Support
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </footer>
        </>
    );   
}
) 