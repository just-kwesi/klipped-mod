'use server'
import { redirect } from 'next/navigation'
import { createClient } from '../supabase/server'
import { revalidatePath } from 'next/cache'
import { Database, Tables, Enums } from '@/utils/database/supabase.types'
import {
  QueryResult,
  QueryData,
  QueryError,
  AuthError,
} from '@supabase/supabase-js'

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

// * GET VIDEOS
export async function getUnreviewedVideos() {
  try {
    const supabase = createClient()
    const user = (await supabase.auth.getUser()).data.user
    if (!user) {
      redirect('/login')
    }
    const userId = user.id
    console.log(userId)

    let videosWithDataQuery = supabase
      .from('videos')
      .select(
        `
    id, title, description ,url,reviewed,approved,
    games (
      name
    ), 
    categories (
      name
    ),
    profiles (
      username,
      id
    )
  `
      )
      .eq('reviewed', false)

    type videosWithData = QueryData<typeof videosWithDataQuery>

    const { data, error } = await videosWithDataQuery
    // console.log(data)
    if (error) throw error
    const videoData: videosWithData = data
    return { success: videoData }
  } catch (error) {
    return { error }
  }
}

export async function acceptOrRejectVideo(action: boolean, id: string) {
  try {
    const supabase = createClient()
    const user = (await supabase.auth.getUser()).data.user
    if (!user) {
      redirect('/login')
    }
    const userId = user.id

    const { error, data } = await supabase
      .from('videos')
      .update({ reviewed: true, approved: action })
      .eq('id', id)
      .select()

    if (error) throw error
    return { success: true }
  } catch (error) {
    return { error }
  }
}

// * Get video with the videoId

export async function getVideo(id: string) {
  try {
    const supabase = createClient()
    const videoQuery = supabase
      .from('videos')
      .select(
        `
    id, title, description ,url, 
    categories (
      name
    ),
    profiles (
      username,
      id,
      avatar_url
    )
  `
      )
      .eq('id', id)
      .limit(1)
    type videoType = QueryData<typeof videoQuery>
    const { data, error } = await videoQuery
    // console.log(data)
    if (error) throw error
    const video: videoType = data
    return { success: video }
  } catch (error) {
    return {
      error: error,
    }
  }
}
