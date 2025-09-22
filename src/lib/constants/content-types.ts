import { Code, FileText, HelpCircle, Lightbulb, MessageSquare, Newspaper, Presentation, Video } from "lucide-react";

export const CONTENT_TYPES = [
  { value: 'quick-tip', label: 'Quick Tip', icon: Lightbulb, color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  { value: 'code-snippet', label: 'Code Snippet', icon: Code, color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { value: 'tutorial-video', label: 'Tutorial Video', icon: Video, color: 'bg-purple-100 text-purple-700 border-purple-200' },
  { value: 'blog-post', label: 'Blog Post', icon: FileText, color: 'bg-green-100 text-green-700 border-green-200' },
  { value: 'project-showcase', label: 'Project Showcase', icon: Presentation, color: 'bg-orange-100 text-orange-700 border-orange-200' },
  { value: 'tech-update', label: 'Tech Update', icon: Newspaper, color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
  { value: 'question', label: 'Question', icon: HelpCircle, color: 'bg-red-100 text-red-700 border-red-200' },
  { value: 'discussion', label: 'Discussion', icon: MessageSquare, color: 'bg-teal-100 text-teal-700 border-teal-200' },
] as const;

export const DIFFICULTY_LEVELS = [
  { value: 'beginner', label: 'Beginner', color: 'text-green-600' },
  { value: 'intermediate', label: 'Intermediate', color: 'text-yellow-600' },
  { value: 'advanced', label: 'Advanced', color: 'text-red-600' },
] as const;

export const PROGRAMMING_LANGUAGES = [
  'javascript', 'typescript', 'python', 'java', 'csharp', 'cpp', 'c',
  'php', 'ruby', 'go', 'rust', 'kotlin', 'swift', 'html', 'css', 'scss',
  'sql', 'bash', 'powershell', 'yaml', 'json', 'xml', 'markdown', 'dockerfile', 'other'
] as const;