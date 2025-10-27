"use client";

import { useState } from "react";
import QuickTipFields from "./components/QuickTipFields";
import CodeSnippetFields from "./components/CodeSnippetsFields";
import BlogPostFields from "./components/BlogPostFields";
import CommonFields from "./components/CommonFields";
import DiscussionFields from "./components/DiscussionFields";
import ProjectShowcaseFields from "./components/ProjectShowcaseFields";
import QuestionFields from "./components/QuestionFields";
import TechUpdateFields from "./components/TechUpdateFields";
import TutorialVideoFields from "./components/TutorialVideoFields";
import { CONTENT_TYPES } from "@/lib/constants/content-types";



function CreateContentPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    difficultyLevel: "beginner",
    contentType: "",
    tags: [],
    isPublished: false,
  });

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const renderDynamicFields = () => {
    switch (formData.contentType) {
      case "quick-tip":
        return <QuickTipFields formData={formData} onChange={handleChange} />;
      case "code-snippet":
        return <CodeSnippetFields formData={formData} onChange={handleChange} />;
      case "blog-post":
        return <BlogPostFields formData={formData} onChange={handleChange} />;
      case "tutorial-video":
        return <TutorialVideoFields formData={formData} onChange={handleChange} />;
      case "project-showcase":
        return <ProjectShowcaseFields formData={formData} onChange={handleChange} />;
      case "tech-update":
        return <TechUpdateFields formData={formData} onChange={handleChange} />;
      case "question":
        return <QuestionFields formData={formData} onChange={handleChange} />;
      case "discussion":
        return <DiscussionFields formData={formData} onChange={handleChange} />;
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Create New Content</h1>

      {/* Common fields */}
      <CommonFields formData={formData} onChange={handleChange} />

      {/* Content type selection */}
      <div>
        <label className="block font-medium mb-1">Content Type</label>
        <select
          value={formData.contentType}
          onChange={(e) => handleChange("contentType", e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full"
        >
          <option value="">Select content type</option>
          {CONTENT_TYPES.map(({value,label}) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Conditional fields */}
      {renderDynamicFields()}

      <button
        type="submit"
        className="bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
}

export default CreateContentPage;
