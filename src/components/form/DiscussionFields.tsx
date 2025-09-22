import { UseFormRegister, FieldErrors } from "react-hook-form";
import TextContentFields from "./TextContentFields";

type DiscussionFieldsProps<T extends Record<string,any>> = {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}

function DiscussionFields<T extends Record<string,any>>({ register, errors }: DiscussionFieldsProps<T>) {
  return (
    <div className="space-y-6">
      <TextContentFields register={register} errors={errors} />

      <div className="bg-gray-50 p-6 rounded-lg">
        <label className="block text-sm font-medium">Related Question ID</label>
        <input
          {...register("relatedQuestionId" as any)}
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="Optional ID"
        />
      </div>
    </div>
  );
}

export default DiscussionFields;
