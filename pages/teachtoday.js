import React, {useEffect} from 'react';
//import { Link, useLocation } from 'react-router-dom';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
//import { courseCreate } from '../../redux/actions/courseActions';
import { courseCreate } from '../redux/actions/courseActions';
//import queryString from 'query-string';


export default function CreateCourseFunnel() {
    const dispatch = useDispatch();
    const courseCreated = useSelector(state => state.courseCreate);
    const playlistCreated = useSelector(state => state.playlistCreate);
    const { course } = courseCreated;

    const router = useRouter();
    const { loggedIn } = router.query;
  //const { loggedIn } = queryString.parse(search)
  //console.log(loggedIn);
  
  useEffect(() => {
    if (loggedIn=='true') {
      dispatch(courseCreate());
    }
  }, [dispatch, loggedIn]);

    const createHandler = (e) => {
      e.preventDefault();
      if (!localStorage.getItem("userInfo")) {
        return router.push(`/login?redirect=/teachtoday?loggedIn=true`)
      }
      dispatch(courseCreate());
    }
   
    playlistCreated.loading ? (
        console.log("dwl")    
    ) : (
        router.push(`/createcourse?courseId=${course._id}`)    
    )

    return (  
        <> 
          <section className="u-align-center u-clearfix u-palette-1-base u-section-61" id="sec-2e48">
            <div className="u-clearfix u-sheet u-sheet-1">
              <Link href='#'>
                <a className="u-custom-font u-text u-text-font u-text-palette-1-light-2 u-text-1" onClick={createHandler}>Get Started</a>
              </Link>
              <h2 className="u-text u-text-2">Simple and Easy</h2>
              <h1 className="u-custom-font u-font-open-sans u-text u-text-palette-3-base u-text-3">It&apos;s Free!</h1>
              <p className="u-text u-text-palette-2-light-3 u-text-4">Teach and Inspire, Share your course with the world<br/>
              </p>
              <button onClick={createHandler} className="u-active-palette-1-light-2 u-btn u-btn-round u-button-style u-hover-palette-1-light-2 u-radius-50 u-text-palette-1-base u-white u-btn-1">Get Started</button>
            </div>
          </section>
          <section className="u-align-center u-clearfix u-section-62" id="sec-c72f">
            <div className="u-clearfix u-sheet u-valign-middle u-sheet-1">
              <div className="u-clearfix u-expanded-width u-gutter-22 u-layout-wrap u-layout-wrap-1">
                <div className="u-layout">
                  <div className="u-layout-col">
                    <div className="u-size-40">
                      <div className="u-layout-row">
                        <div className="u-size-60">
                          <div className="u-layout-col">
                            <div className="u-align-left u-container-style u-layout-cell u-opacity u-opacity-70 u-palette-5-light-2 u-radius-20 u-size-60 u-layout-cell-1">
                              <div className="u-container-layout u-container-layout-1">
                                <h3 className="u-custom-font u-font-pt-sans u-text u-text-palette-5-base u-text-1">Take Control</h3>
                                <p className="u-align-left u-text u-text-palette-5-dark-1 u-text-2"> Freedom and flexibility to share your concepts and materials however you choose. Take full control over your content, course value, reach out to your targeted learners and more.</p>
                                <button onClick={createHandler} className="u-active-white u-btn u-btn-round u-button-style u-custom-font u-font-pt-sans u-hover-white u-palette-5-base u-radius-50 u-text-active-palette-5-base u-text-hover-palette-5-base u-btn-1">&nbsp;​<a>Get Started</a></button>
                                <img className="u-image u-image-contain u-image-default u-image-1" src="/images/ef-min1.jpg" alt="" data-image-width="700" data-image-height="780"/>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="u-size-20">
                      <div className="u-layout-row">
                        <div className="u-align-center u-container-style u-layout-cell u-opacity u-opacity-70 u-palette-2-light-2 u-radius-20 u-shape-round u-size-20 u-layout-cell-2">
                          <div className="u-container-layout u-valign-top u-container-layout-2">
                            <span className="u-icon u-icon-circle u-text-palette-2-base u-icon-1">
                              <svg className="u-svg-link" preserveAspectRatio="xMidYMin slice" viewBox="0 0 612 612">
                                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#svg-6197"></use>
                              </svg>
                              <svg className="u-svg-content" viewBox="0 0 612 612" x="0px" y="0px" id="svg-6197" style={{enableBackground:"new 0 0 612 612"}}><g>
                                <path d="M550.4,281.817c-18.385,20.637-36.395,42.868-48.965,73.54c-5.721,14.164-19.322,23.357-34.613,23.357   c-15.383,0-28.984-9.193-34.799-23.45c-14.541-35.646-36.584-59.939-57.971-83.39c-5.346-5.909-10.693-11.819-15.945-17.916   c-0.281,0.094-0.471,0.188-0.75,0.281c-20.824,6.284-36.865,33.862-27.203,56.281c6.566,15.383,52.623,12.476,48.684,45.587   c-3.283,27.108,32.172,34.237,44.742,32.925c12.57-1.501,31.893,20.637,22.137,30.392c-9.66,9.756-27.953,10.131-25.139,35.27   c0.75,7.316,22.889,6.379,22.889,17.447c0,11.162-11.443,23.826-2.627,36.677c1.877,2.813,3.846,4.971,5.91,6.659   c-42.398,39.022-98.961,62.941-160.964,62.941c-131.041,0-237.6-106.559-237.6-237.6c0-39.771,9.85-77.293,27.203-110.311   c-0.094,42.68,22.7,78.137,33.393,88.83c34.894,34.8,85.454,23.825,91.925,52.997c6.566,29.079-34.707,29.173-31.986,51.403   c2.813,22.325,56.562,28.235,44.556,48.777c-15.853,27.296,10.693,29.266,3.002,62.94c-4.127,18.386,22.418,21.95,32.268,7.974   c7.504-10.693,6.003-23.826,21.105-39.865c18.479-19.699,61.347-22.888,56.562-55.438c-8.16-54.029-60.689-62.472-83.577-75.136   c-25.983-14.257-19.604-48.495-25.233-64.816c-7.879-23.169-34.613,6.473-48.871-7.035c-23.45-22.137,4.221-53.467,23.919-52.81   c41.554,1.313,54.311,41.742,69.6,40.334c14.915-1.313,24.577-22.137,27.203-33.205c5.535-24.107-9.38-13.32-15.383-25.89   c-8.067-16.79,28.328-32.83,42.398-45.212c2.158-1.876,3.752-3.658,4.596-5.347c4.223-8.254-1.312-14.539-10.693-20.261   c-18.759-11.351-52.997-20.355-54.591-38.083c-0.939-10.882,19.886-16.134,43.617-17.072c3.939,0.188,7.785,0.563,11.726,0.938   c1.969-11.163,5.158-22.138,9.473-32.643c-11.35-1.501-22.887-2.252-34.613-2.252c-149.52,0-271.18,121.66-271.18,271.18   C14.604,490.34,136.265,612,285.785,612c149.52,0,271.182-121.661,271.182-271.181C556.967,320.558,554.715,300.766,550.4,281.817z    M454.062,0.603C377.51,7.839,325.078,82.016,338.439,157.741c13.568,76.921,84.49,100.598,119.686,186.942   c3.172,7.781,14.127,7.82,17.297,0.038c39.016-95.766,121.975-114.455,121.975-214.106C597.396,54.282,531.916-6.756,454.062,0.603   z M466.781,199.593c-38.096,0-68.979-30.882-68.979-68.978c0-38.095,30.883-68.977,68.979-68.977s68.977,30.882,68.977,68.977   S504.875,199.593,466.781,199.593z"></path>
      </g></svg></span>
                            <h3 className="u-custom-font u-font-pt-sans u-text u-text-palette-2-base u-text-3">Inspire all Arround</h3>
                            <p className="u-text u-text-palette-2-dark-1 u-text-4"> Inspire people worldwide.</p>
                          </div>
                        </div>
                        <div className="u-align-center u-container-style u-layout-cell u-opacity u-opacity-70 u-palette-3-light-2 u-radius-20 u-size-20 u-layout-cell-3">
                          <div className="u-container-layout u-valign-top u-container-layout-3">
                            <span className="u-icon u-icon-circle u-icon-2">
                              <svg className="u-svg-link" preserveAspectRatio="xMidYMin slice" viewBox="0 0 512 512">
                                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#svg-4b00"></use></svg>
                          <svg className="u-svg-content" viewBox="0 0 512 512" x="0px" y="0px" id="svg-4b00" style={{enableBackground:"new 0 0 512 512"}}>
                            <polygon style={{fill:"#FFE182"}} points="360.129,172.138 256,472.276 512,172.138 "></polygon><g>
                            <polygon style={{fill:"#FFCD73"}} points="105.931,39.724 0,172.138 151.871,172.138  "></polygon>
                            <polygon style={{fill:"#FFCD73"}} points="360.129,172.138 512,172.138 406.069,39.724  "></polygon>
                            <polygon style={{fill:"#FFCD73"}} points="360.129,172.138 256,39.724 151.871,172.138  "></polygon>
      </g>
                            <polygon style={{fill:"#FFAA64"}} points="256,39.724 105.931,39.724 151.871,172.138 "></polygon>
                            <polygon style={{fill:"#FFE182"}} points="406.069,39.724 256,39.724 360.129,172.138 "></polygon>
                            <polygon style={{fill:"#FFAA64"}} points="151.871,172.138 256,472.276 360.129,172.138 "></polygon>
                            <polygon style={{fill:"#FF8C5A"}} points="0,172.138 256,472.276 151.871,172.138 "></polygon>
                          </svg></span>
                            <h3 className="u-custom-font u-font-pt-sans u-text u-text-palette-3-base u-text-5">Recieve Value</h3>
                            <p className="u-text u-text-palette-3-dark-1 u-text-6">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint mollit anim id.</p>
                          </div>
                        </div>
                        <div className="u-align-center u-container-style u-layout-cell u-opacity u-opacity-70 u-palette-1-light-2 u-radius-20 u-size-20 u-layout-cell-4">
                          <div className="u-container-layout u-valign-top u-container-layout-4">
                            <span className="u-icon u-icon-circle u-icon-3">
                              <svg className="u-svg-link" preserveAspectRatio="xMidYMin slice" viewBox="0 0 512 512">
                                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#svg-929b"></use>
                              </svg>
                              <svg className="u-svg-content" viewBox="0 0 512 512" id="svg-929b">
                                <g id="_10-awareness"><g id="glyph">
                                  <path d="m68 408a12 12 0 0 0 12 12h27a12 12 0 0 0 11.642-9.089l18.727-74.911h-69.369z"></path><path d="m148 325.084c39.546 6.021 126.607 37.071 184 89.749v-317.666c-57.393 52.678-144.454 83.728-184 89.749z"></path><path d="m376 48a32.036 32.036 0 0 0 -32 32v352a32 32 0 0 0 64 0v-352a32.036 32.036 0 0 0 -32-32z"></path><path d="m68 188h68v136h-68z"></path><path d="m4 224v64a36.04 36.04 0 0 0 36 36h16v-136h-16a36.04 36.04 0 0 0 -36 36z"></path><path d="m496 244h-40a12 12 0 0 0 0 24h40a12 12 0 0 0 0-24z"></path><path d="m436.256 181.336a11.939 11.939 0 0 0 5.191-1.188l36.053-17.333a12 12 0 0 0 -10.4-21.63l-36.049 17.334a12 12 0 0 0 5.209 22.817z"></path><path d="m477.5 349.185-36.049-17.333a12 12 0 0 0 -10.4 21.629l36.049 17.334a12 12 0 0 0 10.4-21.63z"></path>
      </g>
      </g></svg></span>
                            <h3 className="u-custom-font u-font-pt-sans u-text u-text-palette-1-base u-text-7">Teach and Inspire</h3>
                            <p className="u-text u-text-palette-1-dark-1 u-text-8">Teach and share knowledge with the ones who matter.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="u-align-center u-clearfix u-palette-1-light-1 u-section-63" id="sec-4359">
            <div className="u-clearfix u-sheet u-sheet-1">
              <div className="u-clearfix u-gutter-40 u-layout-spacing-vertical u-layout-wrap u-layout-wrap-1">
                <div className="u-gutter-0 u-layout">
                  <div className="u-layout-row">
                    <div className="u-size-29 u-size-60-md">
                      <div className="u-layout-col">
                        <div className="u-align-left u-container-style u-image u-image-contain u-layout-cell u-left-cell u-size-40 u-image-1" data-image-width="600" data-image-height="600">
                          <div className="u-container-layout u-container-layout-1" src=""></div>
                        </div>
                        <div className="u-container-style u-layout-cell u-left-cell u-size-20 u-layout-cell-2">
                          <div className="u-container-layout u-container-layout-2">
                            <h2 className="u-text u-text-1"> Built for you</h2>
                            <p className="u-text u-text-body-alt-color u-text-2">Share learning materials using a platform made for educators built for teachers.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="u-size-31 u-size-60-md">
                      <div className="u-layout-col">
                        <div className="u-container-style u-hidden-md u-hidden-sm u-hidden-xs u-layout-cell u-right-cell u-size-20 u-layout-cell-3" wfd-invisible="true">
                          <div className="u-container-layout u-container-layout-3"></div>
                        </div>
                        <div className="u-align-center u-container-style u-layout-cell u-radius-50 u-right-cell u-shape-round u-size-40 u-white u-layout-cell-4">
                          <div className="u-container-layout u-valign-middle u-container-layout-4">
                            <img className="u-expanded-width u-image u-image-contain u-image-default u-image-2" src="/images/ef-min1.jpg" alt="" data-image-width="600" data-image-height="600"/>
                            <h5 className="u-text u-text-palette-1-dark-2 u-text-3">Built for Learning</h5>
                            <p className="u-text u-text-palette-1-dark-2 u-text-4">Reach your targeted learners and Develop on-demand learning for your learners</p><span className="u-icon u-icon-circle u-palette-1-light-2 u-spacing-15 u-text-palette-1-dark-2 u-icon-1"><svg className="u-svg-link" preserveAspectRatio="xMidYMin slice" viewBox="0 0 64 64">
                              <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#svg-7b58"></use></svg>
                              <svg className="u-svg-content" viewBox="0 0 64 64" id="svg-7b58">
                                <path d="m32 8c-1.104 0-2 .896-2 2v39.899l-14.552-15.278c-.761-.799-2.026-.832-2.828-.069-.8.762-.831 2.027-.069 2.827l16.62 17.449c.756.756 1.76 1.172 2.829 1.172 1.068 0 2.073-.416 2.862-1.207l16.586-17.414c.762-.8.73-2.065-.069-2.827-.799-.763-2.065-.731-2.827.069l-14.552 15.342v-39.963c0-1.104-.896-2-2-2z"></path>
                              </svg>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="u-align-center u-clearfix u-white u-section-64" id="carousel_8c74">
            <div className="u-clearfix u-sheet u-valign-middle u-sheet-1">
              <h3 className="u-custom-font u-text u-text-default u-text-font u-text-1">Want to Teach and Inspire?</h3>
              <h1 className="u-custom-font u-text u-text-font u-text-2">Become an Instructor</h1>
              <button onClick={createHandler} className="u-black u-border-0 u-btn u-btn-round u-button-style u-radius-50 u-btn-1">
                <a>
                learn more
                </a>
              </button>
            </div>
          </section> 
        </>
  );  
}