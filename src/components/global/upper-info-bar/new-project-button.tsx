"use client"
import { Button } from '@/components/ui/button'
import { User } from '@/db/schema';
import { InferSelectModel } from 'drizzle-orm';
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'


type UserType = InferSelectModel<typeof User>;

interface NewProjectButtonProps {
  user: UserType;
}
const NewProjectButton = ({user}:NewProjectButtonProps) => {

    //need to work on
    const router = useRouter()
  return (
    <Button 
    className='rounded-lg font-semibold'
    disabled={!user.subscription}
    onClick={(()=> router.push('/create-page'))}
    >
        <Plus/>
        New Project
    </Button>
  )
}

export default NewProjectButton