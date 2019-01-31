var express = require('express');
var router = express.Router();

let siswaMigration = require('../migration/siswaMigration');

router.post('/siswa', siswaMigration.create);
router.post('/siswa-index', siswaMigration.indexColumn);

module.exports = router;