import React from "react";
import { Link } from "react-router-dom";

export default function AuthorItems({ items = [], authorImage }) {
  if (!items || items.length === 0) return <div>No items for this author.</div>;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        gap: 24,
      }}
    >
      {items.map((item) => (
        <div
          key={item.nftId}
          style={{
            border: "1px solid #eee",
            borderRadius: 12,
            padding: 12,
            background: "#fff",
          }}
        >
          <div style={{ position: "relative", marginBottom: 10 }}>
            <div style={{ position: "absolute", top: 10, left: 10, zIndex: 2 }}>
              <div style={{ position: "relative" }}>
                <img
                  src={authorImage}
                  alt="author"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    border: "2px solid #fff",
                    objectFit: "cover",
                    boxShadow: "0 2px 6px rgba(0,0,0,.15)",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    right: -2,
                    bottom: -2,
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    background: "#7C6CF1",
                    color: "#fff",
                    display: "grid",
                    placeItems: "center",
                    fontSize: 9,
                    fontWeight: 700,
                    border: "1px solid #fff",
                  }}
                >
                  ✓
                </span>
              </div>
            </div>

            <div
              style={{
                position: "absolute",
                top: 12,
                left: 60,
                zIndex: 2,
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: "#fff",
                padding: "4px 8px",
                borderRadius: 16,
                boxShadow: "0 1px 3px rgba(0,0,0,.1)",
                fontSize: 13,
                color: "#333",
              }}
            >
              <i className="fa fa-heart" style={{ color: "#e74c3c" }} />
              <span>{item.likes ?? 0}</span>
            </div>

            <Link to={`/item-details?nftId=${item.nftId}`}>
              <img
                src={item.nftImage}
                alt={item.title || ""}
                style={{ width: "100%", borderRadius: 8, display: "block" }}
              />
            </Link>
          </div>

          <Link
            to={`/item-details?nftId=${item.nftId}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <h4 style={{ margin: "6px 0 4px" }}>{item.title || "Untitled"}</h4>
          </Link>
          <div style={{ fontSize: 14 }}>
            {typeof item.price === "number" ? `${item.price} ETH` : "—"}
          </div>
        </div>
      ))}
    </div>
  );
}
