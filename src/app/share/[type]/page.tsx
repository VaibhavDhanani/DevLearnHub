import { Form } from "@/components/ui/form";

const SharePage = async ({ params }: { params: Promise<{ type: string }> }) => {
  const { type } = await params;

  const renderForm = () => {
    switch (type) {
      case "quick-tip":
        return <Form />;
      case "code-snippet":
        return <hr />;
      case "blog-post":
        return <hr />;
      case "tutorial-video":
        return <hr />;
      default:
        return <p className="text-red-500">Invalid content type</p>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">
        Share: {type.replace("-", " ")}
      </h1>
      {renderForm()}
    </div>
  );
};

export default SharePage;
