import { Router } from 'itty-router'

const router = Router()

router.get('/search', async ({ query }) => {
    const { term, amount, offset } = query
    if (term == null || amount == null || offset == null) {
        return new Response(
            'Missing term, amount, or offset query parameters',
            { status: 400 }
        )
    }
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
    }
    const url = `https://search.icons8.com/api/iconsets/v5/search?term=${term}&amount=${amount}&offset=${offset}&platform=all&language=en-US&authors=all`
    const resp = await fetch(url).then(resp => resp.json())
    return new Response(JSON.stringify(resp, null, 2), { headers })
})

router.all('*', () => new Response('404, not found!', { status: 404 }))

addEventListener('fetch', e => {
    e.respondWith(router.handle(e.request))
})
