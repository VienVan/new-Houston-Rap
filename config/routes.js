var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    passport = require('passport-local'),
    methodOverride = require('method-override');

var artistsController = require('../controllers/artists');
var albumsController = require('../controllers/albums');

router.route('/artists')
      .get(artistsController.index)
      .post(artistsController.create)
      .delete(artistsController.delete);
router.route('/artists/new')
      .get(artistsController.new);
router.route('/artists/:id')
      .get(artistsController.show)
      .put(artistsController.update)
      .post(albumsController.create);
      // .put(albumsController.update)
      // .delete(albumsController.delete);
router.route('/artists/:id/edit')
      .get(artistsController.edit);
router.route('/artists/:id/newalbum')
      .get(albumsController.new);
router.route('/api')
      .get(artistsController.api);
router.route('/api/albums')
      .get(artistsController.albumApi);

module.exports = router;
