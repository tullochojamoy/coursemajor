import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../redux/actions/userActions';

import Link from 'next/link';

import { useRouter } from 'next/router';
//import queryString from 'query-string';

import { googleRegisterLogin, facebookRegisterLogin } from '../redux/actions/userActions';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  
  const router = useRouter();
  //const { id } = router.query;
  const { redirect } = router.query;
  console.log(redirect)
  
  //const { redirect } = queryString.parse(search);
  
  const userSignin = useSelector(state => state.userSignin);
  
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const submitRef = useRef(null);


  useEffect(() => {
    emailRef.current.focus();

    //return ()=> clearInterval(interval);
  }, []);

  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      redirect ? router.push(redirect)
      : router.push("/");
    }
    
  }, [router, redirect, userSignin]);

  const dispatch = useDispatch();

  const loginHandler = async (e) => {
    e.preventDefault();
    dispatch(signin(email, password));

    if (localStorage.getItem("userInfo")) {
      redirect ? router.push(redirect)
      : router.push("/");
    }
    
    setError(userSignin.error);
    setTimeout(() => {
      setError("");
    }, 10000);

    
  };


      const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
        console.log(token);
        try{
          dispatch(googleRegisterLogin(result, token));
        } catch (error) {
          console.log(error);
        }

        if (localStorage.getItem("userInfo")) {
          redirect ? router.push(redirect)
          : router.push("/");
        }
    }

    const googleFailure = () => {
        console.log('Google Sign In was unsuccessful. Try Again Later');
    }


    const responseFacebook = async (response) => {
      //console.log("Login result", response);
      try{
        dispatch(facebookRegisterLogin(response));
      } catch (error) {
        console.log(error);
      }

      if (localStorage.getItem("userInfo")) {
        redirect ? router.push(redirect)
        : router.push("/");
      }
    }

    const componentClicked = (data) => {
      console.log(data);
    }



    //Refs Key Down
    const emailKeyDown = (e) => {
      if (e.key==='Enter'){
        passwordRef.current.focus();
      }
    }

    const passwordKeyDown = (e) => {
      if (e.key === 'Enter') {
        submitRef.current.focus();
      }
    }

  return (
    <>
      <section className='u-align-center u-clearfix u-section-46' id='sec-2513'>
        <div className='u-clearfix u-sheet u-valign-middle u-sheet-1'>
          <h1 className='u-text u-text-default u-text-1'>Login</h1>
        </div>
      </section>
      <section className='u-align-center u-clearfix u-section-47' id='sec-9a8a'>
        <div className='u-clearfix u-sheet u-valign-middle-lg u-valign-middle-xl u-sheet-1'>
          <FacebookLogin
            appId='327768192057336' //Live
            //appId="1071231247041607" //Test App
            // appId="490913278767943" //Test App 2
            //autoLoad={true}
            //fields="name,email,picture"
            //onClick={componentClicked}
            callback={responseFacebook}
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                className='u-border-none u-btn u-button-style u-custom-color-2 u-hover-grey-5 u-btn-1'
              >
                <span className='u-icon u-icon-1'>
                  <svg
                    className='u-svg-content'
                    viewBox='0 0 97.75 97.75'
                    x='0px'
                    y='0px'
                    style={{ width: '1em', height: '1em' }}
                  >
                    <g>
                      <path d='M48.875,0C21.882,0,0,21.882,0,48.875S21.882,97.75,48.875,97.75S97.75,75.868,97.75,48.875S75.868,0,48.875,0z    M67.521,24.89l-6.76,0.003c-5.301,0-6.326,2.519-6.326,6.215v8.15h12.641L67.07,52.023H54.436v32.758H41.251V52.023H30.229V39.258   h11.022v-9.414c0-10.925,6.675-16.875,16.42-16.875l9.851,0.015V24.89L67.521,24.89z'></path>
                    </g>
                  </svg>
                  <img />
                </span>
                &nbsp;Continue with FACEBOOK
              </button>
            )}
          />

          <GoogleLogin
            clientId='786480835972-qbnbo51av1shv7pmbvi4lbnfd2njj0qc.apps.googleusercontent.com'
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                className='u-border-1 u-border-black u-btn u-button-style u-hover-grey-5 u-white u-btn-2'
              >
                <span className='u-icon u-icon-2'>
                  <svg
                    className='u-svg-content'
                    viewBox='0 0 512 512'
                    x='0px'
                    y='0px'
                    style={{ width: '1em', height: '1em' }}
                  >
                    <path
                      style={{ fill: '#FBBB00' }}
                      d='M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256  c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456  C103.821,274.792,107.225,292.797,113.47,309.408z'
                    ></path>
                    <path
                      style={{ fill: '#518EF8' }}
                      d='M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451  c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535  c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z'
                    ></path>
                    <path
                      style={{ fill: '#28B446' }}
                      d='M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512  c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771  c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z'
                    ></path>
                    <path
                      style={{ fill: '#F14336' }}
                      d='M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012  c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0  C318.115,0,375.068,22.126,419.404,58.936z'
                    ></path>
                  </svg>
                  <img />
                </span>
                &nbsp;Contine with Google
              </button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy='single_host_origin'
          />

          <div className='u-align-center u-container-style u-group u-group-1'>
            <div className='u-container-layout'>
              <div className='u-border-1 u-border-grey-30 u-expanded-width u-line u-line-horizontal u-line-1'></div>
              <div className='u-shape u-shape-circle u-white u-shape-1'></div>
              <p className='u-text u-text-default u-text-1'>
                OR<span style={{ fontSize: '1.25rem' }}></span>
              </p>
            </div>
          </div>
          <div className='u-expanded-width-sm u-expanded-width-xs u-form u-login-control u-form-1'>
            {error && <span style={{ color: 'red' }}>{error}</span>}
            <form
              onSubmit={loginHandler}
              className='u-clearfix u-form-custom-backend u-form-spacing-10 u-form-vertical u-inner-form'
              name='form'
              style={{ padding: '10px' }}
            >
              <div className='u-form-group u-form-name'>
                <label htmlhtmlFor='username-a30d' className='u-label'>
                  Email *
                </label>
                <input
                  type='text'
                  placeholder='Enter your Email'
                  id='username-a30d'
                  name='username'
                  ref={emailRef}
                  onKeyDown={emailKeyDown}
                  className='u-grey-5 u-input u-input-rectangle u-input-1'
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
              </div>
              <div className='u-form-group u-form-password'>
                <label htmlhtmlFor='password-a30d' className='u-label'>
                  Password *
                </label>
                <input
                  type='text'
                  placeholder='Enter your Password'
                  id='password-a30d'
                  name='password'
                  ref={passwordRef}
                  onKeyDown={passwordKeyDown}
                  className='u-grey-5 u-input u-input-rectangle u-input-2'
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
              </div>
              <div className='u-form-checkbox u-form-group'>
                <input
                  type='checkbox'
                  id='checkbox-a30d'
                  name='remember'
                  value='On'
                />
                <label htmlhtmlFor='checkbox-a30d' className='u-label'>
                  Remember me
                </label>
              </div>
              <div className='u-align-left u-form-group u-form-submit'>
                <button
                  type='submit'
                  ref={submitRef}
                  //onKeyDown={passwordKeyDown}
                  className='u-btn u-btn-submit u-button-style u-btn-3'
                >
                  Login
                </button>
              </div>
            </form>
          </div>
          <Link href='/register'>
            <a className='u-border-1 u-border-active-palette-2-base u-border-hover-palette-1-base u-btn u-button-style u-login-control u-login-create-account u-none u-text-palette-1-base u-btn-4'>
              Don&apos;t have an account?
            </a>
          </Link>
          <Link href='/forgotpassword'>
            <a className='u-border-1 u-border-active-palette-2-base u-border-hover-palette-1-base u-btn u-button-style u-login-control u-login-forgot-password u-none u-text-palette-1-base u-btn-5'>
              Forgot password?
            </a>
          </Link>
        </div>
      </section>
    </>
  );
};