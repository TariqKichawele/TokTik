import { FormLabel } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import React, { ChangeEvent, useRef, useState } from 'react'
import { TbVideo } from 'react-icons/tb';

const VideoForm = ({ onVideoChange }: { onVideoChange: (video: File) => void }) => {
    const { toast } = useToast();
    const [ videoURL, setVideoURL ] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    const onVideoUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const files = (e.target as HTMLInputElement).files;

        const file = files?.[0];
        if (!file) return toast({ title: "Please select a video", variant: "destructive" });

        const fileSize = file.size / 1024 / 1024;
        if (fileSize > 50) return toast({ title: "Video size should be less than 50MB", variant: "destructive" });

        if (videoURL) {
            URL.revokeObjectURL(videoURL);
            setVideoURL(null);
        }

        const url = URL.createObjectURL(file);
        setVideoURL(url);
        onVideoChange(file);

        if (videoRef.current) {
            videoRef.current.load();
        }
    };


  return (
    <>
        <FormLabel>Video</FormLabel>
        <div className="col-span-2 relative min-h-[200px] border border-dashed border-secondary hover:border-primary">
            <label className="cursor-pointer">
                <div className="flex flex-col items-center justify-center h-full">
                    <div className="flex flex-col items-center justify-center">
                        <p className="text-xl font-semibold">Upload Video</p>
                        <span>
                            <TbVideo />
                        </span>
                    </div>
                </div>
                <input
                    type="file"
                    name="upload-video"
                    accept=".mp4"
                    className="w-0 h-0"
                    onChange={onVideoUpload}
                />
            </label>
            {videoURL ? (
                <video
                    ref={videoRef}
                    autoPlay
                    controls={false}
                    muted
                    className="absolute inset-0 w-full h-full pointer-events-none object-cover"
                >
                    <source src={videoURL} />
                </video>
            ) : null}
        </div>
    </>
  )
}

export default VideoForm