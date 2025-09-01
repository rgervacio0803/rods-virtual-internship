import React from "react";
import { Link } from "react-router-dom";

export default function AuthorItems({ items = [], authorImage = "" }) {
  if (!Array.isArray(items) || items.length === 0) {
    return <div>No items for this author.</div>;
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: 16,
      }}
    >
      {items.map((item, idx) => (
        <div
          key={item.nftId ?? item.id ?? idx}
          style={{
            border: "1px solid #eee",
            borderRadius: 8,
            padding: 8,
            background: "#fff",
          }}
        >
          <div style={{ position: "relative", marginBottom: 8 }}>
            {authorImage && (
              <img
                src={authorImage}
                alt="author"
                style={{
                  position: "absolute",
                  top: 10,
                  left: 10,
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  border: "2px solid #fff",
                  objectFit: "cover",
                  boxShadow: "0 2px 6px rgba(0,0,0,.15)",
                  zIndex: 2,
                }}
              />
            )}

            <div
              style={{
                position: "absolute",
                top: 12,
                left: authorImage ? 56 : 12,
                zIndex: 2,
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "#fff",
                padding: "2px 8px",
                borderRadius: 14,
                border: "1px solid #eee",
                fontSize: 13,
              }}
            >
              <i className="fa fa-heart" />
              <span>{item.likes ?? 0}</span>
            </div>

            <Link to={`/item-details?nftId=${item.nftId}`}>
              <img
                src={item.nftImage}
                alt={item.title || ""}
                style={{ width: "100%", borderRadius: 6, display: "block" }}
              />
            </Link>
          </div>

          <Link
            to={`/item-details?nftId=${item.nftId}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <h4 style={{ margin: "6px 0 4px" }}>{item.title || "Untitled"}</h4>
          </Link>
          <div>
            {typeof item.price === "number" ? `${item.price} ETH` : "—"}
          </div>
        </div>
      ))}
    </div>
  );
}
