"use client";

import Image from "next/image";
import { useState } from "react";

interface LoadingImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fallbackIcon?: string;
}

export function LoadingImage({
  src,
  alt,
  fill,
  className,
  sizes,
  priority,
  fallbackIcon = "🍽️",
}: LoadingImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-orange-50 text-3xl">
        {fallbackIcon}
      </div>
    );
  }

  return (
    <>
      {!loaded && <div className="absolute inset-0 img-skeleton" />}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        className={`${className} ${loaded ? "img-loaded" : "opacity-0"}`}
        sizes={sizes}
        priority={priority}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
    </>
  );
}
