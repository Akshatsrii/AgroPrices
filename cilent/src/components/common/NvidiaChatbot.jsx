import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectAllPredictions } from "../../store/slices/predictionSlice";

export default function NvidiaChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [apiKey, setApiKey] = useState(import.meta.env.VITE_NVIDIA_API_KEY || "");
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! I am your AI Agri-Assistant powered by NVIDIA Inference Microservices (NIM). Ask me anything about current crop prices or market trends!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isConfigured, setIsConfigured] = useState(!!apiKey);

  const predictions = useSelector(selectAllPredictions) || [];

  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const toggleChat = () => setIsOpen(!isOpen);

  const saveKey = () => {
    if (apiKey.trim().length > 10) {
      setIsConfigured(true);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || !apiKey) return;
    
    // Build context string from current predictions
    const priceContext = predictions.map(p => `${p.cropId}: ₹${p.predictedPrice} (Signal: ${p.signal})`).join(", ");
    
    const systemPrompt = {
      role: "system",
      content: `You are an expert AI Agricultural Market Assistant for AgroPrice AI. 
      You help farmers and traders by answering questions about crop prices and market trends.
      Here is the real-time CURRENT market data you MUST use to answer user questions:
      ${priceContext ? priceContext : "No live data available right now. Answer generally."}
      Keep your answers concise, helpful, and professional.`
    };

    const userMsg = { role: "user", content: input };
    const newMessages = [...messages, userMsg];
    
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://integrate.api.nvidia.com/v1/chat/completions",
        {
          model: "meta/llama-3.1-8b-instruct", 
          messages: [systemPrompt, ...newMessages], // Send system prompt + history
          max_tokens: 500,
          temperature: 0.5,
        },
        {
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
          }
        }
      );

      const botText = response.data.choices[0].message.content;
      setMessages([...newMessages, { role: "assistant", content: botText }]);
    } catch (error) {
      console.error("NVIDIA API Error:", error);
      let errMsg = "Error reaching NVIDIA API. Please check your API key.";
      if (error.response?.status === 401) errMsg = "Invalid NVIDIA API Key. Unauthorized.";
      setMessages([...newMessages, { role: "assistant", content: `❌ ${errMsg}` }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  if (!isOpen) {
    return (
      <div 
        onClick={toggleChat}
        style={{
          position: "fixed", bottom: 24, right: 24, zIndex: 9999,
          width: 60, height: 60, borderRadius: "50%",
          background: "linear-gradient(135deg, #06d6a0 0%, #118ab2 100%)",
          boxShadow: "0 8px 32px rgba(6, 214, 160, 0.4)",
          display: "flex", justifyContent: "center", alignItems: "center",
          cursor: "pointer", transition: "transform 0.3s ease",
          color: "#fff", fontSize: 24
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
      >
        💬
      </div>
    );
  }

  return (
    <div style={{
      position: "fixed", bottom: 24, right: 24, zIndex: 9999,
      width: 380, height: 550, borderRadius: 16,
      background: "rgba(11, 14, 20, 0.85)", backdropFilter: "blur(20px)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      boxShadow: "0 12px 40px rgba(0, 0, 0, 0.5)",
      display: "flex", flexDirection: "column",
      fontFamily: "'Outfit', 'Segoe UI', sans-serif",
      overflow: "hidden"
    }}>
      {/* HEADER */}
      <div style={{
        padding: "16px 20px",
        background: "linear-gradient(135deg, rgba(6,214,160,0.1) 0%, rgba(17,138,178,0.1) 100%)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: "50%",
            background: "linear-gradient(135deg, #06d6a0 0%, #118ab2 100%)",
            color: "#fff", display: "flex", justifyContent: "center", alignItems: "center",
            fontSize: 16, fontWeight: "bold"
          }}>N</div>
          <div>
            <h3 style={{ margin: 0, fontSize: 16, color: "#fff", fontWeight: 600 }}>Agri-Bot AI</h3>
            <span style={{ fontSize: 11, color: "#06d6a0", display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#06d6a0", display: "inline-block" }}></span>
              NVIDIA NIM Active
            </span>
          </div>
        </div>
        <button 
          onClick={toggleChat}
          style={{ background: "transparent", border: "none", color: "#a0aab2", fontSize: 20, cursor: "pointer" }}
        >
          ✕
        </button>
      </div>

      {/* BODY */}
      <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
        
        {!isConfigured ? (
          <div style={{
            background: "rgba(15, 23, 42, 0.6)", padding: 20, borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.05)",
            textAlign: "center"
          }}>
            <h4 style={{ color: "#fff", marginTop: 0, marginBottom: 10 }}>Configure Setup</h4>
            <p style={{ fontSize: 13, color: "#94a3b8", marginBottom: 20 }}>
              To use the bot, please enter your NVIDIA NIM API Key.
            </p>
            <input 
              type="password"
              placeholder="nvapi-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              style={{
                width: "100%", boxSizing: "border-box", padding: "10px", borderRadius: 8,
                background: "rgba(0,0,0,0.3)", border: "1px solid rgba(6, 214, 160, 0.3)",
                color: "#fff", outline: "none", marginBottom: 12
              }}
            />
            <button 
              onClick={saveKey}
              style={{
                width: "100%", padding: "10px", borderRadius: 8,
                background: "rgba(6, 214, 160, 0.15)", color: "#06d6a0",
                border: "1px solid #06d6a0", cursor: "pointer", fontWeight: 600
              }}
            >
              Save Key
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                maxWidth: "85%",
                padding: "12px 16px",
                borderRadius: "16px",
                borderBottomRightRadius: msg.role === "user" ? "4px" : "16px",
                borderTopLeftRadius: msg.role === "assistant" ? "4px" : "16px",
                background: msg.role === "user" ? "rgba(6, 214, 160, 0.15)" : "rgba(30, 41, 59, 0.7)",
                border: "1px solid rgba(255,255,255,0.05)",
                color: "#E2E8F0", fontSize: 14, lineHeight: "1.5"
              }}>
                {msg.content}
              </div>
            ))}
            {loading && (
              <div style={{
                alignSelf: "flex-start", padding: "12px 16px", borderRadius: "16px",
                background: "rgba(30, 41, 59, 0.7)", border: "1px solid rgba(255,255,255,0.05)",
                color: "#94a3b8", fontSize: 13, display: "flex", alignItems: "center", gap: 8
              }}>
                <span className="dot-pulse">🧠 Processing via NVIDIA...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* FOOTER */}
      {isConfigured && (
        <div style={{
          padding: "16px 20px", display: "flex", gap: 10,
          borderTop: "1px solid rgba(255,255,255,0.05)", background: "rgba(11, 14, 20, 0.9)"
        }}>
          <input 
            type="text"
            placeholder="Ask about crops, prices, trends..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
            style={{
              flex: 1, padding: "12px 16px", borderRadius: 20,
              background: "rgba(15, 23, 42, 0.7)", border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "#fff", outline: "none", fontSize: 14
            }}
          />
          <button 
            onClick={sendMessage}
            disabled={loading}
            style={{
              width: 44, height: 44, borderRadius: "50%",
              background: "linear-gradient(135deg, #06d6a0 0%, #118ab2 100%)",
              border: "none", color: "#fff", cursor: loading ? "default" : "pointer",
              display: "flex", justifyContent: "center", alignItems: "center",
              opacity: loading ? 0.6 : 1
            }}
          >
            ➤
          </button>
        </div>
      )}
    </div>
  );
}
