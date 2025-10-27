import React from "react";

function TechUpdateFields({ formData, onChange }) {
  return (
    <div>
      <label className="block font-medium mb-1">Tech Update Text</label>
      <textarea
        value={formData.content?.text || ""}
        onChange={(e) =>
          onChange("content", { ...formData.content, text: e.target.value })
        }
        className="border border-gray-300 rounded-md p-2 w-full"
        placeholder="Enter a concise update about new technology or trends..."
      />
    </div>
  );
}

export default TechUpdateFields;
