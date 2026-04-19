"use client";

import { useEffect, useState } from "react";
import { postService } from "../../services/postService";
import { Post } from "../../type/post";
import PostCard from "../../posts/_components/PostCard";
import CreatePostDialog from "../_components/CreatePostDialog";
import { Loader2 } from "lucide-react";

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => { fetchPosts(); }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true); setError("");
      const data = await postService.getAll(20, 0);
      setPosts(data.posts); setTotal(data.total);
    } catch { setError("Có lỗi khi lấy danh sách bài viết"); }
    finally { setLoading(false); }
  };

  const handleCreated = (post: Post) => {
    setPosts((prev) => [post, ...prev]);
    setTotal((prev) => prev + 1);
  };
  const handleUpdated = (updated: Post) => {
    setPosts((prev) => prev.map((p) => p.id === updated.id ? { ...p, title: updated.title } : p));
  };
  const handleDeleted = (id: number) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
    setTotal((prev) => prev - 1);
  };

  if (loading) return <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-gray-400" />Loading...</div>;
  if (error) return <p className="text-red-500 text-center py-8">{error}</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-500">{total} bài viết</p>
        <CreatePostDialog onCreated={handleCreated} />
      </div>
      <div className="flex flex-col gap-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} onUpdated={handleUpdated} onDeleted={handleDeleted} />
        ))}
      </div>
    </div>
  );
}