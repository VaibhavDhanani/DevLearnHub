import React from 'react'

const StatsSection = () => {
  const stats = [
    { value: '12.5K', label: 'Articles' },
    { value: '43.2K', label: 'Discussions' },
    { value: '87.6K', label: 'Members' }
  ];

  return (
    <div className="bg-purple-600 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-center items-center space-x-12 md:space-x-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center text-white">
              <div className="text-2xl md:text-3xl font-bold">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-purple-200 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StatsSection
