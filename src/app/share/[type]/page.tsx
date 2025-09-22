import ContentForm from "@/components/shared/ContentForm";

const SharePage = async ({ params }: { params: Promise<{ type: string }> }) => {
  const { type } = await params;

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">
        Share: {type.replace("-", " ")}
      </h1>
      <ContentForm type={type} />
    </div>
  );
};

export default SharePage;
