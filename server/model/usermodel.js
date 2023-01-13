import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is Required"],
  },
  mail: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  topics: {
    type: [
      {
        title: {
          type: String,
          unique: true,
        },
        description: [
          {
            word: { type: String },

            value: {
              type: Number,

              default: 0,
            },
          },
        ],
        percent: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
});

const User = mongoose.model("User", userSchema);

export { User };
