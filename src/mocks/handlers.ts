import { rest } from 'msw'
import { getDataProvider } from './data'
import { defaultEndpoint } from '../config'
import rootMenu from '../assets/root-menu.json'
import declaration from '../assets/list-config/declaration.json'
import generated from '../assets/list-config/generated.json'

export const handlers = [
    rest.post(defaultEndpoint + 'getMenu', (req, res, ctx) => {
        return res(
            ctx.json({rootMenu}),
        )
    }),

    rest.post(defaultEndpoint + 'getEntity', (req, res, ctx) => {
        const { name } = req.body as Record<string, 'declaration' | 'generated'>
        return res(
            ctx.json(name === 'declaration' ? declaration : generated),
        )
    }),

    rest.post(defaultEndpoint + 'getData', (req, res, ctx) => {
        const { name, limit, offset, order, key, back } = req.body as Record<string, any>
        const dataProvider = getDataProvider(name)
        let result: any = { data: [], count: 0 }
        dataProvider.getData(limit, offset, order, key, back, (res: any) => {
            result.data = res
            result.count = dataProvider.data.length
        })
        return res(
            ctx.json(result)
        )
    }),

    rest.post(defaultEndpoint + 'get', (req, res, ctx) => {
        const { name, keyName, key } = req.body as Record<string, any>
        const dataProvider = getDataProvider(name)
        let result: any = {};
        dataProvider.get(keyName, key, (res: any) => {
            result.data = res
        })
        return res(
            ctx.json(result)
        )
    }),

    rest.post(defaultEndpoint + 'update', (req, res, ctx) => {
        const { name, keyName, key, modify } = req.body as Record<string, any>
        const dataProvider = getDataProvider(name)
        let result: any = {};
        dataProvider.update(keyName, key, modify, (res: any) => {
            result.data = res
        })
        return res(
            ctx.json(result)
        )
    }),

    rest.post(defaultEndpoint + 'create', (req, res, ctx) => {
        const { name, keyName, modify } = req.body as Record<string, any>
        const dataProvider = getDataProvider(name)
        let result: any = {};
        dataProvider.create(keyName, modify, (res: any) => {
            result.data = res
        })
        return res(
            ctx.json(result)
        )
    }),

    rest.post(defaultEndpoint + 'delete', (req, res, ctx) => {
        const { name, keyName, keys } = req.body as Record<string, any>
        const dataProvider = getDataProvider(name)
        let result: any = {};
        dataProvider.delete(keyName, keys, (res: any) => {
            result.data = res
        })
        return res(
            ctx.json(result)
        )
    })
]