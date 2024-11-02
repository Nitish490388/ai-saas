import Image from 'next/image'
import React from 'react'

interface EmptyProps {
    label: string
}

const Empty = ({
  label
}: EmptyProps) => {
  return (
    <div className='h-full p-20 flex flex-col item-center justify-center'>
        <div className='relative h-72 w-72'>
            {/* <Image
                alt="empty"
                fill
                src="/logo.png"
            /> */}
        </div>
        <p className='text-muted-foreground text-sm text-center'>
            {label}</p>
    </div>
  )
}

export default Empty