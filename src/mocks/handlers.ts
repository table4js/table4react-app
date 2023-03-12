import { rest } from 'msw'

export const handlers = [
    rest.get('/api/metadata', (req, res, ctx) => {
        // const { userId } = req.params
        // return res(
        //   ctx.json({
        //     id: userId,
        //     firstName: 'John',
        //     lastName: 'Maverick',
        //   }),
        // )
        return res(
            ctx.json({
                rootMenu: [
                    { "id": "item1", "entity": "test", "title": "Test" },
                    { "id": "item2", "entity": "another", "title": "Another" }
                ]
            }),
        )
    }),
    rest.post('/post', (req, res, ctx) => {
        const { par1, par2 } = req.body as Record<string, any>
        return res(
            ctx.json({}),
        )
    })
]