const Logger = require('./libs/logger')

const bannerLogger = require('./libs/banner')

const expressLoader = require('./loaders/expressLoader')
const mongooseLoader = require('./loaders/mongooseLoader')
const passportLoader = require('./loaders/passportLoader')
const publicLoader = require('./loaders/publicLoader')
const swaggerLoader = require('./loaders/swaggerLoader')
const winstonLoader = require('./loaders/winstonLoader')


const log = new Logger(__filename)

// Init loaders
async function initApp() {
    // logging
    winstonLoader()

   // Database
   await mongooseLoader()

    // express
    const app = expressLoader()

    // swagger
    swaggerLoader(app)

    // passport init
    passportLoader(app)

    // public Url
    publicLoader(app)
}

initApp()
.then(() => bannerLogger(log))
.catch((error) => log.error('Application is crashed: ' + error))
