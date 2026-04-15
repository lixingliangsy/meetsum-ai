'use client'

import { Meeting } from '@/types'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, MoreHorizontal, Play, Trash2, Eye } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface MeetingCardProps {
  meeting: Meeting
  onView: (meeting: Meeting) => void
  onDelete: (meeting: Meeting) => void
}

const statusColors = {
  pending: 'bg-yellow-500',
  processing: 'bg-blue-500',
  completed: 'bg-green-500',
  failed: 'bg-red-500',
}

const statusLabels = {
  pending: 'Pending',
  processing: 'Processing',
  completed: 'Completed',
  failed: 'Failed',
}

export function MeetingCard({ meeting, onView, onDelete }: MeetingCardProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    return `${minutes} min`
  }

  return (
    <Card className="group hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold leading-none">{meeting.title}</h3>
            {meeting.platform && (
              <p className="text-sm text-muted-foreground capitalize">
                {meeting.platform.replace('_', ' ')}
              </p>
            )}
          </div>
          
          <Badge variant="secondary" className="capitalize">
            <span className={`mr-1.5 h-1.5 w-1.5 rounded-full ${statusColors[meeting.status]}`} />
            {statusLabels[meeting.status]}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {formatDate(meeting.started_at || meeting.created_at)}
          </span>
          {meeting.duration_seconds && (
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {formatDuration(meeting.duration_seconds)}
            </span>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex items-center justify-between pt-2">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => onView(meeting)}
          disabled={meeting.status !== 'completed'}
        >
          {meeting.status === 'completed' ? (
            <>
              <Eye className="mr-1 h-4 w-4" />
              View Summary
            </>
          ) : (
            <>
              <Play className="mr-1 h-4 w-4" />
              Processing...
            </>
          )}
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onView(meeting)}>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onDelete(meeting)}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  )
}
