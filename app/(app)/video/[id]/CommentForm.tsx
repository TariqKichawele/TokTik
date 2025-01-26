'use client'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
  } from "@/components/ui/form";
import { Button } from '@/components/ui/button'
import { createComment } from '@/services/comment'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input } from "@/components/ui/input";

const formSchema = z.object({
    text: z.string().min(1),
})
type FormSchema = z.infer<typeof formSchema>

const CommentForm = ({ videoId }: { videoId: string }) => {
    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
    });

    const [ isLoading, setIsLoading ] = useState(false);

    const onSubmit = async (data: FormSchema) => {
        setIsLoading(true);

        await createComment({ text: data.text, videoId });
        location.reload();

        setIsLoading(false);
    }
  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center justify-between gap-3">
            <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                    <FormItem className="grow">
                        <FormControl>
                            <Input
                                placeholder="Write a comment about the video..."
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <Button type="submit" disabled={isLoading}>
                Comment
            </Button>
        </form>
    </Form>
  )
}

export default CommentForm