const express = require('express')
const router = express.Router()

router.use('/api/v1/', require('./post.routes'))
router.use('/api/v1/', require('./user.routes'));
export default router;