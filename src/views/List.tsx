import { useMemo, useEffect } from 'react'
import { ArrayDataProvider, Table, Table4, ITableConfig, registerComponent, RemoteDataProvider } from 'table4react'
import { useReduxDispatch, useReduxSelector } from '../redux'
import { startEditRow, endEditRow } from '../redux/application'
import { AsideEditorPlugin } from '../components/editor-aside'
import Detail from './Detail'

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
    const dispatch = useReduxDispatch()
    const lists = useReduxSelector(state => state.metadata.lists)
    const loadStatus = useReduxSelector(state => state.view.status)
    const viewConfig = useReduxSelector(state => state.view.entity)

    const viewMode = useReduxSelector(state => state.application.viewMode)
    if (!config) {
        config = Object.assign({}, viewConfig) 
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
    

    const editorPlugin = useMemo(() => {
        const editorPlugin = new AsideEditorPlugin(
            () => dispatch(startEditRow()),
            () => dispatch(endEditRow())
        )
        return editorPlugin;
    }, [dispatch]);

    const model = useMemo(() => {
        if (!config || !config.columns) return null;
        config!.editMode = 'aside'
        if(Array.isArray(config!.plugins)) {
            config!.plugins.push(editorPlugin)
        } else {
            config!.plugins = [editorPlugin]
        }
        const model = new Table(config!);
        if (!!data) {
            model.dataProvider = new ArrayDataProvider(data)
        } else if (!!baseUrl) {
            model.dataProvider = new RemoteDataProvider(entity, baseUrl)
        }
        return model;
    }, [entity, config, data, baseUrl, editorPlugin]);
    let asideView = null;
    if(viewMode === 'edit' && editorPlugin.form) {
        asideView = <Detail form={editorPlugin.form}></Detail>
    }
    return (<>
        <div className='abris-list-view'>
            { model ? <Table4 model={model} /> : null }
        </div>
        {asideView}
    </>);
}

registerComponent('abris-list', List)