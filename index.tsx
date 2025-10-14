import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleGenAI } from "https://aistudiocdn.com/@google/genai";
import { marked } from "https://aistudiocdn.com/marked@^13.0.0";

declare global {
    interface Window {
        portfolioData: any;
        process: {
            env: {
                API_KEY: string;
            }
        }
    }
}

interface PortfolioItemData {
  id: number;
  title: string;
  linkUrl?: string;
  videoUrl?: string;
  imageUrl: string;
  images?: string[];
}

interface PortfolioData {
  [category: string]: PortfolioItemData[];
}

const AUTOBIOGRAPHY_TEXT = `我是一名熱愛 3D 技術、虛擬製作與 AI 創作的 3D Artist，致力於不斷提升技能與知識，並在多個專案中累積了寶貴成果，擁有七年豐富經驗。
▶ 核心技能：涵蓋 3DMAX（動畫、建模、VRAY 材質渲染、TyFlow）、BLENDER（動畫、建模、GeometryNode）及 Substance Painter（PBR 貼圖製作）。精通 Unreal 引擎的 blueprint 與 Lumen 環境烘焙，能將精緻虛擬場景導入 Virtual Production 虛擬 LED 棚進行實務拍攝。
▶ 專案經驗：為客戶製作擬真 3D 家具與組裝動畫，並參與 IN3D 虛擬購物網站與全國電子虛擬購物網站與 AR 互動製作。透過 Blueprint 大幅提升效率。
▶ 製片廠經驗：參與電影**《老狐狸》虛擬製作**，能與導演、攝影師等合作的經驗，使虛擬環境與真實拍攝完美融合。
近年來，我也積極探索 AI 繪圖與影片生成技術，擁有從 Stable Diffusion 到 ComfyUI 再到 nano banana 的實戰經驗，並能運用 wan2.2、Kling Al 等工具進行影片生成。我具備基礎程式能力，並能運用 Google AI Studio、Cursor、Copilot 等 AI 輔助工具開發 App DEMO，將 AI 應用於更多元的創作領域。」

--------------------------------------------------------------------------------
個人履歷與經歷補充資訊
除了上述自傳內容外，作品集還提供了李承（David）的詳細履歷資訊：
基本資料
• 姓名： 李承 (David)
• 聯絡電話： 0903646800
• 電子郵件： 40248138@gm.nfu.edu.tw
• 出生日期： 1994/11/17
學歷
• 國立虎尾科技大學：多媒體設計系
• 台北市大安高工：圖文傳播科
工作經歷
• 珠峰數位影像有限公司：擔任 3D 建模/技術美術 (2017.11 至今)
證照
• 丙級圖文組版技術士
• Adobe Certified Associate
• MOS Microsoft
得獎經歷
• Wayfair 3D 建模廠商第一名 (2018)
• Overstock 3D 建模廠商第一名 (2019)
`;
const SEPARATOR = "\n---\n";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);
  
  return (
    <header className="app-header">
      <a href="#home" className="logo" onClick={closeMenu}>David<span>.</span></a>
      
      <nav className="nav-links">
        <a href="#about">About</a>
        <a href="#portfolio">Portfolio</a>
        <a href="#contact">Contact</a>
      </nav>

      <button className="burger-menu" onClick={toggleMenu} aria-label="Toggle Navigation" aria-expanded={isMenuOpen}>
        <span className="burger-line"></span>
        <span className="burger-line"></span>
        <span className="burger-line"></span>
      </button>

      <div className={`mobile-menu ${isMenuOpen ? 'is-open' : ''}`}>
        <button className="close-menu-btn" onClick={closeMenu} aria-label="Close Navigation">&times;</button>
        <nav className="mobile-nav-links">
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#portfolio" onClick={closeMenu}>Portfolio</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>
      </div>
    </header>
  );
};

const Hero = () => {
    const textRef = useRef<SVGTextElement>(null);
    
    useEffect(() => {
        const textElement = textRef.current;
        if (textElement) {
            const pathLength = textElement.getComputedTextLength();
            textElement.style.strokeDasharray = pathLength.toString();
            textElement.style.strokeDashoffset = pathLength.toString();
            textElement.classList.add('animate');
        }
    }, []);

    return (
        <section id="home" className="hero">
            <div className="hero-title-container">
                <svg className="hero-title-svg" viewBox="0 0 900 120">
                    <text
                        ref={textRef}
                        className="hero-title-text"
                        x="50%"
                        y="50%"
                        dy=".35em"
                        textAnchor="middle"
                    >
                        David's Portfolio
                    </text>
                </svg>
            </div>
            <h2 className="hero-subtitle">李承 作品集</h2>
            <a href="#about" className="scroll-down" aria-label="Scroll down">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
            </a>
        </section>
    );
};

const About = () => (
  <section id="about" className="section">
    <h2 className="section-title">個人簡介</h2>
    <div className="about-card">
      <div className="about-intro">
        <img src="/assets/profile-pic.jpg" alt="David Lee's profile picture" className="profile-pic" />
        <h3>李承</h3>
        <div className="contact-info">
          <p>📞 0903646800</p>
          <p>📧 40248138@gm.nfu.edu.tw</p>
          <p>🎂 1994/11/17</p>
        </div>
      </div>

      <div className="about-details">
        <div className="detail-section">
          <h4>學歷</h4>
          <ul>
            <li><strong>國立虎尾科技大學</strong><br/>多媒體設計系</li>
            <li><strong>台北市大安高工</strong><br/>圖文傳播科</li>
          </ul>
        </div>
        <div className="detail-section">
          <h4>工作經歷</h4>
          <ul>
            <li><strong>珠峰數位影像有限公司</strong><br/>3D建模/技術美術 (2017.11-至今)</li>
          </ul>
        </div>
        <div className="detail-section">
          <h4>證照</h4>
          <ul>
            <li>丙級圖文組版技術士</li>
            <li>Adobe Certified Associate</li>
            <li>MOS Microsoft</li>
          </ul>
        </div>
        <div className="detail-section">
          <h4>得獎經歷</h4>
          <ul>
            <li>Wayfair 3D 建模廠商第一名 (2018)</li>
            <li>Overstock 3D 建模廠商第一名 (2019)</li>
          </ul>
        </div>
        <div className="autobiography">
          <h4>自傳</h4>
           {AUTOBIOGRAPHY_TEXT.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const VideoModal = ({ videoUrl, onClose }: { videoUrl: string | null; onClose: () => void; }) => {
    if (!videoUrl) return null;

    return (
        <div className="video-modal-overlay" onClick={onClose}>
            <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="video-modal-close" onClick={onClose} aria-label="Close video player">&times;</button>
                <div className="video-responsive-container">
                    <iframe
                        src={`${videoUrl}?autoplay=1`}
                        title="Portfolio Video Player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

const ImageModal = ({ imageUrl, onClose }: { imageUrl: string | null; onClose: () => void; }) => {
    if (!imageUrl) return null;

    return (
        <div className="image-modal-overlay" onClick={onClose}>
            <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="image-modal-close" onClick={onClose} aria-label="Close image view">&times;</button>
                <img src={imageUrl} alt="Enlarged view" />
            </div>
        </div>
    );
};

const ImageSlideshow = ({ images = [] }: { images?: string[]; }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = useCallback(() => {
        setCurrentIndex(prevIndex => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    }, [images.length]);

    const goToNext = useCallback(() => {
        setCurrentIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, [images.length]);

    if (images.length === 0) {
        return <div className="slideshow-image-wrapper">No images available</div>;
    }

    return (
        <div className="slideshow-container">
            <div className="slideshow-image-wrapper">
                <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} className="slideshow-image" />
            </div>
            <button className="slideshow-nav prev" onClick={goToPrevious} aria-label="Previous slide">&#10094;</button>
            <button className="slideshow-nav next" onClick={goToNext} aria-label="Next slide">&#10095;</button>
            <div className="slideshow-counter">{currentIndex + 1} / {images.length}</div>
        </div>
    );
};

const PortfolioItem = ({ item, onVideoClick }: { item: PortfolioItemData; onVideoClick: (url: string) => void; }) => {
    const isClickable = item.videoUrl || item.linkUrl;
    
    const handleClick = () => {
        if (item.videoUrl) {
            onVideoClick(item.videoUrl);
        } else if (item.linkUrl) {
            window.open(item.linkUrl, '_blank', 'noopener,noreferrer');
        }
    };
    
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
        }
    };

    let icon = null;
    if (item.videoUrl) {
        icon = <div className="play-icon"></div>;
    } else if (item.linkUrl) {
        icon = <div className="link-icon"></div>;
    }

    return (
        <div 
            className="portfolio-item"
            onClick={isClickable ? handleClick : undefined}
            onKeyDown={isClickable ? handleKeyDown : undefined}
            tabIndex={isClickable ? 0 : -1}
            role={isClickable ? "button" : undefined}
            aria-label={`View project: ${item.title}`}
        >
            {item.images ? (
                <ImageSlideshow images={item.images} />
            ) : (
                <div className="portfolio-item-image" style={{ backgroundImage: `url("${item.imageUrl}")` }}>
                    {icon}
                </div>
            )}
            <p className="portfolio-item-title">{item.title}</p>
        </div>
    );
};

const FeaturedSlideshow = () => {
    const images = Array.from({ length: 12 }, (_, i) => `/assets/P_${i + 1}.jpg`);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const goToPrevious = useCallback(() => {
        setCurrentIndex(prevIndex => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    }, [images.length]);

    const goToNext = useCallback(() => {
        setCurrentIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, [images.length]);

    const openImage = (imageUrl: string) => {
        setSelectedImage(imageUrl);
    };

    const closeImage = useCallback(() => {
        setSelectedImage(null);
    }, []);

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
           if (event.key === 'Escape') {
            closeImage();
           }
        };
        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [closeImage]);


    return (
        <React.Fragment>
            <div className="featured-slideshow-container">
                <div 
                  className="featured-image-wrapper"
                  onClick={() => openImage(images[currentIndex])}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && openImage(images[currentIndex])}
                  role="button"
                  aria-label={`View featured work ${currentIndex + 1} in full screen`}
                >
                    <img 
                        key={currentIndex}
                        src={images[currentIndex]} 
                        alt={`Featured work ${currentIndex + 1}`} 
                        className="featured-image"
                        loading="lazy" 
                    />
                </div>
                
                <button className="featured-slideshow-nav prev" onClick={goToPrevious} aria-label="Previous slide">&#10094;</button>
                <button className="featured-slideshow-nav next" onClick={goToNext} aria-label="Next slide">&#10095;</button>
                
                <div className="featured-slideshow-counter">{currentIndex + 1} / {images.length}</div>
            </div>
            <ImageModal imageUrl={selectedImage} onClose={closeImage} />
        </React.Fragment>
    );
};

const Portfolio = () => {
    const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

    useEffect(() => {
      if (window.portfolioData) {
        setPortfolioData(window.portfolioData);
      } else {
        console.error("Error: Portfolio data not found on window object. Make sure it's embedded in your HTML.");
      }
    }, []);

    const handleVideoClick = (videoUrl: string) => {
        setSelectedVideo(videoUrl);
    };

    const closeVideoModal = useCallback(() => {
        setSelectedVideo(null);
    }, []);
    
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
           if (event.key === 'Escape') {
            closeVideoModal();
           }
        };
        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [closeVideoModal]);

    if (!portfolioData) {
        return <section id="portfolio" className="section"><h2 className="section-title">作品集</h2><div>Loading...</div></section>;
    }

    return (
        <section id="portfolio" className="section">
            <h2 className="section-title">作品集</h2>
            <FeaturedSlideshow />
            {Object.entries(portfolioData).map(([category, items]) => (
                <div key={category} className="portfolio-category">
                    <h3 className="portfolio-category-title">{category}</h3>
                    <div className="portfolio-grid">
                        {items.map((item: PortfolioItemData) => (
                            <PortfolioItem key={item.id} item={item} onVideoClick={handleVideoClick} />
                        ))}
                    </div>
                </div>
            ))}
            <VideoModal videoUrl={selectedVideo} onClose={closeVideoModal} />
        </section>
    );
};

const Footer = () => (
    <footer id="contact" className="app-footer">
        <div className="footer-contact">
            <h4>聯絡方式</h4>
            <p>李承 (David)</p>
            <p>📞 Phone: 0903646800</p>
            <p>📧 Email: 40248138@gm.nfu.edu.tw</p>
        </div>
        <p className="copyright">&copy; {new Date().getFullYear()} David's Portfolio. All Rights Reserved.</p>
    </footer>
);

// --- Chat Components ---
interface Message {
  role: 'user' | 'assistant';
  content: string;
  context?: string[];
}

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "你好！我可以回答關於這位3D藝術家專業背景的問題。你想知道些什麼？",
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messageListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: 'AIzaSyAE1jE3tzQ0f2f6L9cJsJtzDY6WTHkXoxo' });
      
      const retrievalPrompt = `You are a research assistant. From the following document, extract the most relevant sections that can help answer the user's question. The document is in Chinese. Output only the extracted text, separated by '${SEPARATOR}'.\n\nDOCUMENT:\n${AUTOBIOGRAPHY_TEXT}\n\nUSER QUESTION:\n${input}`;
      
      const model = 'gemini-2.5-flash';
      let retrieveResponse = await ai.models.generateContent({
        model,
        contents: retrievalPrompt,
      });

      const retrievedContext = retrieveResponse.text.split(SEPARATOR).filter(t => t.trim());
      
      const generationPrompt = `You are a helpful chatbot. Answer the user's question in Traditional Chinese based *only* on the provided context. Be concise and clear. If the context is insufficient, say you don't know the answer based on the provided text.\n\nCONTEXT:\n${retrievedContext.join('\n\n')}\n\nUSER QUESTION:\n${input}`;
      
      let finalResponse = await ai.models.generateContent({
        model,
        contents: generationPrompt,
      });

      const assistantMessage: Message = {
        role: 'assistant',
        content: finalResponse.text,
        context: retrievedContext.length > 0 ? retrievedContext : undefined,
      };
      setMessages(prev => [...prev, assistantMessage]);

    } catch (error) {
      console.error("Error generating content:", error);
      let content = "抱歉，我遇到了一些問題，請稍後再試。";
      if (error instanceof ReferenceError || (error instanceof Error && error.message.includes("API key"))) {
        content = "抱歉，AI 助理功能目前無法使用。";
      }
      const errorMessage: Message = {
        role: 'assistant',
        content: content,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTextareaKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <>
      <header>
        <h1>AI 助理</h1>
      </header>
      <div className="message-list" ref={messageListRef}>
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            <div className="bubble" dangerouslySetInnerHTML={{ __html: marked.parse(msg.content) }}></div>
            {msg.role === 'assistant' && msg.context && (
              <div className="context-section">
                <h3>Retrieved Context</h3>
                {msg.context.map((ctx, i) => (
                  <p key={i} className="context-item">{ctx.trim()}</p>
                ))}
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="message loading">
            <div className="spinner"></div>
          </div>
        )}
      </div>
      <form className="input-form" onSubmit={handleSendMessage}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleTextareaKey}
          placeholder="詢問關於此文件內容的問題..."
          aria-label="Chat input"
          rows={1}
        />
        <button type="submit" disabled={isLoading || !input.trim()} aria-label="Send message">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
        </button>
      </form>
    </>
  );
};

const ChatWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleChat = () => setIsOpen(!isOpen);

    return (
        <div className="chat-widget">
            <div className={`chat-container ${isOpen ? 'open' : 'closed'}`}>
                <ChatWindow />
            </div>
            <button className="chat-launcher" onClick={toggleChat} aria-label={isOpen ? "Close chat" : "Open chat"}>
                {isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                )}
            </button>
        </div>
    );
}

// --- Main App ---
const App = () => (
    <React.Fragment>
        <Header />
        <main>
            <Hero />
            <About />
            <Portfolio />
        </main>
        <Footer />
        <ChatWidget />
    </React.Fragment>
);

const container = document.getElementById('root');
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}