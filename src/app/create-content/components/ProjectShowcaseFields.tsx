import React from "react";

function ProjectShowcaseFields({ formData, onChange }) {
  return (
    <div className="space-y-3">
      <div>
        <label className="block font-medium mb-1">Video URL</label>
        <input
          type="url"
          value={formData.videoUrl || ""}
          onChange={(e) => onChange("videoUrl", e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full"
          placeholder="https://example.com/video"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Video Duration (seconds)</label>
        <input
          type="number"
          value={formData.videoDuration || ""}
          onChange={(e) => onChange("videoDuration", Number(e.target.value))}
          className="border border-gray-300 rounded-md p-2 w-full"
          placeholder="Enter duration in seconds"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Thumbnail URL</label>
        <input
          type="url"
          value={formData.thumbnailUrl || ""}
          onChange={(e) => onChange("thumbnailUrl", e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full"
          placeholder="https://example.com/thumbnail"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Source Code URL</label>
        <input
          type="url"
          value={formData.sourceCodeUrl || ""}
          onChange={(e) => onChange("sourceCodeUrl", e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full"
          placeholder="https://github.com/your-project"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Demo URL (optional)</label>
        <input
          type="url"
          value={formData.demoUrl || ""}
          onChange={(e) => onChange("demoUrl", e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full"
          placeholder="https://your-live-demo.com"
        />
      </div>
    </div>
  );
}

export default ProjectShowcaseFields;
