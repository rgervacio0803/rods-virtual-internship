import React from "react";
import { Link } from "react-router-dom";

export default function AuthorItems({ items = [], authorImage = "" }) {
  console.log("AuthorItems received:", items.length, "items");

  if (!Array.isArray(items) || items.length === 0) {
    return <div>No items for this author.</div>;
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
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
          {authorImage && (
  <div style={{ position: "relative", display: "inline-block", marginBottom: 8 }}>
    <img
      src={authorImage}
      alt="author"
      style={{
        width: 50,
        height: 50,
        borderRadius: "50%",
        border: "2px solid #fff",
        objectFit: "cover",
        boxShadow: "0 2px 6px rgba(0,0,0,.15)",
      }}
    />
    <span
      style={{
        position: "absolute",
        bottom: -2,
        right: -2,
        width: 18,
        height: 18,
        borderRadius: "50%",
        background: "#7C6CF1",
        color: "#fff",
        fontSize: 12,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "2px solid #fff",
      }}
    >
      ✓
    </span>
  </div>
)}

 
  <div style={{ marginBottom: 50 }}>
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
            <h4 style={{ margin: "0 0 5px" }}>{item.title || "Untitled"}</h4>
          </Link>
          <div>
            {typeof item.price === "number" ? `${item.price} ETH` : "—"}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 6,
              marginTop: 8,
              fontSize: 12,
            }}
          >
            <i className="fa fa-heart" />
            <span>{item.likes ?? 0}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
