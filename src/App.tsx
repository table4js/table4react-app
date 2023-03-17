import React, { useEffect } from 'react'
import { useReduxDispatch, useReduxSelector } from './redux'
import { AbrisComponent } from 'table4react';
import { load } from './redux/metadata'
import { navigateTo } from './redux/application'
import ErrorPage from "./error-page";

import './App.css';

function App() {
  const menuItems: Array<any> = useReduxSelector(state => state.metadata.menuItems)
  const path: string = useReduxSelector(state => state.application.path)
  const [viewId, entity] = path.split("/")
  const dispatch = useReduxDispatch()

  const loadStatus = useReduxSelector(state => state.metadata.status)

  useEffect(() => {
    let ignore = false;
    async function loadMetadata() {
      if (loadStatus === 'idle') {
        const payload = await load()
        if (!ignore) {
          dispatch(payload)
        }
      }
    }
    loadMetadata()

    return () => {
      ignore = true
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
                  <span onClick={() => dispatch(navigateTo(`list/` + menuItem.entity))}>{menuItem.title}</span>
                </li>
              ))
            }
          </ul>
        </nav>
      </div>
      <div className='abris-view-container'>
        {!!viewId ? <AbrisComponent componentName={'abris-' + viewId} componentProps={{entity}}></AbrisComponent>
        : <></>}
      </div>
    </>
  );
}

export default App;
