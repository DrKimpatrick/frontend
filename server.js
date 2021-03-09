const app = require('./app')

// use the $PORT env var to bind its port when the app
// is deployed, it uses its default PORT 3000
app.listen(process.env.PORT || 3000);