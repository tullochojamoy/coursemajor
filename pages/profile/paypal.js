import { useState } from "react";
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/actions/userActions';
//import "./PayPal.css";
import ProfileHeader from './ProfileHeader';

export default function PayPal() {
  const [paypalId, setPayPalId] = useState("");
  const [paypalEmail, setPayPalEmail] = useState("");

  const dispatch = useDispatch();
  
  function paypalHandler(e){
    e.preventDefault();
    dispatch(updateUser(paypalId, paypalEmail));
  }

    return (
      <>
        <ProfileHeader/>
        <section
          className='u-align-center u-clearfix u-section-111'
          id='sec-95db'
          >
          <div className='u-clearfix u-sheet u-valign-middle u-sheet-1'>
            <h4 className='u-text u-text-default u-text-1'>
              PayPal<span style={{ fontWeight: '700' }}></span>
            </h4>
            <div className='u-border-1 u-border-grey-dark-1 u-line u-line-horizontal u-line-1'></div>
            <div className='u-form u-form-1'>
              <form
                onSubmit={paypalHandler}
                className='u-clearfix u-form-spacing-10 u-form-vertical u-inner-form'
                name='form'
                style={{ padding: '10px' }}
              >
                <div className='u-form-group u-form-name'>
                  <label
                    htmlFor='name-584c'
                    className='u-form-control-hidden u-label'
                  ></label>
                  <input
                    type='text'
                    placeholder='PAYPAL CLIENT ID'
                    id='name-584c'
                    name='name'
                    className='u-border-1 u-border-grey-30 u-input u-input-rectangle u-white'
                    required
                    onChange={(e) => setPayPalId(e.target.value)}
                    value={paypalId}
                  />
                </div>
                <div className='u-form-email u-form-group'>
                  <label
                    htmlFor='email-584c'
                    className='u-form-control-hidden u-label'
                  ></label>
                  <input
                    type='email'
                    placeholder='PAYPAL EMAIL'
                    id='email-584c'
                    name='email'
                    className='u-border-1 u-border-grey-30 u-input u-input-rectangle u-white'
                    required
                    onChange={(e) => setPayPalEmail(e.target.value)}
                    value={paypalEmail}
                  />
                </div>
                <div className='u-align-left u-form-group u-form-submit'>
                  <button
                    type='submit'
                    className='u-btn u-btn-submit u-button-style u-btn-1'
                  >
                    UPDATE
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </>
    );
}