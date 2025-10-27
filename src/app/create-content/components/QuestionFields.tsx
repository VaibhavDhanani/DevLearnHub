import React from "react";

function QuestionFields({
  formData,
  onChange,
}: {
  formData: object;
  onChange: (key: string, value: object) => void;
}) {
  return (
    <div className="space-y-3">
      <div>
        <label className="block font-medium mb-1">Question Text</label>
        <textarea
          value={formData.content?.text || ""}
          onChange={(e) =>
            onChange("content", { ...formData.content, text: e.target.value })
          }
          className="border border-gray-300 rounded-md p-2 w-full"
          placeholder="Write your question..."
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Tags (comma-separated)</label>
        <input
          type="text"
          value={formData.tags.join(", ")}
          onChange={(e) =>
            onChange(
              "tags",
              e.target.value.split(",").map((t) => t.trim())
            )
          }
          className="border border-gray-300 rounded-md p-2 w-full"
          placeholder="e.g. react, javascript, backend"
        />
      </div>
    </div>
  );
}

export default QuestionFields;
