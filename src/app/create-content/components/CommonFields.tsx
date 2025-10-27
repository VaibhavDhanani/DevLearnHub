import React from "react";

function CommonFields({ formData, onChange }) {
  return (
    <>
      <div>
        <label className="block font-medium mb-1">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => onChange("title", e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full"
          placeholder="Enter title"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => onChange("description", e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full"
          placeholder="Enter description"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Difficulty Level</label>
        <select
          value={formData.difficultyLevel}
          onChange={(e) => onChange("difficultyLevel", e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full"
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>
    </>
  );
}

export default CommonFields;
