import React from "react";

function QuickTipFields({ formData, onChange }) {
  return (
    <div>
      <label className="block font-medium mb-1">Quick Tip Text</label>
      <textarea
        value={formData.content?.text || ""}
        onChange={(e) =>
          onChange("content", { ...formData.content, text: e.target.value })
        }
        className="border border-gray-300 rounded-md p-2 w-full"
        placeholder="Enter your quick tip..."
      />
    </div>
  );
}

export default QuickTipFields;
