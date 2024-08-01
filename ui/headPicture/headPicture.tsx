import React from "react";

interface HeadPictureProps {
  imageUrl: string;
  title?: string;
}
export default function HeadPicture({ imageUrl, title }: HeadPictureProps) {
  return (
    <div
      className="headPictureContainer"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <h1 className="faqTitle">{title}</h1>
    </div>
  );
}
