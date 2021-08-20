const router = require('express').Router();
const {
    getAssets
} = require('../shared/lowdb-instance');

router.get('/', (req, res) => {
    res.status(200).json(getAssets());
});

module.exports = router;