/* eslint-disable eqeqeq */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//import { Link } from 'react-router-dom';
import Link from 'next/link';
//import { detailsUser } from '../../redux/actions/userActions';
//import { paypalPayout } from '../../redux/actions/paypalActions';
import { paypalPayout } from '../redux/actions/paypalActions';
import { detailsUser } from '../redux/actions/userActions';


export default function CourseSold() {
    const dispatch = useDispatch();

    const userDetail = useSelector(state => state.userDetails);
    const paypalPayedout = useSelector(state => state.paypalPayout);

    useEffect(() => {
        dispatch(detailsUser());
    }, [dispatch]); 

    const withdrawHandler = async (e) => {
        e.preventDefault();
        dispatch(paypalPayout());
    }

    return (
      
        <>
          <section className="u-clearfix u-section-116" id="sec-0917">
            <div className="u-clearfix u-sheet u-valign-middle u-sheet-1">
              {userDetail.loading ? (
                  <h1>Loading...</h1>
              ) : userDetail.error ? (
                  <h1>{userDetail.error}</h1>
              ) : userDetail.success ? ( 
                  <>
                    <h4 className="u-text u-text-default u-text-1"> Course&nbsp;Sold</h4>
                    <p className="u-text u-text-2">All&nbsp;time&nbsp;balance:&nbsp;${userDetail.user.balance.allTimeBalance}</p>
                    <p className="u-text u-text-default u-text-3"> Available&nbsp;balance:&nbsp;${userDetail.user.balance.currentBalance}</p>

                    {userDetail.user.balance.currentBalance ==0 ? console.log("Error")
                          : <Link onClick={withdrawHandler} className="u-btn u-button-style u-hover-palette-1-dark-1 u-palette-1-base u-btn-1">WITHDRAW FUNDS</Link>
                    }

                  </>
              ) : (
                  <></>
              )}

              {paypalPayedout.loading ? (
                <p className="u-text u-text-default u-text-palette-4-base u-text-4">Loading...</p>
              ) : paypalPayedout.error ? (
                <h1 className="u-text u-text-default u-text-palette-4-base u-text-4">{paypalPayedout.error}</h1>
              ) : paypalPayedout.success ? (
                <p className="u-text u-text-default u-text-palette-4-base u-text-4"> Payment&nbsp;Made&nbsp;Successfully</p>
              ) : (
                <></>
              )}

              <div className="u-border-1 u-border-grey-dark-1 u-expanded-width u-line u-line-horizontal u-line-1"></div>
            </div>
          </section>
          <section className="u-align-center u-clearfix u-section-72" id="sec-1e4b">
            <div className="u-clearfix u-sheet u-sheet-1">
              <div className="u-expanded-width u-table u-table-responsive u-table-1">
                <table className="u-table-entity u-table-entity-1">
                  <colgroup>
                    <col width="25%"/>
                    <col width="25%"/>
                    <col width="25%"/>
                    <col width="25%"/>
                  </colgroup>
                  <thead className="u-palette-1-base u-table-header u-table-header-1">
                    <tr style={{height: "20px"}}>
                      <th className="u-table-cell">PAYPAL ID</th>
                      <th className="u-table-cell">BUYER</th>
                      <th className="u-table-cell">DATE</th>
                      <th className="u-table-cell">TOTAL</th>
                    </tr>
                  </thead>
                  <tbody className="u-table-alt-palette-1-light-3 u-table-body">
                    <tr style={{height: "76px"}}>
                      <td className="u-table-cell">Row 1</td>
                      <td className="u-table-cell">Description</td>
                      <td className="u-table-cell">Description</td>
                      <td className="u-table-cell">Description</td>
                    </tr>
                    <tr style={{height: "76px"}}>
                      <td className="u-table-cell">Row 2</td>
                      <td className="u-table-cell">Description</td>
                      <td className="u-table-cell">Description</td>
                      <td className="u-table-cell">Description</td>
                    </tr>
                    <tr style={{height: "76px"}}>
                      <td className="u-table-cell">Row 3</td>
                      <td className="u-table-cell">Description</td>
                      <td className="u-table-cell">Description</td>
                      <td className="u-table-cell">Description</td>
                    </tr>
                    <tr style={{height: "77px"}}>
                      <td className="u-table-cell">Row 4</td>
                      <td className="u-table-cell">Description</td>
                      <td className="u-table-cell">Description</td>
                      <td className="u-table-cell">Description</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </>
  );  
}