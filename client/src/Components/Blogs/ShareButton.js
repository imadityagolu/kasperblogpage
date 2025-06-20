// Share Button Componentj
import React from "react";
const ShareButton = ({ slug , FRONTEND_URL}) => {
  const [open, setOpen] = React.useState(false);
  // const blogUrl = `https://localhost:3000/blog/${slug}`;
  const blogUrl = `${FRONTEND_URL}/blog/${slug}`;

  const socialLinks = [
    {
      name: "WhatsApp",
      url: `https://wa.me/?text=${encodeURIComponent(blogUrl)}`,
      bgColor: "#25D366",
    },
    {
      name: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        blogUrl
      )}`,
      bgColor: "#3b5998",
    },
    {
      name: "Twitter",
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(blogUrl)}`,
      bgColor: "#1DA1F2",
    },
    {
      name: "Telegram",
      url: `https://t.me/share/url?url=${encodeURIComponent(blogUrl)}`,
      bgColor: "#0088cc",
    },
  ];

  const btnStyle = {
    color: "white",
    padding: "8px 12px",
    borderRadius: "5px",
    textAlign: "center",
    textDecoration: "none",
    fontWeight: "600",
    cursor: "pointer",
    display: "block",
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          padding: "6px 21px",
          borderRadius: "5px",
          cursor: "pointer",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          
        }}
      >
        Share
      </button>

      {open && (
        <div
          style={{
            // position: "absolute",
            top: "40px",
            left: 0,
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "10px",
            width: "200px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            zIndex: 100,
          }}
        >
          <p style={{ marginBottom: "10px", fontWeight: "bold" }}>Share on:</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {socialLinks.map(({ name, url, bgColor }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ ...btnStyle, backgroundColor: bgColor }}
              >
                {name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


export default ShareButton;
