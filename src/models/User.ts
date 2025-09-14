import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IUser extends Document {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  linkedInProfile: string;
  githubProfile: string;
  gender: string;
  bio: string;
  followers: [Types.ObjectId];
  following: [Types.ObjectId];
  followerCount: number;
  followingCount: number;
  totalContent: number;
  averageRating: number;
  totalRatings: number;
  isVerified: boolean;
  profileImage: string;
  primaryRole: string;
  experienceLevel: string;
  primaryTechnologies: [string];
  badgeLevel: string;
}

const userSchema: Schema<IUser> = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: 3,
      maxLength: 30,
    },
    firstName: {
      type: String,
      required: true,
      maxLength: 50,
    },
    lastName: {
      type: String,
      required: true,
      maxLength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    linkedInProfile: {
      type: String,
      required: false,
    },
    githubProfile: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other", "prefer_not_to_say"],
      required: false,
    },
    profileImage: {
      type: String,
      required: false,
    },
    bio: {
      type: String,
      maxLength: 500,
    },
    // Social features
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followerCount: {
      type: Number,
      default: 0,
    },
    followingCount: {
      type: Number,
      default: 0,
    },
    totalContent: {
      type: Number,
      default: 0,
    },
    averageRating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    totalRatings: {
      type: Number,
      default: 0,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    badgeLevel: {
      type: String,
      enum: ["newbie", "contributor", "expert", "mentor", "legend"],
      default: "newbie",
    },
    primaryRole: {
      type: String,
      enum: [
        "frontend",
        "backend",
        "fullstack",
        "mobile",
        "devops",
        "ml_ai",
        "game_dev",
        "data_science",
        "cybersecurity",
        "other",
      ],
      required: true,
    },
    experienceLevel: {
      type: String,
      enum: ["student", "junior", "mid", "senior", "lead", "architect"],
      required: true,
    },
    primaryTechnologies: [
      {
        type: String,
        maxLength: 50,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
