"use client";

import Image from "next/image";
import { useState } from "react";
type Props = {
  title: string;
  thumbnail: string;
  images: string[];
};

export default function ProductImage({ product }: { product: Props }) {
  const [selectedImage, setSelectedImage] = useState(product.thumbnail);
  return (
    <>
      <Image alt={product.title} src={selectedImage} width={300} height={300} />
      <div className="flex gap-2">
        {product.images.map((image, index) => (
          <Image
            onClick={() => setSelectedImage(image)}
            key={index}
            alt={product.title}
            src={image}
            width={100}
            height={100}
          />
        ))}
      </div>
    </>
  );
}
