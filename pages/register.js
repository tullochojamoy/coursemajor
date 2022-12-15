import React, { useState, useEffect } from 'react';
//import { Link, useLocation } from 'react-router-dom';
import Link from 'next/link';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import { useDispatch, useSelector } from 'react-redux';  
//import { register } from './redux/actions/userActions';
import { register } from '../redux/actions/userActions';



export default function Register({ history }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const { search } = useRouter();
  const { redirect } = queryString.parse(search);

  
  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      redirect ? router.push(redirect)
      : router.push("/");
    }
  }, [router, redirect]);
  

 const dispatch = useDispatch();

 
  const userSignup = useSelector(state => state.userSignup);
 
 const registerHandler = async (e) => {
  e.preventDefault();   
    
  if (password !== confirmpassword) {
    setPassword("");
    setConfirmPassword("");
    setTimeout(() => {
      setError("");
    }, 5000);
    return setError("Passwords do not match");
  }
    
  dispatch(register(username, email, password));
  
  if (localStorage.getItem("userInfo")) {
    redirect ? history.push(redirect)
    : history.push("/");
  }

  setError(userSignup.error);
  setTimeout(() => {
      setError("");
    }, 10000);
  };

  return (
    <>
      <section className='u-align-center u-clearfix u-section-16' id='sec-b85a'>
        <div className='u-clearfix u-sheet u-valign-middle u-sheet-1'>
          <h1 className='u-text u-text-default u-text-1'>Register</h1>
          {error && <span style={{ color: 'red' }}>{error}</span>}
        </div>
      </section>
      <section className='u-align-center u-clearfix u-section-17' id='sec-d002'>
        <div className='u-clearfix u-sheet u-valign-middle u-sheet-1'>
          <div className='u-form u-login-control u-form-1'>
            <form
              onSubmit={registerHandler}
              className='u-clearfix u-form-custom-backend u-form-spacing-10 u-form-vertical u-inner-form'
              name='form'
              style={{ padding: '10px' }}
            >
              <div className='u-form-group u-form-name u-form-partition-factor-2'>
                <label htmlhtmlFor='username-a30d' className='u-label'>
                  Username *
                </label>
                <input
                  type='text'
                  placeholder='Enter your Username'
                  id='username-a30d'
                  name='username'
                  className='u-grey-5 u-input u-input-rectangle u-input-1'
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className='u-form-group u-form-partition-factor-2 u-form-group-2'>
                <label htmlhtmlFor='text-b03a' className='u-label'>
                  Email *
                </label>
                <input
                  type='text'
                  placeholder='Enter your Email'
                  id='text-b03a'
                  name='text-1'
                  className='u-grey-5 u-input u-input-rectangle u-input-2'
                  required='required'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  className='u-grey-5 u-input u-input-rectangle u-input-3'
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className='u-form-group u-form-group-4'>
                <label htmlhtmlFor='text-33ca' className='u-label'>
                  Confirm Password *
                </label>
                <input
                  type='text'
                  placeholder='Enter your Passord'
                  id='text-33ca'
                  name='text'
                  className='u-grey-5 u-input u-input-rectangle u-input-4'
                  required
                  value={confirmpassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className='u-form-checkbox u-form-group'>
                <input
                  type='checkbox'
                  id='checkbox-a30d'
                  name='remember'
                  value='On'
                  required
                />
                <label htmlhtmlFor='checkbox-a30d' className='u-label'>
                  I accept the&nbsp;
                  <Link href='/termsandconditions'>
                    <a>Terms and Conditions</a>
                  </Link>
                </label>
              </div>
              <div className='u-align-left u-form-group u-form-submit'>
                <button
                  type='submit'
                  className='u-btn u-btn-submit u-button-style u-btn-1'
                >
                  Register
                  <br />
                </button>
              </div>
            </form>
          </div>
          <Link href='/login'>
            <a className='u-border-1 u-border-active-palette-2-base u-border-hover-palette-1-base u-btn u-button-style u-login-control u-login-create-account u-none u-text-palette-1-base u-btn-2'>
              Already have an account?
            </a>
          </Link>
        </div>
      </section>
    </>
  );
}