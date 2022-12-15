import React, { useState, useEffect } from "react";
import Link from 'next/link';
//import {useLocation } from 'react-router-dom';
import { useRouter, withRouter } from 'next/router';
import Dropzone from 'react-dropzone';
import { useSelector, useDispatch } from 'react-redux';
import { coursesDetails, courseUpdate } from '../redux/actions/courseActions';
import { playlistDetails } from '../redux/actions/videoActions';



//import queryString from 'query-string';

export default function CreateCourse({ courseInitialDetails }) {
  const [courseName, setCourseName] = useState();
  const [courseDescription, setCourseDescription] = useState('');
  const [coursePrice, setCoursePrice] = useState(997);
  const [courseCategory, setCourseCategory] = useState('');
  const [courseSubCategory, setCourseSubCategory] = useState('');
  const [tags, setTags] = useState('');
  const [goldenMajor, setGoldenMajor] = useState();
  //const [image, setImage] = useState();

  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  const router = useRouter();
  const { courseId } = router.query;

  const courseDetail = useSelector((state) => state.courseDetails);
  const courseUpdated = useSelector((state) => state.courseUpdate);
  const coursePercent = useSelector((state) => state.coursePercent);
  const { percent } = coursePercent;

  useEffect(() => {
    if (!localStorage.getItem('userInfo')) {
      router.push(`/login?redirect=/createCourse?courseId=${courseId}`);
    }

    dispatch(coursesDetails(courseId));
    dispatch(playlistDetails(courseId));

    setIsLoading(false);
  }, [courseId, dispatch, router]);

  //courseDetail?.course && setCourseName(courseDetail.course.title);

  //console.log(courseDetail)
  //console.log(percent);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const createCourseHandler = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('name', courseName);
    formData.append('price', coursePrice);
    formData.append('description', courseDescription);
    formData.append('category', courseCategory);
    formData.append('subcategory', courseSubCategory);
    formData.append('tags', tags);

    dispatch(courseUpdate(courseId, formData));

    setError(courseUpdated.error);
    setSuccess(courseUpdated.success);
    setTimeout(() => {
      setError('');
      setSuccess('');
    }, 10000);
  };

  const onDrop = async (image) => {
    let formData = new FormData();
    formData.append('image', image[0]);

    dispatch(courseUpdate(courseId, formData));
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      {courseDetail.loading ? (
        <h1>Loading...</h1>
      ) : courseDetail.error ? (
        <h1>{courseDetail.error}</h1>
      ) : courseDetail?.course?.course ? (
        <>
          <section
            className='u-align-center-sm u-align-center-xs u-clearfix u-valign-middle-lg u-valign-middle-md u-valign-middle-xl u-section-76'
            id='sec-a72f'
          >
            <div className='u-clearfix u-layout-wrap u-layout-wrap-1'>
              <div className='u-layout'>
                <div className='u-layout-row'>
                  <div className='u-align-center-sm u-align-center-xs u-container-style u-layout-cell u-size-20 u-layout-cell-1'>
                    <div className='u-container-layout u-valign-middle-md u-valign-middle-sm u-valign-middle-xs u-container-layout-1'>
                      <img
                        className='u-image u-image-default u-image-1'
                        src={`http://localhost:3000/api/courses/image/${courseDetail?.course?.course.imageKey}`}
                        alt={courseDetail.course.course.title}
                        data-image-width='817'
                        data-image-height='933'
                      />
                    </div>
                  </div>
                  <div className='u-container-style u-layout-cell u-size-20 u-layout-cell-2'>
                    <div className='u-container-layout u-container-layout-2'></div>
                  </div>
                  <div className='u-align-center-sm u-align-center-xs u-container-style u-layout-cell u-size-20 u-layout-cell-3'>
                    <div className='u-container-layout u-valign-middle u-container-layout-3'>
                      <Link href={`/createplaylist?courseId=${courseId}`}>
                        <a className='u-align-right u-btn u-btn-round u-button-style u-hover-palette-1-light-2 u-palette-1-base u-radius-2 u-btn-1'>
                          Next&nbsp;
                          <span className='u-icon'>
                            <svg
                              className='u-svg-content'
                              viewBox='0 0 512 512'
                              x='0px'
                              y='0px'
                              style={{ width: '1em;', height: '1em;' }}
                            >
                              <path d='M506.134,241.843c-0.006-0.006-0.011-0.013-0.018-0.019l-104.504-104c-7.829-7.791-20.492-7.762-28.285,0.068 c-7.792,7.829-7.762,20.492,0.067,28.284L443.558,236H20c-11.046,0-20,8.954-20,20c0,11.046,8.954,20,20,20h423.557 l-70.162,69.824c-7.829,7.792-7.859,20.455-0.067,28.284c7.793,7.831,20.457,7.858,28.285,0.068l104.504-104 c0.006-.006,0.011-.013,0.018-.019C513.968,262.339,513.943,249.635,506.134,241.843z'></path>
                            </svg>
                          </span>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='u-border-1 u-border-palette-5-base u-expanded-width-lg u-expanded-width-md u-expanded-width-xl u-line u-line-horizontal u-line-1'></div>
          </section>
          <section className='u-clearfix u-section-77' id='sec-1a9d'>
            <div className='u-clearfix u-sheet u-valign-middle u-sheet-1'>
              <h1 className='u-align-center u-text u-text-default u-text-1'>
                Edit your Course
              </h1>
            </div>
          </section>
          <section
            className='u-align-center-md u-align-center-sm u-align-center-xs u-clearfix u-section-78'
            id='carousel_45b0'
          >
            <div className='u-clearfix u-sheet u-valign-middle-lg u-valign-middle-xl u-sheet-1'>
              <div className='u-align-right u-expanded-width-md u-expanded-width-sm u-expanded-width-xs u-form u-form-1'>
                {courseUpdated.loading ? (
                  <center>Loading...</center>
                ) : error ? (
                  <center style={{ color: 'red' }}>
                    {courseUpdated.error}
                  </center>
                ) : success ? (
                  <center style={{ color: 'green' }}>
                    {courseUpdated.course.message}
                  </center>
                ) : (
                  <></>
                )}

                <form
                  onSubmit={createCourseHandler}
                  className='u-clearfix u-form-spacing-10 u-form-vertical u-inner-form'
                  name='form'
                  style={{ padding: '10px;' }}
                >
                  <div className='u-form-group u-form-name u-form-partition-factor-2'>
                    <label
                      htmlFor='name-9bab'
                      className='u-form-control-hidden u-label'
                    ></label>
                    <input
                      type='text'
                      placeholder='Enter Course Name'
                      id='name-9bab'
                      name='coursename'
                      className='u-border-1 u-border-grey-30 u-input u-input-rectangle u-white'
                      required
                      value={courseName}
                      onChange={(e) => setCourseName(e.target.value)}
                    />
                  </div>
                  <div className='u-form-group u-form-partition-factor-2'>
                    <label
                      htmlFor='email-9bab'
                      className='u-form-control-hidden u-label'
                    ></label>
                    <input
                      type='text'
                      placeholder='Enter Course Price'
                      id='email-9bab'
                      name='courseprice'
                      className='u-border-1 u-border-grey-30 u-input u-input-rectangle u-white'
                      required
                      value={`$${coursePrice}`}
                      onChange={(e) => setCoursePrice(e.target.value)}
                    />
                  </div>
                  <div className='u-form-group u-form-partition-factor-2 u-form-select u-form-group-3'>
                    <label htmlFor='select-f98d' className='u-label'>
                      Select A Course Category
                    </label>
                    <div className='u-form-select-wrapper'>
                      <select
                        id='select-f98d'
                        name='select'
                        className='u-border-1 u-border-grey-30 u-input u-input-rectangle u-white'
                        required
                        value={courseCategory}
                        onChange={(e) => setCourseCategory(e.target.value)}
                      >
                        <option value='Finance and Business'>
                          Finance and Business
                        </option>
                        <option value='Real Estate'>Real Estate</option>
                        <option value='Stocks and Bonds'>
                          Stocks and Bonds
                        </option>
                        <option value='Marketing'>Marketing</option>
                        <option value='Cryptocurrency'>Cryptocurrency</option>
                        <option value='Education'>Education</option>
                        <option value='Mathematics'>Mathematics</option>
                        <option value='Science'>Science</option>
                        <option value='Medical'>Medical</option>
                        <option value='Entertainment'>Entertainment</option>
                      </select>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='14'
                        height='12'
                        version='1'
                        className='u-caret'
                      >
                        <path fill='currentColor' d='M4 8L0 4h8z'></path>
                      </svg>
                    </div>
                  </div>
                  <div className='u-form-group u-form-partition-factor-2 u-form-select u-form-group-4'>
                    <label htmlFor='select-386a' className='u-label'>
                      Select a Second Category
                    </label>
                    <div className='u-form-select-wrapper'>
                      <select
                        id='select-386a'
                        name='select-1'
                        className='u-border-1 u-border-grey-30 u-input u-input-rectangle u-white'
                        value={courseSubCategory}
                        onChange={(e) => setCourseSubCategory(e.target.value)}
                      >
                        <option value='Social Media'>Social Media</option>
                        <option value='Lifestyle'>Lifestyle</option>
                        <option value='Art &amp; Design'>
                          Art &amp; Design
                        </option>
                        <option value='Auto &amp; Vehicles'>
                          Auto &amp; Vehicles
                        </option>
                        <option value='Beauty'>Beauty</option>
                        <option value='Communication'>Communication</option>
                        <option value='Dating'>Dating</option>
                        <option value='Entertainment'>Entertainment</option>
                        <option value='Events'>Events</option>
                        <option value='Food &amp; Drink'>
                          Food &amp; Drink
                        </option>
                        <option value='Health &amp; Fitness'>
                          Health &amp; Fitness
                        </option>
                        <option value='House &amp; Home'>
                          House &amp; Home
                        </option>
                        <option value='Music &amp; Audio'>
                          Music &amp; Audio
                        </option>
                        <option value='News &amp; Magazines'>
                          News &amp; Magazines
                        </option>
                        <option value='Parenting'>Parenting</option>
                        <option value='Personalization'>Personalization</option>
                        <option value='Photography'>Photography</option>
                        <option value='Productivity'>Productivity</option>
                        <option value='Social'>Social</option>
                        <option value='Sports'>Sports</option>
                        <option value='Video Players &amp; Editors'>
                          Video Players &amp; Editors
                        </option>
                        <option value='Weather'>Weather</option>
                        <option value='Action'>Action</option>
                        <option value='Adventure'>Adventure</option>
                        <option value='Educational'>Educational</option>
                        <option value='Music'>Music</option>
                        <option value='Simulation'>Simulation</option>
                        <option value='Games'>Games</option>
                      </select>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='14'
                        height='12'
                        version='1'
                        className='u-caret'
                      >
                        <path fill='currentColor' d='M4 8L0 4h8z'></path>
                      </svg>
                    </div>
                  </div>
                  <div className='u-form-group u-form-message'>
                    <label
                      htmlFor='message-9bab'
                      className='u-form-control-hidden u-label'
                    ></label>
                    <textarea
                      placeholder='Enter Course Description'
                      rows='4'
                      cols='50'
                      id='message-9bab'
                      name='coursedescription'
                      className='u-border-1 u-border-grey-30 u-input u-input-rectangle u-white'
                      required
                      value={courseDescription}
                      onChange={(e) => setCourseDescription(e.target.value)}
                    ></textarea>
                  </div>
                  <div className='u-align-center u-form-group u-form-submit'>
                    <button
                      type='submit'
                      className='u-btn u-btn-submit u-button-style u-btn-1'
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>

              <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
                {({ getRootProps, getInputProps }) => (
                  <div className='u-align-left-lg u-align-left-md u-align-left-sm u-align-left-xs u-container-style u-expanded-width-sm u-expanded-width-xs u-group u-group-1'>
                    <div
                      className='u-container-layout u-valign-middle u-container-layout-1'
                      {...getRootProps()}
                    >
                      <input {...getInputProps()} />
                      <img
                        className='u-align-center-xs u-align-left-lg u-align-left-md u-align-left-sm u-align-left-xl u-image u-image-default u-preserve-proportions u-image-1'
                        src={`http://localhost:3000/api/courses/image/${courseDetail.course.course.imageKey}`}
                        alt={courseDetail.course.course.title}
                        data-image-width='817'
                        data-image-height='933'
                      />
                      <div className='u-btn u-button-style u-hover-palette-1-dark-1 u-palette-1-base u-btn-2'>
                        Change Thumbnail
                      </div>
                      {percent > 0 ? (
                        <center>{`Upload Progress: ${percent}`}</center>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                )}
              </Dropzone>
            </div>
          </section>
          <section className='u-clearfix u-section-79' id='sec-33c2'>
            <div className='u-clearfix u-sheet u-sheet-1'>
              <div className='u-absolute-hcenter u-expanded u-form'>
                <form
                  onSubmit={createCourseHandler}
                  className='u-clearfix u-form-spacing-10 u-form-vertical u-inner-form'
                  name='form-1'
                  style={{ padding: '10px;' }}
                >
                  <div className='u-form-group u-form-name'>
                    <label
                      htmlFor='name-f135'
                      className='u-form-control-hidden u-label'
                    ></label>
                    <input
                      type='text'
                      placeholder='Enter tag relating to your course (Seperate by comma)'
                      id='name-f135'
                      name='name'
                      className='u-border-1 u-border-grey-30 u-input u-input-rectangle u-white'
                      required
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                    />
                  </div>
                  <div className='u-align-left u-form-group u-form-submit'>
                    <button
                      type='submit'
                      className='u-btn u-btn-submit u-button-style u-btn-1'
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
              <div className='u-form u-form-2'>
                <form
                  onSubmit={createCourseHandler}
                  className='u-clearfix u-form-spacing-10 u-form-vertical u-inner-form'
                  source='custom'
                  name='form-2'
                  style={{ padding: '10px;' }}
                >
                  <div className='u-form-agree u-form-group u-form-group-3'>
                    <input
                      type='checkbox'
                      id='agree-f848'
                      name='agree'
                      className='u-agree-checkbox'
                      required
                      value={goldenMajor}
                      onChange={(e) => setGoldenMajor(e.target.value)}
                    />
                    <label htmlFor='agree-f848' className='u-label'>
                      Are you an Established Official? Check to applying for
                      Golden Major
                    </label>
                  </div>
                  <div className='u-align-center u-form-group u-form-submit'>
                    <button
                      type='submit'
                      className='u-btn u-btn-submit u-button-style'
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </>
      ) : (
        <></>
      )}
    </>
  );
}


/*
export async function getServerSideProps(context) {
  let courseInitialDetails;
  try {
    const res = await fetch(`http://localhost:3000/api/courses/getCourse/${context.query.courseId}`);
    const courseInitialDetails = await res.json();
  } catch (err) {
    //console.log(err);
    courseInitialDetails = [];
  }

  return {
    props: { courseInitialDetails },
  };
}
*/