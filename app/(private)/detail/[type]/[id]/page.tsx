import { DetailPage } from "@/features/detail/components";

interface DetailPageProps {
  params: Promise<{
    type: string;
    id: string;
  }>;
}

const Detail = async ({ params }: DetailPageProps) => {
  const { type, id } = await params;

  const mediaType = type === "movie" ? "movie" : "tv";

  const contentId = parseInt(id, 10);

  return <DetailPage id={contentId} mediaType={mediaType} />;
};

export default Detail;
