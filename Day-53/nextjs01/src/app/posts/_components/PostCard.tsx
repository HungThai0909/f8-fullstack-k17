"use client";

import Link from "next/link";
import { Post } from "../../type/post";
import EditPostDialog from "../_components/EditPostDialog";
import DeletePostDialog from "../_components/DeletePostDialog";
import { Eye, Heart } from "lucide-react";

type Props = { post: Post; onUpdated: (post: Post) => void; onDeleted: (id: number) => void };

export default function PostCard({ post, onUpdated, onDeleted }: Props) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 flex items-start gap-4 hover:border-gray-300 hover:shadow-sm transition-all duration-150">
      <span className="text-2xl font-light text-gray-200 w-8 text-right shrink-0 pt-0.5 tabular-nums">
        {post.id}
      </span>
      <div className="flex-1 min-w-0">
        <h2 className="font-medium text-gray-900 leading-snug capitalize mb-2">{post.title}</h2>
        <div className="flex flex-wrap items-center gap-3">
          {post.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">#{tag}</span>
          ))}
          <span className="text-xs text-gray-400 flex items-center gap-1"><Eye className="h-3 w-3" />{post.views.toLocaleString()}</span>
          <span className="text-xs text-gray-400 flex items-center gap-1"><Heart className="h-3 w-3" />{post.reactions.likes}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <Link href={`/posts/${post.id}`} className="inline-flex items-center gap-1 text-sm px-3 py-1.5 rounded-md text-gray-600 hover:bg-gray-100 transition-colors">
          <Eye className="h-3.5 w-3.5" />Chi tiết
        </Link>
        <EditPostDialog post={post} onUpdated={onUpdated} />
        <DeletePostDialog post={post} onDeleted={onDeleted} />
      </div>
    </div>
  );
}