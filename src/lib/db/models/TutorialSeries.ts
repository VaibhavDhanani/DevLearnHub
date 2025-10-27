import mongoose, { Schema, Model, Document, Types } from "mongoose";

export interface ITutorialSeries extends Document {
  creatorId: Types.ObjectId;
  title: string;
  description: string;
  difficultyLevel: string;
  tags: [string];
  thumbnailUrl: string;
  totalEpisodes: number;
  completedEpisodes: number;
  isCompleted: boolean;
  averageRating: number;
  totalRatings: number;
  views: number;
  subscribers: [Types.ObjectId];
  subscriberCount: number;
}

const tutorialSeriesSchema = new Schema<ITutorialSeries>(
  {
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      maxLength: 150,
    },
    description: {
      type: String,
      required: true,
      maxLength: 2000,
    },
    difficultyLevel: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      required: true,
    },
    tags: [
      {
        type: String,
        maxLength: 30,
      },
    ],
    thumbnailUrl: {
      type: String,
    },
    totalEpisodes: {
      type: Number,
      default: 0,
    },
    completedEpisodes: {
      type: Number,
      default: 0,
    },
    isCompleted: {
      type: Boolean,
      default: false,
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
    views: {
      type: Number,
      default: 0,
    },
    subscribers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    subscriberCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const TutorialSeries: Model<ITutorialSeries> =
  mongoose.models.TutorialSeries ||
  mongoose.model<ITutorialSeries>("TutorialSeries", tutorialSeriesSchema);

export default TutorialSeries;
