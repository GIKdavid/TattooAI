"use client";

import { useState } from "react";

export default function DesignPage() {
  const [prompt, setPrompt] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generateTattoo = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setImages([]);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      setImages(data.images || []);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div style={{
      maxWidth: "700px",
      margin: "0 auto",
      padding: "40px 20px",
      textAlign: "center"
    }}>
      <h1 style={{ fontSize: "32px", fontWeight: "600", marginBottom: "20px" }}>
        Create Your Tattoo
      </h1>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ex: quiet strength, healing, rebirth..."
        className="tattoo-input"
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "10px",
          border: "1px solid #ccc",
          minHeight: "100px",
          marginBottom: "16px",
          color: "black",           // ✅ הטקסט יהיה שחור
          background: "white"       // ✅ הרקע יהיה לבן
        }}
      />

      <button
        onClick={generateTattoo}
        disabled={loading}
        style={{
          padding: "12px 24px",
          background: "#000",
          color: "#fff",
          borderRadius: "8px",
          cursor: "pointer",
          width: "100%",
          fontSize: "16px",
          marginBottom: "30px"
        }}
      >
        {loading ? "Creating your tattoo..." : "Create Tattoo"}
      </button>

      {images.length > 0 && (
        <div style={{
          display: "grid",
          gap: "20px"
        }}>
          {images.map((src, i) => (
            <img key={i} src={src} alt="Tattoo result"
              style={{
                width: "100%",
                borderRadius: "12px",
                border: "1px solid #ddd"
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
