import { UseFormRegister, FieldErrors } from "react-hook-form";

type VideoFieldsProps<T extends Record<string,any>> ={
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}

function VideoFields<T extends Record<string,any>>({ register, errors }: VideoFieldsProps<T>) {
  return (
    <div className="bg-gray-50 p-6 rounded-lg space-y-4">
      <h2 className="text-lg font-semibold">Video Details</h2>

      <div>
        <label className="block text-sm">Video URL *</label>
        <input
          {...register("videoUrl" as any)}
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="https://youtube.com/..."
        />
        {errors.videoUrl && (
          <p className="text-red-500 text-sm">{errors.videoUrl.message as string}</p>
        )}
      </div>

      <div>
        <label className="block text-sm">Duration (seconds) *</label>
        <input
          type="number"
          {...register("videoDuration" as any, { valueAsNumber: true })}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm">Thumbnail URL</label>
        <input
          {...register("thumbnailUrl" as any)}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm">Episode Number</label>
        <input
          type="number"
          {...register("episodeNumber" as any, { valueAsNumber: true })}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>
    </div>
  );
}

export default VideoFields;
