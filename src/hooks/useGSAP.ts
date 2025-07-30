import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export const useGSAP = () => {
  const ctx = useRef<gsap.Context>();

  useEffect(() => {
    ctx.current = gsap.context(() => {});
    return () => ctx.current?.revert();
  }, []);

  return ctx.current;
};

// Common animation presets
export const animations = {
  fadeIn: (element: string | Element, options?: gsap.TweenVars) => {
    return gsap.fromTo(element, 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", ...options }
    );
  },

  slideInLeft: (element: string | Element, options?: gsap.TweenVars) => {
    return gsap.fromTo(element,
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power2.out", ...options }
    );
  },

  slideInRight: (element: string | Element, options?: gsap.TweenVars) => {
    return gsap.fromTo(element,
      { opacity: 0, x: 100 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power2.out", ...options }
    );
  },

  scaleIn: (element: string | Element, options?: gsap.TweenVars) => {
    return gsap.fromTo(element,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)", ...options }
    );
  },

  staggerFadeIn: (elements: string | Element[], options?: gsap.TweenVars) => {
    return gsap.fromTo(elements,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out", ...options }
    );
  },

  parallaxScroll: (element: string | Element, speed: number = 0.5) => {
    return gsap.to(element, {
      yPercent: -50 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  },

  hoverScale: (element: string | Element) => {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!el) return;

    el.addEventListener('mouseenter', () => {
      gsap.to(el, { scale: 1.05, duration: 0.3, ease: "power2.out" });
    });

    el.addEventListener('mouseleave', () => {
      gsap.to(el, { scale: 1, duration: 0.3, ease: "power2.out" });
    });
  },

  countUp: (element: string | Element, endValue: number, options?: gsap.TweenVars) => {
    const obj = { value: 0 };
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    
    return gsap.to(obj, {
      value: endValue,
      duration: 2,
      ease: "power2.out",
      onUpdate: () => {
        if (el) {
          el.textContent = Math.round(obj.value).toString();
        }
      },
      ...options
    });
  },

  morphPath: (element: string | Element, newPath: string, options?: gsap.TweenVars) => {
    return gsap.to(element, {
      morphSVG: newPath,
      duration: 1,
      ease: "power2.inOut",
      ...options
    });
  }
};

// ScrollTrigger helper
export const useScrollTrigger = (
  trigger: string | Element,
  animation: gsap.core.Tween | gsap.core.Timeline,
  options?: ScrollTrigger.Vars
) => {
  useEffect(() => {
    ScrollTrigger.create({
      trigger,
      start: "top 80%",
      animation,
      ...options
    });

    return () => ScrollTrigger.getAll().forEach(st => st.kill());
  }, [trigger, animation, options]);
};