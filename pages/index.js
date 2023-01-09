import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import Ratings from '../components/Rating';
import Image from 'next/image';


export default function Home({courses}) {
  const [readMore, setReadMore] = useState(false);


  const { userInfo } = useSelector((state) => state.userSignin);


  function Header(){
    return (
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
    );
  }

  function Courses(){
    return(
      <>
          <section className='u-align-center u-clearfix u-section-53' id='sec-3bea'>
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
    );
  }

  function StartTeaching(){
    function scrollClickHandler() {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
    return(
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
                        <svg className='u-svg-link' preserveAspectRatio='none' viewBox='0 0 160 50'>
                          <use xmlnsXlink='http://www.w3.org/1999/xlink' xlinkHref='#svg-7f47'></use>
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
                        onClick={scrollClickHandler}
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
    );
  }  

  return (
    <>
      <Header/>
      {courses?.length > 0 ? (
        <Courses/>
      ) : (
        <StartTeaching/>
      )}
    </>
  );
}




export async function getServerSideProps() {
  let courses;
  try {
    const res = await fetch(`https://coursemajor.vercel.app/api/courses`);
    courses = await res.json();
  } catch (err) {
    courses = [];
  }

  return { 
    props: {courses} 
  }
}