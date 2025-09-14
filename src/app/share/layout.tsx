import ShareHeader from '@/components/general/ShareHeader'
import StatsSection from '@/components/general/StatsSection'
import React from 'react'

const ShareLayout = ({children} : Readonly<{children: React.ReactNode}>) => {
  return (
    <div>
      <div>
        <ShareHeader />
        <StatsSection />
      </div>
      {children}
    </div>
  )
}

export default ShareLayout
