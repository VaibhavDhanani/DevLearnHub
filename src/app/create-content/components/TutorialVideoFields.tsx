import React from "react";

function TutorialVideoFields({ formData, onChange }) {
  return (
    <div className="space-y-3">
      <div>
        <label className="block font-medium mb-1">Video URL</label>
        <input
          type="url"
          value={formData.videoUrl || ""}
          onChange={(e) => onChange("videoUrl", e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Video Duration (seconds)</label>
        <input
          type="number"
          value={formData.videoDuration || ""}
          onChange={(e) => onChange("videoDuration", e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Episode Number</label>
        <input
          type="number"
          value={formData.episodeNumber || ""}
          onChange={(e) => onChange("episodeNumber", e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full"
        />
      </div>
    </div>
  );
}

export default TutorialVideoFields;
