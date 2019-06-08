const express = require('express')
const router = express.Router()

router.use('/api/v1/', require('./post.routes'))
router.use('/api/v1/', require('./user.routes'));
router.use('/api/v1/', require('./car.routes'));
router.get('/', (req, res) => {
    res.status(200).json({ status:200,data:'welcome to Automart'})
})
export default router;