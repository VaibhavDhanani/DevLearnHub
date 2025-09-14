import React from 'react';

const WhyShareSection = () => {
  const benefits = [
    {
      icon: '🚀',
      title: 'Reach Developers',
      description: 'Reach millions',
      detail: 'Share your expertise with a global community of passionate developers.',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      icon: '⭐',
      title: 'Build Your Reputation',
      description: 'Build reputation',
      detail: 'Establish yourself as a thought leader and build your professional reputation.',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      icon: '🎯',
      title: 'Make an Impact',
      description: 'Make impact',
      detail: 'Help other developers solve problems and advance their careers through your knowledge.',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    }
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Share on DevLearn Hub?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className={`${benefit.bgColor} rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6`}>
                <span className="text-3xl">{benefit.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {benefit.title}
              </h3>
              <p className={`text-sm font-medium mb-3 ${benefit.iconColor}`}>
                {benefit.description}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {benefit.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyShareSection;