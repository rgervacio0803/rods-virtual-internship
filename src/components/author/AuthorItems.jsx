import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, Link } from "react-router-dom";

export default function AuthorItems() {
  const [sp] = useSearchParams();
  const authorId = sp.get("authorId");

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    async function run() {
      setErr("");
      setItems([]);
      if (!authorId) {
        setErr("Missing authorId in URL (use /author?authorId=YOUR_ID).");
        setLoading(false);
        console.log("[AuthorItems] No authorId in query string.");
        return;
      }

      console.log("[AuthorItems] Fetching NFTs for authorId:", authorId);
      try {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/authorMoreNFTs",
          { params: { authorId } }
        );
        console.log("[AuthorItems] API response length:", Array.isArray(data) ? data.length : "not array");
        setItems(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("[AuthorItems] authorMoreNFTs failed:", e);
        setErr("Failed to fetch this author's items.");
      } finally {
        setLoading(false);
      }
    }
    run();
  }, [authorId]);

  if (loading) return <div>Loading author items…</div>;
  if (err) return <div style={{ color: "crimson" }}>{err}</div>;
  if (!items || items.length === 0) return <div>No items for this author.</div>;

  return (
    <div className="row" style={{ marginTop: 16 }}>
      {items.map((item, idx) => (
        <div key={item.nftId ?? idx} className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
          <div className="nft__item">
            <div className="nft__item_wrap">
              <Link to={`/item-details?nftId=${item.nftId}`}>
                <img
                  src={item.nftImage || "/images/nftImage.jpg"}
                  alt={item.title || ""}
                  className="lazy nft__item_preview"
                  style={{ width: "100%", borderRadius: 8 }}
                />
              </Link>
            </div>

            <div className="nft__item_info" style={{ marginTop: 8 }}>
              <Link to={`/item-details?nftId=${item.nftId}`}>
                <h4>{item.title || "Untitled"}</h4>
              </Link>
              <div className="nft__item_price">
                {typeof item.price === "number" ? `${item.price} ETH` : "—"}
              </div>
              <div className="nft__item_like">
                <i className="fa fa-heart" /> <span>{item.likes ?? 0}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
