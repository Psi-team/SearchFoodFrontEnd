import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import svgUrl from '../../assets/images/sprite.svg'
import './Sidebar.scss';

const Sidebar = ({ className = '', isAuthenticated, signout }) => (
  <div className={`sidebar ${className}`}>
    <div
      className='sidebar__logo'
      style={{
        width: '70px',
        height: '5vh',
        border: '1px solid #000'
      }}>這一塊是LOGO</div>

    <div className='sidebar__links'>
      {/* control sidebar display style */}
      <input type="checkbox" id='controlSidebar' />
      <label htmlFor="controlSidebar">
        <svg>
          <use xlinkHref={`${svgUrl}#lnr-menu`} />
        </svg>
      </label>
      <ul>
        <li>
          <Link to='/' className="a-hover">
            首頁
        </Link>
        </li>
        <li>
          <Link to='/search' className="a-hover">
            搜尋食物
        </Link>
        </li>
        {
          !isAuthenticated ?
            <li>
              <Link to='/login' className="a-hover">
                登入
              </Link>
            </li> :
            <li onClick={signout}>
              <Link to='/home' className="a-hover">
                登出
              </Link>
            </li>
        }
      </ul>
    </div>
  </div>
);

Sidebar.propTypes = {
  className: PropTypes.string,
  isAuthenticated: PropTypes.bool.isRequired,
  signout: PropTypes.func.isRequired
};

export default Sidebar;
