"use client";

import { useState } from "react";
import { postService } from "../../services/postService";
import { Post } from "../../type/post";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Loader2 } from "lucide-react";

export default function CreatePostDialog({ onCreated }: { onCreated: (post: Post) => void }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!title.trim()) return;
    setLoading(true); setError("");
    try {
      const post = await postService.create(title.trim());
      onCreated(post); setOpen(false); setTitle("");
    } catch { setError("Có lỗi khi thêm bài viết. Vui lòng thử lại."); }
    finally { setLoading(false); }
  };

  const handleOpenChange = (val: boolean) => {
    if (!val) { setTitle(""); setError(""); }
    setOpen(val);
  };

  return (
    <>
      <Button className="cursor-pointer" onClick={() => setOpen(true)}><Plus className="h-4 w-4" />Thêm bài viết</Button>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader><DialogTitle>Thêm bài viết mới</DialogTitle></DialogHeader>
          <div className="py-2 flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Tiêu đề bài viết</label>
            <Input placeholder="Nhập tiêu đề..." value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()} autoFocus />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
          <DialogFooter>
            <Button className="cursor-pointer" variant="outline" onClick={() => handleOpenChange(false)} disabled={loading}>Huỷ</Button>
            <Button className="cursor-pointer" onClick={handleSubmit} disabled={loading || !title.trim()}>
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}Thêm mới
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}