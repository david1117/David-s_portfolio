import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

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
          <p>我是一名熱愛 3D技術、虛擬製作與AI創作的3DArtist,致力於不斷提升技能與知識,並在多個專案中累積了寶貴成果,擁有七年豐富經驗。</p>
          <p>▶核心技能:涵蓋3DMAX(動畫、建模、VRAY 材質渲染、TyFlow)BLENDER(動畫、建模、GeometryNode)及Substance Painter (PBR 貼圖製作) 。 ,精通 Unreal 引擎的 blueprint 與 Lumen 環境烘焙,能將精緻虛擬場景導入 Virtual Production 虛擬LED 棚進行實務拍攝。</p>
          <p>▶專案經驗:為客戶製作擬真 3D家具與組裝動畫,並參與IN3D虛擬購物網站與全國電子虛擬購物網站與AR互動製作,透過Blueprint 大幅提升效率。</p>
          <p>▶製片廠經驗:參與電影《老狐狸》虛擬製作,能與導演、攝影師等合作的經驗,使虛擬環境與真實拍攝完美融合。</p>  
          <p>近年來,我也積極探索 AI 繪圖與影片生成技術,擁有從 Stable Diffusion到 ComfyUI 再到 nano banana 的實戰經驗,並能運用wan2.2、Kling Al等工具進行影片生成。我具備基礎程式能力,並能運用 Google AI Studio、Cursor、Copilot等AI 輔助工具開發 App DEMO,將AI應用於更多元的創作領域。</p>
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
            style={{ cursor: isClickable ? 'pointer' : 'default' }}
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
      fetch('/portfolio-data.json')
        .then(response => response.json())
        .then(data => setPortfolioData(data))
        .catch(error => console.error("Error fetching portfolio data:", error));
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

const App = () => (
    <React.Fragment>
        <Header />
        <main>
            <Hero />
            <About />
            <Portfolio />
        </main>
        <Footer />
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