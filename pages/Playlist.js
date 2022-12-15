import React, { useEffect, useState } from 'react';

//import { Link } from 'react-router-dom';
import Link from 'next/link';
import ReactPlayer from 'react-player';

import { useSelector, useDispatch } from 'react-redux';
import { coursesDetails } from '../redux/actions/courseActions';
import { playlistDetails } from '../redux/actions/videoActions';
import { reviewCreate, listReviews } from '../redux/actions/reviewActions';


//import { courseDetails } from '../redux'
//import Rating from '../../components/Rating';



function StarRating({count, value, 
    inactiveColor='#ddd',
    size=24,
    activeColor='#f00', onChange}) {

  // short trick 
  //const stars = Array.from({length: count}, () => '🟊')

  const stars = Array.from({length: count}, () => 
    <>
      <svg className="u-svg-link" style={{width:size, height:size}} preserveAspectRatio="xMidYMin slice" viewBox="0 0 512.001 512.001">
        <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#svg-2627"></use>
      </svg>
      <svg className="u-svg-content" viewBox="0 0 512.001 512.001" x="0px" y="0px" id="svg-2627" style={{enableBackground:"new 0 0 512.001 512.001;"}}>
        <path style={{fill:"#FFDC64;"}} d="M499.92,188.26l-165.839-15.381L268.205,19.91c-4.612-10.711-19.799-10.711-24.411,0l-65.875,152.97  L12.08,188.26c-11.612,1.077-16.305,15.52-7.544,23.216l125.126,109.922L93.044,483.874c-2.564,11.376,9.722,20.302,19.749,14.348  L256,413.188l143.207,85.034c10.027,5.954,22.314-2.972,19.75-14.348l-36.619-162.476l125.126-109.922  C516.225,203.78,511.532,189.337,499.92,188.26z"></path>
        <path style={{fill:"#FFC850;"}} d="M268.205,19.91c-4.612-10.711-19.799-10.711-24.411,0l-65.875,152.97L12.08,188.26  c-11.612,1.077-16.305,15.52-7.544,23.216l125.126,109.922L93.044,483.874c-2.564,11.376,9.722,20.302,19.749,14.348l31.963-18.979  c4.424-182.101,89.034-310.338,156.022-383.697L268.205,19.91z"></path>
      </svg>
    </> 
  )



  // Internal handle change function
  const handleChange = (value) => {
    onChange(value + 1);
  }

  return (
    <div>
      {stars.map((s, index) => {
        let style = inactiveColor;
        if (index < value) {
          style=activeColor;
        }
        return (
          <span 
            key={index} 
            //className="u-icon u-icon-circle u-text-palette-1-base u-icon-1"
            style={{color: style}} 
            onClick={()=>handleChange(index)}
          >
          {s}
          </span>
        )
      })}
    </div>
  )
}


export default function Course(props) {
  const [rating, setRating] = useState(undefined);
  const [ratingError, setRatingError] = useState("");
  const [reviewMessage, setReviewMessage] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");
  const [currentVideo, setCurrentVideo] = useState();
  const [readMore, setReadMore] = useState(false);
  
  const dispatch = useDispatch();

  const courseId = props?.match?.params?.id;

  useEffect(() => {
    dispatch(coursesDetails(courseId));
    dispatch(playlistDetails(courseId));
    dispatch(listReviews(courseId));
  }, [dispatch, courseId]);

  const courseDetail = useSelector((state) => state.courseDetails);
  const { error, course } = courseDetail;

  const playlistDetail = useSelector((state) => state.playlistDetails);
  const { playlist } = playlistDetail;

  //const reviewDetails = useSelector(state => state.reviewDetails);
  const reviewList = useSelector(state => state.reviewList);
  //const reviewCreated = useSelector(state => state.reviewCreate);
 
  const handleChange = (value) => {
    setRating(value);
  }
  
  function reviewSubmitHandler(e){
    e.preventDefault();
    
    if (!rating) {
      setRatingError("Please Select a Rating");
      setTimeout(() => {
        setRatingError("");
      }, 5000);
      return;
    }

    dispatch(reviewCreate(courseId, rating, reviewTitle, reviewMessage));
    console.log("Route")
  }

  

  return (
    <>
      {playlistDetail.loading || courseDetail.loading ? (
        <h1>Loading...</h1>
      ) : playlistDetail.error ? (
        <h1>{error}</h1>
      ) : (
        <div className='productOverview'>
          <div className='playlist-video'>
            {
              //console.log(currentVideo)
            }
            <ReactPlayer
              controls
              url={`${currentVideo}`}
              //url='https://www.youtube.com/watch?v=TRCDsB9i3bI&t=27646s'
              //width='100%'
              //height='100%'
            />
          </div>
          <div className='playlist-container'>
            <ul>
              {playlistDetail.loading ? (
                <div>Loading...</div>
              ) : playlist.videoplaylist ? (
                playlist.videoplaylist.map((playlist) => {
                  return (
                    <li key={playlist._id}>
                      <Link
                        href={() =>
                          setCurrentVideo(`/api/playlist/video/${playlist.Key}`)
                        }
                      >
                        {
                          //console.log(playlist.Key)
                        }
                        <a className='playlist-link'>
                          <div className='playlist-widget'>
                            <p className='playlist-number'>{playlist.Number}</p>
                            <div className='playlist-thumbnail'>
                              {courseDetail.loading ? (
                                <center>Thumbnail Loading...</center>
                              ) : courseDetail.error ? (
                                <center>{courseDetail.error}</center>
                              ) : courseDetail.course.course.Key ? (
                                <img
                                  src={`/api/courses/image/${courseDetail.course.course.imageKey}`}
                                  alt={courseDetail.course.course.title}
                                />
                              ) : (
                                //console.log(courseDetail.course.course.Key);
                                <></>
                              )}
                            </div>

                            <div className='playlist-details'>
                              <h4>{playlist.Title.toUpperCase()}</h4>
                              <p>{playlist.Description}</p>
                            </div>
                          </div>
                        </a>
                      </Link>
                    </li>
                  );
                })
              ) : (
                <>{playlistDetail.error}</>
              )}
            </ul>
          </div>

          <hr />
        </div>
      )}

      <section
        className='u-align-center u-clearfix u-palette-1-base u-section-33'
        id='carousel_4627'
      >
        <div className='u-clearfix u-sheet u-valign-middle u-sheet-1'>
          <h2 className='u-custom-font u-text u-text-1'>
            Read what our learners say
          </h2>
          <div className='u-expanded-width u-layout-grid u-list u-list-1'>
            <div className='u-repeater u-repeater-1'>
              {reviewList.loading ? (
                <div>Loading...</div>
              ) : reviewList.review ? (
                reviewList.review.map(() => {
                  return (
                    <>
                      <div className='u-container-style u-list-item u-radius-25 u-repeater-item u-shape-round u-white u-list-item-1'>
                        <div className='u-container-layout u-similar-container u-container-layout-1'>
                          <span className='u-align-left u-icon u-icon-circle u-text-palette-1-base u-icon-1'>
                            <svg
                              className='u-svg-link'
                              preserveAspectRatio='xMidYMin slice'
                              viewBox='0 0 95.333 95.332'
                            >
                              <use
                                xmlnsXlink='http://www.w3.org/1999/xlink'
                                xlinkHref='#svg-a13b'
                              ></use>
                            </svg>
                            <svg
                              className='u-svg-content'
                              viewBox='0 0 95.333 95.332'
                              x='0px'
                              y='0px'
                              id='svg-a13b'
                              style={{
                                enableBackground: 'new 0 0 95.333 95.332;',
                              }}
                            >
                              <g>
                                <g>
                                  <path d='M30.512,43.939c-2.348-0.676-4.696-1.019-6.98-1.019c-3.527,0-6.47,0.806-8.752,1.793    c2.2-8.054,7.485-21.951,18.013-23.516c0.975-0.145,1.774-0.85,2.04-1.799l2.301-8.23c0.194-0.696,0.079-1.441-0.318-2.045    s-1.035-1.007-1.75-1.105c-0.777-0.106-1.569-0.16-2.354-0.16c-12.637,0-25.152,13.19-30.433,32.076    c-3.1,11.08-4.009,27.738,3.627,38.223c4.273,5.867,10.507,9,18.529,9.313c0.033,0.001,0.065,0.002,0.098,0.002    c9.898,0,18.675-6.666,21.345-16.209c1.595-5.705,0.874-11.688-2.032-16.851C40.971,49.307,36.236,45.586,30.512,43.939z'></path>
                                  <path d='M92.471,54.413c-2.875-5.106-7.61-8.827-13.334-10.474c-2.348-0.676-4.696-1.019-6.979-1.019    c-3.527,0-6.471,0.806-8.753,1.793c2.2-8.054,7.485-21.951,18.014-23.516c0.975-0.145,1.773-0.85,2.04-1.799l2.301-8.23    c0.194-0.696,0.079-1.441-0.318-2.045c-0.396-0.604-1.034-1.007-1.75-1.105c-0.776-0.106-1.568-0.16-2.354-0.16    c-12.637,0-25.152,13.19-30.434,32.076c-3.099,11.08-4.008,27.738,3.629,38.225c4.272,5.866,10.507,9,18.528,9.312    c0.033,0.001,0.065,0.002,0.099,0.002c9.897,0,18.675-6.666,21.345-16.209C96.098,65.559,95.376,59.575,92.471,54.413z'></path>
                                </g>
                              </g>
                            </svg>
                          </span>
                          <p className='u-text u-text-2'>
                            Proin sed libero enim sed faucibus turpis. At
                            imperdiet dui accumsan sit amet nulla facilisi morbi
                            tempus. Ut sem nulla pharetra diam sit amet
                            nisl.&nbsp;
                          </p>
                          <div
                            alt=''
                            className='u-image u-image-circle u-image-1'
                            data-image-width='494'
                            data-image-height='750'
                          ></div>
                          <h5 className='u-text u-text-3'>Celia Almeda</h5>
                          <h5 className='u-custom-font u-text u-text-font u-text-4'>
                            CEO Company
                          </h5>
                          <p className='u-text u-text-5'>Star</p>
                        </div>
                      </div>
                      <div className='u-container-style u-list-item u-radius-25 u-repeater-item u-shape-round u-white u-list-item-2'>
                        <div className='u-container-layout u-similar-container u-container-layout-2'>
                          <span className='u-align-left u-icon u-icon-circle u-text-palette-1-base u-icon-2'>
                            <svg
                              className='u-svg-link'
                              preserveAspectRatio='xMidYMin slice'
                              viewBox='0 0 351.128 351.128'
                            >
                              <use
                                xmlnsXlink='http://www.w3.org/1999/xlink'
                                xlinkHref='#svg-c1b6'
                              ></use>
                            </svg>
                            <svg
                              className='u-svg-content'
                              viewBox='0 0 351.128 351.128'
                              x='0px'
                              y='0px'
                              id='svg-c1b6'
                              style={{
                                enableBackground: 'new 0 0 351.128 351.128;',
                              }}
                            >
                              <g>
                                <path d='M72.326,147.33c4.284-26.928,37.944-55.692,64.26-56.304c1.836,0,3.672-0.612,4.896-1.836   c1.224-0.612,2.448-1.224,3.06-3.06c9.18-17.136,4.284-30.6-11.016-41.616c-17.748-12.852-45.9,0-59.976,11.628   C38.054,85.518,1.946,136.313,3.782,184.662c-6.12,32.437-4.896,67.32,4.284,96.084c6.12,18.36,23.868,27.54,42.228,28.764   c18.36,1.225,56.304,6.732,72.828-4.283c16.524-11.017,17.748-32.437,19.584-50.796c1.836-20.196,7.344-58.141-9.792-74.053   C115.778,165.078,66.818,181.602,72.326,147.33z'></path>
                                <path d='M274.286,147.33c4.284-26.928,37.943-55.692,64.26-56.304c1.836,0,3.672-0.612,4.896-1.836   c1.225-0.612,2.448-1.224,3.061-3.06c9.18-17.136,4.284-30.6-11.016-41.616c-17.748-12.852-45.9,0-59.977,11.628   c-35.496,29.376-71.604,80.172-69.768,128.52c-6.12,32.437-4.896,67.32,4.283,96.084c6.12,18.36,23.868,27.54,42.229,28.764   c18.36,1.225,56.304,6.732,72.828-4.283c16.523-11.017,17.748-32.437,19.584-50.796c1.836-20.196,7.344-58.141-9.792-74.053   C317.738,165.078,268.166,181.602,274.286,147.33z'></path>
                              </g>
                            </svg>
                          </span>
                          <p className='u-text u-text-6'>
                            Proin sed libero enim sed faucibus turpis. At
                            imperdiet dui accumsan sit amet nulla facilisi morbi
                            tempus. Ut sem nulla pharetra diam sit amet
                            nisl.&nbsp;
                          </p>
                          <div
                            alt=''
                            className='u-image u-image-circle u-image-2'
                            data-image-width='1000'
                            data-image-height='1500'
                          ></div>
                          <h5 className='u-text u-text-7'>Frank Kinney</h5>
                          <h5 className='u-custom-font u-text u-text-font u-text-8'>
                            Financial Director
                          </h5>
                          <p className='u-text u-text-9'>Star</p>
                        </div>
                      </div>
                    </>
                  );
                })
              ) : (
                <></>
              )}
            </div>
          </div>
          <Link href='https://nicepage.com/website-mockup'>
            <a className='u-btn u-btn-round u-button-style u-radius-29 u-btn-1'>
              view more
            </a>
          </Link>
        </div>
      </section>

      <section
        className='u-align-center u-clearfix u-section-32'
        id='carousel_3a66'
      >
        <div className='u-clearfix u-sheet u-sheet-1'>
          <div className='u-clearfix u-expanded-width u-layout-wrap u-layout-wrap-1'>
            <div className='u-layout'>
              <div className='u-layout-row'>
                <div className='u-container-style u-image u-layout-cell u-left-cell u-size-30 u-image-1'>
                  <div className='u-container-layout u-container-layout-1'>
                    <div className='u-palette-1-base u-shape u-shape-rectangle u-shape-1'></div>
                  </div>
                </div>
                <div className='u-align-left u-container-style u-layout-cell u-right-cell u-size-30 u-layout-cell-2'>
                  <div className='u-container-layout u-valign-middle u-container-layout-2'>
                    <h1 className='u-text u-text-default u-text-1'>
                      Leave a Review
                    </h1>

                    <center>
                      <StarRating
                        count={5}
                        size={40}
                        value={rating}
                        activeColor={'#478AC9'}
                        inactiveColor={'#ddd'}
                        onChange={handleChange}
                      />

                      {ratingError && <span>{ratingError}</span>}
                    </center>

                    <div className='u-form u-form-1'>
                      <form
                        onSubmit={reviewSubmitHandler}
                        className='u-clearfix u-form-spacing-30 u-form-vertical u-inner-form'
                        style={{ padding: '10px' }}
                        source='custom'
                        name='form'
                      >
                        <div className='u-form-group u-form-group-1'>
                          <label
                            htmlFor='text-d570'
                            className='u-form-control-hidden u-label'
                          ></label>
                          <input
                            type='text'
                            placeholder='Enter review title'
                            id='text-d570'
                            name='text'
                            className='u-border-4 u-border-no-left u-border-no-right u-border-no-top u-border-palette-1-base u-grey-5 u-input u-input-rectangle u-input-1'
                            required
                            value={reviewTitle}
                            onChange={(e) => setReviewTitle(e.target.value)}
                          />
                        </div>

                        <div className='u-form-group u-form-message u-form-group-2'>
                          <label
                            htmlFor='message-de3b'
                            className='u-form-control-hidden u-label'
                          >
                            Message
                          </label>
                          <textarea
                            placeholder='Enter your message'
                            rows='4'
                            cols='50'
                            id='message-de3b'
                            name='message'
                            className='u-border-4 u-border-no-left u-border-no-right u-border-no-top u-border-palette-1-base u-grey-5 u-input u-input-rectangle u-input-1'
                            required
                            value={reviewMessage}
                            onChange={(e) => setReviewMessage(e.target.value)}
                          ></textarea>
                        </div>

                        <div className='u-align-left u-form-group u-form-submit u-form-group-2'>
                          <button
                            type='submit'
                            className='u-btn u-btn-submit u-button-style u-palette-1-base u-btn-1'
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='u-clearfix u-grey-10 u-section-4' id='sec-7ec9'>
        <div className='u-clearfix u-sheet u-sheet-1'>
          <h1 className='u-align-center u-text u-text-default u-text-1'>
            Other courses you may like
          </h1>
          <div className='u-expanded-width u-list u-list-1'>
            <div className='u-repeater u-repeater-1'>
              {courseDetail.loading ? (
                <div>Loading...</div>
              ) : course.relatedCourses ? (
                course.relatedCourses.map((course) => {
                  return (
                    <>
                      <div className='u-container-style u-list-item u-repeater-item u-video-cover u-white u-list-item-1'>
                        <div className='u-container-layout u-similar-container u-valign-top u-container-layout-1'>
                          <img
                            alt=''
                            className='u-expanded-width u-image u-image-default u-image-1'
                            data-image-width='1200'
                            data-image-height='1500'
                            src={`/api/courses/image/${course.imageKey}`}
                          />
                          <h4 className='u-text u-text-default u-text-2'>
                            {course.title}
                          </h4>
                          <p className='u-text u-text-default u-text-3'>
                            {readMore
                              ? course.description
                              : `${course.description.substring(0, 137)}... `}
                            <Link onClick={() => setReadMore(!readMore)}>
                              <a>{readMore ? 'show less' : 'read more'}</a>
                            </Link>
                          </p>
                          <h4 className='u-text u-text-default u-text-palette-1-base u-text-4'>
                            $340.00
                          </h4>
                          <Link href=''>
                            <a className='u-btn u-button-style u-btn-1'>
                              buy now
                            </a>
                          </Link>
                        </div>
                      </div>
                      {/*
                      <div className="u-container-style u-list-item u-repeater-item u-video-cover u-white u-list-item-2">
                        <div className="u-container-layout u-similar-container u-valign-top u-container-layout-2">
                          <img alt="" className="u-expanded-width u-image u-image-default u-image-2" src="images/2.svg"/>
                          <h4 className="u-text u-text-default u-text-5">flip Flops</h4>
                          <p className="u-text u-text-default u-text-6">Sample text. Click to select the text box. Click again or double click to start editing the text.</p>
                          <h4 className="u-text u-text-default u-text-palette-1-base u-text-7">$8.00</h4>
                          <Link to="" className="u-btn u-button-style u-btn-2">buy now</Link>
                        </div>
                      </div>
                      <div className="u-container-style u-list-item u-repeater-item u-white u-list-item-3">
                        <div className="u-container-layout u-similar-container u-valign-top u-container-layout-3">
                          <img alt="" className="u-expanded-width u-image u-image-default u-image-3" src="images/3.svg"/>
                          <h4 className="u-text u-text-default u-text-8">Warm Gloves</h4>
                          <p className="u-text u-text-default u-text-9">Sample text. Click to select the text box. Click again or double click to start editing the text.</p>
                          <h4 className="u-text u-text-default u-text-palette-1-base u-text-10">$27.00</h4>
                          <Link to="" className="u-btn u-button-style u-btn-3">buy now</Link>
                        </div>
                      </div>
                      */}
                    </>
                  );
                })
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
