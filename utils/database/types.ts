export type videoRowData = {
  id: string
  title: string
  description: string | null
  url: string
  reviewed: boolean | null
  games: {
    name: string
  } | null
  categories: {
    name: string
  } | null
  profiles: {
    avatar_url: string
    username: string | null
    id: string
  } | null
}
