import { useState } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";

export default function FloatingChatbot() {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");

    const [messages, setMessages] = useState([
        {
            type: "bot",
            text: "I’m monitoring the demo market environment. Ask me about ES, liquidity, volatility, or cross-asset relationships."
        }
    ]);

    const sendMessage = async () => {

        if (!message.trim()) return;
    
        const userMessage = message;
    
        setMessages(prev => [
            ...prev,
            {
                type: "user",
                text: userMessage
            }
        ]);
    
        setMessage("");
    
        try {
    
            const response = await fetch(
                "http://127.0.0.1:8000/chat",
                {
                    method: "POST",
    
                    headers: {
                        "Content-Type":
                            "application/json"
                    },
    
                    body: JSON.stringify({
                        message: userMessage
                    })
                }
            );
    
    
            if (!response.ok) {
                throw new Error(
                    "Chatbot request failed"
                );
            }
    
    
            const data =
                await response.json();
    
    
            setMessages(prev => [
                ...prev,
                {
                    type: "bot",
                    text: data.response
                }
            ]);
    
        }
    
        catch (error) {
    
            console.error(error);
    
            setMessages(prev => [
                ...prev,
                {
                    type: "bot",
                    text:
                        "I couldn't connect to the local Trader Intelligence engine. Please make sure Ollama and the Python backend are running."
                }
            ]);
    
        }
    
    };

    return (
        <div className="floatingChatbot">

            {!open && (
                <button
                    className="chatLauncher"
                    onClick={() => setOpen(true)}
                    aria-label="Open Trader Intelligence"
                >
                    <Sparkles size={18} />

                    <span>
                        Trader Intelligence
                    </span>

                    <span className="chatStatusDot" />
                </button>
            )}


            {open && (
                <div className="chatWindow">

                    {/* HEADER */}

                    <div className="chatHeader">

                        <div className="chatIdentity">

                            <div className="chatIcon">
                                <Sparkles size={16} />
                            </div>

                            <div>
                                <strong>
                                    Trader Intelligence
                                </strong>

                                <span>
                                    Spatial Market Assistant
                                </span>
                            </div>

                        </div>


                        <button
                            className="chatClose"
                            onClick={() => setOpen(false)}
                        >
                            <X size={17} />
                        </button>

                    </div>


                    {/* MARKET STATUS */}

                    <div className="chatMarketStatus">

                        <span>
                            ES
                        </span>

                        <span className="statusPositive">
                            ● Market Active
                        </span>

                    </div>


                    {/* MESSAGES */}

                    <div className="chatMessages">

                        {messages.map(
                            (item, index) => (

                                <div
                                    key={index}
                                    className={
                                        item.type === "bot"
                                            ? "chatMessage bot"
                                            : "chatMessage user"
                                    }
                                >
                                    {item.text}
                                </div>

                            )
                        )}

                    </div>


                    {/* QUICK ACTIONS */}

                    <div className="quickActions">

                        <button
                            onClick={() =>
                                setMessage(
                                    "Why is ES showing high risk?"
                                )
                            }
                        >
                            Why ES?
                        </button>

                        <button
                            onClick={() =>
                                setMessage(
                                    "Show liquidity changes"
                                )
                            }
                        >
                            Liquidity
                        </button>

                        <button
                            onClick={() =>
                                setMessage(
                                    "Show cross asset impact"
                                )
                            }
                        >
                            Cross-Asset
                        </button>

                    </div>


                    {/* INPUT */}

                    <div className="chatInput">

                        <input
                            value={message}
                            placeholder="Ask about the market..."
                            onChange={event =>
                                setMessage(
                                    event.target.value
                                )
                            }
                            onKeyDown={event => {

                                if (
                                    event.key === "Enter"
                                ) {
                                    sendMessage();
                                }

                            }}
                        />

                        <button
                            onClick={sendMessage}
                        >
                            <Send size={15} />
                        </button>

                    </div>

                </div>
            )}

        </div>
    );
}