import React, {useState} from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { courseSearch } from '../../../redux/actions/courseActions';

import SearchSVG from '../../svgs/searchSVG';
/**
 * @param {string} className A className to style the container (optional).
 * @param {SVGProps} svgProps A className to style the svg search icon (optional).
 * @param {Function} onSearchIconClick A function called on search icon click (optional).
 * @param props any props that can be applied to the container.
 */

const SearchInput = ({ className = '', svgProps, ...rest }) => {
  const { className: svgClassName, ...restSvgProps } = svgProps || {};
  
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();
  
  let router = useRouter();

  function searchHandler(e){
    e.preventDefault();
    router.push(`/search/${searchTerm}`);
    dispatch(courseSearch(searchTerm));
  }

  return (
    <form onSubmit={searchHandler} className={`cm-input--container ${className}`}>
      <input 
        className="cm-input" 
        {...rest}
        type="search" 
        name="search"
        placeholder="Search"
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
        required
      />

      <button type="submit" className="cm-input--submit-button">
        <SearchSVG className={`cm-input--search-icon ${svgClassName ? svgClassName : ''}`} {...restSvgProps} />
      </button>
    </form>
  );
};

export default SearchInput;
