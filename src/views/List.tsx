import { ArrayDataProvider, Table, Table4, ITableConfig, registerComponent, RemoteDataProvider } from 'table4react'
import { sampleData } from '../data'
import 'table4react/table4.css'
import { useReduxSelector } from '../redux'

import './List.scss'
import { useMemo } from 'react'


export interface IListParams {
    entity: string,
    config?: ITableConfig,
    data?: Array<any>,
    baseUrl?: string
}

export function List({ entity, config, data, baseUrl }: IListParams) {
    const lists = useReduxSelector(state => state.metadata.lists)
    if (!config) {
        config = Object.assign({}, lists[entity])
    }
    const model = useMemo(() => {
        const model = new Table(config!);
        if (!!data) {
            model.dataProvider = new ArrayDataProvider(sampleData)
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