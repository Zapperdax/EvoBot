const mongoose = require("mongoose");

const countSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
    },
    name: {
        type: String,
    },
    raidsSpawnedCount: {
        type: Number,
        default: 0,
    },
    cardsSpawnedCount: {
        type: Number,
        default: 0,
    },
});

const Count = mongoose.model("Count", countSchema);

module.exports = Count;
