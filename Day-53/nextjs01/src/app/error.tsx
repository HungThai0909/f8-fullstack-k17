"use client";

export default function Error({ error }: { error: Error }) {
  return (
    <div>
      <h1 className="text-3xl text-center">Error: {error.message}</h1>
    </div>
  );
}
