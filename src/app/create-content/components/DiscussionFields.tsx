import React from "react";

function DiscussionFields({ formData, onChange }) {
  return (
    <div className="space-y-3">
      <div>
        <label className="block font-medium mb-1">Discussion Text</label>
        <textarea
          value={formData.content?.text || ""}
          onChange={(e) =>
            onChange("content", { ...formData.content, text: e.target.value })
          }
          className="border border-gray-300 rounded-md p-2 w-full"
          placeholder="Write your discussion message..."
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Related Question ID</label>
        <input
          type="text"
          value={formData.relatedQuestionId || ""}
          onChange={(e) => onChange("relatedQuestionId", e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full"
          placeholder="Enter the ID of the related question"
        />
      </div>
    </div>
  );
}

export default DiscussionFields;
