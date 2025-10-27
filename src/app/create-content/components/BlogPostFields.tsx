import React from "react";

function BlogPostFields({ formData, onChange }) {
  return (
    <div>
      <label className="block font-medium mb-1">Blog Markdown</label>
      <textarea
        value={formData.content?.markdown || ""}
        onChange={(e) =>
          onChange("content", { ...formData.content, markdown: e.target.value })
        }
        className="border border-gray-300 rounded-md p-2 w-full h-60"
        placeholder="Write your blog in markdown..."
      />
    </div>
  );
}

export default BlogPostFields;
