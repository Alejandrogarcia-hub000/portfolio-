import React, { createContext, useContext, useRef, useCallback, useEffect, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export interface NavigationContextType {
  navigateTo: (path: string, title?: string) => void;
  playSubpageAnimation: (title: string) => Promise<void>;
  runWelcomeSequence: () => Promise<void>;
}

export const NavigationContext = createContext<NavigationContextType | null>(null);

export function useNavigationContext(): NavigationContextType {
  const ctx = useContext(NavigationContext);
  if (!ctx) {
    throw new Error('useNavigationContext must be used within NavigationProvider');
  }
  return ctx;
}

export function getPageTitle(pathname: string): string {
  const t = (pathname || '').toLowerCase();
  if (t.includes('work')) return 'Work';
  if (t.includes('about')) return 'About';
  if (t.includes('contact')) return 'Contact';
  return 'Home';
}

interface NavigationProviderProps {
  children: ReactNode;
}

export function NavigationProvider({ children }: NavigationProviderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const isNavigating = useRef(false);
  const initialMount = useRef(false);

  // Play outgoing animation (curtain lifts up)
  const playExitAnimation = useCallback(() => {
    return new Promise<void>((resolve) => {
      const container = document.querySelector('.loading-container') as HTMLElement | null;
      const screen = document.querySelector('.loading-screen') as HTMLElement | null;
      if (!container || !screen) {
        document.body.classList.remove('loading');
        return resolve();
      }

      const duration = 900;
      const h = screen.offsetHeight || window.innerHeight;
      const w = screen.offsetWidth || window.innerWidth;
      const curveHeight = Math.min(w * 0.35, h * 0.45);
      const steps = 32;
      let startTime: number | null = null;

      const heroScale = document.querySelector('.home-header .hero-scale') as HTMLElement | null;
      const bigName = document.querySelector('.home-header .big-name') as HTMLElement | null;
      if (heroScale) {
        heroScale.style.transition = 'none';
        heroScale.style.transformOrigin = '50% 100%';
      }

      const activeWord =
        container.querySelector('.loading-words h2.active') as HTMLElement | null ||
        container.querySelector('.loading-words h2:not([style*="display: none"])') as HTMLElement | null;

      const step = (time: number) => {
        if (startTime === null) startTime = time;
        const elapsed = Math.min((time - startTime) / duration, 1);
        const ease = 1 - Math.pow(1 - elapsed, 3);
        const curveFactor = Math.sin(elapsed * Math.PI);
        const currentCurve = curveHeight * (0.35 + 0.65 * curveFactor);
        const yPos = h + currentCurve - ease * (h + currentCurve * 2.8);

        const points: string[] = [];
        for (let i = 0; i <= steps; i++) {
          const ratio = i / steps;
          const y = yPos + currentCurve * 4 * ratio * (1 - ratio);
          points.push(`${(ratio * 100).toFixed(2)}% ${y.toFixed(1)}px`);
        }
        points.push('100% 0%', '0% 0%');
        screen.style.clipPath = `polygon(${points.join(', ')})`;

        if (activeWord && elapsed > 0.08) {
          activeWord.style.opacity = Math.max(0, 1 - (elapsed - 0.08) * 3.5).toFixed(3);
        }

        if (heroScale) {
          const translateY = (1 - ease) * 160;
          const scale = 0.88 + ease * 0.12;
          heroScale.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`;
        }

        if (bigName) {
          const translateY = (1 - ease) * 90;
          bigName.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0)`;
        }

        if (elapsed < 1) {
          requestAnimationFrame(step);
        } else {
          if (heroScale) {
            heroScale.style.transform = '';
            heroScale.style.transition = '';
          }
          if (bigName) {
            bigName.style.transform = '';
          }
          screen.style.clipPath = '';
          container.style.display = 'none';
          container.style.pointerEvents = 'none';
          container.style.zIndex = '';
          document.body.classList.remove('loading');
          document.documentElement.classList.remove('page-transitioning');
          if (activeWord) {
            activeWord.style.display = 'none';
            activeWord.classList.remove('active');
          }
          resolve();
        }
      };

      requestAnimationFrame(step);
    });
  }, []);

  // Play incoming animation (curtain drops from top/bottom)
  const playEnterAnimation = useCallback((title: string) => {
    return new Promise<void>((resolve) => {
      const container = document.querySelector('.loading-container') as HTMLElement | null;
      const screen = document.querySelector('.loading-screen') as HTMLElement | null;
      const wordsWrap = document.querySelector('.loading-words') as HTMLElement | null;
      if (!container || !screen) return resolve();

      container.style.display = 'block';
      container.style.pointerEvents = 'all';
      container.style.zIndex = '10000';
      document.body.classList.add('loading');

      const words = container.querySelectorAll('.loading-words h2') as NodeListOf<HTMLElement>;
      let targetWord: HTMLElement | null = null;

      words.forEach((w) => {
        w.style.display = 'none';
        w.classList.remove('active');
        w.style.opacity = '0';
        if (!w.classList.contains('home-active') && w.textContent?.trim().toLowerCase() === (title || '').toLowerCase()) {
          targetWord = w;
        }
      });

      if (!targetWord) {
        targetWord = (container.querySelector('.loading-words h2:not(.home-active)') as HTMLElement) || words[0];
        if (targetWord) {
          targetWord.innerHTML = `${title || ''}<div class="dot"></div>`;
        }
      }

      if (targetWord) {
        targetWord.style.display = 'block';
        targetWord.classList.add('active');
        targetWord.style.opacity = '0';
      }

      if (wordsWrap) wordsWrap.style.opacity = '1';

      const duration = 650;
      const h = screen.offsetHeight || window.innerHeight;
      const w = screen.offsetWidth || window.innerWidth;
      const curveHeight = Math.min(w * 0.35, h * 0.45);
      const steps = 32;
      let startTime: number | null = null;

      const step = (time: number) => {
        if (startTime === null) startTime = time;
        const elapsed = Math.min((time - startTime) / duration, 1);
        const ease = 1 - Math.pow(1 - elapsed, 3);
        const curveFactor = Math.sin(elapsed * Math.PI);
        const currentCurve = curveHeight * (0.35 + 0.65 * curveFactor);
        const yPos = h + currentCurve - ease * (h + currentCurve * 2.8);

        const points: string[] = [];
        for (let i = 0; i <= steps; i++) {
          const ratio = i / steps;
          const y = yPos - currentCurve * 4 * ratio * (1 - ratio);
          points.push(`${(ratio * 100).toFixed(2)}% ${y.toFixed(1)}px`);
        }
        points.push('100% 100%', '0% 100%');
        screen.style.clipPath = `polygon(${points.join(', ')})`;

        if (targetWord) {
          if (elapsed < 0.22) {
            targetWord.style.opacity = '0';
          } else if (elapsed < 0.65) {
            const op = (elapsed - 0.22) / 0.43;
            targetWord.style.opacity = op.toFixed(3);
          } else {
            targetWord.style.opacity = '1';
          }
        }

        if (elapsed < 1) {
          requestAnimationFrame(step);
        } else {
          screen.style.clipPath = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
          if (targetWord) targetWord.style.opacity = '1';
          resolve();
        }
      };

      requestAnimationFrame(step);
    });
  }, []);

  // Play subpage initial reveal
  const playSubpageAnimation = useCallback(
    (title: string) => {
      const container = document.querySelector('.loading-container') as HTMLElement | null;
      const screen = document.querySelector('.loading-screen') as HTMLElement | null;
      const wordsWrap = document.querySelector('.loading-words') as HTMLElement | null;
      if (!container || !screen) return Promise.resolve();

      container.style.display = 'block';
      container.style.pointerEvents = 'all';
      container.style.zIndex = '10000';
      screen.style.clipPath = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
      document.body.classList.add('loading');

      const words = container.querySelectorAll('.loading-words h2') as NodeListOf<HTMLElement>;
      words.forEach((w) => {
        w.style.display = 'none';
        w.style.opacity = '0';
        w.classList.remove('active');
      });

      let targetWord: HTMLElement | null = null;
      words.forEach((w) => {
        if (w.textContent?.trim().toLowerCase() === (title || '').toLowerCase()) {
          targetWord = w;
        }
      });

      if (!targetWord && words.length > 0) {
        targetWord = words[0];
        targetWord.innerHTML = `${title || ''}<div class="dot"></div>`;
      }

      if (targetWord) {
        targetWord.style.display = 'block';
        targetWord.classList.add('active');
        targetWord.style.opacity = '1';
      }
      if (wordsWrap) wordsWrap.style.opacity = '1';

      return new Promise<void>((r) => setTimeout(r, 260))
        .then(() => playExitAnimation())
        .then(() => {
          container.style.display = 'none';
          container.style.pointerEvents = 'none';
          document.body.classList.remove('loading');
          document.documentElement.classList.remove('page-transitioning');
        });
    },
    [playExitAnimation]
  );

  // Play initial home multilingual welcome sequence
  const runWelcomeSequence = useCallback(() => {
    const container = document.querySelector('.loading-container') as HTMLElement | null;
    const screen = document.querySelector('.loading-screen') as HTMLElement | null;
    const wordsWrap = document.querySelector('.loading-words') as HTMLElement | null;
    if (!container || !screen) return Promise.resolve();

    container.style.display = 'block';
    container.style.pointerEvents = 'all';
    container.style.zIndex = '10000';
    screen.style.clipPath = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
    document.body.classList.add('loading');

    const allWords = container.querySelectorAll('.loading-words h2') as NodeListOf<HTMLElement>;
    allWords.forEach((w) => {
      w.style.display = 'none';
      w.style.opacity = '0';
      w.classList.remove('active');
    });

    if (wordsWrap) wordsWrap.style.opacity = '1';

    const homeWords = container.querySelectorAll('.loading-words h2.home-active') as NodeListOf<HTMLElement>;
    const list = Array.from(homeWords);

    let chain = Promise.resolve();
    list.forEach((w, idx) => {
      const isLast = idx === list.length - 1;
      chain = chain.then(() => {
        w.style.display = 'block';
        w.style.transition = 'opacity .11s ease';
        w.style.opacity = '1';
        w.classList.add('active');

        if (isLast) {
          return new Promise<void>((r) => setTimeout(r, 300));
        } else {
          return new Promise<void>((r) => setTimeout(r, 120))
            .then(() => {
              w.style.opacity = '0';
              return new Promise<void>((r) => setTimeout(r, 50));
            })
            .then(() => {
              w.style.display = 'none';
              w.classList.remove('active');
            });
        }
      });
    });

    return chain
      .then(() => {
        document.body.classList.add('hero-reveal');
        return playExitAnimation();
      })
      .then(() => {
        container.style.display = 'none';
        container.style.pointerEvents = 'none';
        document.body.classList.remove('loading');
        document.documentElement.classList.remove('page-transitioning');
      });
  }, [playExitAnimation]);

  // Handle first mount
  useEffect(() => {
    if (initialMount.current) return;
    initialMount.current = true;

    if (location.pathname === '/' || location.pathname === '/index.html') {
      runWelcomeSequence();
    } else {
      const pageTitle = getPageTitle(location.pathname);
      playSubpageAnimation(pageTitle);
    }
  }, [location.pathname, runWelcomeSequence, playSubpageAnimation]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const pageTitle = getPageTitle(window.location.pathname);
      playSubpageAnimation(pageTitle === 'Home' ? 'Home' : pageTitle);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [playSubpageAnimation]);

  // Smooth programmatic navigation with page transition animation
  const navigateTo = useCallback(
    (targetPath: string, customTitle?: string) => {
      if (location.pathname === targetPath || isNavigating.current) return;
      isNavigating.current = true;
      const title = customTitle || getPageTitle(targetPath);

      document.body.classList.remove('nav-active');
      const hamburger = document.querySelector('.btn-hamburger');
      if (hamburger) hamburger.classList.remove('active');

      playEnterAnimation(title).then(() => {
        navigate(targetPath);
        window.scrollTo(0, 0);
        setTimeout(() => {
          playExitAnimation().then(() => {
            isNavigating.current = false;
          });
        }, 80);
      });
    },
    [location.pathname, navigate, playEnterAnimation, playExitAnimation]
  );

  return (
    <NavigationContext.Provider
      value={{
        navigateTo,
        playSubpageAnimation,
        runWelcomeSequence,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}
