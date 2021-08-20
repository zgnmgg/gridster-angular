const router = require('express').Router();
const {
    getVendors
} = require('../shared/lowdb-instance');

router.get('/', (req, res) => {
    res.status(200).json(getVendors());
});

module.exports = router;