import * as z from "zod"

// Base schema
const BASE_SCHEMA = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  difficultyLevel: z.enum(["beginner", "intermediate", "advanced"]),
  tags: z.array(z.string()).default([]),
  prerequisites: z.array(z.string()).optional(),
  resources: z
    .array(
      z.object({
        title: z.string().min(1, "Resource title is required"),
        url: z.url("Valid URL required"),
        description: z.string().optional(),
      })
    )
    .optional(),
  isPublished: z.boolean().default(false),
});

// Content type specific schemas
export const BLOG_SCHEMA = BASE_SCHEMA.extend({
  content: z.object({
    markdown: z.string().min(20, "Blog content must be at least 20 characters"),
  }),
  estimatedReadTime: z.number().min(1).optional(),
});

export const VIDEO_SCHEMA = BASE_SCHEMA.extend({
  videoUrl: z.url("Valid video URL required"),
  videoDuration: z.number().min(1, "Duration must be greater than 0"),
  thumbnailUrl: z.url().optional(),
  seriesId: z.string().optional(),
  episodeNumber: z.number().optional(),
});

export const SNIPPET_SCHEMA = BASE_SCHEMA.extend({
  codeSnippet: z.object({
    code: z.string().min(1, "Code is required"),
    language: z.string().min(1, "Programming language is required"),
  }),
});

export const PROJECT_SCHEMA = BASE_SCHEMA.extend({
  sourceCodeUrl: z.url("Valid repository URL required"),
  demoUrl: z.url().optional(),
});

export const TEXT_CONTENT_SCHEMA = BASE_SCHEMA.extend({
  content: z.object({
    text: z.string().min(5, "Content text is required"),
  }),
});

export const DISCUSSION_SCHEMA = TEXT_CONTENT_SCHEMA.extend({
  relatedQuestionId: z.string().optional(),
});

// Schema mapping
export const SCHEMA_MAP = {
  "blog-post": BLOG_SCHEMA,
  "tutorial-video": VIDEO_SCHEMA,
  "code-snippet": SNIPPET_SCHEMA,
  "project-showcase": PROJECT_SCHEMA,
  "quick-tip": TEXT_CONTENT_SCHEMA,
  "tech-update": TEXT_CONTENT_SCHEMA,
  "question": TEXT_CONTENT_SCHEMA,
  "discussion": DISCUSSION_SCHEMA,
} as const;
