import { useMemo, useEffect } from 'react'
import { ArrayDataProvider, Table, Table4, ITableConfig, registerComponent, RemoteDataProvider } from 'table4react'
import { useReduxSelector, useReduxDispatch } from '../redux'

import 'table4react/table4.css'
import './List.scss'
import { load } from '../redux/view'


export interface IListParams {
    entity: string,
    config?: ITableConfig,
    data?: Array<any>,
    baseUrl?: string
}

export function List({ entity, config, data, baseUrl }: IListParams) {
    const lists = useReduxSelector(state => state.metadata.lists)
    const dispatch = useReduxDispatch()
    const loadStatus = useReduxSelector(state => state.view.status)
    const viewConfig = useReduxSelector(state => state.view.entity)

    if (!config) {
        config = viewConfig
    }
  
  
    useEffect(() => {
        let ignore = false;
        async function loadViewConfig() {
          if (loadStatus === 'idle') {
            const payload = await load(entity)
            if (!ignore) {
              dispatch(payload)
            }
          }
        }
        loadViewConfig()
    
        return () => {
          ignore = true
        }
      }, [loadStatus, dispatch])   
    
    const model = useMemo(() => {
        if (!config) return null;
        const model = new Table(config!);
        if (!!data) {
            model.dataProvider = new ArrayDataProvider(data)
        } else if (!!baseUrl) {
            model.dataProvider = new RemoteDataProvider(entity, baseUrl)
        }
        return model;
    }, [entity, config, data, baseUrl]);
    return (
        <div className='abris-list-view'>
            { model ? <Table4 model={model} /> : null }
        </div>
    );
}

registerComponent('abris-list', List)