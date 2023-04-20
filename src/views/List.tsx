import { useMemo, useEffect } from 'react'
import { ArrayDataProvider, Table, Table4, ITableConfig, registerComponent, RemoteDataProvider } from 'table4react'
import { useReduxDispatch, useReduxSelector } from '../redux'
import { startEditRow, endEditRow, load } from '../redux/application'
import { AsideEditorPlugin } from '../components/editor-aside'
import Detail from './Detail'

import 'table4react/table4.css'
import './List.scss'

export interface IListParams {
    entity: string,
    config?: ITableConfig,
    data?: Array<any>,
    baseUrl?: string
}

export function List({ entity, config, data, baseUrl }: IListParams) {
    const dispatch = useReduxDispatch()
    const viewState = useReduxSelector(state => state.application.views[entity])

    if (!config) {
        config = viewState.config
    }
    useEffect(() => {
        let ignore = false;
        async function loadViewConfig() {
          if (viewState.status === 'idle') {
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
      }, [viewState, dispatch, entity])   
    

    const editorPlugin = useMemo(() => {
        const editorPlugin = new AsideEditorPlugin(
            () => dispatch(startEditRow(entity)),
            () => dispatch(endEditRow(entity))
        )
        return editorPlugin;
    }, [dispatch, entity]);

    const model = useMemo(() => {
        if (!config || !config.columns) return null;
        const tableConfig = Object.assign({}, config)
        tableConfig.editMode = 'aside'
        if(Array.isArray(tableConfig.plugins)) {
            tableConfig.plugins.push(editorPlugin)
        } else {
            tableConfig.plugins = [editorPlugin]
        }
        const model = new Table(tableConfig!);
        if (!!data) {
            model.dataProvider = new ArrayDataProvider(data)
        } else if (!!baseUrl) {
            model.dataProvider = new RemoteDataProvider(entity, baseUrl)
        }
        return model;
    }, [entity, config, data, baseUrl, editorPlugin]);
    let asideView = null;
    if(viewState.mode === 'edit' && editorPlugin.form) {
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