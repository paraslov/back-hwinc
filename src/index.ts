import { SETTINGS } from './settings'
import { app } from './app'

app.listen(SETTINGS.PORT, () => {
  console.log(`@> Listening on port: ${SETTINGS.PORT}`)
})
