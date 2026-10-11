import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useInteractions() {
  const location = useLocation();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cleanups: (() => void)[] = [];

    window.scrollTo(0, 0);

    // 1. Main scroll indicator class
    const main = document.querySelector('main');
    const handleScroll = () => {
      if (main) {
        main.classList.toggle('scrolled', window.scrollY > 60);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    cleanups.push(() => window.removeEventListener('scroll', handleScroll));

    // 2. Element reveal animations
    const revealElements = document.querySelectorAll<HTMLElement>('.reveal, .span-lines, .once-in');
    document.querySelectorAll<HTMLElement>('.span-lines').forEach((el) => {
      el.querySelectorAll<HTMLElement>('.span-line-inner').forEach((line, idx) => {
        line.style.transitionDelay = `${idx * 0.12}s`;
      });
    });

    let observer: IntersectionObserver | null = null;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const target = entry.target as HTMLElement;
            if (entry.isIntersecting) {
              target.classList.add('in-view');
              if (!target.classList.contains('span-lines')) {
                observer?.unobserve(target);
              }
            } else if (target.classList.contains('span-lines') && entry.boundingClientRect.top > 0) {
              target.classList.remove('in-view');
            }
          });
        },
        { threshold: [0, 0.1], rootMargin: '0px 0px -5% 0px' }
      );
      revealElements.forEach((el) => observer?.observe(el));
    } else {
      revealElements.forEach((el) => el.classList.add('in-view'));
    }

    setTimeout(() => {
      revealElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
          el.classList.add('in-view');
        }
      });
    }, 150);

    // 3. Dubai local time
    const timeSpan = document.getElementById('timeSpan');
    let timerInterval: ReturnType<typeof setInterval> | null = null;
    if (timeSpan) {
      const updateTime = () => {
        try {
          timeSpan.textContent =
            new Intl.DateTimeFormat('en-GB', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
              timeZone: 'Asia/Dubai',
            })
              .format(new Date())
              .toLowerCase() + ' GST';
        } catch {
          timeSpan.textContent = new Date().toLocaleTimeString() + ' GST';
        }
      };
      updateTime();
      timerInterval = setInterval(updateTime, 15000);
      cleanups.push(() => {
        if (timerInterval) clearInterval(timerInterval);
      });
    }

    // 4. Magnetic buttons physics
    if (!prefersReducedMotion) {
      const magneticButtons = document.querySelectorAll<HTMLElement>('.btn-click.magnetic, .btn-click');
      magneticButtons.forEach((btn) => {
        const text = btn.querySelector<HTMLElement>('.btn-text');
        let animId: number | null = null;
        let curX = 0;
        let curY = 0;
        let targetX = 0;
        let targetY = 0;
        let textCurX = 0;
        let textCurY = 0;
        let textTargetX = 0;
        let textTargetY = 0;
        let curRot = 0;
        let targetRot = 0;
        let curScale = 1;
        let targetScale = 1;
        let isHovered = false;

        const strength = parseFloat(btn.getAttribute('data-strength') || '40');
        const textStrength = parseFloat(btn.getAttribute('data-strength-text') || '20');

        const tick = () => {
          curX += (targetX - curX) * 0.22;
          curY += (targetY - curY) * 0.22;
          curRot += (targetRot - curRot) * 0.18;
          curScale += (targetScale - curScale) * 0.18;

          if (text) {
            textCurX += (textTargetX - textCurX) * 0.24;
            textCurY += (textTargetY - textCurY) * 0.24;
            text.style.transform = `translate3d(${textCurX.toFixed(2)}px, ${textCurY.toFixed(2)}px, 0)`;
          }

          btn.style.transform = `translate3d(${curX.toFixed(2)}px, ${curY.toFixed(2)}px, 0) rotate(${curRot.toFixed(3)}deg) scale(${curScale.toFixed(4)})`;

          if (
            isHovered ||
            Math.abs(targetX - curX) > 0.1 ||
            Math.abs(targetY - curY) > 0.1 ||
            Math.abs(targetRot - curRot) > 0.05 ||
            Math.abs(targetScale - curScale) > 0.005
          ) {
            animId = requestAnimationFrame(tick);
          } else {
            btn.style.transform = '';
            if (text) text.style.transform = '';
            animId = null;
          }
        };

        const startAnim = () => {
          if (animId === null) {
            animId = requestAnimationFrame(tick);
          }
        };

        const handleMouseEnter = () => {
          isHovered = true;
          targetScale = 1.04;
          if (btn.closest('.btn-left-top')) {
            targetRot = -2.5;
            targetX = 2;
            targetY = 0;
          }
          startAnim();
        };

        const handleMouseMove = (e: MouseEvent) => {
          const rect = btn.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const deltaX = e.clientX - centerX;
          const deltaY = e.clientY - centerY;

          targetX = (deltaX / (rect.width / 2)) * (strength * 0.45);
          targetY = (deltaY / (rect.height / 2)) * (strength * 0.45);

          if (text) {
            textTargetX = (deltaX / (rect.width / 2)) * (textStrength * 0.55);
            textTargetY = (deltaY / (rect.height / 2)) * (textStrength * 0.55);
          }
          startAnim();
        };

        const handleMouseLeave = () => {
          isHovered = false;
          targetX = 0;
          targetY = 0;
          targetRot = 0;
          targetScale = 1;
          textTargetX = 0;
          textTargetY = 0;
          startAnim();
        };

        btn.addEventListener('mouseenter', handleMouseEnter);
        btn.addEventListener('mousemove', handleMouseMove);
        btn.addEventListener('mouseleave', handleMouseLeave);

        cleanups.push(() => {
          btn.removeEventListener('mouseenter', handleMouseEnter);
          btn.removeEventListener('mousemove', handleMouseMove);
          btn.removeEventListener('mouseleave', handleMouseLeave);
          if (animId) cancelAnimationFrame(animId);
        });
      });
    }

    // 5. Giant Header Marquee with velocity and direction response
    const nameH1 = document.querySelector<HTMLElement>('.home-header .big-name .name-h1');
    if (nameH1) {
      let offset = 0;
      let dir = -1;
      let speedScale = 1;
      let scrollBoost = 0;
      let lastScrollY = window.scrollY;
      let lastTime = performance.now();
      let reqId: number | null = null;

      const updateScale = () => {
        const halfWidth = nameH1.scrollWidth / 2;
        speedScale = halfWidth > 0 ? halfWidth / 26000 : 1;
      };
      updateScale();
      window.addEventListener('resize', updateScale);

      const onScroll = () => {
        const curY = window.scrollY;
        const delta = Math.abs(curY - lastScrollY);
        if (curY > lastScrollY + 1) dir = -1;
        else if (curY < lastScrollY - 1) dir = 1;
        if (delta > 0) scrollBoost = Math.min(6, scrollBoost + delta * 0.35);
        lastScrollY = curY;
      };
      window.addEventListener('scroll', onScroll, { passive: true });

      const animateMarquee = (now: number) => {
        const dt = Math.min(now - lastTime, 48);
        lastTime = now;
        offset += dir * speedScale * (1 + scrollBoost) * dt;
        scrollBoost *= Math.pow(0.985, dt / 16);
        if (scrollBoost < 0.01) scrollBoost = 0;

        const halfWidth = nameH1.scrollWidth / 2;
        if (halfWidth > 0) {
          if (offset <= -halfWidth) offset += halfWidth;
          if (offset > 0) offset -= halfWidth;
        }

        nameH1.style.transform = `translateX(${offset.toFixed(2)}px)`;
        reqId = requestAnimationFrame(animateMarquee);
      };
      reqId = requestAnimationFrame(animateMarquee);

      cleanups.push(() => {
        window.removeEventListener('resize', updateScale);
        window.removeEventListener('scroll', onScroll);
        if (reqId) cancelAnimationFrame(reqId);
      });
    }

    // 6. Interactive Floating Follower on projects hover
    if (!prefersReducedMotion && window.innerWidth > 1024) {
      const mouseImage = document.querySelector<HTMLElement>('.mouse-pos-list-image');
      const mouseBtn = document.querySelector<HTMLElement>('.mouse-pos-list-btn');
      const mouseSpan = document.querySelector<HTMLElement>('.mouse-pos-list-span');
      const triggerItems = document.querySelectorAll<HTMLElement>('.hover-row, .work-items li, .work-tiles li');
      const previewInners = document.querySelectorAll<HTMLElement>('.mouse-pos-list-image-inner');

      if (mouseImage && triggerItems.length > 0) {
        let mouseX = 0;
        let mouseY = 0;
        let curX = 0;
        let curY = 0;
        let isHovering = false;
        let animId: number | null = null;

        const onMouseMove = (e: MouseEvent) => {
          mouseX = e.clientX;
          mouseY = e.clientY;
          if (!animId && isHovering) {
            animId = requestAnimationFrame(tickCursor);
          }
        };

        const tickCursor = () => {
          const dx = mouseX - curX;
          const dy = mouseY - curY;
          if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
            curX += dx * 0.16;
            curY += dy * 0.16;
          } else {
            curX = mouseX;
            curY = mouseY;
          }

          const transformStr = `translate3d(${curX.toFixed(1)}px, ${curY.toFixed(1)}px, 0) translate(-50%, -50%)`;
          mouseImage.style.transform = transformStr;
          if (mouseBtn) mouseBtn.style.transform = transformStr;
          if (mouseSpan) mouseSpan.style.transform = transformStr;

          if (isHovering || Math.abs(mouseX - curX) > 0.5 || Math.abs(mouseY - curY) > 0.5) {
            animId = requestAnimationFrame(tickCursor);
          } else {
            animId = null;
          }
        };

        document.addEventListener('mousemove', onMouseMove);

        triggerItems.forEach((item) => {
          const handleEnter = () => {
            const projectId = item.getAttribute('data-project');
            const projectIndex = item.getAttribute('data-index');

            previewInners.forEach((inner) => {
              const matchId = projectId && inner.getAttribute('data-project') === projectId;
              const matchIdx = projectIndex && inner.getAttribute('data-index') === projectIndex;
              inner.classList.toggle('visible', Boolean(matchId || matchIdx));
            });

            isHovering = true;
            mouseImage.classList.add('active');
            if (mouseBtn) mouseBtn.classList.add('active');
            if (mouseSpan) mouseSpan.classList.add('active');
            if (!animId) animId = requestAnimationFrame(tickCursor);
          };

          const handleLeave = () => {
            isHovering = false;
            mouseImage.classList.remove('active');
            if (mouseBtn) mouseBtn.classList.remove('active');
            if (mouseSpan) mouseSpan.classList.remove('active');
          };

          item.addEventListener('mouseenter', handleEnter);
          item.addEventListener('mouseleave', handleLeave);

          cleanups.push(() => {
            item.removeEventListener('mouseenter', handleEnter);
            item.removeEventListener('mouseleave', handleLeave);
          });
        });

        cleanups.push(() => {
          document.removeEventListener('mousemove', onMouseMove);
          if (animId) cancelAnimationFrame(animId);
        });
      }
    }

    // 7. Home intro button parallax
    const homeIntro = document.querySelector<HTMLElement>('.home-intro');
    const introBtnWrap = homeIntro ? homeIntro.querySelector<HTMLElement>('.btn-wrap-intro') : null;
    if (homeIntro && introBtnWrap) {
      let isTicking = false;
      const updateIntroParallax = () => {
        const rect = homeIntro.getBoundingClientRect();
        const winH = window.innerHeight;
        const total = winH * 0.85 + rect.height * 0.5;
        const dist = winH - rect.top;
        const progress = Math.max(0, Math.min(1, dist / total));
        const startY = 110;
        const endY = -105;
        const curY = startY + (endY - startY) * progress;
        introBtnWrap.style.transform = `translate3d(0, ${curY.toFixed(2)}px, 0)`;
        isTicking = false;
      };

      const onScrollIntro = () => {
        if (!isTicking) {
          requestAnimationFrame(updateIntroParallax);
          isTicking = true;
        }
      };

      window.addEventListener('scroll', onScrollIntro, { passive: true });
      window.addEventListener('resize', updateIntroParallax);
      updateIntroParallax();

      cleanups.push(() => {
        window.removeEventListener('scroll', onScrollIntro);
        window.removeEventListener('resize', updateIntroParallax);
      });
    }

    // 8. Dennis Snellenberg Parallax Footer Effect
    const footerWrap = document.querySelector<HTMLElement>('.footer-wrap');
    const footerSpacer = document.querySelector<HTMLElement>('.footer-spacer');
    const footerRoundedWrap = document.querySelector<HTMLElement>('.footer-rounded-div .rounded-div-wrap');
    const footerEl = footerWrap ? footerWrap.querySelector<HTMLElement>('.footer') : null;
    const footerH2 = footerWrap ? footerWrap.querySelector<HTMLElement>('.container.medium .row:nth-child(1) h2') : null;
    const btnFixed = footerWrap ? footerWrap.querySelector<HTMLElement>('.btn-fixed') : null;
    const row2 = footerWrap ? footerWrap.querySelector<HTMLElement>('.container.medium .row:nth-child(2)') : null;
    const arrow = footerWrap ? footerWrap.querySelector<HTMLElement>('.arrow') : null;

    if (footerWrap && footerSpacer) {
      let curProgress = 0;
      let targetProgress = 0;
      let animId: number | null = null;

      const setSpacerHeight = () => {
        const winH = window.innerHeight;
        const footerH = footerEl ? footerEl.offsetHeight : 0;
        footerSpacer.style.height = `${Math.max(winH * 0.9, footerH)}px`;
      };

      const onScrollFooter = () => {
        const rect = footerSpacer.getBoundingClientRect();
        const winH = window.innerHeight;
        const totalH = rect.height || winH;
        const dist = winH - rect.top;
        targetProgress = Math.max(0, Math.min(1, dist / totalH));

        if (dist > -40) {
          footerWrap.classList.add('visible');
        } else {
          footerWrap.classList.remove('visible');
        }

        if (!animId) animId = requestAnimationFrame(tickFooter);
      };

      const tickFooter = () => {
        const diff = targetProgress - curProgress;
        if (Math.abs(diff) > 0.0005) {
          curProgress += diff * 0.14;
        } else {
          curProgress = targetProgress;
        }

        const p = curProgress;

        if (footerRoundedWrap) {
          const vh = (1 - p) * 8;
          footerRoundedWrap.style.height = `${Math.max(0, vh).toFixed(2)}vh`;
        }

        if (footerEl) {
          const dy = (1 - p) * 280;
          footerEl.style.transform = `translate3d(0, ${dy.toFixed(2)}px, 0)`;
        }

        if (footerH2) {
          const dy = (1 - p) * 60;
          footerH2.style.transform = `translate3d(0, ${dy.toFixed(2)}px, 0)`;
        }

        if (arrow) {
          const rot = (1 - p) * 15;
          arrow.style.transform = `rotate(${rot.toFixed(1)}deg)`;
        }

        if (btnFixed && row2) {
          const rowW = row2.offsetWidth;
          const shiftX = -Math.min(rowW * 0.35, 400) * (1 - Math.pow(p, 0.85));
          const shiftY = (1 - p) * 45;
          const rot = (1 - p) * -10;
          btnFixed.style.transform = `translate3d(calc(-50% + ${shiftX.toFixed(1)}px), calc(-50% + ${shiftY.toFixed(1)}px), 0) rotate(${rot.toFixed(1)}deg)`;
        }

        if (Math.abs(targetProgress - curProgress) > 0.0005) {
          animId = requestAnimationFrame(tickFooter);
        } else {
          animId = null;
        }
      };

      window.addEventListener('scroll', onScrollFooter, { passive: true });
      window.addEventListener('resize', () => {
        setSpacerHeight();
        onScrollFooter();
      });
      setSpacerHeight();
      onScrollFooter();

      cleanups.push(() => {
        window.removeEventListener('scroll', onScrollFooter);
        if (animId) cancelAnimationFrame(animId);
      });
    }

    return () => {
      if (observer) observer.disconnect();
      cleanups.forEach((fn) => fn());
    };
  }, [location.pathname]);
}
