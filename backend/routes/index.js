import { movieRouter } from './movieRoutes.js'

const routes = [
    {
        path: '/movies',
        router: movieRouter
    }
]
const routesFn = (app) => {
    routes.forEach(route => { 
        if (route.path === '/movies') {
            app.use(route.path, route.router) 
        }
    })
}
export default routesFn
