import React, { useEffect, useState } from "react";
import AuthorItems from "../components/author/AuthorItems";
import axios from "axios";
import defaultBanner from "../images/author_banner.jpg";

export default function Author() {
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);

  const authorId = new URLSearchParams(window.location.search).get("authorId");

  useEffect(() => {
    async function fetchAuthor() {
      try {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/authors",
          { params: { author: authorId } }
        );
        setAuthor(data);
      } catch (e) {
        console.error("Failed to fetch author:", e);
      } finally {
        setLoading(false);
      }
    }
    if (authorId) fetchAuthor();
  }, [authorId]);

  if (loading) return <div>Loading author...</div>;
  if (!author) return <div>Author not found.</div>;

  const bannerUrl = author?.bannerImage || author?.banner || defaultBanner;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          style={{
            background: `url(${bannerUrl}) center / cover no-repeat`,
            height: 300,
          }}
        />

        <section aria-label="section" style={{ padding: "30px 0" }}>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img
                        src={author.authorImage}
                        alt={author.authorName}
                        style={{
                          width: 150,
                          height: 150,
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {author.authorName}
                          <span className="profile_username">
                            @{author.tag}
                          </span>
                          <span id="wallet" className="profile_wallet">
                            {author.address}
                          </span>
                          <button
                            id="btn_copy"
                            style={{
                              border: "1px solid #ddd",
                              borderRadius: 3,
                              padding: "2px 6px",
                              background: "#f9f9f9",
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              navigator.clipboard.writeText(author.address)
                            }
                          >
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div className="profile_follow de-flex">
                    <div className="de-flex-col" style={{ textAlign: "right" }}>
                      <div className="profile_follower">
                        {author.followers} followers
                      </div>
                      <button className="btn-main">Follow</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
