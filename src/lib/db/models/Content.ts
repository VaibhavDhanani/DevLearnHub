import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IContent extends Document {
  creatorId: Types.ObjectId | string;
  title: string;
  description: string;
  difficultyLevel: "beginner" | "intermediate" | "advanced";
  contentType:
    | "quick_tip"
    | "code_snippet"
    | "tutorial_video"
    | "blog_post"
    | "project_showcase"
    | "tech_update"
    | "question"
    | "discussion";
  
  content: {
    text?: string; // for quick tips, tech updates, questions, discussions
    markdown?: string; // for blog posts
  };
  
  // Media fields
  videoUrl?: string;
  videoDuration?: number; // in seconds
  thumbnailUrl?: string;
  
  // Code specific
  codeSnippet?: {
    code: string;
    language: string;
  };
  
  // Tutorial series specific
  seriesId?: Types.ObjectId | string;
  episodeNumber?: number;
  
  // Project showcase specific
  sourceCodeUrl?: string; // GitHub/GitLab link
  demoUrl?: string; // Live demo link
  
  // Discussion specific
  relatedQuestionId?: Types.ObjectId | string;
  
  // Additional metadata
  tags: string[];
  prerequisites?: string[]; // for tutorial content
  estimatedReadTime?: number; // in minutes, for blog posts
  resources?: {
    title: string;
    url: string;
    description?: string;
  }[];
  
  // Engagement metrics
  views: number;
  likes: Types.ObjectId[];
  likeCount: number;
  averageRating: number;
  totalRatings: number;
  totalRatingSum: number;
  
  // Publishing
  isPublished: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const contentSchema = new Schema<IContent>(
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
      trim: true,
    },
    description: {
      type: String,
      required: true,
      maxLength: 2000,
      trim: true,
    },
    difficultyLevel: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      required: true,
    },
    contentType: {
      type: String,
      enum: [
        'quick_tip', 
        'code_snippet', 
        'tutorial_video', 
        'blog_post', 
        'project_showcase', 
        'tech_update', 
        'question', 
        'discussion'
      ],
      required: true,
    },
    
    // Flexible content structure
    content: {
      text: {
        type: String,
        required: function (this: IContent) {
          return ['quick_tip', 'tech_update', 'question', 'discussion'].includes(this.contentType);
        },
        maxLength: function (this: IContent) {
          if (this.contentType === 'question') return 1000;
          if (this.contentType === 'discussion') return 5000;
          return 10000; // for quick_tip and tech_update
        },
        trim: true,
      },
      markdown: {
        type: String,
        required: function (this: IContent) {
          return this.contentType === "blog_post";
        },
        maxLength: [50000, "Blog content cannot exceed 50,000 characters"],
      },
    },
    
    // Media fields
    videoUrl: {
      type: String,
      required: function (this: IContent) {
        return ["project_showcase", "tutorial_video"].includes(this.contentType);
      },
      validate: {
        validator: function (v: string) {
          if (!v) return true;
          const urlPattern =
            /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
          return urlPattern.test(v);
        },
        message: "Invalid video URL format",
      },
    },
    videoDuration: {
      type: Number, // in seconds
      required: function (this: IContent) {
        return ["project_showcase", "tutorial_video"].includes(this.contentType);
      },
      min: [1, "Video duration must be at least 1 second"],
      max: [14400, "Video duration cannot exceed 4 hours"], // 4 hours max
    },
    thumbnailUrl: {
      type: String,
      required: false,
      validate: {
        validator: function (v: string) {
          if (!v) return true;
          const urlPattern =
            /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
          return urlPattern.test(v);
        },
        message: "Invalid thumbnail URL format",
      },
    },
    
    // Code specific
    codeSnippet: {
      code: {
        type: String,
        required: function (this: IContent) {
          return this.contentType === "code_snippet";
        },
        maxLength: [10000, "Code snippet cannot exceed 10,000 characters"],
      },
      language: {
        type: String,
        required: function (this: IContent) {
          return this.contentType === "code_snippet";
        },
        enum: [
          "javascript",
          "typescript",
          "python",
          "java",
          "csharp",
          "cpp",
          "c",
          "php",
          "ruby",
          "go",
          "rust",
          "kotlin",
          "swift",
          "html",
          "css",
          "scss",
          "sql",
          "bash",
          "powershell",
          "yaml",
          "json",
          "xml",
          "markdown",
          "dockerfile",
          "other",
        ],
      },
    },
    
    // Tutorial series specific
    seriesId: {
      type: Schema.Types.ObjectId,
      ref: "TutorialSeries",
      required: function (this: IContent) {
        return this.contentType === "tutorial_video";
      },
    },
    episodeNumber: {
      type: Number,
      required: function (this: IContent) {
        return this.contentType === "tutorial_video";
      },
      min: [1, "Episode number must be at least 1"],
    },
    
    // Project showcase specific
    sourceCodeUrl: {
      type: String,
      required: function (this: IContent) {
        return this.contentType === "project_showcase";
      },
      validate: {
        validator: function (v: string) {
          if (!v) return true;
          const urlPattern =
            /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
          return urlPattern.test(v);
        },
        message: "Invalid source code URL format",
      },
    },
    demoUrl: {
      type: String,
      required: false,
      validate: {
        validator: function (v: string) {
          if (!v) return true;
          const urlPattern =
            /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
          return urlPattern.test(v);
        },
        message: "Invalid demo URL format",
      },
    },
    
    // Discussion specific
    relatedQuestionId: {
      type: Schema.Types.ObjectId,
      ref: "Content",
      required: function (this: IContent) {
        return this.contentType === "discussion";
      },
      validate: {
        validator: async function (v: Types.ObjectId) {
          if (!v || this.contentType !== "discussion") return true;
          // Check if the referenced content is actually a question
          const question = await mongoose.model("Content").findById(v);
          return question && question.contentType === "question";
        },
        message: "Referenced content must be a question",
      },
    },
    
    // Common fields
    tags: [
      {
        type: String,
        maxLength: 30,
        trim: true,
        lowercase: true,
      },
    ],
    prerequisites: [
      {
        type: String,
        maxLength: 100,
        trim: true,
      },
    ],
    estimatedReadTime: {
      type: Number, // in minutes
      min: [1, "Estimated read time must be at least 1 minute"],
      max: [300, "Estimated read time cannot exceed 5 hours"],
    },
    resources: [
      {
        title: {
          type: String,
          required: true,
          maxLength: 100,
          trim: true,
        },
        url: {
          type: String,
          required: true,
          validate: {
            validator: function (v: string) {
              const urlPattern =
                /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
              return urlPattern.test(v);
            },
            message: "Invalid resource URL format",
          },
        },
        description: {
          type: String,
          maxLength: 200,
          trim: true,
        },
      },
    ],
    
    // Engagement metrics
    views: {
      type: Number,
      default: 0,
      min: [0, "Views cannot be negative"],
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    likeCount: {
      type: Number,
      default: 0,
      min: [0, "Like count cannot be negative"],
    },
    averageRating: {
      type: Number,
      min: [0, "Rating cannot be less than 0"],
      max: [5, "Rating cannot be more than 5"],
      default: 0,
    },
    totalRatings: {
      type: Number,
      default: 0,
      min: [0, "Total ratings cannot be negative"],
    },
    totalRatingSum: {
      type: Number,
      default: 0,
      min: [0, "Rating sum cannot be negative"],
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
      validate: {
        validator: function (v: Date) {
          return !v || v <= new Date();
        },
        message: "Published date cannot be in the future",
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Optimized indexes for better performance
contentSchema.index({ creatorId: 1, createdAt: -1 });
contentSchema.index({ contentType: 1, isPublished: 1, createdAt: -1 }); // Compound index
contentSchema.index({ tags: 1 });
contentSchema.index({ difficultyLevel: 1, createdAt: -1 });
contentSchema.index({ averageRating: -1, createdAt: -1 });
contentSchema.index({ views: -1 });
contentSchema.index({ seriesId: 1, episodeNumber: 1 });
contentSchema.index({ isPublished: 1, publishedAt: -1 });
contentSchema.index({ relatedQuestionId: 1 }); // For discussions

// Text search index
contentSchema.index({
  title: "text",
  description: "text",
  tags: "text",
  "content.text": "text",
  "content.markdown": "text"
});

// Virtual for getting formatted duration
contentSchema.virtual("formattedDuration").get(function (this: IContent) {
  if (!this.videoDuration) return null;

  const hours = Math.floor(this.videoDuration / 3600);
  const minutes = Math.floor((this.videoDuration % 3600) / 60);
  const seconds = this.videoDuration % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  } else {
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }
});

// Virtual for creator details (populated)
contentSchema.virtual("creator", {
  ref: "User",
  localField: "creatorId",
  foreignField: "_id",
  justOne: true,
});

// Virtual for related question (for discussions)
contentSchema.virtual("relatedQuestion", {
  ref: "Content",
  localField: "relatedQuestionId",
  foreignField: "_id",
  justOne: true,
});

// Pre-save middleware to update averageRating and other calculations
contentSchema.pre("save", function (this: IContent) {
  if (this.totalRatings > 0) {
    this.averageRating = Number(
      (this.totalRatingSum / this.totalRatings).toFixed(1)
    );
  } else {
    this.averageRating = 0;
  }

  // Update like count
  this.likeCount = this.likes.length;

  // Set published date if publishing for first time
  if (this.isPublished && !this.publishedAt) {
    this.publishedAt = new Date();
  }

  // Auto-calculate estimated read time for blog posts
  if (this.contentType === "blog_post" && this.content.markdown && !this.estimatedReadTime) {
    const wordCount = this.content.markdown.split(/\s+/).length;
    this.estimatedReadTime = Math.ceil(wordCount / 200); // Average reading speed: 200 words/minute
  }
});

// Static methods
contentSchema.statics.findByCreator = function (creatorId: string) {
  return this.find({ creatorId, isPublished: true })
    .sort({ createdAt: -1 })
    .populate("creator", "username firstName lastName profileImage");
};

contentSchema.statics.findByTags = function (tags: string[]) {
  return this.find({
    tags: { $in: tags },
    isPublished: true,
  })
    .sort({ averageRating: -1, views: -1 })
    .populate("creator", "username firstName lastName profileImage");
};

contentSchema.statics.getTrendingContent = function (limit: number = 20) {
  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  return this.find({
    isPublished: true,
    createdAt: { $gte: oneWeekAgo },
  })
    .sort({ views: -1, likeCount: -1, averageRating: -1 })
    .limit(limit)
    .populate("creator", "username firstName lastName profileImage");
};

contentSchema.statics.findQuestions = function () {
  return this.find({
    contentType: "question",
    isPublished: true,
  })
    .sort({ createdAt: -1 })
    .populate("creator", "username firstName lastName profileImage");
};

contentSchema.statics.findDiscussionsByQuestion = function (questionId: string) {
  return this.find({
    contentType: "discussion",
    relatedQuestionId: questionId,
    isPublished: true,
  })
    .sort({ averageRating: -1, createdAt: -1 })
    .populate("creator", "username firstName lastName profileImage");
};

// Instance methods
contentSchema.methods.addView = function () {
  this.views += 1;
  return this.save();
};

contentSchema.methods.addLike = function (userId: string) {
  if (!this.likes.includes(userId)) {
    this.likes.push(userId);
    this.likeCount += 1;
  }
  return this.save();
};

contentSchema.methods.removeLike = function (userId: string) {
  this.likes = this.likes.filter(
    (id: Schema.Types.ObjectId) => id.toString() !== userId
  );
  this.likeCount = this.likes.length;
  return this.save();
};

contentSchema.methods.addRating = function (rating: number) {
  this.totalRatings += 1;
  this.totalRatingSum += rating;
  this.averageRating = Number(
    (this.totalRatingSum / this.totalRatings).toFixed(1)
  );
  return this.save();
};

const Content: Model<IContent> =
  mongoose.models.Content || mongoose.model<IContent>("Content", contentSchema);

export default Content;