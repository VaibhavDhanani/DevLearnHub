import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IComment extends Document {
  contentId: Types.ObjectId;
  authorId: Types.ObjectId;
  content: string;

  // Replies
  parentCommentId?: Types.ObjectId;
  replies: Types.ObjectId[];
  replyCount: number;

  // Engagement
  likes: { developerId: Types.ObjectId; likedAt: Date }[];
  likeCount: number;

  // Code in comments
  hasCode: boolean;
  codeBlock?: {
    language?: string;
    code?: string;
  };

  // Mentions
  mentions: Types.ObjectId[];

  isEdited: boolean;
  editedAt?: Date;
}

const CommentSchema: Schema<IComment> = new Schema(
  {
    contentId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
      maxLength: 500,
    },
    // Replies
    parentCommentId: { type: Schema.Types.ObjectId, ref: "Comment" },
    replies: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    replyCount: { type: Number, default: 0 },

    // Engagement
    likes: [
      {
        developerId: { type: Schema.Types.ObjectId, ref: "User" },
        likedAt: { type: Date, default: Date.now },
      },
    ],
    likeCount: { type: Number, default: 0 },

    // Code in comments
    hasCode: { type: Boolean, default: false },
    codeBlock: {
      language: String,
      code: String,
    },

    // Mentions
    mentions: [{ type: Schema.Types.ObjectId, ref: "User" }],

    isEdited: { type: Boolean, default: false },
    editedAt: { type: Date },
  },
  { timestamps: true } // gives createdAt & updatedAt automatically
);

const Comment: Model<IComment> =
  mongoose.models.Comment || mongoose.model<IComment>("Comment", CommentSchema);

export default Comment;
