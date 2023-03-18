import { rest } from 'msw'
import { getDataProvider } from './data'
import { metadata } from './metadata'

export const handlers = [
    rest.get(metadata.defaultEndpoint + 'metadata', (req, res, ctx) => {
        // const { userId } = req.params
        // return res(
        //   ctx.json({
        //     id: userId,
        //     firstName: 'John',
        //     lastName: 'Maverick',
        //   }),
        // )
        return res(
            ctx.json(metadata),
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