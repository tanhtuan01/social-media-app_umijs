import { Link, Outlet } from 'umi';
import '../assets/base.less'
import './index.less';
import { HomeOutlined, SearchOutlined, MessageOutlined, SettingOutlined, UnorderedListOutlined, LogoutOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import DocsPage from '../pages/docs';
import ListToDo from '@/pages/todo/list';


export default function Layout() {

  const [showSettingOption, setShowSettingOption] = useState(false);

  const handleSettingsClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setShowSettingOption((prevState) => !prevState);
  };
  return (
    <div className='sma_wrap'>

      <div className="header">

        <div className="row">
          <div className="top-bar">
            <div className="left">
              <div className="logo">
                <img src="https://th.bing.com/th?id=OIF.3hbX%2fUwIFUh8ucKNDv5GPQ&rs=1&pid=ImgDetMain" alt="" />
              </div>
              <div className="form-search">
                <form action="">
                  <div className='form-group-search'>
                    <input type="text" placeholder='Enter text to search' />
                    <button type='button'><SearchOutlined /></button>
                  </div>

                </form>
              </div>
            </div>

            <div className="right">
              <div className="navs">
                <ul>
                  <li>
                    <Link to="/">
                      <HomeOutlined />
                    </Link>
                    <p className='item-name'>
                      Home
                    </p>
                  </li>
                  <li>
                    <Link to="/messages">
                      <MessageOutlined />
                    </Link>
                    <p className='item-name'>
                      Messages
                    </p>
                  </li>
                  <li>
                    <Link to="/todo">
                      <UnorderedListOutlined />
                    </Link>
                    <p className='item-name'>
                      Todo List
                    </p>
                  </li>


                  <li className='item-settings'>
                    <Link to="/" onClick={handleSettingsClick}>
                      <SettingOutlined />
                    </Link>
                    <p className='item-name'>
                      Settings
                    </p>
                    {showSettingOption && (
                      <div className='settings-option'>
                        <div className='item'>
                          <a href="">Logout</a>
                        </div>
                        <div className='item'>
                          <a href="">Logout</a>
                        </div>
                        <div className='item'>
                          <a href="">Logout</a>
                        </div>
                      </div>
                    )}
                  </li>

                  <li>
                    <Link to="/logout">
                      <LogoutOutlined />
                    </Link>
                    <p className='item-name'>
                      Logout
                    </p>
                  </li>

                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="body">
        <Outlet />
      </div>

      <div className='footer'>

      </div>

    </div>

  );
}
