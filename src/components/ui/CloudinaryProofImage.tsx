import { CloudinaryImage } from "@/components/ui/CloudinaryImage";

type CloudinaryProofImageProps = {
  publicId: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function CloudinaryProofImage({
  publicId,
  alt,
  width,
  height,
  className,
  sizes,
  priority = false,
}: CloudinaryProofImageProps) {
  return (
    <CloudinaryImage
      publicId={publicId}
      alt={alt}
      width={width}
      height={height}
      className={className}
      sizes={sizes}
      priority={priority}
      resizeMode="limit"
      cloudinaryQuality="auto"
    />
  );
}

