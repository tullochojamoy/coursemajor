const mongoose = require("mongoose");

const PlaylistSchema = new mongoose.Schema(
    {
        videoplaylist: [ 
            {
            Number: { type: Number },
            Title: { type: String },
            Description: { type: String },
            Key: { type: String }
            },
        ],

        Course: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Course',
        },

        Test: { type: String },        
    }
);

PlaylistSchema.methods.updateVideoPlaylistName = function(videoName) {
    this.Test = Date.now() + 10 * (60 * 1000);
};

/*
const Playlist = mongoose.model("Playlist", PlaylistSchema);
module.exports = Playlist;
*/
module.exports = mongoose.models.Playlist || mongoose.model('Playlist', PlaylistSchema);