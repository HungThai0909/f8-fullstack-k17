import Link from "next/link";
import { ArrowLeft, Heart, Eye, ThumbsDown } from "lucide-react";
import { postService } from "../../services/postService";

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await postService.getById(+id);

  return (
    <div>
      <Link
        href="/posts"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Quay lại danh sách
      </Link>
      <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="font-mono text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded border border-gray-200">
            POST #{post.id}
          </span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
        <h1 className="text-3xl font-semibold text-gray-900 capitalize mb-4">
          {post.title}
        </h1>
        <hr className="mb-5 border-gray-100" />
        <p className="text-gray-600 leading-relaxed mb-8">{post.body}</p>
        <div className="flex items-center gap-6 text-sm text-gray-400 border-t border-gray-100 pt-5">
          <span className="flex items-center gap-1.5">
            <Eye className="h-4 w-4" />
            {post.views.toLocaleString()} lượt xem
          </span>
          <span className="flex items-center gap-1.5">
            <Heart className="h-4 w-4 text-rose-400" />
            {post.reactions.likes} thích
          </span>
          <span className="flex items-center gap-1.5">
            <ThumbsDown className="h-4 w-4" />
            {post.reactions.dislikes} không thích
          </span>
        </div>
      </div>
    </div>
  );
}
