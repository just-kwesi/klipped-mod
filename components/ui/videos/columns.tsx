'use client'

import Link from 'next/link'
import { ColumnDef } from '@tanstack/react-table'

import { videoRowData } from '@/utils/database/types'
import { FileCheckIcon, HourglassIcon } from 'lucide-react'

import { MoreHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DataTableColumnHeader } from './data-table-column-header'
import { cn } from '@/lib/utils'

import { acceptOrRejectVideo } from '@/utils/database/actions'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type VideoType = {
  game: string
  title: string
  category: string
  status: boolean
}

export const columns: ColumnDef<videoRowData>[] = [
  {
    accessorKey: 'game',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Game" />
    ),
    cell: ({ row }) => {
      const gameLabel = row.original.games?.name
      return <div className="flex">{gameLabel}</div>
    },
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      const videoId = row.original.id

      return (
        <Link
          href={`/videos/${videoId}`}
          className={cn('transition-colors hover:text-foreground/80')}
        >
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue('title')}
          </span>
        </Link>
      )
    },
  },
  {
    accessorKey: 'category',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {
      const category = row.original.categories?.name
      return (
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-normal">
          {category}
        </code>
      )
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const state: boolean = row.original.reviewed!

      return (
        <div className="flex w-[100px] items-center">
          {state ? (
            <>
              <FileCheckIcon className="h-4 w-4 mr-2" />
              <p className="text-sm text-green-600 bg-green-100">Reviewed</p>
            </>
          ) : (
            <>
              <HourglassIcon className="h-4 w-4 mr-2 text-destructive bg-destructive-forground" />
              <p className="text-sm text-destructive bg-destructive-forground ">
                In Review
              </p>
            </>
          )}
        </div>
      )
    },
  },

  {
    id: 'actions',
    cell: ({ row }) => {
      const video = row.original
      const handleAccept = async () => {
        const { error } = await acceptOrRejectVideo(true, video.id)
        if (error) {
          toast({
            variant: 'destructive',
            title: 'Something went wrong getting your videos',
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <p className="text-white">Something went wrong</p>
              </pre>
            ),
          })
        } else {
          toast({
            title: 'Video Accepted',
            description: 'Video has been Accepted',
          })
        }
      }
      const handleReject = async () => {
        const { error } = await acceptOrRejectVideo(true, video.id)
        if (error) {
          toast({
            variant: 'destructive',
            title: 'Something went wrong getting your videos',
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <p className="text-white">Something went wrong</p>
              </pre>
            ),
          })
        } else {
          toast({
            title: 'Video Rejected',
            description: 'Video has been rejected',
          })
        }
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Button variant="ghost" onClick={handleAccept}>
                Accept
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button variant="ghost" onClick={handleReject}>
                Reject
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
