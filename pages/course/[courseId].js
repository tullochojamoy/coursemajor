import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios';

import Link from 'next/link';
import { useRouter } from 'next/router';
import ReactPlayer from 'react-player';

import { PayPalButton } from 'react-paypal-button-v2';
import { coursesDetails } from '../../redux/actions/courseActions';
import { reviewDetails } from '../../redux/actions/reviewActions';
import { createOrder, OrderDetails } from '../../redux/actions/orderActions';

import Meta from '../../components/Meta';

import Rating from '../../components/Rating';

export default function Course({course}) {
  const router = useRouter();
  const dispatch = useDispatch();

    const [sdkReady, setSdkReady] = useState(false);
    const [readMore, setReadMore] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isClient, setIsClient] = useState(false);

    const courseId = course?.course?._id;
    //console.log(course)
    console.log('The course id is', courseId);
    /*
    const courseDetail = useSelector(state => state.courseDetails);
    //const { loading, error, course } = courseDetail;
    const { loading, error } = courseDetail;
    */

    const { userInfo } = useSelector(state => state.userSignin);
    
    const orderCreated = useSelector(state => state.orderCreate);
    const orderDetails = useSelector(state => state.orderDetails);
    
    const reviewDetail = useSelector(state => state.reviewDetails);
    //const { loading, error, review } = reviewDetail;
    /*
    

    */

    const redirectHandler = () => {
        router.push(`/login?redirect=/course/${course.course._id}`)
    }
    
    const purchaseHandler = () => {
        document.querySelector(".bg-modal").style.display = 'flex';
    }
    
    

    const purchaseSuccessHandler = () => {    
        
        const cart = {
            orderItems: [
              {
                name: courseDetail.course.course.title,
                price: courseDetail.course.course.price,
                course: courseId
            }
        ],
        paymentMethod: "PayPal",
        itemsPrice: courseDetail.course.course.price,
            taxPrice: 0,
            totalPrice: courseDetail.course.course.price,
            //user: "60e8ed8fa21abc29a4dd8cc1",
            seller: courseDetail.course.course.seller,
            paidAt: "01/12/21",
            deliveredAt: "Date.now"
        }
        dispatch(createOrder(cart));    
    };
    
    /*

    //Disabled for testing, reenable soon
    orderCreated.success ? router.push(`/course/${orderCreated?.order?.orderItems[0]?.course}`)
    : console.log(error)

    orderDetails.order ? router.push(`/course/${orderDetails?.order?.orderItems[0]?.course}`)
    : console.log(error)
    */


    
    useEffect(() => {
      dispatch(OrderDetails(courseId));
      //dispatch(coursesDetails(courseId));
      dispatch(reviewDetails(courseId));

      const addPayPalScript = async () => {
        try {
          const { data } = await Axios.get('/api/config/paypal');
          //console.log(`This is the data ${data}`);
          const script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
          script.async = true;
          script.onload = () => {
            setSdkReady(true);
          };
          document.body.appendChild(script);
        } catch {
          console.log('Error');
        }
      };
      if (!window.paypal) {
        try {
          addPayPalScript();
        } catch {
          console.log('PayPal Error');
        }
      } else {
        setSdkReady(true);
      }

      //www.facebook.com/sharer.php?u=https://www.alibaba.com/product-detail/Tea-FREE-SAMPLE-Bulk-Cheapest-Best_1600402228014.html?spm=a2700.details.0.0.193720a2QfB6ee&s=p
      //twitter.com/share?url=https://www.alibaba.com/product-detail/Tea-FREE-SAMPLE-Bulk-Cheapest-Best_1600402228014.html?spm=a2700.details.0.0.193720a2QfB6ee&s=p&title=undefined
      //www.linkedin.com/shareArticle?mini=true&url=https://www.alibaba.com/product-detail/Tea-FREE-SAMPLE-Bulk-Cheapest-Best_1600402228014.html?spm=a2700.details.0.0.193720a2QfB6ee&s=p
      //www.pinterest.com/pin/create/button/?url=https://www.alibaba.com/product-detail/Tea-FREE-SAMPLE-Bulk-Cheapest-Best_1600402228014.html?spm=a2700.details.0.0.193720a2QfB6ee&s=p
      console.log(`https://www.pinterest.com/pin/create/button/?url=${window?.location?.href}`);
      console.log(`https://www.linkedin.com/shareArticle?mini=true&url=${window?.location?.href}`);
      console.log(`https://www.twitter.com/share?url=${window?.location?.href}`);
      console.log(`http://www.facebook.com/sharer.php?u=${window?.location?.href}`);

      setIsLoading(false);
      setIsClient(true);
    }, [dispatch, courseId, sdkReady]);  


    if (isLoading) {
      return <h2>Loading...</h2>;
    }

    return (
      <>
        {course?.length <= 0 ? (
          <></>
        ) : (
          <>
            <Meta
              title={course?.course?.title}
              description={course?.course?.description}
              //keywords={course?.course?.tags}
              image={`/api/courses/image/${course?.course?.imageKey}`}
              url={`https://coursemajor.com/course/${courseId}`}
            />

            <div className='bg-modal'>
              <div className='modal-content'>
                <h2>Choose Your Payment Option</h2>
                <PayPalButton
                  amount={course?.course?.price}
                  currency={'USD'}
                  shippingPreference={'NO_SHIPPING'}
                  //catchError={console.log("Transaction Declined or Error")}
                  //onError={"Error"}
                  onSuccess={purchaseSuccessHandler}
                />
                <div className='close'>
                  <button
                    className='modal-button'
                    onClick={() =>
                      (document.querySelector('.bg-modal').style.display =
                        'none')
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className='cartNav'>
              <div className='cartLeft'>
                <img
                  src={`/api/courses/image/${course?.course?.imageKey}`}
                  alt={course?.course?.title}
                />
              </div>

              <div className='cartRight'>
                <h3>${course?.course?.price}</h3>
                {userInfo ? (
                  <button
                    className='u-align-right u-btn u-btn-round u-button-style u-dialog-link u-hover-palette-1-light-1 u-palette-1-base u-radius-6 u-btn-1'
                    onClick={purchaseHandler}
                  >
                    BUY NOW
                  </button>
                ) : (
                  <button
                    className='u-align-right u-btn u-btn-round u-button-style u-dialog-link u-hover-palette-1-light-1 u-palette-1-base u-radius-6 u-btn-1'
                    onClick={redirectHandler}
                  >
                    BUY NOW
                  </button>
                )}
              </div>
            </div>

            <section className='u-clearfix u-section-201' id='carousel_ffc3'>
              <div className='u-align-left u-expanded u-left-0 u-video u-video-contain'>
                <div className='embed-responsive'>
                  {
                    //<iframe className="embed-responsive-item" src="https://www.youtube.com/embed/MlCqfK09u7A?loop=0&amp;showinfo=0&amp;controls=0&amp;start=0" frameborder="0" allowfullscreen=""></iframe>
                  }

                  {isClient && (
                    <ReactPlayer
                      controls
                      url={`/api/playlist/video/${course.course.Key.Key}`}
                      //url="https://www.youtube.com/embed/MlCqfK09u7A?loop=0&amp;showinfo=0&amp;controls=0&amp;start=0"
                      //width='100%'
                      //height='100%'
                    />
                  )}
                </div>
              </div>
            </section>

            <section
              className='u-clearfix u-valign-middle-md u-valign-middle-sm u-valign-middle-xs u-section-202'
              id='carousel_88c1'
            >
              <div className='u-clearfix u-sheet u-sheet-1'>
                <div className='u-clearfix u-layout-wrap u-layout-wrap-1'>
                  <div className='u-gutter-0 u-layout'>
                    <div className='u-layout-row'>
                      <div className='u-align-left u-container-style u-layout-cell u-size-32 u-layout-cell-1'>
                        <div className='u-container-layout u-container-layout-1'>
                          <h4 className='u-text u-text-1'>
                            {' '}
                            What you&apos;ll learn
                            <br />
                          </h4>
                          <p className='u-text u-text-2'>
                            {course?.course?.description}
                          </p>
                          {userInfo ? (
                            <Link href='#'>
                              <a
                                className='u-active-palette-1-dark-2 u-btn u-btn-rectangle u-button-style u-custom-font u-font-pt-sans u-hover-palette-1-dark-2 u-palette-1-dark-3 u-radius-0 u-btn-1'
                                onClick={purchaseHandler}
                              >
                                BUY NOW
                              </a>
                            </Link>
                          ) : (
                            <Link href='#'>
                              <a
                                className='u-active-palette-1-dark-2 u-btn u-btn-rectangle u-button-style u-custom-font u-font-pt-sans u-hover-palette-1-dark-2 u-palette-1-dark-3 u-radius-0 u-btn-1'
                                onClick={redirectHandler}
                              >
                                BUY NOW
                              </a>
                            </Link>
                          )}

                          <div className='u-social-icons u-spacing-10 u-social-icons-1'>
                            <Link
                              className='u-social-url'
                              title='facebook'
                              target='_blank'
                              href={`http://www.facebook.com/sharer.php?u=${window?.location?.href}`}
                            >
                              <span className='u-icon u-social-facebook u-social-icon u-icon-1'>
                                <svg
                                  className='u-svg-link'
                                  preserveAspectRatio='xMidYMin slice'
                                  viewBox='0 0 112 112'
                                >
                                  <use
                                    xmlnsXlink='http://www.w3.org/1999/xlink'
                                    xlinkHref='#svg-5ad6'
                                  ></use>
                                </svg>
                                <svg
                                  className='u-svg-content'
                                  viewBox='0 0 112 112'
                                  x='0'
                                  y='0'
                                  id='svg-5ad6'
                                >
                                  <path
                                    fill='currentColor'
                                    d='M75.5,28.8H65.4c-1.5,0-4,0.9-4,4.3v9.4h13.9l-1.5,15.8H61.4v45.1H42.8V58.3h-8.8V42.4h8.8V32.2
c0-7.4,3.4-18.8,18.8-18.8h13.8v15.4H75.5z'
                                  ></path>
                                </svg>
                              </span>
                            </Link>
                            <Link
                              className='u-social-url'
                              title='twitter'
                              target='_blank'
                              href={`https://www.twitter.com/share?url=${window?.location?.href}`}
                            >
                              <span className='u-icon u-social-icon u-social-twitter u-icon-2'>
                                <svg
                                  className='u-svg-link'
                                  preserveAspectRatio='xMidYMin slice'
                                  viewBox='0 0 112 112'
                                >
                                  <use
                                    xmlnsXlink='http://www.w3.org/1999/xlink'
                                    xlinkHref='#svg-9c64'
                                  ></use>
                                </svg>
                                <svg
                                  className='u-svg-content'
                                  viewBox='0 0 112 112'
                                  x='0'
                                  y='0'
                                  id='svg-9c64'
                                >
                                  <path
                                    fill='currentColor'
                                    d='M92.2,38.2c0,0.8,0,1.6,0,2.3c0,24.3-18.6,52.4-52.6,52.4c-10.6,0.1-20.2-2.9-28.5-8.2
	c1.4,0.2,2.9,0.2,4.4,0.2c8.7,0,16.7-2.9,23-7.9c-8.1-0.2-14.9-5.5-17.3-12.8c1.1,0.2,2.4,0.2,3.4,0.2c1.6,0,3.3-0.2,4.8-0.7
	c-8.4-1.6-14.9-9.2-14.9-18c0-0.2,0-0.2,0-0.2c2.5,1.4,5.4,2.2,8.4,2.3c-5-3.3-8.3-8.9-8.3-15.4c0-3.4,1-6.5,2.5-9.2
	c9.1,11.1,22.7,18.5,38,19.2c-0.2-1.4-0.4-2.8-0.4-4.3c0.1-10,8.3-18.2,18.5-18.2c5.4,0,10.1,2.2,13.5,5.7c4.3-0.8,8.1-2.3,11.7-4.5
	c-1.4,4.3-4.3,7.9-8.1,10.1c3.7-0.4,7.3-1.4,10.6-2.9C98.9,32.3,95.7,35.5,92.2,38.2z'
                                  ></path>
                                </svg>
                              </span>
                            </Link>
                            <Link
                              className='u-social-url'
                              target='_blank'
                              data-type='LinkedIn'
                              title='LinkedIn'
                              href={`https://www.linkedin.com/shareArticle?mini=true&url=${window?.location?.href}`}
                            >
                              <span className='u-icon u-social-icon u-social-linkedin u-icon-3'>
                                <svg
                                  className='u-svg-link'
                                  preserveAspectRatio='xMidYMin slice'
                                  viewBox='0 0 112 112'
                                >
                                  <use
                                    xmlnsXlink='http://www.w3.org/1999/xlink'
                                    xlinkHref='#svg-7c2d'
                                  ></use>
                                </svg>
                                <svg
                                  className='u-svg-content'
                                  viewBox='0 0 112 112'
                                  x='0'
                                  y='0'
                                  id='svg-7c2d'
                                >
                                  <circle
                                    fill='currentColor'
                                    cx='56.1'
                                    cy='56.1'
                                    r='55'
                                  ></circle>
                                  <path
                                    fill='#FFFFFF'
                                    d='M41.3,83.7H27.9V43.4h13.4V83.7z M34.6,37.9L34.6,37.9c-4.6,0-7.5-3.1-7.5-7c0-4,3-7,7.6-7s7.4,3,7.5,7
            C42.2,34.8,39.2,37.9,34.6,37.9z M89.6,83.7H76.2V62.2c0-5.4-1.9-9.1-6.8-9.1c-3.7,0-5.9,2.5-6.9,4.9c-0.4,0.9-0.4,2.1-0.4,3.3v22.5
            H48.7c0,0,0.2-36.5,0-40.3h13.4v5.7c1.8-2.7,5-6.7,12.1-6.7c8.8,0,15.4,5.8,15.4,18.1V83.7z'
                                  ></path>
                                </svg>
                              </span>
                            </Link>
                            <Link
                              className='u-social-url'
                              target='_blank'
                              data-type='Pinterest'
                              title='Pinterest'
                              href={`https://www.pinterest.com/pin/create/button/?url=${window?.location?.href}`}
                            >
                              <span className='u-icon u-social-icon u-social-pinterest u-icon-4'>
                                <svg
                                  className='u-svg-link'
                                  preserveAspectRatio='xMidYMin slice'
                                  viewBox='0 0 112 112'
                                >
                                  <use
                                    xmlnsXlink='http://www.w3.org/1999/xlink'
                                    xlinkHref='#svg-dd9f'
                                  ></use>
                                </svg>
                                <svg
                                  className='u-svg-content'
                                  viewBox='0 0 112 112'
                                  x='0'
                                  y='0'
                                  id='svg-dd9f'
                                >
                                  <circle
                                    fill='currentColor'
                                    cx='56.1'
                                    cy='56.1'
                                    r='55'
                                  ></circle>
                                  <path
                                    fill='#FFFFFF'
                                    d='M61.1,76.9c-4.7-0.3-6.7-2.7-10.3-5c-2,10.7-4.6,20.9-11.9,26.2c-2.2-16.1,3.3-28.2,5.9-41
            c-4.4-7.5,0.6-22.5,9.9-18.8c11.6,4.6-10,27.8,4.4,30.7C74.2,72,80.3,42.8,71,33.4C57.5,19.6,31.7,33,34.9,52.6
            c0.8,4.8,5.8,6.2,2,12.9c-8.7-1.9-11.2-8.8-10.9-17.8C26.5,32.8,39.3,22.5,52.2,21c16.3-1.9,31.6,5.9,33.7,21.2
            C88.2,59.5,78.6,78.2,61.1,76.9z'
                                  ></path>
                                </svg>
                              </span>
                            </Link>
                          </div>
                          <h4 className='u-text u-text-3'>
                            Share with your friends:
                          </h4>
                        </div>
                      </div>
                      <div className='u-align-right u-container-style u-layout-cell u-size-28 u-layout-cell-2'>
                        <div className='u-container-layout u-container-layout-2'>
                          <img
                            className='u-absolute-hcenter-xs u-expanded-height u-image u-image-contain u-image-1'
                            src='/images/310273033-01.png'
                            alt='Female Smiling'
                            data-image-width='106'
                            data-image-height='150'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section
              className='u-align-left u-clearfix u-section-203'
              id='sec-38b1'
            >
              <div className='u-align-left u-clearfix u-sheet u-valign-top u-sheet-1'>
                <div className='u-border-1 u-border-grey-dark-1 u-expanded-width u-line u-line-horizontal u-line-1'></div>
                <div className='u-clearfix u-expanded-width u-gutter-8 u-layout-wrap u-layout-wrap-1'>
                  <div className='u-layout'>
                    <div className='u-layout-row'>
                      <div className='u-align-center u-container-style u-layout-cell u-size-20 u-layout-cell-1'>
                        <div className='u-container-layout u-container-layout-1'>
                          <h1 className='u-text u-text-default u-text-1'>25</h1>
                          <h4 className='u-text u-text-default u-text-2'>
                            TOPICS
                          </h4>
                        </div>
                      </div>
                      <div className='u-container-style u-layout-cell u-size-20 u-layout-cell-2'>
                        <div className='u-container-layout u-container-layout-2'>
                          <span className='u-align-center-lg u-align-center-md u-align-center-sm u-align-center-xs u-icon u-icon-circle u-text-black u-icon-1'>
                            <svg
                              className='u-svg-link'
                              preserveAspectRatio='xMidYMin slice'
                              viewBox='0 0 512 512'
                            >
                              <use
                                xmlnsXlink='http://www.w3.org/1999/xlink'
                                xlinkHref='#svg-3728'
                              ></use>
                            </svg>
                            <svg
                              className='u-svg-content'
                              viewBox='0 0 512 512'
                              id='svg-3728'
                            >
                              <g>
                                <path d='m38.872 149.21h79.098c4.142 0 7.5-3.357 7.5-7.5s-3.358-7.5-7.5-7.5h-79.098c-4.142 0-7.5 3.357-7.5 7.5s3.357 7.5 7.5 7.5z'></path>
                                <path d='m115.258 185.317h-31.246c-4.142 0-7.5 3.357-7.5 7.5s3.358 7.5 7.5 7.5h31.246c4.142 0 7.5-3.357 7.5-7.5s-3.358-7.5-7.5-7.5z'></path>
                                <path d='m7.5 237.327h76.512c4.142 0 7.5-3.357 7.5-7.5s-3.358-7.5-7.5-7.5h-76.512c-4.142 0-7.5 3.357-7.5 7.5s3.358 7.5 7.5 7.5z'></path>
                                <path d='m125.47 370.289c0-4.143-3.358-7.5-7.5-7.5h-79.098c-4.142 0-7.5 3.357-7.5 7.5s3.358 7.5 7.5 7.5h79.098c4.142 0 7.5-3.357 7.5-7.5z'></path>
                                <path d='m115.258 311.683h-31.246c-4.142 0-7.5 3.357-7.5 7.5s3.358 7.5 7.5 7.5h31.246c4.142 0 7.5-3.357 7.5-7.5s-3.358-7.5-7.5-7.5z'></path>
                                <path d='m91.512 282.173c0-4.143-3.358-7.5-7.5-7.5h-76.512c-4.142 0-7.5 3.357-7.5 7.5s3.358 7.5 7.5 7.5h76.512c4.142 0 7.5-3.357 7.5-7.5z'></path>
                                <path d='m319.529 165.83c4.143 0 7.5-3.357 7.5-7.5v-11.448c0-4.143-3.357-7.5-7.5-7.5s-7.5 3.357-7.5 7.5v11.448c0 4.143 3.357 7.5 7.5 7.5z'></path>
                                <path d='m401.99 173.538c-2.93-2.928-7.678-2.928-10.607 0l-8.095 8.095c-2.929 2.93-2.929 7.678 0 10.607 2.931 2.929 7.678 2.928 10.607 0l8.095-8.095c2.928-2.929 2.928-7.677 0-10.607z'></path>
                                <path d='m417.199 248.5c-4.143 0-7.5 3.357-7.5 7.5s3.357 7.5 7.5 7.5h11.447c4.143 0 7.5-3.357 7.5-7.5s-3.357-7.5-7.5-7.5z'></path>
                                <path d='m393.895 319.759c-2.93-2.928-7.678-2.928-10.607 0-2.929 2.93-2.929 7.678 0 10.607l8.095 8.095c2.931 2.929 7.678 2.928 10.607 0 2.929-2.93 2.929-7.678 0-10.607z'></path>
                                <path d='m312.029 353.67v11.447c0 4.143 3.357 7.5 7.5 7.5s7.5-3.357 7.5-7.5v-11.447c0-4.143-3.357-7.5-7.5-7.5s-7.5 3.358-7.5 7.5z'></path>
                                <path d='m245.162 319.759-8.095 8.095c-2.929 2.93-2.929 7.678 0 10.607 2.93 2.929 7.678 2.928 10.606 0l8.095-8.095c2.929-2.93 2.929-7.678 0-10.607-2.928-2.928-7.677-2.928-10.606 0z'></path>
                                <path d='m210.411 248.5c-4.142 0-7.5 3.357-7.5 7.5s3.358 7.5 7.5 7.5h11.448c4.142 0 7.5-3.357 7.5-7.5s-3.358-7.5-7.5-7.5z'></path>
                                <path d='m255.769 181.633-8.095-8.095c-2.929-2.928-7.678-2.928-10.606 0-2.929 2.93-2.929 7.678 0 10.607l8.095 8.095c2.93 2.929 7.678 2.928 10.606 0 2.929-2.929 2.929-7.677 0-10.607z'></path>
                                <path d='m359.859 256c0-4.143-3.357-7.5-7.5-7.5h-25.33v-55.684c0-4.143-3.357-7.5-7.5-7.5s-7.5 3.357-7.5 7.5v63.184c0 4.143 3.357 7.5 7.5 7.5h32.83c4.142 0 7.5-3.357 7.5-7.5z'></path>
                                <path d='m461.741 254.762c4.135-.251 7.283-3.806 7.032-7.94-4.771-78.703-70.327-140.354-149.245-140.354-82.452 0-149.532 67.08-149.532 149.533 0 82.452 67.08 149.532 149.532 149.532 73.869 0 136.9-54.122 147.865-127.157.615-4.096-2.207-7.915-6.304-8.53-4.086-.613-7.915 2.206-8.53 6.304-9.85 65.614-66.506 114.384-133.031 114.384-74.181 0-134.532-60.351-134.532-134.532s60.351-134.533 134.532-134.533c71.001 0 129.98 55.461 134.272 126.263.25 4.132 3.802 7.27 7.941 7.03z'></path>
                                <path d='m319.528 63.529c-26.381 0-52.228 5.473-76.018 15.708h-132.329c-4.142 0-7.5 3.357-7.5 7.5s3.358 7.5 7.5 7.5h104.113c-14.077 9.06-27.036 19.988-38.462 32.604-2.78 3.069-2.546 7.812.524 10.593 3.071 2.781 7.812 2.546 10.594-.524 33.602-37.102 81.561-58.381 131.578-58.381 97.858 0 177.472 79.613 177.472 177.471 0 97.857-79.613 177.471-177.472 177.471-97.858 0-177.471-79.613-177.471-177.471 0-34.268 9.789-67.528 28.307-96.186 2.248-3.479 1.25-8.121-2.229-10.369-3.479-2.247-8.121-1.251-10.37 2.229-20.09 31.088-30.708 67.163-30.708 104.326 0 67.766 35.206 127.458 88.285 161.763h-104.16c-4.142 0-7.5 3.357-7.5 7.5s3.358 7.5 7.5 7.5h132.225c23.36 10.099 49.097 15.708 76.122 15.708 106.128 0 192.471-86.342 192.471-192.471s-86.343-192.471-192.472-192.471z'></path>
                              </g>
                            </svg>
                          </span>
                          <h4 className='u-align-center u-text u-text-default u-text-3'>
                            LIFETIME
                            <br />
                            ACCESS
                          </h4>
                        </div>
                      </div>
                      <div className='u-container-style u-layout-cell u-size-20 u-layout-cell-3'>
                        <div className='u-container-layout u-container-layout-3'>
                          <h4 className='u-align-center u-text u-text-default u-text-4'>
                            RATING
                          </h4>
                          <h4 className='u-align-center u-text u-text-default u-text-5'>{`${course?.course?.star} Star`}</h4>
                          {
                            //<div className="u-palette-1-base u-shape u-shape-rectangle u-shape-1"></div>
                          }
                          <center>
                            <div className='u-shape u-shape-rectangle u-shape-1'>
                              <Rating rating={course?.course?.star}></Rating>
                            </div>
                          </center>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section
              className='u-align-center u-clearfix u-gradient u-section-204'
              id='carousel_48c4'
            >
              {reviewDetail.loading ? (
                <h1>Loading...</h1>
              ) : reviewDetail.error ? (
                <h1>{'No Reviews'}</h1>
              ) : reviewDetail.review ? (
                <div className='u-clearfix u-sheet u-sheet-1'>
                  <h6 className='u-text u-text-default u-text-1'>
                    testimonials
                  </h6>
                  <h2 className='u-custom-font u-font-playfair-display u-text u-text-default u-text-2'>
                    Student{' '}
                    <b>
                      <i>reviews</i>
                    </b>
                  </h2>
                  <div className='u-list u-list-1'>
                    <div className='u-repeater u-repeater-1'>
                      {reviewDetail?.review?.map((review) => {
                        return (
                          <div key={review._id} className='u-container-style u-list-item u-palette-1-light-2 u-radius-16 u-repeater-item u-shape-round u-list-item-1'>
                            <div className='u-container-layout u-similar-container u-container-layout-1'>
                              <h6 className='u-text u-text-default u-text-3'>
                                {review.title}
                              </h6>
                              <div
                                alt=''
                                className='u-image u-image-circle u-image-1'
                                data-image-width='980'
                                data-image-height='1500'
                              ></div>
                              <div className='u-palette-1-base u-shape u-shape-rectangle u-shape-1'>
                                <Rating rating={review.star}></Rating>
                              </div>
                              {
                                //<div className="u-palette-1-base u-shape u-shape-rectangle u-shape-1"></div>
                              }
                              <p className='u-text u-text-4'>
                                {review.message}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </section>

            {course?.relatedCourses.length <= 0 ? (
              <></>
            ) : course.relatedCourses ? (
              <section
                className='u-clearfix u-palette-5-light-3 u-section-205'
                id='sec-ff0a'
              >
                <div className='u-clearfix u-sheet u-valign-middle-lg u-valign-middle-md u-valign-middle-sm u-valign-middle-xs u-sheet-1'>
                  <h3 className='u-text u-text-default u-text-1'>
                    Other course you may be interested in
                  </h3>
                  <div className='u-expanded-width u-list u-list-1'>
                    <div className='u-repeater u-repeater-1'>
                      {course.relatedCourses.map((course) => {
                        return (
                          <div key={course._id} className='u-container-style u-list-item u-repeater-item u-video-cover u-white u-list-item-1'>
                            <div className='u-container-layout u-similar-container u-container-layout-1'>
                              <img
                                alt={course.title}
                                className='u-expanded-width u-image u-image-default u-image-1'
                                data-image-width='1200'
                                data-image-height='1500'
                                src={`/api/courses/image/${course.imageKey}`}
                              />
                              <h4 className='u-text u-text-default u-text-2'>
                                {course.title}
                              </h4>
                              <p className='u-text u-text-3'>
                                {readMore
                                  ? course.description
                                  : `${course.description.substring(
                                      0,
                                      137
                                    )}... `}
                                <span
                                  onClick={() => setReadMore(!readMore)}
                                  style={{ color: 'blue' }}
                                >
                                  {readMore ? ' show less' : 'read more'}
                                </span>
                              </p>
                              <h4 className='u-text u-text-default u-text-palette-1-base u-text-4'>
                                {course.price === 0 || course.price === null ? (
                                  <>FREE</>
                                ) : (
                                  <>${course.price}</>
                                )}
                              </h4>
                              <Link href={`/course/${course._id}`}>
                                <a className='u-btn u-button-style u-btn-1'>
                                  buy now
                                </a>
                              </Link>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </section>
            ) : (
              <></>
            )}
          </>
        )}
      </>
    );
}



export async function getServerSideProps(context) {
  let course;
  try {
    console.log(context.params.courseId);
    //const res = await fetch(`https://coursemajor.vercel.app/api/courses/${context.params.courseId}`);
    const res = await fetch(`https://coursemajor.vercel.app/api/courses/getCourse/${context.params.courseId}`);
    course = await res.json();
    //console.log('The err is ',course);
  } catch (err) {
    //console.log(err);
    course = [];
  }

  return {
    props: { course },
  };
}
