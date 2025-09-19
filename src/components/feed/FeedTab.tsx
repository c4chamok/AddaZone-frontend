import React, { useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import { setFeedFilters } from '@/lib/slices/uiSlice'
// import { setFeedPosts, addFeedPost } from '@/lib/slices/chatSlice'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Rss, Search, Filter, Heart, MessageCircle, Share, ChevronDown } from 'lucide-react'
import type { FeedPost } from '@/lib/slices/chatSlice'

export const FeedTab = () => {
  const dispatch = useAppDispatch()
  const { feedFilters } = useAppSelector(state => state.ui)
  const { feedPosts } = useAppSelector(state => state.chat)
  const [searchQuery, setSearchQuery] = useState('')
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  // Mock feed data
  React.useEffect(() => {
    if (feedPosts.length === 0) {
      // const mockPosts = [
      //   {
      //     id: '1',
      //     authorId: '1',
      //     authorName: 'Alice Wonder',
      //     authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
      //     content: 'Just finished an amazing project! The team collaboration was incredible. 🚀',
      //     likes: ['2', '3'],
      //     comments: [
      //       { id: '1', authorId: '2', content: 'Congratulations! 🎉', timestamp: new Date() }
      //     ],
      //     timestamp: new Date(),
      //     category: 'Work'
      //   },
      //   {
      //     id: '2',
      //     authorId: '2',
      //     authorName: 'Bob Builder',
      //     authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
      //     content: 'Beautiful sunset today! Nature never fails to amaze me.',
      //     media: [{ type: 'image' as const, url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500' }],
      //     likes: ['1', '3', '4'],
      //     comments: [],
      //     timestamp: new Date(Date.now() - 3600000),
      //     category: 'Nature'
      //   }
      // ]
      // dispatch(setFeedPosts(mockPosts))
    }
  }, [feedPosts.length])

  const categories = ['All', 'Work', 'Nature', 'Technology', 'Gaming', 'Music', 'Sports']
  const sortOptions = ['Recent', 'Popular', 'Most Liked', 'Most Commented']

  const filteredPosts = feedPosts.filter(post => {
    const matchesSearch = post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.authorName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = feedFilters.category === 'all' ||
      post.category.toLowerCase() === feedFilters.category.toLowerCase()
    return matchesSearch && matchesCategory
  })

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 border-b space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold flex items-center">
            <Rss className="h-5 w-5 mr-2" />
            Feed
          </h2>
        </div>

        {/* Search */}
        <div className="flex space-x-2">
          <Input
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button variant="outline">
            <Search className="h-4 w-4" />
          </Button>
        </div>

        {/* Collapsible Filters */}
        <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              <span className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 mt-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <Badge
                    key={category}
                    variant={feedFilters.category === category.toLowerCase() ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => dispatch(setFeedFilters({ category: category.toLowerCase() }))}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Sort By</label>
              <div className="flex flex-wrap gap-2">
                {sortOptions.map(option => (
                  <Badge
                    key={option}
                    variant={feedFilters.sortBy === option.toLowerCase().replace(' ', '_') ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => dispatch(setFeedFilters({ sortBy: option.toLowerCase().replace(' ', '_') }))}
                  >
                    {option}
                  </Badge>
                ))}
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Feed Posts */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {filteredPosts.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            <Rss className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No posts found. Try adjusting your filters.</p>
          </div>
        ) : (
          filteredPosts.map(post => (
            <FeedPost key={post.id} post={post} />
          ))
        )}
      </div>
    </div>
  )
}

const FeedPost = ({ post }: {
  post: FeedPost

  
}) => {
  const [liked, setLiked] = useState(false)

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={post.authorAvatar} />
              <AvatarFallback>{post.authorName.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{post.authorName}</div>
              <div className="text-sm text-muted-foreground">
                {post.timestamp.toLocaleDateString()} • {post.category}
              </div>
            </div>
          </div>
          <Badge variant="outline">{post.category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>{post.content}</p>

        {post.media && post.media.length > 0 && (
          <div className="space-y-2">
            {post.media.map((item, index: number) => (
              <img
                key={index}
                src={item.url}
                alt="Post media"
                className="w-full rounded-lg max-h-96 object-cover"
              />
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLiked(!liked)}
              className={liked ? 'text-red-500' : ''}
            >
              <Heart className={`h-4 w-4 mr-1 ${liked ? 'fill-current' : ''}`} />
              {post.likes.length + (liked ? 1 : 0)}
            </Button>
            <Button variant="ghost" size="sm">
              <MessageCircle className="h-4 w-4 mr-1" />
              {post.comments.length}
            </Button>
          </div>
          <Button variant="ghost" size="sm">
            <Share className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}