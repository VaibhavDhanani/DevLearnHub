import { UseFormRegister, FieldErrors } from "react-hook-form";

type BlogFieldsProps<T extends Record<string, any>> = {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
};

function BlogFields<T extends Record<string, any>>({
  register,
  errors,
}: BlogFieldsProps<T>) {
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Blog Details</h2>

      {/* Markdown */}
      <div className="mb-4">
        <label className="block text-sm font-medium">
          Content (Markdown) *
        </label>
        <textarea
          {...register("content.markdown" as any)}
          rows={10}
          className="w-full px-4 py-2 border rounded-lg font-mono"
          placeholder="Write markdown..."
        />
        {errors.content?.markdown && (
          <p className="text-red-500 text-sm">
            {errors.content.markdown.message as string}
          </p>
        )}
      </div>

      {/* Estimated Read Time */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Read Time (min)</label>
        <input
          type="number"
          {...register("estimatedReadTime" as any, { valueAsNumber: true })}
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="5"
        />
      </div>
    </div>
  );
}

export default BlogFields;
