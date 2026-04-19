"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function SearchInput() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    router.push(`?q=${e.target.value}`);
  };
  return (
    <div>
      <input
        type="search"
        className="px-3 py-1 w-full outline-0 border border-[#ddd]"
        placeholder="Search..."
        defaultValue={searchParams.get("q") ?? ""}
        onChange={handleChangeValue}
      />
    </div>
  );
}
