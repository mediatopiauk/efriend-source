import * as React from "react";

interface Props { onClick?: () => void; unread?: number }

/**
 * Grow floating widget · Chatbot (Max).
 * Mounted at viewport bottom-right when modules.enabled includes "chatbot".
 */
export const ChatbotWidget: React.FC<Props> = ({ onClick, unread }) => (
  <button className="oe-chat" aria-label="Chat with us" onClick={onClick}>
    💬
    {unread != null && unread > 0 && <span className="oe-chat__badge">{unread}</span>}
    <style>{CHAT_CSS}</style>
  </button>
);

const CHAT_CSS = `
.oe-chat { position: fixed; right: 24px; bottom: 24px; z-index: 60;
  width: 56px; height: 56px;
  background: var(--mod-chatbot); color: #fff;
  border-radius: 999px; border: 0;
  display: flex; align-items: center; justify-content: center;
  font-size: 24px; cursor: pointer;
  box-shadow: 0 12px 28px rgba(124,58,237,0.4);
  transition: transform 200ms var(--ease-standard); }
.oe-chat:hover { transform: scale(1.05); }
.oe-chat::after { content: ''; position: absolute; top: 4px; right: 4px;
  width: 12px; height: 12px;
  background: var(--site-cta); border: 2px solid #fff; border-radius: 999px; }
.oe-chat__badge { position: absolute; top: -4px; right: -4px;
  background: var(--site-cta); color: #fff; border: 2px solid #fff;
  border-radius: 999px; min-width: 22px; height: 22px;
  padding: 0 6px; font-size: 11px; font-weight: 700;
  display: flex; align-items: center; justify-content: center; }
@media (max-width: 900px) { .oe-chat { right: 12px; bottom: 12px; } }`;
