

import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

const Header = () => (
  <header className="app-header">
    <a href="#home" className="logo">David<span>.</span></a>
    <nav className="nav-links">
      <a href="#about">About</a>
      <a href="#portfolio">Portfolio</a>
      <a href="#contact">Contact</a>
    </nav>
  </header>
);

const Hero = () => (
    <section id="home" className="hero">
        <div className="hero-title-container">
            <svg className="hero-title-svg" viewBox="0 0 900 120">
                <text
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

const About = () => (
  <section id="about" className="section">
    <h2 className="section-title">個人簡介</h2>
    <div className="about-card">
      <div className="about-intro">
        <img src="https://gmnfuedutw-my.sharepoint.com/:i:/g/personal/40248138_gm_nfu_edu_tw/EX8c3mj7JdFAhYK4QTRblH0BNxUNyl0pPVU78mpTQKxO5Q?e=5YQVSi&download=1" alt="David Lee's profile picture" className="profile-pic" />
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
          <p>我是一名熱愛 3D技術、虛擬製作與AI創作 的 3D Artist，具備七年豐富經驗。我致力於不斷提升技能與知識，並在多個專案中累積了寶貴成果。</p>
          <p>我的核心技能涵蓋 3DMAX（動畫、建模、VRAY 材質渲染、TyFlow）、BLENDER（動畫、建模、GeometryNode）及 Substance Painter（PBR 貼圖製作）。我精通 Unreal 引擎的 blueprint 與 Lumen 環境烘焙，能將精緻虛擬場景導入 Virtual Production 虛擬 LED 棚進行實務拍攝。在專案上，我曾為客戶製作擬真 3D 家具與組裝動畫，並參與 IN3D 虛擬購物網站與全國電子虛擬購物網站的 VR 互動製作，透過 Blueprint 大幅提升效率。製片廠的經驗也讓我具備與導演、攝影師等協作的能力，確保虛擬環境與真實拍攝完美融合。</p>
          <p>近年來，我也積極探索 AI 繪圖與影片生成技術，擁有從 Stable Diffusion 到 ComfyUI 再到 nano banana 的實戰經驗，並能運用 wan2.2、Kling AI 等工具進行影片生成。我具備基礎程式能力，並能運用 Google AI Studio、Cursor、Copilot 等 AI 輔助工具開發 App DEMO，將 AI 應用於更多元的創作領域。</p>
        </div>
      </div>
    </div>
  </section>
);

const VideoModal = ({ videoUrl, onClose }) => {
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

const PortfolioItem = ({ item, onVideoClick }) => {
    const isVideo = !!item.videoUrl;
    const isLink = !!item.linkUrl;

    const handleClick = () => {
        if (isVideo) {
            onVideoClick(item.videoUrl);
        } else if (isLink) {
            window.open(item.linkUrl, '_blank', 'noopener,noreferrer');
        }
    };
    
    const handleKeyPress = (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            handleClick();
        }
    };

    return (
        <div 
          className={`portfolio-item ${item.placeholder ? 'placeholder' : ''}`}
          onClick={item.placeholder ? null : handleClick}
          onKeyPress={item.placeholder ? null : handleKeyPress}
          tabIndex={item.placeholder ? -1 : 0}
          role="button"
          aria-label={`View project: ${item.title}`}
        >
            <div 
                className={`portfolio-item-image ${item.placeholder ? 'placeholder-image' : ''}`} 
                style={{ 
                    backgroundImage: item.imageUrl ? `url(${item.imageUrl})` : 'none' 
                }}
            >
                {item.placeholder ? (
                    <span className="ai-icon">AI</span>
                ) : isVideo ? (
                    <div className="play-icon" aria-hidden="true"></div>
                ) : isLink ? (
                    <div className="link-icon" aria-hidden="true"></div>
                ) : null}
            </div>
            <h4 className="portfolio-item-title">{item.title}</h4>
        </div>
    );
};

// FIX: Define interfaces for portfolio data to ensure type safety, resolving the `items.map` error.
interface PortfolioItemData {
    id: number | string;
    title: string;
    videoUrl?: string;
    linkUrl?: string;
    imageUrl?: string;
    placeholder?: boolean;
}

interface PortfolioData {
    [category: string]: PortfolioItemData[];
}

const Portfolio = () => {
    const [modalVideoUrl, setModalVideoUrl] = useState(null);
    const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);

    useEffect(() => {
        // Load initial data
        fetch('portfolio-data.json')
            .then(response => response.json())
            .then(data => setPortfolioData(data))
            .catch(error => console.error('Error loading portfolio data:', error));

        // ESC key to close modal
        const handleEsc = (event) => {
           if (event.key === 'Escape') {
              closeModal();
           }
        };
        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, []);

    const handleVideoClick = (videoUrl) => {
        setModalVideoUrl(videoUrl);
    };

    const closeModal = () => {
        setModalVideoUrl(null);
    };

    if (!portfolioData) {
        return (
            <section id="portfolio" className="section">
                <h2 className="section-title">作品集</h2>
                <p style={{textAlign: 'center'}}>Loading portfolio...</p>
            </section>
        );
    }

    return (
        <section id="portfolio" className="section">
            <h2 className="section-title">作品集</h2>
            <div className="portfolio-controls">
                <a 
                    href="https://gmnfuedutw-my.sharepoint.com/:b:/g/personal/40248138_gm_nfu_edu_tw/ER4bxtqq1lVDlaHKxP7fxTYB1gKolSedjOK-Iwt1culJLg?e=aWdT7V" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="portfolio-btn" 
                    role="button"
                >
                    查看完整履歷 (PDF)
                </a>
            </div>
            {Object.entries(portfolioData).map(([category, items]) => (
                <div key={category} className="portfolio-category">
                    <h3 className="portfolio-category-title">{category}</h3>
                    <div className={`portfolio-grid ${category === '3D' || category === 'AI & 程式' ? 'portfolio-grid-3-col' : ''}`}>
                        {items.map(item => (
                            <PortfolioItem key={item.id} item={item} onVideoClick={handleVideoClick} />
                        ))}
                    </div>
                </div>
            ))}
            <VideoModal videoUrl={modalVideoUrl} onClose={closeModal} />
        </section>
    );
};


const Footer = () => (
    <footer id="contact" className="app-footer">
        <div className="footer-contact">
            <h4>聯絡資訊</h4>
            <p>📞 0903646800</p>
            <p>📧 40248138@gm.nfu.edu.tw</p>
        </div>
        <p className="copyright">&copy; {new Date().getFullYear()} David Lee. All Rights Reserved.</p>
    </footer>
);


const App = () => (
    <>
        <Header />
        <main>
            <Hero />
            <About />
            <Portfolio />
        </main>
        <Footer />
    </>
);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);