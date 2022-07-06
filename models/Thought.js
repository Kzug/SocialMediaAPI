const { default: mongoose } = require("mongoose");

//Subdocument embedded in a parent document
const reactionSchema = new mongoose.Schema({
  reactionId: { type: Schema.Types.ObjectId }, // * Default value is set to a new ObjectId
  reactionBody: { type: String, required: true, maxLength: 280 },
  username: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    //* Use a getter method to format the timestamp on query
  },
});

// Constructs a new instance of the schema class
const thoughtSchema = new mongoose.Schema(
  {
    thoughtText: {
      type: String,
      minLength: 1,
      maxLength: 280,
      required: true,
    },
    username: { type: String, required: true },
    reactions: [reactionSchema],
    createdAt: {
      type: Date,
      default: Date.now,
      //* Use a getter method to format the timestamp on query
    },
    meta: {
      reactionCount: Number,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.set("timestamps", true); // this will add createdAt and updatedAt timestamps - is this what the readme wants?

thoughtSchema
  .virtual("reactionCount")
  // Getter
  .get(function () {
    return this.meta.reactionCount;
  });

// Using mongoose.model() to compile a model based on 'userSchema'
const Thought = mongoose.model("thought", thoughtSchema);

module.exports = Thought;
