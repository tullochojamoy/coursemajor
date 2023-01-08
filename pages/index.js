import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import Ratings from '../components/Rating';
//import { list_courses } from './redux/actions/courseActions';
import Image from 'next/image';


export default function Home({courses}) {
  const [readMore, setReadMore] = useState(false);


  const { userInfo } = useSelector((state) => state.userSignin);


  function scrollClickHandler() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  

  return (
    <>
      <section
        className='u-align-right u-clearfix u-image u-valign-middle-lg u-valign-middle-md u-valign-middle-sm u-section-51'
        id='carousel_7eac'
      >
        <div className='u-clearfix u-layout-wrap u-layout-wrap-1'>
          <div className='u-layout'>
            <div className='u-layout-row'>
              <div className='u-align-left u-container-style u-layout-cell u-left-cell u-size-32 u-layout-cell-1'>
                <div className='u-container-layout u-valign-middle u-container-layout-1'>
                  <h3 className='u-text u-text-1'> crafted with care</h3>
                  <h1 className='u-custom-font u-font-montserrat u-text u-text-grey-80 u-text-2'>
                    {' '}
                    YOUR #1 PLACE FOR ONLINE COURSES
                  </h1>
                  <Link href={userInfo ? '/teachtoday' : '/register'}>
                    <a className='u-black u-btn u-button-style u-hover-grey-80 u-btn-1'>
                      join now
                    </a>
                  </Link>
                </div>
              </div>
              <div className='u-container-style u-image u-layout-cell u-right-cell u-size-28 u-image-1'>
                <div className='u-container-layout u-container-layout-2'></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {courses?.length > 0 ? (
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
                      <div key={course._id} className='u-container-style u-list-item u-repeater-item u-list-item-1'>
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
        <section className='u-clearfix u-section-52' id='carousel_8635'>
          <div className='u-clearfix u-sheet u-valign-middle u-sheet-1'>
            <div className='u-clearfix u-expanded-width u-layout-wrap u-layout-wrap-1'>
              <div className='u-layout'>
                <div className='u-layout-row'>
                  <div className='u-container-style u-layout-cell u-left-cell u-size-30 u-layout-cell-1'>
                    <div className='u-container-layout u-valign-middle u-container-layout-1'>
                      <div className='u-container-style u-group u-group-1'>
                        <div className='u-container-layout'>
                          <div className='u-palette-4-base u-shape u-shape-circle u-shape-1'></div>
                          <div
                            alt=''
                            className='u-image u-image-circle u-image-1'
                            data-image-width='1200'
                            data-image-height='800'
                          ></div>
                        </div>
                      </div>
                      <div className='u-shape u-shape-svg u-text-palette-4-base u-shape-2'>
                        <svg
                          className='u-svg-link'
                          preserveAspectRatio='none'
                          viewBox='0 0 160 50'
                        >
                          <use
                            xmlnsXlink='http://www.w3.org/1999/xlink'
                            xlinkHref='#svg-7f47'
                          ></use>
                        </svg>
                        <svg
                          className='u-svg-content'
                          viewBox='0 0 160 50'
                          x='0px'
                          y='0px'
                          id='svg-7f47'
                          style={{ enableBackground: 'new 0 0 160 50' }}
                        >
                          <path
                            d='M133,26.7c-13.9,9.7-25.8,9.7-39.8,0c-9.1-6.3-16.8-6.3-25.9,0c-13.8,9.6-25.1,9.6-38.9,0c-9.2-6.4-15.4-6.4-24.6,0L0,22
        c11.2-7.8,20.6-8.1,32.2,0c11,7.6,19,8.5,31.3,0c11.6-8.1,22.4-7.7,33.5,0c11.4,8,20.3,8.3,32.2,0c11.6-8.1,19.2-8.1,30.8,0
        l-3.8,4.7C146.9,20.2,142.3,20.2,133,26.7z M133,10.8c-13.9,9.7-25.8,9.7-39.8,0c-9.1-6.3-16.8-6.3-25.9,0
        c-13.8,9.6-25.1,9.6-38.9,0c-9.2-6.4-15.4-6.4-24.6,0L0,6.1c11.2-7.8,20.6-8.1,32.2,0c11,7.6,19,8.5,31.3,0C75.1-2,85.9-1.6,97,6.1
        c11.4,8,20.3,8.3,32.2,0C140.8-2,148.4-2,160,6.1l-3.8,4.7C146.9,4.3,142.3,4.3,133,10.8z M32.2,38c11,7.6,19,8.5,31.3,0
        c11.6-8.1,22.4-7.7,33.5,0c11.4,8,20.3,8.3,32.2,0c11.6-8.1,19.2-8.1,30.8,0l-3.8,4.7c-9.3-6.5-13.9-6.5-23.3,0
        c-13.9,9.7-25.8,9.7-39.8,0c-9.1-6.3-16.8-6.3-25.9,0c-13.8,9.6-25.1,9.6-38.9,0c-9.2-6.4-15.4-6.4-24.6,0L0,38
        C11.2,30.2,20.6,29.9,32.2,38z'
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className='u-container-style u-layout-cell u-right-cell u-size-30 u-layout-cell-2'>
                    <div className='u-container-layout u-valign-middle u-container-layout-3'>
                      <h4 className='u-text u-text-palette-4-dark-2 u-text-1'>
                        Get access to high quality learning!
                      </h4>
                      <h1 className='u-text u-text-2'>
                        Are you an educator? Start teaching on CourseMajor
                      </h1>
                      <p className='u-text u-text-grey-50 u-text-3'>
                        Become one of the first teachers on CourseMajor
                      </p>
                      <Link
                        href='/teachtoday'
                        //onClick={scrollClickHandler}
                      >
                        <a className='u-active-palette-1-dark-2 u-btn u-btn-rectangle u-button-style u-custom-font u-font-pt-sans u-hover-palette-1-dark-2 u-palette-1-dark-3 u-radius-0 u-btn-1'>
                          START TEACHING
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/*
        <section className="u-align-center u-clearfix u-grey-5 u-section-55" id="sec-c530">
          <div className="u-clearfix u-sheet u-sheet-1">
            <h2 className="u-text u-text-1">Top Sellers</h2>
            <div className="u-expanded-width u-gallery u-layout-horizontal u-lightbox u-no-transition u-show-text-on-hover u-width-fixed u-gallery-1">
              <div className="u-gallery-inner">
                <div className="u-effect-fade u-gallery-item u-gallery-item-1">
                  <div className="u-back-slide">
                    <img className="u-back-image u-back-image-1" src="/images/1.svg"/>
                  </div>
                  <div className="u-over-slide u-shading u-over-slide-1">
                    <h3 className="u-gallery-heading"></h3>
                    <p className="u-gallery-text"></p>
                  </div>
                  </div>
                  <div className="u-effect-fade u-gallery-item u-gallery-item-2">
                    <div className="u-back-slide">
                      <img className="u-back-image u-back-image-2" src="/images/1.svg"/>
                    </div>
                    <div className="u-over-slide u-shading u-over-slide-2">
                      <h3 className="u-gallery-heading"></h3>
                      <p className="u-gallery-text"></p>
                    </div>
                  </div>
                  <div className="u-effect-fade u-gallery-item u-gallery-item-3">
                    <div className="u-back-slide">
                      <img className="u-back-image u-back-image-3" src="/images/1.svg"/>
                    </div>
                    <div className="u-over-slide u-shading u-over-slide-3">
                      <h3 className="u-gallery-heading"></h3>
                      <p className="u-gallery-text"></p>
                    </div>
                  </div>
                  <div className="u-effect-fade u-gallery-item u-gallery-item-4"><div className="u-back-slide"><img className="u-back-image u-back-image-4" src="/images/1.svg"/>
                  </div><div className="u-over-slide u-shading u-over-slide-4"><h3 className="u-gallery-heading"></h3><p className="u-gallery-text"></p>
                  </div>
                  </div><div className="u-effect-fade u-gallery-item u-gallery-item-5"><div className="u-back-slide"><img className="u-back-image u-back-image-5" src="/images/1.svg"/>
                  </div><div className="u-over-slide u-shading u-over-slide-5"><h3 className="u-gallery-heading"></h3><p className="u-gallery-text"></p>
                  </div>
                  </div><div className="u-effect-fade u-gallery-item u-gallery-item-6"><div className="u-back-slide"><img className="u-back-image u-back-image-6" src="/images/1.svg"/>
                  </div><div className="u-over-slide u-shading u-over-slide-6"><h3 className="u-gallery-heading"></h3><p className="u-gallery-text"></p>
                  </div>
                  </div></div>
              <Link className="u-absolute-vcenter u-gallery-nav u-gallery-nav-prev u-grey-70 u-icon-circle u-opacity u-opacity-70 u-spacing-10 u-text-white u-gallery-nav-1" href="#" role="button">
                <span aria-hidden="true">
                  <svg viewBox="0 0 451.847 451.847">
                    <path d="M97.141,225.92c0-8.095,3.091-16.192,9.259-22.366L300.689,9.27c12.359-12.359,32.397-12.359,44.751,0
    c12.354,12.354,12.354,32.388,0,44.748L173.525,225.92l171.903,171.909c12.354,12.354,12.354,32.391,0,44.744
    c-12.354,12.365-32.386,12.365-44.745,0l-194.29-194.281C100.226,242.115,97.141,234.018,97.141,225.92z"></path>
                  </svg>
                </span>
                <span className="sr-only">
                  <svg viewBox="0 0 451.847 451.847"><path d="M97.141,225.92c0-8.095,3.091-16.192,9.259-22.366L300.689,9.27c12.359-12.359,32.397-12.359,44.751,0
    c12.354,12.354,12.354,32.388,0,44.748L173.525,225.92l171.903,171.909c12.354,12.354,12.354,32.391,0,44.744
    c-12.354,12.365-32.386,12.365-44.745,0l-194.29-194.281C100.226,242.115,97.141,234.018,97.141,225.92z"></path></svg>
                </span>
              </Link>
              <Link className="u-absolute-vcenter u-gallery-nav u-gallery-nav-next u-grey-70 u-icon-circle u-opacity u-opacity-70 u-spacing-10 u-text-white u-gallery-nav-2" href="#" role="button">
                <span aria-hidden="true">
                  <svg viewBox="0 0 451.846 451.847"><path d="M345.441,248.292L151.154,442.573c-12.359,12.365-32.397,12.365-44.75,0c-12.354-12.354-12.354-32.391,0-44.744
    L278.318,225.92L106.409,54.017c-12.354-12.359-12.354-32.394,0-44.748c12.354-12.359,32.391-12.359,44.75,0l194.287,194.284
    c6.177,6.18,9.262,14.271,9.262,22.366C354.708,234.018,351.617,242.115,345.441,248.292z"></path></svg>
                </span>
                <span className="sr-only">
                  <svg viewBox="0 0 451.846 451.847">
                    <path d="M345.441,248.292L151.154,442.573c-12.359,12.365-32.397,12.365-44.75,0c-12.354-12.354-12.354-32.391,0-44.744
    L278.318,225.92L106.409,54.017c-12.354-12.359-12.354-32.394,0-44.748c12.354-12.359,32.391-12.359,44.75,0l194.287,194.284
    c6.177,6.18,9.262,14.271,9.262,22.366C354.708,234.018,351.617,242.115,345.441,248.292z"></path></svg>
                </span>
              </Link>
            </div>
          </div>
        </section>
      */}
    </>
  );
}




export async function getServerSideProps() {
  let courses;
  try {
    const res = await fetch(`https://coursemajor.vercel.app/api/courses`);
    courses = await res.json();
    //console.log(courses);
  } catch (err) {
    //console.log(err);
    courses = [];
  }

  return { 
    props: {courses} 
  }
}