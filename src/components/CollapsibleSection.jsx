import { useState } from "react";

function CollapsibleSection({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section style={{ marginTop: 24 }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          background: "none",
          border: "none",
          padding: 0,
          fontSize: 18,
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        {open ? "▼" : "▶"} {title}
      </button>

      {open && <div style={{ marginTop: 12 }}>{children}</div>}
    </section>
  );
}

export default CollapsibleSection;