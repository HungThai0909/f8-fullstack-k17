import axios from "axios";
import { Post, PostsResponse } from "@/types/post";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_API,
  headers: { "Content-Type": "application/json" },
});

export const postService = {
  getById: async (id: number): Promise<Post> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API}/posts/${id}`);
    if (!res.ok) throw new Error("Có lỗi khi lấy bài viết");
    return res.json();
  },

  getAll: async (limit = 20, skip = 0): Promise<PostsResponse> => {
    const { data } = await api.get<PostsResponse>(`/posts?limit=${limit}&skip=${skip}`);
    return data;
  },

  create: async (title: string): Promise<Post> => {
    const { data } = await api.post<Post>("/posts/add", {
      title,
      body: "Nội dung bài viết mới.",
      userId: 1,
      tags: [],
      reactions: { likes: 0, dislikes: 0 },
    });
    return data;
  },

  update: async (id: number, title: string): Promise<Post> => {
    const { data } = await api.put<Post>(`/posts/${id}`, { title });
    return data;
  },

  delete: async (id: number): Promise<Post & { isDeleted: boolean }> => {
    const { data } = await api.delete(`/posts/${id}`);
    return data;
  },
};