"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  CONTENT_TYPES
} from "@/lib/constants/content-types";
import {
  BookOpen,
  Hash,
  Link,
  Plus,
  X
} from "lucide-react";
import { SCHEMA_MAP } from "@/lib/constants/content-schemas";
import BasicDetails from "../form/BasicDetails";
import BlogFields from "../form/BlogFields";
import VideoFields from "../form/VideoFields";
import SnippetFields from "../form/SnippetFields";
import ProjectFields from "../form/ProjectFields";
import TextContentFields from "../form/TextContentFields";
import DiscussionFields from "../form/DiscussionFields";

interface ContentFormProps {
  type: (typeof CONTENT_TYPES)[number]["value"];
}

function ContentForm({ type }: ContentFormProps) {
  const [tagInput, setTagInput] = useState("");
  const [prerequisiteInput, setPrerequisiteInput] = useState("");

  const schema = SCHEMA_MAP[type];
  const contentTypeConfig = CONTENT_TYPES.find((ct) => ct.value === type)!;
  const Icon = contentTypeConfig.icon;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      tags: [],
      prerequisites: [],
      resources: [],
      isPublished: false,
    },
  });

  const {
    fields: resourceFields,
    append: appendResource,
    remove: removeResource,
  } = useFieldArray({ control, name: "resources" });

  const watchedTags = watch("tags") || [];
  const watchedPrerequisites = watch("prerequisites") || [];

  const addTag = () => {
    if (tagInput.trim() && !watchedTags.includes(tagInput.trim())) {
      setValue("tags", [...watchedTags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setValue(
      "tags",
      watchedTags.filter((tag: string) => tag !== tagToRemove)
    );
  };

  const addPrerequisite = () => {
    if (
      prerequisiteInput.trim() &&
      !watchedPrerequisites.includes(prerequisiteInput.trim())
    ) {
      setValue("prerequisites", [
        ...watchedPrerequisites,
        prerequisiteInput.trim(),
      ]);
      setPrerequisiteInput("");
    }
  };

  const removePrerequisite = (prereqToRemove: string) => {
    setValue(
      "prerequisites",
      watchedPrerequisites.filter((p: string) => p !== prereqToRemove)
    );
  };

  const handleFormSubmit = async (data: z.infer<typeof schema>) => {
    console.log("Form submitted:", data);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="mb-8 flex items-center gap-3">
        <div className={`p-3 rounded-lg border-2 ${contentTypeConfig.color}`}>
          <Icon size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Create {contentTypeConfig.label}
          </h1>
          <p className="text-gray-600">
            Fill out the form below to create your content
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
        {/* Base Fields */}
        <BasicDetails register={register} errors={errors} />

        {/* Conditional Fields by Type */}
        {type === "blog-post" && (
          <BlogFields register={register} errors={errors} />
        )}
        {type === "tutorial-video" && (
          <VideoFields register={register} errors={errors} />
        )}
        {type === "code-snippet" && (
          <SnippetFields register={register} errors={errors} />
        )}
        {type === "project-showcase" && (
          <ProjectFields register={register} errors={errors} />
        )}
        {["quick-tip", "tech-update", "question"].includes(type) && (
          <TextContentFields register={register} errors={errors} />
        )}
        {type === "discussion" && (
          <DiscussionFields register={register} errors={errors} />
        )}

        {/* Tags */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">
            <Hash size={20} className="inline mr-2" />
            Tags
          </h2>
          <div className="flex flex-wrap gap-2 mb-3">
            {watchedTags.map((tag: string, index: number) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 border border-blue-200"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-2 hover:text-blue-900"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" && (e.preventDefault(), addTag())
              }
              className="flex-1 px-4 py-2 border rounded-lg"
              placeholder="Add a tag and press Enter"
            />
            <button
              type="button"
              onClick={addTag}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Add
            </button>
          </div>
        </div>

        {/* Prerequisites */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">
            <BookOpen size={20} className="inline mr-2" />
            Prerequisites
          </h2>
          <div className="flex flex-wrap gap-2 mb-3">
            {watchedPrerequisites.map((prereq: string, index: number) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800 border border-green-200"
              >
                {prereq}
                <button
                  type="button"
                  onClick={() => removePrerequisite(prereq)}
                  className="ml-2 hover:text-green-900"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              value={prerequisiteInput}
              onChange={(e) => setPrerequisiteInput(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" && (e.preventDefault(), addPrerequisite())
              }
              className="flex-1 px-4 py-2 border rounded-lg"
              placeholder="Add a prerequisite and press Enter"
            />
            <button
              type="button"
              onClick={addPrerequisite}
              className="px-4 py-2 bg-green-500 text-white rounded-lg"
            >
              Add
            </button>
          </div>
        </div>

        {/* Resources */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              <Link size={20} className="inline mr-2" />
              Related Resources
            </h2>
            <button
              type="button"
              onClick={() =>
                appendResource({ title: "", url: "", description: "" })
              }
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              <Plus size={16} /> Add Resource
            </button>
          </div>

          <div className="space-y-4">
            {resourceFields.map((field, index) => (
              <div key={field.id} className="p-4 border rounded-lg bg-white">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-sm font-medium">
                    Resource {index + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeResource(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={16} />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    {...register(`resources.${index}.title`)}
                    className="w-full px-3 py-2 border rounded"
                    placeholder="Resource title"
                  />
                  <input
                    {...register(`resources.${index}.url`)}
                    className="w-full px-3 py-2 border rounded"
                    placeholder="https://example.com"
                  />
                  <input
                    {...register(`resources.${index}.description`)}
                    className="w-full px-3 py-2 border rounded md:col-span-2"
                    placeholder="Brief description (optional)"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-4 pt-6 border-t">
          <button
            type="button"
            className="px-6 py-2 border rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? "Creating..." : "Create Content"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContentForm;