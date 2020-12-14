mongoose = require('mongoose');
const Schema = mongoose.Schema;
const trackSchema = new Schema({
    trackName: String,
    artistName: String,
    albumName: String,
    albumYear: String,
    albumGenre: String,
    trackPrice: String
});
const Track = mongoose.model('Track', trackSchema);

module.exports = Track;