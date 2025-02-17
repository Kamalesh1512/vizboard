import React from 'react'

interface LayoutProps{
    children:React.ReactNode
}

const layout = ({children}:LayoutProps) => {
  return (
    <div className='h-full w-full overflow-x-hidden'>
        {children}
    </div>
  )
}

export default layout