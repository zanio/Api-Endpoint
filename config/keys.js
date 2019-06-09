if(process.env.NODE_ENV === 'production'){
    module.exports = require('./config.prod')
}
// else we are in development, so threfore use the
//development dev file.
else{
    module.exports = require('./config')
}