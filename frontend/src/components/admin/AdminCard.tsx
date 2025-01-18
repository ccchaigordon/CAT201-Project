import React from "react";
import "../../style/AdminCard.css";

interface CardProps {
  title: string;
  content?: string;
  imageSrc?: string; // Optional image source prop
  imageSize?: string; // Optional image size prop
  color?: string; // Optional color prop
  width?: string; // Optional width prop
  height?: string; // Optional height prop
  onClick: () => void; // Optional onClick prop
}

const AdminCard: React.FC<CardProps> = ({
  title,
  content,
  imageSrc,
  imageSize = "150px",
  color,
  width = "300px",
  height = "200px",
  onClick,
}) => {
  return (
    <div
      className="card"
      style={{ backgroundColor: color, width, height }}
      onClick={onClick}
    >
      <h2>{title}</h2>
      {imageSrc && (
        <img
          src={imageSrc}
          alt={title}
          className="card-image"
          style={{
            width: imageSize,
            height: imageSize,
            objectFit: "contain",
            margin: "0 auto",
          }}
        />
      )}
      <p>{content}</p>
    </div>
  );
};

export default AdminCard;
