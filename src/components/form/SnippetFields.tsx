import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { PROGRAMMING_LANGUAGES } from "@/lib/constants/content-types";

type SnippetFieldsProps<T extends Record<string,any>> = {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}

function SnippetFields<T extends Record<string,any>>({ register, errors }: SnippetFieldsProps<T>) {
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h2 className="text-lg font-semibold">Code Snippet</h2>

      <div className="mb-4">
        <label className="block text-sm">Code *</label>
        <textarea
          {...register("codeSnippet.code" as any)}
          rows={8}
          className="w-full px-4 py-2 border rounded-lg font-mono"
        />
        {errors.codeSnippet?.code && (
          <p className="text-red-500 text-sm">
            {errors.codeSnippet.code.message as string}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm">Language *</label>
        <select
          {...register("codeSnippet.language" as any)}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="">Select language</option>
          {PROGRAMMING_LANGUAGES.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
        {errors.codeSnippet?.language && (
          <p className="text-red-500 text-sm">
            {errors.codeSnippet.language.message as string}
          </p>
        )}
      </div>
    </div>
  );
}

export default SnippetFields;
