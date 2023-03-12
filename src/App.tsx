import React, { useEffect } from 'react'
import { load } from './redux/metadata'
import { useReduxDispatch, useReduxSelector } from './redux'
import { AbrisComponent } from 'table4react';
import ErrorPage from "./error-page";

import './App.css';

function App() {
  const menuItems: Array<any> = useReduxSelector(state => state.metadata.menuItems)
  const dispatch = useReduxDispatch()

  const loadStatus = useReduxSelector(state => state.metadata.status)

  useEffect(() => {
    if (loadStatus === 'idle') {
      dispatch(load())
    }
  }, [loadStatus, dispatch])   

  return (
    <>
      <div id="sidebar">
        <h1>Abris Demo</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={true}
            />
            <div
              className="sr-only"
              aria-live="polite"
            ></div>
          </form>
          <form method="post">
            <button type="submit">New</button>
          </form>
        </div>
        <nav>
          <ul>
            {
              menuItems.map(menuItem => (
                <li>
                  <a href={`/list/` + menuItem.entity}>{menuItem.title}</a>
                </li>
              ))
            }
          </ul>
        </nav>
      </div>
      <div id="detail">
        <AbrisComponent componentName={'abris-' + 'list'} componentProps={{}}></AbrisComponent>
      </div>
    </>
  );
}

export default App;
