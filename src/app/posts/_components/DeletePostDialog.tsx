"use client";

import { useState } from "react";
import { postService } from "../../services/postService";
import { Post } from "../../type/post";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Trash2, Loader2 } from "lucide-react";

type Props = { post: Post; onDeleted: (id: number) => void };

export default function DeletePostDialog({ post, onDeleted }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setLoading(true);
    setError("");
    try {
      await postService.delete(post.id);
      onDeleted(post.id);
      setOpen(false);
    } catch {
      setError("Có lỗi khi xoá. Vui lòng thử lại.");
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1 text-sm px-3 py-1.5 rounded-md text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
      >
        <Trash2 className="h-3.5 w-3.5" />
        Xoá
      </button>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xoá bài viết</AlertDialogTitle>
            <AlertDialogDescription>
              Có chắc chắn muốn xoá không?
              <span className="font-medium text-gray-900">
                &ldquo;{post.title}&rdquo;
              </span>{" "}
              sẽ bị xoá vĩnh viễn và không thể khôi phục.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {error && <p className="text-sm text-red-500 px-1">{error}</p>}
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer" disabled={loading}>
              Huỷ
            </AlertDialogCancel>
            <AlertDialogAction
              className="cursor-pointer"
              onClick={handleDelete}
              disabled={loading}
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin mr-1" />}Xác
              nhận xoá
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
