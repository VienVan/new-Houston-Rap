//require mongoose
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AlbumSchema = new Schema({
    name: String,
    yearReleased: String,
    songCount: Number
});

var Album = mongoose.model("Album", AlbumSchema);

module.exports = Album;
