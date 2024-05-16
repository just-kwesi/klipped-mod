import { redirect } from 'next/navigation'
import { getUnreviewedVideos } from '@/utils/database/actions'
import AuthButton from '../components/AuthButton'
import { createClient } from '@/utils/supabase/server'

import { DataTable } from '@/components/ui/videos/data-table'
import { columns } from '@/components/ui/videos/columns'
import { toast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { videoRowData } from '@/utils/database/types'

export default async function Index() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  const { error, success } = await getUnreviewedVideos()

  if (error) {
    toast({
      variant: 'destructive',
      title: 'Something went wrong getting your videos',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <p className="text-white">Return to the home page</p>
          <Button asChild variant="outline">
            <Link href="/">Home</Link>
          </Button>
        </pre>
      ),
    })
  }
  const data = success as unknown as videoRowData[]

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <AuthButton />
        </div>
      </nav>
      {success && <DataTable columns={columns} data={data} />}
    </div>
  )
}
