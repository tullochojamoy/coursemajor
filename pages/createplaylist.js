import React,{ useState, useEffect } from "react";
//import { Link, useLocation } from 'react-router-dom';
import Link from 'next/link';
import { useRouter} from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
//import { coursesDetails, coursePublish } from './redux/actions/courseActions';
import { coursesDetails, coursePublish } from '../redux/actions/courseActions';


import { playlistDetails, 
    playlistUpdate, 
    playlistArrange, 
    playlistDelete, 
    playlistVideoUpdate 
  } from '../redux/actions/videoActions';

//import queryString from 'query-string';
//import Progress from '../../components/ProgressBar';
import Progress from '../components/ProgressBar';


export default function PlaylistCreate() {    
    const [playlistTitle, setPlaylistTitle] = useState("");
    const [playlistDescription, setPlaylistDescription] = useState([]);
    const [file, setFile] = useState();
    
    const [playlistEditTitle, setPlaylistEditTitle] = useState([]);
    const [playlistEditDescription, setPlaylistEditDescription] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const dispatch = useDispatch();

    const router = useRouter();
    const { courseId } = router.query;
    
    useEffect(() => {
        dispatch(coursesDetails(courseId));
        dispatch(playlistDetails(courseId));
        setIsLoading(false);
    }, [courseId, dispatch]);
    

    const courseDetail = useSelector(state => state.courseDetails);
    const courseUpdated = useSelector(state => state.courseUpdate);
    const playlistDetail = useSelector(state => state.playlistDetails);
    const coursePercent = useSelector(state => state.coursePercent);
    const {percent} = coursePercent;
    
    console.log(courseDetail);

    const { playlist } = playlistDetail;

    const setPlaylistEditTitleFunction = index => e => {
        let newArr = [...playlistEditTitle]; // copying the old datas array
        newArr[index] = e.target.value; // replace e.target.value with whatever you want to change it to
        setPlaylistEditTitle(newArr); // ??
    }

    const setPlaylistEditDescriptionFunction = index => e => {
        let newArr = [...playlistEditDescription]; 
        newArr[index] = e.target.value; 
        setPlaylistEditDescription(newArr);
    }


    function send (e) {
        e.preventDefault();
        dispatch(playlistUpdate(courseId, playlistTitle, playlistDescription, file));
        console.log("Playlist");
    }

    function positionHandler(e, number, upDown) {
        e.preventDefault();
        dispatch(playlistArrange(number, upDown, courseId));
    }
    
    function deleteVideoHandler(e, number) {
        e.preventDefault();
        dispatch(playlistDelete(number, courseId));
    }

    function updateVideoHandler(e, number) {         
        e.preventDefault();
        dispatch(playlistVideoUpdate(
            number, 
            playlistEditTitle[number],
            playlistEditDescription[number], 
            courseId
        ));
    }

    function publish(e) {         
        e.preventDefault();
        dispatch(coursePublish(courseId));
        console.log("Lolol");

        if (courseDetail.course!==undefined && 
          courseDetail.course && 
          //courseDetail.course.course.published &&
          courseUpdated.course &&
          courseUpdated.course.course &&
          courseUpdated.course.course.published!==undefined && 
          courseUpdated.course.course.published &&       
          !courseDetail.error) { 
          setTimeout(() => {
            router.push(`/course/${courseId}`);
          }, 10000);
        }
    }


  if (isLoading) {
    return <h2>Loading...</h2>;
  }


  return (
    <>
      <section className='u-clearfix u-section-26' id='sec-a72f'>
        <div className='u-clearfix u-sheet u-valign-middle-sm u-valign-middle-xl u-valign-middle-xs u-sheet-1'>
          <div className='u-clearfix u-expanded-width u-layout-wrap u-layout-wrap-1'>
            <div className='u-gutter-0 u-layout'>
              <div className='u-layout-row'>
                <div className='u-align-center-sm u-align-center-xs u-container-style u-layout-cell u-size-20 u-layout-cell-1'>
                  <div className='u-container-layout u-valign-middle-sm u-valign-middle-xs u-container-layout-1'>
                    <Link href={`/createcourse?courseId=${courseId}`}>
                      <a className='u-align-left u-btn u-btn-round u-button-style u-hover-palette-1-light-2 u-palette-1-base u-radius-2 u-btn-1'>
                        Back
                      </a>
                    </Link>
                  </div>
                </div>
                <div className='u-align-center u-container-style u-layout-cell u-size-20 u-layout-cell-2'>
                  <div className='u-container-layout u-valign-middle u-container-layout-2'>
                    {courseDetail.loading ? (
                      <center>Loading...</center>
                    ) : courseDetail.error ? (
                      <center>{courseDetail.error}</center>
                    ) : courseDetail.course.course ? (
                      <img
                        className='u-absolute-hcenter u-expanded-height u-image u-image-default u-image-1'
                        src={`/api/courses/image/${courseDetail?.course.course.imageKey}`}
                        alt={courseDetail.course.course.title}
                        data-image-width='817'
                        data-image-height='933'
                      />
                    ) : (<></>)}
                  </div>
                </div>
                <div className='u-align-center-sm u-align-center-xs u-container-style u-layout-cell u-size-20 u-layout-cell-3'>
                  <div className='u-container-layout u-container-layout-3'>
 
                      <span onClick={publish} className='u-align-right u-btn u-btn-round u-button-style u-hover-palette-1-light-2 u-palette-1-base u-radius-2 u-btn-2'>

                        {courseDetail.loading ? (
                          <center>Loading...</center>
                        ) : courseDetail.error ? (
                          <center>{courseDetail.error}</center>
                        ) : courseDetail?.course?.course?.published ? (
                          <>UnPublish</>
                        ) : (
                          <>Publish</>
                        )}
                      </span>

                    {courseUpdated.loading ? (
                      <center style={{ textAlign: 'right' }}>Loading...</center>
                    ) : courseUpdated.error ? (
                      <center style={{ color: 'red', textAlign: 'right' }}>
                        {courseUpdated.error}
                      </center>
                    ) : courseUpdated.success ? (
                      <center style={{ color: 'green', textAlign: 'right' }}>
                        {courseUpdated.course.message}
                      </center>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='u-align-center u-clearfix u-section-27' id='sec-84d0'>
        <div className='u-clearfix u-sheet u-sheet-1'>
          <h1 className='u-text u-text-default u-text-1'> Add a video</h1>
          <div className='u-border-1 u-border-grey-dark-1 u-expanded-width u-line u-line-horizontal u-line-1'></div>

          {percent > 0 ? (
            <Progress done={percent} height={10} fontSize={10} />
          ) : (
            <></>
          )}
          <div className='u-expanded-width u-form u-form-1'>
            <form
              onSubmit={send}
              className='u-clearfix u-form-spacing-10 u-form-vertical u-inner-form'
              source='custom'
              name='form'
              style={{ padding: '10px;' }}
            >
              <div className='u-form-group u-form-name u-form-partition-factor-3'>
                <label
                  htmlFor='name-2c46'
                  className='u-form-control-hidden u-label'
                ></label>
                <input
                  type='text'
                  placeholder='Enter Video Name'
                  id='name-2c46'
                  name='name'
                  className='u-border-1 u-border-grey-30 u-input u-input-rectangle u-white'
                  required
                  value={playlistTitle}
                  onChange={(e) => setPlaylistTitle(e.target.value)}
                />
              </div>
              <div className='u-form-email u-form-group u-form-partition-factor-3'>
                <label
                  htmlFor='email-2c46'
                  className='u-form-control-hidden u-label'
                ></label>
                <input
                  type='text'
                  placeholder='Enter Video Description'
                  id='email-2c46'
                  name='description'
                  className='u-border-1 u-border-grey-30 u-input u-input-rectangle u-white'
                  required
                  value={playlistDescription}
                  onChange={(e) => setPlaylistDescription(e.target.value)}
                />
              </div>
              <div className='u-form-group u-form-partition-factor-3 u-form-group-3'>
                <label
                  htmlFor='text-734d'
                  className='u-form-control-hidden u-label'
                ></label>
                <input
                  placeholder='Add Video'
                  id='text-734d'
                  name='file'
                  className='u-border-1 u-border-grey-30 u-input u-input-rectangle u-white'
                  required
                  type='file'
                  accept='.mp4'
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              <div className='u-align-left u-form-group u-form-submit'>
                <button
                  className='u-btn u-btn-submit u-button-style u-btn-1'
                  type='submit'
                >
                  Submit
                </button>
              </div>
            </form>
            {percent > 0 ? (
              <center>{`Upload Progress: ${percent}`}</center>
            ) : (
              <></>
            )}
          </div>
        </div>
      </section>

      <section className='u-clearfix u-section-28' id='sec-5a30'>
        <div className='u-clearfix u-sheet u-valign-middle-md u-valign-middle-sm u-valign-middle-xs u-sheet-1'>
          <h1 className='u-align-center-sm u-align-center-xs u-text u-text-default u-text-1'>
            Preview Playlist
          </h1>
          <div className='u-border-1 u-border-grey-dark-1 u-expanded-width u-line u-line-horizontal u-line-1'></div>

          {playlistDetail.loading ? (
            <div>Loading...</div>
          ) : playlist.videoplaylist ? (
            playlist.videoplaylist.map((playlist, index) => {
              return (
                <div key={playlist._id} className='u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1'>
                  <div className='u-gutter-0 u-layout'>
                    <div className='u-layout-col'>
                      <div className='u-size-30'>
                        <div className='u-layout-row'>
                          <div className='u-align-center u-container-style u-layout-cell u-size-3-lg u-size-3-xl u-size-5-sm u-size-5-xs u-size-60-md u-layout-cell-1'>
                            <div className='u-container-layout u-valign-middle u-container-layout-1'>
                              <h2 className='u-text u-text-default u-text-2'>
                                {playlist.Number}
                              </h2>
                            </div>
                          </div>
                          <div className='u-align-center u-container-style u-layout-cell u-size-6-lg u-size-6-sm u-size-6-xs u-size-60-md u-size-8-xl u-layout-cell-2'>
                            <div className='u-container-layout u-valign-bottom-xl u-container-layout-2'>
                                  <span
                                    className='u-icon u-icon-circle u-text-palette-1-base u-icon-1'
                                    data-href='up'
                                    onClick={(e) => positionHandler(e, playlist.Number, 'up')}
                                  >
                                    <svg
                                      className='u-svg-link'
                                      preserveAspectRatio='xMidYMin slice'
                                      viewBox='0 0 123.959 123.959'
                                    >
                                      <use
                                        xmlnsXlink='http://www.w3.org/1999/xlink'
                                        xlinkHref='#svg-3dd9'
                                      ></use>
                                    </svg>
                                    <svg
                                      className='u-svg-content'
                                      viewBox='0 0 123.959 123.959'
                                      x='0px'
                                      y='0px'
                                      id='svg-3dd9'
                                      style={{
                                        enableBackground:
                                          'new 0 0 123.959 123.959;',
                                      }}
                                    >
                                      <g>
                                        <path d='M66.18,29.742c-2.301-2.3-6.101-2.3-8.401,0l-56,56c-3.8,3.801-1.1,10.2,4.2,10.2h112c5.3,0,8-6.399,4.2-10.2L66.18,29.742   z'></path>
                                      </g>
                                    </svg>
                                  </span>
                                  <span
                                    className='u-icon u-icon-circle u-text-palette-1-base u-icon-2'
                                    data-href='down'
                                    onClick={(e) => positionHandler(e, playlist.Number, 'down')}
                                  >
                                    <svg
                                      className='u-svg-link'
                                      preserveAspectRatio='xMidYMin slice'
                                      viewBox='0 0 123.959 123.958'
                                    >
                                      <use
                                        xmlnsXlink='http://www.w3.org/1999/xlink'
                                        xlinkHref='#svg-c72e'
                                      ></use>
                                    </svg>
                                    <svg
                                      className='u-svg-content'
                                      viewBox='0 0 123.959 123.958'
                                      x='0px'
                                      y='0px'
                                      id='svg-c72e'
                                      style={{
                                        enableBackground:
                                          'new 0 0 123.959 123.958;',
                                      }}
                                    >
                                      <g>
                                        <path d='M117.979,28.017h-112c-5.3,0-8,6.4-4.2,10.2l56,56c2.3,2.3,6.1,2.3,8.401,0l56-56   C125.979,34.417,123.279,28.017,117.979,28.017z'></path>
                                      </g>
                                    </svg>
                                  </span>
                            </div>
                          </div>
                          <div
                            className='u-container-style u-image u-image-contain u-layout-cell u-size-10-lg u-size-10-xl u-size-19-sm u-size-19-xs u-size-60-md u-image-1'
                            data-image-width='2250'
                            data-image-height='1500'
                          >
                            <div className='u-container-layout u-container-layout-3'></div>
                          </div>
                          <div className='u-align-center-lg u-align-center-md u-align-center-sm u-align-center-xs u-container-style u-layout-cell u-size-21-sm u-size-21-xs u-size-35-xl u-size-37-lg u-size-60-md u-layout-cell-4'>
                            <div className='u-container-layout u-valign-middle-lg u-valign-middle-md u-valign-middle-sm u-valign-middle-xs u-container-layout-4'>
                              <div className='u-align-center u-form u-form-1'>
                                <form
                                  onSubmit={(e) =>
                                    updateVideoHandler(e, playlist.Number)
                                  }
                                  className='u-clearfix u-form-horizontal u-form-spacing-0 u-inner-form'
                                  style={{ padding: '0px;' }}
                                  source='custom'
                                >
                                  <div className='u-form-group u-form-name'>
                                    <label
                                      htmlFor='name-558c'
                                      className='u-form-control-hidden u-label'
                                    >
                                      Name
                                    </label>
                                    <input
                                      type='text'
                                      //placeholder="Video Name"
                                      id='name-558c'
                                      name='videoname'
                                      className='u-border-1 u-border-grey-30 u-input u-input-rectangle'
                                      required
                                      placeholder={playlist.Title}
                                      value={playlistEditTitle[playlist.Number]}
                                      onChange={setPlaylistEditTitleFunction(
                                        playlist.Number
                                      )}
                                    />
                                  </div>
                                  <div className='u-form-group'>
                                    <label
                                      htmlFor='email-558c'
                                      className='u-form-control-hidden u-label'
                                    >
                                      Email
                                    </label>
                                    <input
                                      type='text'
                                      //placeholder="Video Description"
                                      id='email-558c'
                                      name='videodescription'
                                      className='u-border-1 u-border-grey-30 u-input u-input-rectangle'
                                      required
                                      placeholder={playlist.Description}
                                      value={
                                        playlistEditDescription[playlist.Number]
                                      }
                                      onChange={setPlaylistEditDescriptionFunction(
                                        playlist.Number
                                      )}
                                    />
                                  </div>
                                  <div className='u-form-group u-form-submit'>
                                    <button
                                      type='submit'
                                      className='u-btn u-btn-submit u-button-style'
                                    >
                                      UPDATE
                                      <br />
                                    </button>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>

                          <div className='u-align-center-lg u-align-center-md u-align-center-sm u-align-center-xs u-container-style u-layout-cell u-size-19-sm u-size-19-xs u-size-4-lg u-size-4-xl u-size-60-md u-layout-cell-5'>
                            <div className='u-container-layout u-valign-middle-lg u-valign-middle-xl u-valign-top-sm u-valign-top-xs u-container-layout-5'>
                                  <span onClick={(e) =>deleteVideoHandler(e, playlist.Number)} className='u-align-center u-icon u-icon-circle u-text-palette-1-base u-icon-3'>
                                    <svg
                                      className='u-svg-link'
                                      preserveAspectRatio='xMidYMin slice'
                                      viewBox='-40 0 496 496'
                                    >
                                      <use
                                        xmlnsXlink='http://www.w3.org/1999/xlink'
                                        xlinkHref='#svg-8613'
                                      ></use>
                                    </svg>
                                    <svg
                                      className='u-svg-content'
                                      viewBox='-40 0 496 496'
                                      id='svg-8613'
                                    >
                                      <path
                                        d='m160 40h96v32h32v-64h-160v64h32zm0 0'
                                        fill='#57a4ff'
                                      ></path>
                                      <path
                                        d='m80 488h256l40-360h-336zm186.089844-65.742188 28.261718-240.226562c1.027344-8.714844 8.921876-14.949219 17.636719-13.921875 8.714844 1.023437 14.949219 8.917969 13.921875 17.632813l-28.261718 240.226562c-1.027344 8.714844-8.921876 14.949219-17.636719 13.921875-8.714844-1.023437-14.949219-8.917969-13.921875-17.632813zm-74.089844-238.257812c0-8.835938 7.164062-16 16-16s16 7.164062 16 16v240c0 8.835938-7.164062 16-16 16s-16-7.164062-16-16zm-86.128906-16c8.058594-.003906 14.839844 6.03125 15.777344 14.03125l28.261718 240.226562c1.027344 8.714844-5.207031 16.609376-13.921875 17.632813-8.714843 1.027344-16.609375-5.207031-17.636719-13.921875l-28.261718-240.226562c-.53125-4.503907.894531-9.019532 3.910156-12.410157s7.335938-5.332031 11.871094-5.332031zm0 0'
                                        fill='#57a4ff'
                                      ></path>
                                      <g fill='#004fac'>
                                        <path d='m408 64h-112v-56c0-4.417969-3.582031-8-8-8h-160c-4.417969 0-8 3.582031-8 8v56h-112c-4.417969 0-8 3.582031-8 8v56c0 4.417969 3.582031 8 8 8h24.839844l39.199218 352.878906c.449219 4.058594 3.878907 7.125 7.960938 7.121094h256c4.078125 0 7.503906-3.066406 7.953125-7.121094l39.246094-352.878906h24.800781c4.417969 0 8-3.582031 8-8v-56c0-4.417969-3.582031-8-8-8zm-272-48h144v48h-16v-24c0-4.417969-3.582031-8-8-8h-96c-4.417969 0-8 3.582031-8 8v24h-16zm32 48v-16h80v16zm160.800781 416h-241.601562l-38.261719-344h318.125zm71.199219-360h-384v-40h384zm0 0'></path>
                                        <path d='m208 448c13.253906 0 24-10.746094 24-24v-240c0-13.253906-10.746094-24-24-24s-24 10.746094-24 24v240c0 13.253906 10.746094 24 24 24zm-8-264c0-4.417969 3.582031-8 8-8s8 3.582031 8 8v240c0 4.417969-3.582031 8-8 8s-8-3.582031-8-8zm0 0'></path>
                                        <path d='m82.144531 186.6875 28.253907 240.214844c.871093 8.589844 6.300781 16.042968 14.214843 19.5 7.910157 3.453125 17.070313 2.371094 23.960938-2.828125 6.886719-5.203125 10.4375-13.714844 9.28125-22.269531l-28.253907-240.207032c-.871093-8.589844-6.300781-16.042968-14.214843-19.5-7.910157-3.453125-17.070313-2.371094-23.960938 2.828125-6.886719 5.203125-10.4375 13.714844-9.28125 22.269531zm17.832031-8c1.480469-1.710938 3.632813-2.691406 5.894532-2.6875 4.003906-.003906 7.371094 2.992188 7.832031 6.96875l28.265625 240.230469c.511719 4.328125-2.582031 8.253906-6.910156 8.765625-4.328125.511718-8.25-2.582032-8.761719-6.910156l-28.265625-240.253907c-.261719-2.238281.457031-4.480469 1.96875-6.152343zm0 0'></path>
                                        <path d='m281.871094 448c12.113281 0 22.308594-9.066406 23.730468-21.097656l28.253907-240.222656c1.546875-13.105469-7.824219-24.980469-20.925781-26.527344-13.105469-1.546875-24.984376 7.824218-26.53125 20.925781l-28.253907 240.242187c-.796875 6.773438 1.339844 13.570313 5.875 18.667969 4.53125 5.097657 11.03125 8.011719 17.851563 8.011719zm20.425781-265.03125c.460937-3.976562 3.828125-6.972656 7.832031-6.96875 2.25 0 4.394532.964844 5.890625 2.644531 1.496094 1.679688 2.207031 3.917969 1.949219 6.15625l-28.265625 240.230469c-.460937 3.976562-3.828125 6.972656-7.832031 6.96875-2.25 0-4.394532-.964844-5.890625-2.644531-1.496094-1.679688-2.207031-3.917969-1.949219-6.15625zm0 0'></path>
                                      </g>
                                    </svg>
                                </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='u-size-30'>
                        <div className='u-layout-row'>
                          <div className='u-container-style u-layout-cell u-size-60 u-layout-cell-6'>
                            <div className='u-container-layout u-valign-top u-container-layout-6'>
                              <div className='u-border-1 u-border-grey-dark-1 u-expanded-width u-line u-line-horizontal u-line-2'></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>
      </section>
    </>
  );
}