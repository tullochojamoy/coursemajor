import React, {useState, useEffect, memo} from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';

//import MenuSVG from "../../../svgs/menuSVG";
import MenuSVG from "../../svgs/menuSVG";
import SearchInput from "../../common/searchInput";
import HeaderMenu from "../headerMenu/headerMenu";
//import HeaderLogo from "../../imgs/logo.png";
//import "./header.css";

const Search = () => (
  <SearchInput
    className="cm-header--search"
    placeholder="Search"
    svgProps={{ className: "cm-header--search__small" }}
  />
);

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { userInfo } = useSelector(state => state.userSignin);
  //console.log('header rendered')
  useEffect(() => {
    setIsLoading(false);
  })

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <header className='cm-header'>
      <div className='cm-header--container'>
        <Link href='/'>
          <a className='cm-header--title'>
            <img
              alt='course major logo'
              className='cm-header--title-img'
              //src={HeaderLogo}
              src='/images/logo.png'
            />
          </a>
        </Link>

        <Search />
        <div className='cm-header-button--container'>
          {userInfo ? (
            <Link href='/teachtoday'>
              <a className='cm-header-button cm-header-button__authorised'>
                I have a course
              </a>
            </Link>
          ) : (
            <Link href='/login'>
              <a className='cm-header-button'>Login</a>
            </Link>
          )}

          {userInfo && (
            <MenuSVG
              className='cm-header--menu'
              onClick={() => setShowModal(true)}
            />
          )}
        </div>
        {userInfo && (
          <Link href='/teachtoday'>
            <a className='cm-header--link'>Have a course?</a>
          </Link>
        )}
      </div>

      {showModal && <HeaderMenu closeMenu={() => setShowModal(false)} />}
    </header>
  );
};

export default memo(Header);