//import { Link } from 'react-router-dom';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
//import { signout } from '../../../redux/actions/userActions';
import { signout } from '../../../redux/actions/userActions';
import Modal from "../../common/modal";
//import CloseSVG from "../../../svgs/closeSVG";
import CloseSVG from '../../svgs/closeSVG';

//import "./headerMenu.css"; 
import React, { useState } from "react";

const HeaderMenu = ({ closeMenu }) => {
  const [destroyAnimation, setDestroyAnimation] = useState("");

  const handleClose = (e) => {
    setDestroyAnimation("cm-header-menu--container__destory");
    setTimeout(() => closeMenu(e), 300);
  };

  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.userSignin);
  const signoutHandler = () => {
    dispatch(signout());
    handleClose();
  }

  return (
    <Modal id='cm-header-menu'>
      <nav className={`cm-header-menu--container ${destroyAnimation}`}>
        <CloseSVG className='cm-header-menu--close' onClick={handleClose} />
        <Link href='/'>
          <a onClick={handleClose}>Home</a>
        </Link>
        <Link href='/mycourses'>
          <a onClick={handleClose}>MyCourses</a>
        </Link>
        {userInfo?.isSeller ? (
          <Link href='/coursessold'>
            <a onClick={handleClose}>Courses Sold</a>
          </Link>
        ) : (
          <></>
        )}
        <Link href='/profile/paypal'>
          <a onClick={handleClose}>Profile</a>
        </Link>
        {userInfo ? (
          <Link href='#signout'>
            <a onClick={signoutHandler}>Sign Out</a>
          </Link>
        ) : (
          <></>
        )}
      </nav>
      <div className={`cm-header-menu--overflow`} onClick={handleClose} />
    </Modal>
  );
};

export default HeaderMenu;
