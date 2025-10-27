import React from "react";

function CodeSnippetFields({ formData, onChange }) {
  return (
    <div className="space-y-3">
      <div>
        <label className="block font-medium mb-1">Code</label>
        <textarea
          value={formData.codeSnippet?.code || ""}
          onChange={(e) =>
            onChange("codeSnippet", {
              ...formData.codeSnippet,
              code: e.target.value,
            })
          }
          className="border border-gray-300 rounded-md p-2 w-full"
          placeholder="Paste your code here..."
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Language</label>
        <input
          type="text"
          value={formData.codeSnippet?.language || ""}
          onChange={(e) =>
            onChange("codeSnippet", {
              ...formData.codeSnippet,
              language: e.target.value,
            })
          }
          className="border border-gray-300 rounded-md p-2 w-full"
          placeholder="e.g. JavaScript, Python"
        />
      </div>
    </div>
  );
}

export default CodeSnippetFields;
