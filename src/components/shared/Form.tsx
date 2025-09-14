import React, { useState, useEffect } from 'react';
import { useForm, UseFormReturn, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

// Content types
const CONTENT_TYPES = [
  { value: 'quick_tip', label: 'Quick Tip' },
  { value: 'code_snippet', label: 'Code Snippet' },
  { value: 'tutorial_video', label: 'Tutorial Video' },
  { value: 'blog_post', label: 'Blog Post' },
  { value: 'project_showcase', label: 'Project Showcase' },
  { value: 'tech_update', label: 'Tech Update' },
  { value: 'question', label: 'Question' },
  { value: 'discussion', label: 'Discussion' },
] as const;

const DIFFICULTY_LEVELS = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
] as const;

const PROGRAMMING_LANGUAGES = [
  'javascript', 'typescript', 'python', 'java', 'csharp', 'cpp', 'c',
  'php', 'ruby', 'go', 'rust', 'kotlin', 'swift', 'html', 'css', 'scss',
  'sql', 'bash', 'powershell', 'yaml', 'json', 'xml', 'markdown', 'dockerfile', 'other'
] as const;

// Mock data for dropdowns
const mockTutorialSeries = [
  { _id: '1', title: 'React Fundamentals' },
  { _id: '2', title: 'Node.js Masterclass' },
  { _id: '3', title: 'MongoDB Deep Dive' },
];

const mockQuestions = [
  { _id: '1', title: 'How to optimize React performance?' },
  { _id: '2', title: 'Best practices for MongoDB indexing?' },
  { _id: '3', title: 'TypeScript vs JavaScript in 2024?' },
];

// Validation schema
const baseSchema = {
  title: z.string().min(1, 'Title is required').max(150, 'Title must be less than 150 characters'),
  description: z.string().min(1, 'Description is required').max(2000, 'Description must be less than 2000 characters'),
  difficultyLevel: z.enum(['beginner', 'intermediate', 'advanced']),
  contentType: z.enum([
    'quick_tip', 'code_snippet', 'tutorial_video', 'blog_post', 'project_showcase', 'tech_update', 'question', 'discussion'
  ]),
  tags: z.array(z.string().max(30)).max(10, 'Maximum 10 tags allowed'),
};

const createValidationSchema = (contentType: string) => {
  const schema: Record<string, any> = { ...baseSchema };

  switch (contentType) {
    case 'quick_tip':
    case 'tech_update':
      schema.content = z.object({
        text: z.string().min(1, 'Content is required').max(10000)
      });
      break;
    case 'code_snippet':
      schema.codeSnippet = z.object({
        code: z.string().min(1, 'Code is required').max(512, 'Code must be less than 512 characters'),
        language: z.enum(PROGRAMMING_LANGUAGES),
      });
      break;
    case 'tutorial_video':
      schema.seriesId = z.string().min(1, 'Tutorial series is required');
      schema.videoUrl = z.string().url('Invalid video URL');
      schema.episodeNumber = z.number().min(1, 'Episode number must be at least 1');
      schema.videoDuration = z.number().min(1, 'Duration must be at least 1 second');
      break;
    case 'blog_post':
      schema.content = z.object({
        markdown: z.string().min(1, 'Blog content is required').max(50000)
      });
      break;
    case 'project_showcase':
      schema.videoUrl = z.string().url('Invalid video URL');
      schema.videoDuration = z.number().min(1, 'Duration must be at least 1 second');
      schema.sourceCodeUrl = z.string().url('Invalid source code URL');
      schema.demoUrl = z.string().url('Invalid demo URL').optional().or(z.literal(''));
      break;
    case 'question':
      schema.content = z.object({
        text: z.string().min(1, 'Question is required').max(1000)
      });
      break;
    case 'discussion':
      schema.relatedQuestionId = z.string().min(1, 'Please select a question');
      schema.content = z.object({
        text: z.string().min(1, 'Discussion content is required').max(5000)
      });
      break;
  }

  return z.object(schema);
};

// Types for props
type TagsInputProps = {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
};

const TagsInput: React.FC<TagsInputProps> = ({ value = [], onChange, placeholder = "Add tags..." }) => {
  const [inputValue, setInputValue] = useState('');

  const addTag = (tag: string) => {
    if (tag.trim() && !value.includes(tag.trim().toLowerCase()) && value.length < 10) {
      onChange([...value, tag.trim().toLowerCase()]);
      setInputValue('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(inputValue);
    }
    if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      removeTag(value[value.length - 1]);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {value.map((tag, index) => (
          <Badge key={index} variant="secondary" className="flex items-center gap-1">
            {tag}
            <X
              className="h-3 w-3 cursor-pointer hover:text-red-500"
              onClick={() => removeTag(tag)}
            />
          </Badge>
        ))}
      </div>
      <Input
        value={inputValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        onBlur={() => {
          if (inputValue.trim()) {
            addTag(inputValue);
          }
        }}
      />
    </div>
  );
};

type CommonFieldsProps = {
  form: UseFormReturn<any>;
};

const CommonFields: React.FC<CommonFieldsProps> = ({ form }) => (
  <div className="space-y-6">
    <FormField
      control={form.control}
      name="title"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Title</FormLabel>
          <FormControl>
            <Input placeholder="Enter content title..." {...field} />
          </FormControl>
          <FormDescription>
            Maximum 150 characters
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Textarea 
              placeholder="Describe your content..." 
              className="min-h-[100px]"
              {...field} 
            />
          </FormControl>
          <FormDescription>
            Maximum 2000 characters
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="contentType"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Content Type</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select content type" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {CONTENT_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="difficultyLevel"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Difficulty Level</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty level" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {DIFFICULTY_LEVELS.map((level) => (
                <SelectItem key={level.value} value={level.value}>
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="tags"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Tags</FormLabel>
          <FormControl>
            <TagsInput
              value={field.value}
              onChange={field.onChange}
              placeholder="Add tags (press Enter or comma to add)..."
            />
          </FormControl>
          <FormDescription>
            Add relevant tags to help others discover your content (maximum 10 tags)
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
);

type ContentTypeFieldsProps = {
  form: UseFormReturn<any>;
  contentType: string;
};

const ContentTypeFields: React.FC<ContentTypeFieldsProps> = ({ form, contentType }) => {
  switch (contentType) {
    case 'quick_tip':
    case 'tech_update':
      return (
        <FormField
          control={form.control}
          name="content.text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder={`Write your ${contentType === 'quick_tip' ? 'quick tip' : 'tech update'} here... (Markdown supported)`}
                  className="min-h-[200px]"
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                You can use Markdown formatting. Maximum 10,000 characters.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      );

    case 'code_snippet':
      return (
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="codeSnippet.language"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Programming Language</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {PROGRAMMING_LANGUAGES.map((lang) => (
                      <SelectItem key={lang} value={lang}>
                        {lang.charAt(0).toUpperCase() + lang.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="codeSnippet.code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Paste your code here..."
                    className="min-h-[300px] font-mono text-sm"
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  Maximum 512 characters for code snippets
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      );

    case 'tutorial_video':
      return (
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="seriesId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tutorial Series</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tutorial series" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {mockTutorialSeries.map((series) => (
                      <SelectItem key={series._id} value={series._id}>
                        {series.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="episodeNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Episode Number</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="1"
                    {...field}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => field.onChange(parseInt(e.target.value) || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="videoUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Video URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://youtube.com/watch?v=..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="videoDuration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Video Duration (seconds)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="300"
                    {...field}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => field.onChange(parseInt(e.target.value) || 0)}
                  />
                </FormControl>
                <FormDescription>
                  Duration in seconds (e.g., 300 for 5 minutes)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      );

    case 'blog_post':
      return (
        <FormField
          control={form.control}
          name="content.markdown"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Blog Content</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Write your blog post in Markdown..."
                  className="min-h-[400px]"
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Full Markdown support. Maximum 50,000 characters.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      );

    case 'project_showcase':
      return (
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="videoUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Demo Video URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://youtube.com/watch?v=..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="videoDuration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Video Duration (seconds)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="180"
                    {...field}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => field.onChange(parseInt(e.target.value) || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sourceCodeUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Source Code URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://github.com/username/repo" {...field} />
                </FormControl>
                <FormDescription>
                  Link to your GitHub repository or source code
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="demoUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Live Demo URL (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="https://myproject.vercel.app" {...field} />
                </FormControl>
                <FormDescription>
                  Link to live demo or deployed application
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      );

    case 'question':
      return (
        <FormField
          control={form.control}
          name="content.text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="What's your question? Provide as much detail as possible..."
                  className="min-h-[200px]"
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Maximum 1,000 characters. Be specific to get better answers.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      );

    case 'discussion':
      return (
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="relatedQuestionId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Related Question</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a question to discuss" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {mockQuestions.map((question) => (
                      <SelectItem key={question._id} value={question._id}>
                        {question.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content.text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Answer/Discussion</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Share your thoughts, answer, or start a discussion..."
                    className="min-h-[200px]"
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  Maximum 5,000 characters. Provide helpful insights or answers.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      );

    default:
      return null;
  }
};

type ContentFormProps = {
  onSubmit?: (data: any) => void;
  onSaveDraft?: (data: any) => void;
  initialData?: any;
};

const ContentForm: React.FC<ContentFormProps> = ({ onSubmit, onSaveDraft, initialData = null }) => {
  const [contentType, setContentType] = useState<string>(initialData?.contentType || '');

  const form = useForm({
    resolver: zodResolver(createValidationSchema(contentType || 'quick_tip')),
    defaultValues: {
      title: '',
      description: '',
      contentType: '',
      difficultyLevel: 'beginner',
      tags: [],
      content: { text: '', markdown: '' },
      codeSnippet: { code: '', language: 'javascript' },
      seriesId: '',
      episodeNumber: 1,
      videoUrl: '',
      videoDuration: 0,
      sourceCodeUrl: '',
      demoUrl: '',
      relatedQuestionId: '',
      ...initialData,
    },
  });

  const watchContentType = form.watch('contentType');

  useEffect(() => {
    if (watchContentType !== contentType) {
      setContentType(watchContentType);
      form.clearErrors();
    }
  }, [watchContentType, form, contentType]);

  const handleSubmit = async (data: any) => {
    const isValid = await form.trigger();
    if (isValid) {
      console.log('Form submitted:', data);
      onSubmit?.(data);
    }
  };

  const handleSaveDraft = () => {
    const data = form.getValues();
    console.log('Saved as draft:', data);
    onSaveDraft?.(data);
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Content</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <div className="space-y-8">
            <CommonFields form={form} />
            
            {contentType && (
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">
                  {CONTENT_TYPES.find(t => t.value === contentType)?.label} Details
                </h3>
                <ContentTypeFields form={form} contentType={contentType} />
              </div>
            )}

            <div className="flex gap-4 pt-6 border-t">
              <Button type="button" onClick={form.handleSubmit(handleSubmit)} className="flex-1">
                Create Content
              </Button>
              <Button type="button" onClick={handleSaveDraft} variant="outline" className="flex-1">
                Save as Draft
              </Button>
            </div>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
};

export default function ContentFormDemo() {
  const handleSubmit = (data: any) => {
    alert('Form submitted successfully! Check console for data.');
    console.log('Submitted data:', data);
  };

  const handleSaveDraft = (data: any) => {
    alert('Saved as draft! Check console for data.');
    console.log('Draft data:', data);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <ContentForm onSubmit={handleSubmit} onSaveDraft={handleSaveDraft} />
    </div>
  );
}