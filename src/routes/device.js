const router = require('express').Router();
const {
    getDevices,
} = require('../shared/lowdb-instance');

router.get('/', async (req, res) => {
    res.status(200).json(await getDevices(
        req.query.assetIds ? req.query.assetIds.split(',') : undefined,
        req.query.vendorId
    ));
});

module.exports = router;