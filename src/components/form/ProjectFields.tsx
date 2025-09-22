import { UseFormRegister, FieldErrors } from "react-hook-form";

type ProjectFieldsProps<T extends Record<string,any>> =  {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}

function ProjectFields<T extends Record<string,any>>({ register, errors }: ProjectFieldsProps<T>) {
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h2 className="text-lg font-semibold">Project Showcase</h2>

      <div>
        <label className="block text-sm">Source Code URL *</label>
        <input
          {...register("sourceCodeUrl" as any)}
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="https://github.com/..."
        />
        {errors.sourceCodeUrl && (
          <p className="text-red-500 text-sm">{errors.sourceCodeUrl.message as string}</p>
        )}
      </div>

      <div className="mt-4">
        <label className="block text-sm">Demo URL</label>
        <input
          {...register("demoUrl" as any)}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>
    </div>
  );
}

export default ProjectFields;
