import React, {useEffect, useState} from 'react';
//import Course from '../components/Course';
//import { Link, useHistory } from 'react-router-dom';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {useSelector, useDispatch} from 'react-redux';
//import {courseSearch} from './redux/actions/courseActions';
import {courseSearch} from '../../redux/actions/courseActions';
import Ratings from '../../components/Rating';

export default function Search() {
    const [searchTerm1, setSearchTerm1] = useState("");

    const dispatch = useDispatch();
    const courseSearchList = useSelector(state => state.courseSearchList);
    const { loading, error, courses } = courseSearchList;
    const [readMore, setReadMore] = useState(false);
    
    const router = useRouter();
    const { Search } = router.query; //''//props.match.params.searchTerm;
    const searchTerm = Search;

    console.log(searchTerm);

    useEffect(() => {
        dispatch(courseSearch(searchTerm));
    }, [dispatch, searchTerm]);


    function searchHandler(e){
      e.preventDefault();
      router.push(`/search/${searchTerm1}`);
      dispatch(courseSearch(searchTerm1));
    }

    return (  
      <>
            {/*
            <section className="category-section">
                <div className="category"> 
                    <ul>
                        <h5>Categories:</h5> 
                        <li className="tableBackgroundStripes">
                            <div className="category">
                                <label htmlFor="sortSearch">Sort by:</label>
                                <select name="sortSearch" id="sortSearch">
                                    <h5>Categories:</h5>
                                    <option>Featured</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                    <option>Avg. Customer Review</option>
                                </select>
                            </div>
                        </li>
                        
                        <li>
                            <div className="category">      
                                <label htmlFor="ratingsSearch">Avg Customer review:</label>
                                <select name="ratingsSearch" id="ratingsSearch">
                                    <h5>Categories:</h5>
                                    <option>Four(4) Star & Up</option>
                                    <option>Three(3) Star & Up</option>
                                    <option>Two(2) Star & Up</option>
                                    <option>One(1) Star & Up</option>
                                </select>
                            </div>
                        </li>
                        
                        <li className="tableBackgroundStripes">
                            <div className="category">
                                <label htmlFor="priceSearch">Choose a price:</label>
                                <select name="priceSearch" id="priceSearch">
                                    <option>All</option> 
                                    <option>Under $500</option> 
                                    <option>$500 to $600</option>  
                                    <option>$600 to $700</option> 
                                    <option>$800 to 1000</option>
                                    <option>$1000 & Above</option>
                                    <option>Free</option>
                                </select>
                            </div>
                        </li>
                            
                        
                    
                        <li>
                            <div className="category">  
                                <label htmlFor="categorySearch">Choose a category:</label>
                                <select name="categorySearch" id="categorySearch">
                                    <h5>Categories:</h5>
                                    <option>All</option>
                                    <option>Real Estate</option>
                                    <option>Stocks</option>
                                    <option>CryptoCurrency</option>
                                    <option>Marketing</option>
                                    <option>Ecommerce</option>
                                </select>
                            </div>
                        </li>             
                    </ul>
                </div>
        
            <h1>Online Courses</h1>

            
            </section>
            */}


            {/*
            <h1>Search</h1>
            <section className="u-clearfix u-section-52" id="carousel_b50c">
                    {loading ? (
                          <h1>Loading...</h1>
                      ) : error ? (
                          <h1>{error}</h1>
                      ) : (
                    <div className="u-clearfix u-sheet u-valign-middle u-sheet-1">
                      <div className="u-expanded-width u-list u-list-1">
                        <p>{courses.message}</p>
                        
                        <div className="u-repeater u-repeater-1">
                        {courses.foundCourses.map((course) => {
                            return(
                                <div className="u-container-style u-list-item u-repeater-item u-list-item-1">
                                  <div className="u-container-layout u-similar-container u-container-layout-1">
                                    <img src={`/api/courses/image/${course.imageKey}`} alt="" className="u-expanded-width u-image u-image-default u-image-1" data-image-width="1200" data-image-height="1500"/>
                                    <h5 className="u-text u-text-default u-text-1">{course.title}&nbsp;</h5>
                                    <p className="u-custom-item u-text u-text-2">
                                      {readMore ? course.description : `${course.description.substring(0, 137)}... `}
                                        <Link onClick={() => setReadMore(!readMore)}>
                                            {readMore ? 'show less' : 'read more'}
                                        </Link>
                                    </p>
                                    <h4 className="u-text u-text-default u-text-palette-1-base u-text-3">
                                      {course.price===0 || course.price===null ? (
                                        <>FREE</>
                                      ) : (
                                        <>${course.price}</>
                                      )}
                                    </h4>
                                    <Link to={`/coursepreview/${course._id}`} className="u-btn u-button-style u-btn-1">Preview</Link>
                                  </div>
                                </div>
                            );
                          })}

                        </div>
                      </div>
                    </div>
                    )}
            </section>
            */}

            {loading ? (
          <h1>Loading...</h1>
        ) : error ? (
          <h1>{error}</h1>
        ) : courses?.foundCourses?.length > 0 ? (
          <>
            <section className="u-align-center u-clearfix u-section-53" id="sec-3bea">
              <div className="u-clearfix u-sheet u-valign-middle u-sheet-1">
                <h1 className="u-text u-text-default u-text-1">Search results...</h1>
              </div>
            </section>
            <section className="u-clearfix u-section-54" id="carousel_b50c">
              <div className="u-clearfix u-sheet u-sheet-1">
                <div className="u-expanded-width u-list u-list-1">
                  <div className="u-repeater u-repeater-1">
                    {courses.foundCourses.map((course) => {
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
                <section className="u-align-center u-clearfix u-section-136" id="carousel_98bc">
                    <div className="u-clearfix u-sheet u-valign-top u-sheet-1">
                        <h2 className="u-custom-font u-text u-text-palette-1-base u-text-1">Try a different term&nbsp;&nbsp;
                        <span className="u-icon u-icon-1">
                            <svg className="u-svg-content" viewBox="0 0 56.966 56.966" x="0px" y="0px" style={{width: "1em;", height: "1em;"}}>
                                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23
                    s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92
                    c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17
                    s-17-7.626-17-17S14.61,6,23.984,6z"></path>
                            </svg>
                            {// eslint-disable-next-line jsx-a11y/alt-text
                            }
                            
                        </span>
                        </h2>
                        <p className="u-text u-text-palette-1-dark-1 u-text-2">We searched high and low but couldn’t find what you’re looking for. Let’s find a better place for you to go.<br/>
                        </p>
                        <div className="custom-search-css u-form u-form-1">
                        <form onSubmit={searchHandler} className="u-clearfix u-form-spacing-10 u-form-vertical u-inner-form" name="form" style={{padding: "10px;"}}>
                            <div className="u-form-group u-form-name">
                            <label htmlFor="name-29c6" className="u-form-control-hidden u-label"></label>
                            <input 
                                type="search" 
                                placeholder="Search..." 
                                id="name-29c6" 
                                name="search" 
                                className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-white" 
                                onChange={(e) => setSearchTerm1(e.target.value)}
                                value={searchTerm1}
                                required
                            />
                            </div>
                            <div className="u-align-left u-form-group u-form-submit">
                                <button type="submit" className="u-btn u-btn-submit u-button-style u-btn-1">SEARCH<br/>
                                </button>
                            </div>
                        </form>
                        </div>
                        <img className="custom-picture-css u-image u-image-contain u-image-default u-preserve-proportions u-image-1" src="/images/vcvv.jpg" alt="" data-image-width="1298" data-image-height="598"/>
                    </div>
                </section>
        )}      
        </>
    );
}

export async function getServerSideProps() {
  let courses = [];
  /*
  try {
    const res = await fetch(`http://localhost:3000/api/courses`);
    courses = await res.json();
    console.log(courses);
  } catch (err) {
    //console.log(err);
    courses = [];
  }
  */

  return {
    props: { courses },
  };
}