const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const topicSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        followers: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

// Always store topic names in lowercase
// This prevents future duplicate key errors
// and ensures consistency
// (existing duplicates must still be cleaned up)
topicSchema.pre('save', function (next) {
    if (this.name) {
        this.name = this.name.trim().toLowerCase();
    }
    next();
});

// Static method to clean up duplicates (for admin use)
topicSchema.statics.cleanupDuplicates = async function () {
    const topics = await this.find({});
    const byLower = {};
    for (const topic of topics) {
        const lower = topic.name.toLowerCase();
        if (!byLower[lower]) {
            byLower[lower] = [];
        }
        byLower[lower].push(topic);
    }
    for (const lower in byLower) {
        const group = byLower[lower];
        if (group.length > 1) {
            // Prefer capitalized version (e.g., 'AI'), else keep the first
            let toKeep = group.find(t => t.name === t.name.toUpperCase()) || group[0];
            for (const t of group) {
                if (t._id.toString() !== toKeep._id.toString()) {
                    await this.deleteOne({ _id: t._id });
                }
            }
        }
    }
};

const categories = [
    "Technology",
    "Science",
    "Gaming",
    "Art",
    "Business",
    "Health",
    "Travel",
    "Education",
    "Sports",
    "Lifestyle"
];

// Route to get categories
router.get("/categories", (req, res) => {
    res.json(categories);
});

const Topic = mongoose.model("Topic", topicSchema);
module.exports = { router, categories }; 