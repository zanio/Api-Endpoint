// Import packages
const express = require('express')
const morgan = require('morgan')

// App
const app = express()
// Morgan
app.use(morgan('tiny'))
// First route
import routes from './routes/index.routes'
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes)

app.use('*', (req, res) => {
    res.status(404).json({status:404,err:'That routes is not a known route'});
  });


// Starting server
const PORT = process.env.PORT || 3300
app.listen(PORT, ()=>{
    console.log(`server is listening at port %d`, PORT)
})

export default app