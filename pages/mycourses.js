import React, {useEffect, useState} from 'react';
//import { Link } from 'react-router-dom';
import Link from 'next/link';
import {useSelector, useDispatch} from 'react-redux';
//import {listPurchasedCourses} from '../../redux/actions/courseActions';
import { listPurchasedCourses } from '../redux/actions/courseActions';
import Ratings from '../components/Rating'

export default function MyCourses() {

    const dispatch = useDispatch();
    const coursePurchasedList = useSelector(state => state.coursePurchasedList);
    const { loading, error, courses } = coursePurchasedList;
    const [readMore, setReadMore] = useState(false);

    useEffect(() => {
        dispatch(listPurchasedCourses());
    }, [dispatch]);

    return (
      <>
        <section
          className='u-align-right u-clearfix u-image u-section-301'
          id='carousel_7eac'
        >
          <div className='u-clearfix u-layout-wrap u-layout-wrap-1'>
            <div className='u-layout'>
              <div className='u-layout-row'>
                <div className='u-align-left u-container-style u-layout-cell u-left-cell u-size-32 u-layout-cell-1'>
                  <div className='u-container-layout u-container-layout-1'>
                    <h3 className='u-text u-text-1'> crafted with care</h3>
                    <h1 className='u-custom-font u-font-montserrat u-text u-text-grey-80 u-text-2'>
                      View ​YOUR favourite courses below
                    </h1>
                  </div>
                </div>
                <div className='u-container-style u-image u-layout-cell u-right-cell u-size-28 u-image-1'>
                  <div className='u-container-layout u-container-layout-2'></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {loading ? (
          <h1>Loading...</h1>
        ) : coursePurchasedList.courses ? (
          <>
            <section
              className='u-align-center u-clearfix u-section-53'
              id='sec-3bea'
            >
              <div className='u-clearfix u-sheet u-valign-middle u-sheet-1'>
                <h1 className='u-text u-text-default u-text-1'>Courses</h1>
              </div>
            </section>
            <section className='u-clearfix u-section-54' id='carousel_b50c'>
              <div className='u-clearfix u-sheet u-sheet-1'>
                <div className='u-expanded-width u-list u-list-1'>
                  <div className='u-repeater u-repeater-1'>
                    {courses?.map((course) => {
                      return (
                        <div
                          key={course._id}
                          className='u-container-style u-list-item u-repeater-item u-list-item-1'
                        >
                          <div className='u-container-layout u-similar-container u-container-layout-1'>
                            <img
                              src={`/api/courses/image/${course.imageKey}`}
                              alt={course.title}
                              className='u-expanded-width u-image u-image-default u-image-1'
                              data-image-width='1200'
                              data-image-height='1500'
                            />
                            <h5 className='u-text u-text-default u-text-1'>
                              {course.title}&nbsp;
                            </h5>
                            <p className='u-custom-item u-text u-text-2'>
                              {readMore
                                ? course.description
                                : `${course.description.substring(0, 137)}... `}
                              <span
                                onClick={() => setReadMore(!readMore)}
                                style={{ color: 'blue' }}
                              >
                                {readMore ? ' show less' : 'read more'}
                              </span>
                            </p>
                            <h4 className='u-align-left u-text u-text-default u-text-palette-1-base u-text-3'>
                              {
                                // eslint-disable-next-line eqeqeq
                                course.price == 0 || course.price == null ? (
                                  <>FREE</>
                                ) : (
                                  <>${course.price}</>
                                )
                              }
                            </h4>
                            <Link href={`/course/${course._id}`}>
                              <a className='u-align-right u-btn u-button-style u-btn-1'>
                                Preview
                              </a>
                            </Link>
                            <div className='u-align-left u-shape u-shape-rectangle u-shape-1'>
                              <Ratings rating={course.star} />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : (
          <section
            className='u-align-center u-clearfix u-image u-valign-middle-md u-valign-middle-sm u-valign-middle-xs u-section-302'
            id='carousel_46a8'
            data-image-width='1980'
            data-image-height='1114'
          >
            <div className='u-clearfix u-gutter-0 u-layout-wrap u-layout-wrap-1'>
              <div className='u-layout'>
                <div className='u-layout-row'>
                  <div
                    className='u-align-left u-container-style u-layout-cell u-left-cell u-shape-rectangle u-size-20-lg u-size-20-xl u-size-23-md u-size-23-sm u-size-23-xs u-size-xs-60 u-layout-cell-1'
                    src=''
                  >
                    <div className='u-container-layout u-container-layout-1'>
                      <h1
                        className='u-text u-text-body-alt-color u-text-1'
                        data-animation-name='fadeIn'
                        data-animation-duration='1000'
                        data-animation-direction='Left'
                        data-animation-delay='250'
                      >
                        {' '}
                        Library Education
                      </h1>
                      <p
                        className='u-text u-text-body-alt-color u-text-2'
                        data-animation-name='fadeIn'
                        data-animation-duration='1000'
                        data-animation-direction='Up'
                        data-animation-delay='250'
                      >
                        Find your favourite here
                      </p>
                      <Link href='/'>
                        <a
                          className='u-border-none u-btn u-btn-round u-button-style u-palette-3-base u-radius-10 u-text-palette-1-base u-btn-1'
                          data-animation-name='fadeIn'
                          data-animation-duration='1000'
                          data-animation-direction='Up'
                          data-animation-delay='500'
                        >
                          learn more
                        </a>
                      </Link>
                    </div>
                  </div>
                  <div
                    className='u-align-center u-container-style u-image u-layout-cell u-right-cell u-size-37-md u-size-37-sm u-size-37-xs u-size-40-lg u-size-40-xl u-size-xs-60 u-image-1'
                    data-image-width='1422'
                    data-image-height='900'
                  >
                    <div
                      className='u-container-layout u-container-layout-2'
                      src=''
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/*
        <section className="u-align-center u-clearfix u-valign-middle u-section-304" id="carousel_f822">
          <div className="u-expanded-width u-grey-10 u-shape u-shape-rectangle u-shape-1"></div>
          <h5 className="u-custom-font u-font-montserrat u-text u-text-1">Your Favourite Courses</h5>
          <h1 className="u-text u-text-2"> Learn Anything, On Your Schedule</h1>
          <div className="u-list u-list-1">
            <div className="u-repeater u-repeater-1">
              <div className="u-container-style u-list-item u-repeater-item u-white u-list-item-1">
                <div className="u-container-layout u-similar-container u-container-layout-1">
                  <img alt="" className="u-bottom-left-radius-20 u-expanded-width u-image u-image-round u-top-right-radius-20 u-image-1" data-image-width="800" data-image-height="800" src="images/bn.jpg"/>
                  <h3 className="u-text u-text-default u-text-3">Build Skills</h3>
                  <p className="u-text u-text-4">Sample text. Click to select the text box. Click again or double click to start editing the text.</p>
                  <a href="https://nicepage.com/c/pets-animals-html-templates" className="u-active-none u-border-2 u-border-active-black u-border-hover-black u-border-palette-2-base u-btn u-button-style u-hover-none u-none u-text-body-color u-btn-1">learn more</a>
                  <div className="u-palette-1-base u-shape u-shape-rectangle u-shape-2"></div>
                </div>
              </div>
              <div className="u-container-style u-list-item u-repeater-item u-white u-list-item-2">
                <div className="u-container-layout u-similar-container u-container-layout-2">
                  <img alt="" className="u-bottom-left-radius-20 u-expanded-width u-image u-image-round u-top-right-radius-20 u-image-2" data-image-width="1200" data-image-height="1002" src="images/kj.jpg"/>
                  <h3 className="u-text u-text-default u-text-5">Free Classes</h3>
                  <p className="u-text u-text-6">Sample text. Click to select the text box. Click again or double click to start editing the text.</p>
                  <a href="https://nicepage.com/html-templates" className="u-active-none u-border-2 u-border-active-black u-border-hover-black u-border-palette-2-base u-btn u-button-style u-hover-none u-none u-text-body-color u-btn-2">learn more</a>
                  <div className="u-palette-1-base u-shape u-shape-rectangle u-shape-3"></div>
                </div>
              </div>
              <div className="u-container-style u-list-item u-repeater-item u-white u-list-item-3">
                <div className="u-container-layout u-similar-container u-container-layout-3">
                  <img alt="" className="u-bottom-left-radius-20 u-expanded-width u-image u-image-round u-top-right-radius-20 u-image-3" data-image-width="1080" data-image-height="1080" src="images/nn.jpg"/>
                  <h3 className="u-text u-text-default u-text-7"> Methodology</h3>
                  <p className="u-text u-text-8">Sample text. Click to select the text box. Click again or double click to start editing the text.</p>
                  <a href="https://nicepage.dev" className="u-active-none u-border-2 u-border-active-black u-border-hover-black u-border-palette-2-base u-btn u-button-style u-hover-none u-none u-text-body-color u-btn-3">learn more</a>
                  <div className="u-palette-1-base u-shape u-shape-rectangle u-shape-4"></div>
                </div>
              </div>
            </div>
          </div>
        </section>   
        */}
      </>
    );
}