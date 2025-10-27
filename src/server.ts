import app from './app'
import { pool } from './config/database'
import { ENV } from './config/env'

pool.connect()

app.listen(ENV.PORT, () => {
  console.log(`Server is running on port ${ENV.PORT}`)
})
