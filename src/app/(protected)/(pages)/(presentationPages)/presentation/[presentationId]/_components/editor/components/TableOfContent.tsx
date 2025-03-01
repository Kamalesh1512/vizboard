'use client'
import { cn } from '@/lib/utils'
import { useSlideStore } from '@/store/useSlideStore'
import React from 'react'

interface TableOfContentProps{
    items: string[]
    onItemClick: (id:string) => void
    className?: string
}

const TableOfContent = ({items,onItemClick,className}:TableOfContentProps) => {

    const {currentTheme} =useSlideStore()

  return (
    <nav className={cn('space-y-2',className)}
    style={{color:currentTheme.fontColor}}>
        {items.map((item,index) =>(
            <div 
            key={index}
            className={cn('cursor-pointer hover:underline')}>
                {item}
            </div>
        ))}
    </nav>
  )
}

export default TableOfContent