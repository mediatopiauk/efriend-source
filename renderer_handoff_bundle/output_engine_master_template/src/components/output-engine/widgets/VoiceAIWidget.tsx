import * as React from "react";

interface Props { onClick?: () => void; label?: string }

/**
 * Grow floating widget · Voice AI (Sarah).
 * Mounted at viewport bottom-left when modules.enabled includes "voiceAI".
 * Production wires onClick to the existing Twilio dial flow.
 */
export const VoiceAIWidget: React.FC<Props> = ({ onClick, label = "Call us now" }) => (
  <button className="oe-voice" aria-label="Call us" onClick={onClick}>
    <span className="oe-voice__icon">📞</span>
    <span className="oe-voice__text">
      <span className="oe-voice__l">Voice AI</span>
      <span className="oe-voice__v">{label}</span>
    </span>
    <style>{VOICE_CSS}</style>
  </button>
);

const VOICE_CSS = `
.oe-voice { all: unset; box-sizing: border-box; cursor: pointer;
  position: fixed; left: 24px; bottom: 24px; z-index: 60;
  background: #fff; border: 1px solid var(--foundation-pale);
  border-radius: 999px; padding: 10px 18px 10px 10px;
  box-shadow: 0 16px 32px rgba(15,25,35,0.18);
  display: flex; align-items: center; gap: 12px;
  transition: transform 200ms var(--ease-standard), box-shadow 200ms var(--ease-standard); }
.oe-voice:hover { transform: translateY(-2px); box-shadow: 0 20px 40px rgba(15,25,35,0.22); }
.oe-voice__icon { width: 40px; height: 40px; border-radius: 999px;
  background: var(--mod-voice); color: #fff;
  display: flex; align-items: center; justify-content: center;
  font-size: 18px; position: relative; }
.oe-voice__icon::before { content: ''; position: absolute; inset: -4px;
  border: 2px solid var(--mod-voice); border-radius: 999px; opacity: 0.4;
  animation: oe-voice-pulse 2s var(--ease-standard) infinite; }
@keyframes oe-voice-pulse {
  0% { transform: scale(1); opacity: 0.5; }
  100% { transform: scale(1.4); opacity: 0; }
}
.oe-voice__text { display: flex; flex-direction: column; gap: 2px; }
.oe-voice__l { font-size: 11px; color: var(--foundation-mid); font-weight: 600;
  letter-spacing: 0.06em; text-transform: uppercase; }
.oe-voice__v { font-size: 14px; color: var(--foundation-dark); font-weight: 600; line-height: 1; }
@media (max-width: 900px) {
  .oe-voice { left: 12px; bottom: 12px; padding: 8px 14px 8px 8px; }
  .oe-voice__l { display: none; }
  .oe-voice__icon { width: 32px; height: 32px; font-size: 14px; }
}`;
