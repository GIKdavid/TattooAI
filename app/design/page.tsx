"use client";
import { useState } from "react";

export default function DesignPage() {
  const [prompt, setPrompt] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function generate() {
    if (!prompt.trim()) return;

    setLoading(true);
    setImages([]);

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    setImages(data.images || []);
    setLoading(false);
  }

  return (
    <div style={{ padding: "40px", maxWidth: "700px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "32px", marginBottom: "20px", fontWeight: "600" }}>
        What story do you want your tattoo to tell?
      </h1>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ex: quiet strength, healing, rebirth..."
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          minHeight: "90px",
          marginBottom: "16px"
        }}
      />

      <button
        onClick={generate}
        disabled={loading}
        style={{
          width: "100%",
          padding: "14px",
          background: "#000",
          color: "#fff",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "500"
        }}
      >
        {loading ? "Creating your tattoo..." : "Create Tattoo"}
      </button>

      {images.length > 0 && (
        <div
          style={{
            marginTop: "30px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px"
          }}
        >
          {images.map((img, i) => (
            <img key={i} src={img} style={{ width: "100%", borderRadius: "8px" }} />
          ))}
        </div>
      )}
    </div>
  );
}