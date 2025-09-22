import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { DIFFICULTY_LEVELS } from "@/lib/constants/content-types";

type BasicDetailsProps<T extends Record<string, any>> = {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
};

function BasicDetails<T extends Record<string, any>>({
  register,
  errors,
}: BasicDetailsProps<T>) {
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Basic Information</h2>

      {/* Title */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Title *</label>
        <input
          {...register("title" as any)}
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="Enter title..."
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message as string}</p>
        )}
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Description *</label>
        <textarea
          {...register("description" as any)}
          rows={3}
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="Enter description..."
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message as string}</p>
        )}
      </div>

      {/* Difficulty */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Difficulty *</label>
        <select
          {...register("difficultyLevel" as any)}
          className="w-full px-4 py-2 border rounded-lg"
        >
          {DIFFICULTY_LEVELS.map((lvl) => (
            <option key={lvl.value} value={lvl.value}>
              {lvl.label}
            </option>
          ))}
        </select>
        {errors.difficultyLevel && (
          <p className="text-red-500 text-sm">
            {errors.difficultyLevel.message as string}
          </p>
        )}
      </div>

      {/* Publish */}
      <div>
        <label className="flex items-center space-x-2">
          <input type="checkbox" {...register("isPublished" as any)} />
          <span>Publish immediately</span>
        </label>
      </div>
    </div>
  );
}

export default BasicDetails;
