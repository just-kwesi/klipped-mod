import dynamic from 'next/dynamic'
import { toast } from '@/components/ui/use-toast'
import { VideoDetails } from '@/components/ui/videos/video-details'
import { getVideo } from '@/utils/database/actions'
import { videoRowData } from '@/utils/database/types'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const VideoPlayerNoSSR = dynamic(
  () => import('@/components/ui/video-player/video-player'),
  {
    ssr: false,
  }
)

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const id = params.id
  // console.log(searchParams)
  const { success: data, error } = await getVideo(id)

  const success = data as unknown as videoRowData[]

  if (error) {
    toast({
      variant: 'destructive',
      title: 'Uh oh! Something went wrong.',
      description: 'There was a problem with your request.',
    })
  }

  return (
    <main className="mx-5">
      <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
        <Button asChild variant="link">
          <Link href="/">Home</Link>
        </Button>
      </div>

      {success && (
        <div>
          <div className="w-full h-100svh">
            <VideoPlayerNoSSR url={success[0].url} />
          </div>
          <VideoDetails
            title={success[0].title}
            description={success[0].description as string}
            category={success[0].categories!.name}
            avatar_url={
              (success[0].profiles!.avatar_url as string) ||
              `https://ui-avatars.com/api/?name=${
                success[0].profiles!.username
              }&background=random`
            }
            username={success[0].profiles!.username as string}
          />
        </div>
      )}
    </main>
  )
}
