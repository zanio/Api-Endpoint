const express = require('express')
const router = express.Router()

router.use('/api/v1/', require('./post.routes'))
router.use('/api/v1/', require('./user.routes'));
router.use('/api/v1/', require('./car.routes'));
export default router;