const mongoose = require("mongoose");

const logSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    visitedDate: {
      type: Date,
      required: true,
    },
    imageUrl: {
      type: String,
      default: "https://via.placeholder.com/300",
    },
    rating: {
      type: Number,
      required: true,
      default: 1,
      min: 1,
      max: 10,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
  },
  { timestamps: true, strictQuery: true }
);

module.exports = mongoose.model("travelLog", logSchema);
