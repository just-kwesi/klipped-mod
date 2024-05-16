'use server'
import { redirect } from 'next/navigation'
import { createClient } from '../supabase/server'
import { revalidatePath } from 'next/cache'

export const signIn = async (formData: FormData) => {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const supabase = createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return {
      error: true,
    }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}
