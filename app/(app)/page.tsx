import VideoList from "@/components/VideoList";
import { getVideos } from "@/services/video";

export const revalidate = 0;

export default async function Home() {
  const videos = await getVideos();
  return (
    <VideoList videos={videos} />
  );
}
