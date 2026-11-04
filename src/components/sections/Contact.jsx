import { useMemo } from "react";
import { profile } from "../../data";
import Lanyard from "./Lanyard";

const contacts = [
  {
    id: "gmail",
    label: "Gmail",
    value: "zainrana.dev@gmail.com",
    hint: "Send me an email",
    href: `mailto:${profile.email}`,
    color: "from-red-500/20 to-orange-500/10",
    borderHover: "hover:border-red-500/50",
    textHover: "group-hover:text-red-400",
    iconBg: "bg-red-500/15",
    iconColor: "text-red-400",
    brandColor: "#EF4444",
    iconPath: "M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
      </svg>
    ),
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    value: "+92 325 1575822",
    hint: "Chat with me directly",
    href: profile.whatsapp,
    color: "from-green-500/20 to-emerald-500/10",
    borderHover: "hover:border-green-500/50",
    textHover: "group-hover:text-green-400",
    iconBg: "bg-green-500/15",
    iconColor: "text-green-400",
    brandColor: "#22C55E",
    iconPath: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    id: "github",
    label: "GitHub",
    value: "zainranadev",
    hint: "Browse my repositories",
    href: profile.github,
    color: "from-violet-500/20 to-purple-500/10",
    borderHover: "hover:border-violet/50",
    textHover: "group-hover:text-violet-400",
    iconBg: "bg-violet/15",
    iconColor: "text-violet-400",
    brandColor: "#A78BFA",
    iconPath: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "Zain-Ul-Abideen",
    hint: "Connect professionally",
    href: profile.linkedin,
    color: "from-blue-500/20 to-sky-500/10",
    borderHover: "hover:border-blue-500/50",
    textHover: "group-hover:text-blue-400",
    iconBg: "bg-blue-500/15",
    iconColor: "text-blue-400",
    brandColor: "#3B82F6",
    iconPath: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

// Dynamically generate high-fidelity badge and strap textures on an HTML5 canvas.
function generateTexturesForContact(c) {
  const width = 512;
  const height = 768;

  // --- 1. FRONT FACE ---
  const frontCanvas = document.createElement("canvas");
  frontCanvas.width = width;
  frontCanvas.height = height;
  const ctx = frontCanvas.getContext("2d");

  // Deep dark obsidian background with custom brand glow at bottom
  const grad = ctx.createLinearGradient(0, 0, 0, height);
  grad.addColorStop(0, "#17110D");
  grad.addColorStop(0.8, "#0A0705");
  grad.addColorStop(1, c.brandColor + "28"); // 15% opacity brand glow
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Outer border lines
  ctx.strokeStyle = "#33271E";
  ctx.lineWidth = 14;
  ctx.strokeRect(7, 7, width - 14, height - 14);

  // Inner neon/brand glow border
  ctx.strokeStyle = c.brandColor + "38"; // ~22% opacity
  ctx.lineWidth = 2;
  ctx.strokeRect(20, 20, width - 40, height - 40);

  // Lanyard clip slot at top center
  ctx.fillStyle = "#0A0705";
  ctx.beginPath();
  ctx.roundRect(width / 2 - 40, 30, 80, 20, 10);
  ctx.fill();
  ctx.strokeStyle = "#33271E";
  ctx.lineWidth = 3;
  ctx.stroke();

  // Draw ZR Monogram
  ctx.fillStyle = "#FFF3EC";
  ctx.font = 'bold 22px "Space Grotesk", sans-serif';
  ctx.textAlign = "left";
  ctx.fillText("ZR", 40, 75);

  // Draw node badge label
  ctx.fillStyle = "#A69184";
  ctx.font = '11px "JetBrains Mono", monospace';
  ctx.textAlign = "right";
  ctx.fillText("SECURE NODE", width - 40, 72);

  // Draw 3D icon box backing (glowing)
  ctx.shadowColor = c.brandColor;
  ctx.shadowBlur = 18;
  ctx.fillStyle = "#17110D";
  ctx.beginPath();
  ctx.roundRect(width / 2 - 80, 160, 160, 160, 24);
  ctx.fill();
  ctx.strokeStyle = c.brandColor + "88";
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.shadowBlur = 0; // Reset shadow

  // Draw Brand SVG Icon inside the container
  ctx.save();
  ctx.translate(width / 2, 240);
  ctx.scale(3.5, 3.5);
  ctx.translate(-12, -12); // Offset to center 24x24 path
  ctx.fillStyle = c.brandColor;
  ctx.fill(new Path2D(c.iconPath));
  ctx.restore();

  // Label text (Gmail, WhatsApp, etc.)
  ctx.fillStyle = "#FFF3EC";
  ctx.font = 'bold 38px "Space Grotesk", sans-serif';
  ctx.textAlign = "center";
  ctx.fillText(c.label.toUpperCase(), width / 2, 380);

  // Subtitle
  ctx.fillStyle = "#A69184";
  ctx.font = '14px "JetBrains Mono", monospace';
  ctx.fillText("CONTACT CREDENTIAL", width / 2, 420);

  // Separator
  ctx.strokeStyle = "#33271E";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(80, 460);
  ctx.lineTo(width - 80, 460);
  ctx.stroke();

  // Status
  ctx.fillStyle = "#FF9A4D"; // live highlight color
  ctx.font = 'bold 12px "JetBrains Mono", monospace';
  ctx.fillText("• STATUS: ACTIVE •", width / 2, 500);

  // Barcode
  const barcodeX = 80;
  const barcodeWidth = width - 160;
  const barcodeHeight = 60;
  const barcodeY = 560;

  ctx.fillStyle = "#A69184";
  let curX = barcodeX;
  while (curX < barcodeX + barcodeWidth) {
    const w = Math.floor(Math.random() * 4) + 1;
    ctx.fillRect(curX, barcodeY, w, barcodeHeight);
    curX += w + Math.floor(Math.random() * 3) + 1;
  }
  ctx.font = '10px "JetBrains Mono", monospace';
  const cleanVal = c.value.substring(0, 10).replace(/[^a-zA-Z0-9]/g, "");
  ctx.fillText(`* ${c.id.toUpperCase()}-${cleanVal} *`, width / 2, barcodeY + barcodeHeight + 20);

  // Footer
  ctx.fillStyle = "#33271E";
  ctx.font = '9px "JetBrains Mono", monospace';
  ctx.fillText("ZR SYSTEM v1.0.0 © 2026", width / 2, height - 35);


  // --- 2. BACK FACE ---
  const backCanvas = document.createElement("canvas");
  backCanvas.width = width;
  backCanvas.height = height;
  const bCtx = backCanvas.getContext("2d");

  // Background
  const bGrad = bCtx.createLinearGradient(0, 0, 0, height);
  bGrad.addColorStop(0, "#0A0705");
  bGrad.addColorStop(1, "#17110D");
  bCtx.fillStyle = bGrad;
  bCtx.fillRect(0, 0, width, height);

  // Outer border
  bCtx.strokeStyle = "#33271E";
  bCtx.lineWidth = 14;
  bCtx.strokeRect(7, 7, width - 14, height - 14);

  // Clip hole
  bCtx.fillStyle = "#0A0705";
  bCtx.beginPath();
  bCtx.roundRect(width / 2 - 40, 30, 80, 20, 10);
  bCtx.fill();
  bCtx.strokeStyle = "#33271E";
  bCtx.lineWidth = 3;
  bCtx.stroke();

  // QR Code Frame
  const qrSize = 180;
  const qx = (width - qrSize) / 2;
  const qy = 120;
  bCtx.strokeStyle = c.brandColor + "55";
  bCtx.lineWidth = 4;
  bCtx.strokeRect(qx - 10, qy - 10, qrSize + 20, qrSize + 20);

  // Draw simulated QR Code
  bCtx.fillStyle = "#FFF3EC";
  const drawCorner = (cx, cy) => {
    bCtx.fillStyle = "#FFF3EC";
    bCtx.fillRect(cx, cy, 40, 40);
    bCtx.fillStyle = "#17110D";
    bCtx.fillRect(cx + 8, cy + 8, 24, 24);
    bCtx.fillStyle = "#FFF3EC";
    bCtx.fillRect(cx + 12, cy + 12, 16, 16);
  };
  drawCorner(qx, qy);
  drawCorner(qx + qrSize - 40, qy);
  drawCorner(qx, qy + qrSize - 40);

  bCtx.fillStyle = "#FFF3EC";
  const cellSize = 8;
  let seed = c.id.charCodeAt(0) + c.id.charCodeAt(1);
  const random = () => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  for (let ox = 0; ox < qrSize; ox += cellSize) {
    for (let oy = 0; oy < qrSize; oy += cellSize) {
      if (ox < 48 && oy < 48) continue;
      if (ox > qrSize - 48 && oy < 48) continue;
      if (ox < 48 && oy > qrSize - 48) continue;
      if (random() > 0.5) {
        bCtx.fillRect(qx + ox, qy + oy, cellSize, cellSize);
      }
    }
  }

  // Label text
  bCtx.fillStyle = c.brandColor;
  bCtx.font = 'bold 18px "Space Grotesk", sans-serif';
  bCtx.textAlign = "center";
  bCtx.fillText("SCAN OR CLICK TO CONNECT", width / 2, qy + qrSize + 45);

  // Detail value (adaptive sizing for emails / long handles)
  let fontSize = 22;
  bCtx.font = `bold ${fontSize}px "Space Grotesk", sans-serif`;
  while (bCtx.measureText(c.value).width > width - 80 && fontSize > 11) {
    fontSize -= 1;
    bCtx.font = `bold ${fontSize}px "Space Grotesk", sans-serif`;
  }
  bCtx.fillStyle = "#FFF3EC";
  bCtx.fillText(c.value, width / 2, qy + qrSize + 95);

  bCtx.fillStyle = "#A69184";
  bCtx.font = '13px "JetBrains Mono", monospace';
  bCtx.fillText(`[ ${c.hint.toUpperCase()} ]`, width / 2, qy + qrSize + 130);

  // Sign Line
  bCtx.strokeStyle = "#33271E";
  bCtx.lineWidth = 1;
  bCtx.beginPath();
  bCtx.moveTo(100, height - 150);
  bCtx.lineTo(width - 100, height - 150);
  bCtx.stroke();

  bCtx.fillStyle = "#A69184";
  bCtx.font = 'italic 12px "Space Grotesk", sans-serif';
  bCtx.fillText("Authorized Signature", width / 2, height - 130);

  bCtx.fillStyle = "#FFF3EC";
  bCtx.font = 'bold 16px "Space Grotesk", sans-serif';
  bCtx.fillText("ZR DEV STUDIO", width / 2, height - 80);


  // --- 3. LANYARD BAND PATTERN ---
  const strapCanvas = document.createElement("canvas");
  strapCanvas.width = 512;
  strapCanvas.height = 64;
  const sCtx = strapCanvas.getContext("2d");

  sCtx.fillStyle = c.brandColor;
  sCtx.fillRect(0, 0, 512, 64);

  sCtx.fillStyle = "#FFF3EC";
  sCtx.font = 'bold 16px "JetBrains Mono", monospace';
  sCtx.textAlign = "center";
  sCtx.textBaseline = "middle";
  sCtx.fillText(`★  ${c.label.toUpperCase()}  ★  CONNECT  ★  ZAIN RANA  `, 256, 32);

  return {
    front: frontCanvas.toDataURL(),
    back: backCanvas.toDataURL(),
    lanyard: strapCanvas.toDataURL(),
  };
}

export default function Contact() {
  // Pre-generate custom textures for the lanyard components on mount
  const textures = useMemo(() => {
    if (typeof window === "undefined") return {};
    const result = {};
    contacts.forEach((c) => {
      result[c.id] = generateTexturesForContact(c);
    });
    return result;
  }, []);

  return (
    <section id="contact" className="max-w-6xl mx-auto px-6 py-24">
      {/* Header */}
      <p className="font-mono text-xs uppercase tracking-widest text-live mb-3">
        [ Contact ]
      </p>
      <h2 className="font-display text-3xl font-semibold mb-2">Get in touch</h2>
      <p className="text-text-muted mb-12 max-w-lg">
        Open to frontend roles and internships. Pick your preferred channel and let's talk.
      </p>

      {/* Interactive 3D Lanyard Contact Grid */}
      <div className="grid sm:grid-cols-2 gap-6 mb-16">
        {contacts.map((c) => (
          <div
            key={c.id}
            className="relative rounded-2xl border border-hairline bg-surface flex flex-col items-center justify-between transition-all duration-300 hover:border-violet/30 overflow-hidden h-[450px] group shadow-lg"
          >
            {/* Background brand color hint glow */}
            <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${c.color} opacity-80`} />

            {/* 3D Interactive Lanyard Section */}
            <div className="relative w-full h-[330px] select-none cursor-grab active:cursor-grabbing">
              <Lanyard
                position={[0, 0, 20]}
                gravity={[0, -40, 0]}
                fov={22}
                frontImage={textures[c.id]?.front}
                backImage={textures[c.id]?.back}
                lanyardImage={textures[c.id]?.lanyard}
                lanyardWidth={1.2}
              />
            </div>

            {/* Clickable Card Footer Details */}
            <a
              href={c.id === "gmail" ? `https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}` : c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-full p-5 border-t border-hairline bg-surface-raised/40 hover:bg-surface-raised/90 flex items-center gap-4 transition-all duration-300 group/footer z-10"
            >
              {/* Hover background highlight */}
              <div className={`absolute inset-0 bg-gradient-to-r ${c.color} opacity-0 group-hover/footer:opacity-100 transition-opacity duration-300 pointer-events-none`} />

              {/* Icon */}
              <div className={`relative shrink-0 w-11 h-11 rounded-xl ${c.iconBg} flex items-center justify-center ${c.iconColor} z-10`}>
                {c.icon}
              </div>

              {/* Text info */}
              <div className="relative min-w-0 flex-1 z-10">
                <p className={`font-mono text-[9px] uppercase tracking-widest text-text-muted mb-0.5 transition-colors group-hover/footer:text-live`}>
                  {c.label}
                </p>
                <p className="font-display font-semibold text-text-primary text-xs truncate">
                  {c.value}
                </p>
                <p className="font-mono text-[9px] text-text-muted mt-0.5">{c.hint}</p>
              </div>

              {/* Action Arrow */}
              <svg
                className={`relative ml-auto shrink-0 w-4 h-4 text-text-muted transition-all duration-300 group-hover/footer:text-live group-hover/footer:translate-x-1 z-10`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        ))}
      </div>

      {/* Footer */}
      <p className="text-center font-mono text-[11px] text-text-muted">
        Built by {profile.name} — React &amp; Framer Motion.
      </p>
    </section>
  );
}
