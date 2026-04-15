'use client'

import { useState, useRef } from 'react'
import { Upload, FileAudio, X, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface UploadCardProps {
  onUpload: (file: File) => Promise<void>
  disabled?: boolean
}

export function UploadCard({ onUpload, disabled }: UploadCardProps) {
  const [dragActive, setDragActive] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0]
      if (droppedFile.type.startsWith('audio/') || 
          droppedFile.name.endsWith('.mp3') || 
          droppedFile.name.endsWith('.webm') ||
          droppedFile.name.endsWith('.mp4')) {
        setFile(droppedFile)
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) return
    
    setUploading(true)
    try {
      await onUpload(file)
      setFile(null)
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = () => {
    setFile(null)
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  return (
    <Card 
      className={`border-2 border-dashed transition-colors ${
        dragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
      }`}
      onDragEnter={handleDrag}
    >
      <CardContent className="flex flex-col items-center justify-center p-8">
        {file ? (
          <div className="w-full space-y-4">
            <div className="flex items-center gap-3">
              <FileAudio className="h-10 w-10 text-primary" />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{file.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleRemove}
                disabled={uploading}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <Button 
              className="w-full" 
              onClick={handleUpload}
              disabled={uploading || disabled}
            >
              {uploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload & Transcribe
                </>
              )}
            </Button>
          </div>
        ) : (
          <>
            <input
              ref={inputRef}
              type="file"
              accept="audio/*,video/*"
              onChange={handleChange}
              className="hidden"
              id="file-upload"
            />
            
            <label 
              htmlFor="file-upload"
              className="flex flex-col items-center cursor-pointer"
            >
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <p className="mb-1 font-medium">
                Drop your audio file here
              </p>
              <p className="mb-4 text-sm text-muted-foreground">
                or click to browse
              </p>
              <p className="text-xs text-muted-foreground">
                Supports MP3, WebM, MP4 • Max 100MB
              </p>
            </label>
          </>
        )}
      </CardContent>
      
      {/* Hidden drop zone overlay */}
      {dragActive && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-primary/10 rounded-lg"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <p className="font-medium text-primary">Drop file to upload</p>
        </div>
      )}
    </Card>
  )
}
