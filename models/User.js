const { Schema, model } = require("mongoose");

const validateEmail = (email) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

// Constructs a new instance of the schema class
const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validateEmail, "Please fill a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    meta: {
      friendCount: Number,
    },
    thoughts: { type: Schema.Types.ObjectId, ref: "thought" },
    friends: { type: Schema.Types.ObjectId, ref: "user" },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema
  .virtual("friendCount")
  // Getter
  .get(function () {
    return this.meta.friendCount;
  });

// Using mongoose.model() to compile a model based on 'userSchema'
const User = model("user", userSchema);

const handleError = (err) => console.error(err);

User.create(
  {
    username: "cooldude101",
    email: "jerry@jerry.com",
    thoughts: ["super bored today", "time to go out to eat!"],
    friends: ["George", "Fred", "Sam"],
  },
  (err) => (err ? handleError(err) : console.log("Created new document"))
);

module.exports = User;
