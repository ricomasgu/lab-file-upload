const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    content: {
      type: String,
      required: [true, "Content is required."],
      unique: true
    },
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: [true, "Creator is required."],
    },
    picPath: {
      type: String,
      required: [true, "Picture path is required."]
    },
    picName: {
      type: String,
      required: [true, "Picture name is required."]
    }
  },
  {
    timestamps: true
  }
);

module.exports = model("Post", postSchema);
