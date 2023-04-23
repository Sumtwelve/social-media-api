const router = require('express').Router();
const apiRoutes = require('./api');

// current route: /

router.use('/api', apiRoutes);

// If the request method has no code to expect it,
// this text will be shown. For example, calling a DELETE
// method on a route that can only handle GETs and POSTs.
router.use((req, res) => res.send('Wrong route!'));

module.exports = router;