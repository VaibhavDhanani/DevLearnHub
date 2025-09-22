
import { UseFormRegister, FieldErrors } from "react-hook-form";

type TextContentFieldsProps<T extends Record<string,any>> = {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}

function TextContentFields<T extends Record<string,any>>({ register, errors }: TextContentFieldsProps<T>) {
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h2 className="text-lg font-semibold">Content</h2>
      <textarea
        {...register("content.text" as any)}
        rows={6}
        className="w-full px-4 py-2 border rounded-lg"
        placeholder="Write your content..."
      />
      {errors.content?.text && (
        <p className="text-red-500 text-sm">
          {errors.content.text.message as string}
        </p>
      )}
    </div>
  );
}

export default TextContentFields;
