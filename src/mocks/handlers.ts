import { rest } from 'msw'
import { getDataProvider } from './data'
import { metadata } from './metadata'
import { defaultEndpoint } from '../config'

export const handlers = [
    rest.post(defaultEndpoint + 'getMenu', (req, res, ctx) => {
        return res(
            ctx.json(metadata),
        )
    }),

    rest.post(defaultEndpoint + 'getEntity', (req, res, ctx) => {
        const { name } = req.body as Record<string, any>
        return res(
            // ctx.json(Object.assign({}, metadata.lists[name])),
        )
    }),

    rest.post(metadata.defaultEndpoint + 'getData', (req, res, ctx) => {
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
    })
]