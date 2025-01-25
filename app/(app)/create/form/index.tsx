'use client'

import React, { useState } from 'react'
import { formSchema, FormSchema } from './schema'
import { hashtags } from '@/constants/hashtags'
import { 
    Form as FormComp, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import useAuth from '@/stores/auth'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@/components/ui/select'
import VideoForm from './videoForm'
import { createVideo } from '@/services/video'

const Form = () => {
    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            hashtag: hashtags[0].hashtag
        }
    });

    const router = useRouter();
    const { toast } = useToast();
    const isLoggedIn = useAuth((state) => state.isLoggedIn);
    
    const [ isLoading, setIsLoading ] = useState(false);
    const [ video, setVideo ] = useState<File | null>(null);

    const onSubmit = async (data: FormSchema) => {
        if (!video) return toast({ title: "Please select a video", variant: "destructive" });
        if (!isLoggedIn) return toast({ title: "Please log in to create a post", variant: "destructive" });
        
        setIsLoading(true);

        const videoDoc = await createVideo({ ...data, video: video });
        if (!videoDoc) return toast({ title: "Something went wrong, please try again", variant: "destructive" });
        
        toast({ title: "Successfully created post", variant: "default" });
        router.push(`/video/${videoDoc._id}`);
        setIsLoading(false);
    }
    
  return (
    <FormComp {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col md:grid md:grid-cols-2 gap-3 w-full max-w-[750px] mx-auto"
      >
        <VideoForm onVideoChange={setVideo} />
        <FormField
          name="caption"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Caption</FormLabel>
              <FormControl>
                <Input placeholder="The caption for the video..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="hashtag"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hashtag</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {hashtags.map((hashtag) => (
                    <SelectItem key={hashtag.hashtag} value={hashtag.hashtag}>
                      <div className="flex items-center gap-1">
                        {hashtag.icon}
                        {hashtag.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="col-span-2">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    className="resize-none"
                    placeholder="Give some more info about the video..."
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="col-span-2">
          <Button type="submit" disabled={isLoading}>
            Submit
          </Button>
        </div>
      </form>
    </FormComp>
  )
}

export default Form