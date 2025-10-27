import Link from "next/link";

const ContentTypeSelector = () => {
  const contentTypes = [
    {
      icon: "💡",
      title: "Quick Tip",
      description: "Share a quick development tip to help developers.",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      iconBg: "bg-yellow-100",
    },
    {
      icon: "📊",
      title: "Code Snippet",
      description: "Share useful code snippets with brief explanations.",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      iconBg: "bg-blue-100",
    },
    {
      icon: "🎥",
      title: "Tutorial Video",
      description:
        "Create engaging video content to teach concepts step-by-step.",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      iconBg: "bg-red-100",
    },
    {
      icon: "📝",
      title: "Blog Post",
      description:
        "Write detailed articles with code examples and explanations.",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      iconBg: "bg-green-100",
    },
    {
      icon: "📁",
      title: "Project Showcase",
      description: "Showcase your projects and share implementation details.",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
      iconBg: "bg-indigo-100",
    },
    {
      icon: "🔧",
      title: "Tech Update",
      description: "Share the latest updates and news in technology.",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      iconBg: "bg-purple-100",
    },
    {
      icon: "❓",
      title: "Question",
      description: "Ask questions and seek help from the developer community.",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
      iconBg: "bg-gray-100",
    },
    {
      icon: "💬",
      title: "Discussion",
      description: "Start meaningful discussions about development topics.",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200",
      iconBg: "bg-pink-100",
    },
  ];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Choose Your Content Type
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select the type of content you want to share with the developer
            community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {contentTypes.map((type, index) => (
            <div
              key={index}
              className={`${type.bgColor} ${type.borderColor} border rounded-lg p-6 cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-105`}
            >
              <div className="flex items-start space-x-4">
                <div className={`${type.iconBg} rounded-lg p-3 text-2xl`}>
                  {type.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {type.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {type.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentTypeSelector;
