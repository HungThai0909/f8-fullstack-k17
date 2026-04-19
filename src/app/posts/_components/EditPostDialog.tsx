"use client";

import { useState } from "react";
import { postService } from "../../services/postService";
import { Post } from "../../type/post";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Loader2 } from "lucide-react";

type Props = { post: Post; onUpdated: (post: Post) => void };

export default function EditPostDialog({ post, onUpdated }: Props) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleOpen = () => {
    setTitle(post.title); // ← luôn load tiêu đề hiện tại
    setError(""); setOpen(true);
  };

  const handleSubmit = async () => {
    if (!title.trim()) return;
    setLoading(true); setError("");
    try {
      const updated = await postService.update(post.id, title.trim());
      onUpdated(updated); setOpen(false);
    } catch { setError("Có lỗi khi cập nhật bài viết. Vui lòng thử lại."); }
    finally { setLoading(false); }
  };

  return (
    <>
      <button onClick={handleOpen} className="inline-flex items-center gap-1 text-sm px-3 py-1.5 rounded-md text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer">
        <Pencil className="h-3.5 w-3.5" />Sửa
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Chỉnh sửa bài viết</DialogTitle></DialogHeader>
          <div className="py-2 flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Tiêu đề bài viết</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()} autoFocus />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
          <DialogFooter>
            <Button className="cursor-pointer" variant="outline" onClick={() => setOpen(false)} disabled={loading}>Huỷ</Button>
            <Button className="cursor-pointer" onClick={handleSubmit} disabled={loading || !title.trim()}>
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}Lưu thay đổi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}