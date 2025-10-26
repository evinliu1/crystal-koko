import React from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'

const Hero = () => {
  const navigate = useNavigate();
  const FADE_MS = 360; // match index.css transition duration

  const navigateWithFade = (e, to) => {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    const shell = document.querySelector('.app-shell');
    if (shell) shell.classList.add('faded');
    // wait for fade-out, then navigate
    setTimeout(() => {
      navigate(to);
    }, FADE_MS);
  };

  const containerRef = React.useRef(null);
  const lettersRef = React.useRef([]);
  const mouse = React.useRef({ x: -9999, y: -9999 });
  const rafRef = React.useRef(null);

  // new refs for positioning arrows relative to hero root and title
  const heroRef = React.useRef(null);
  const titleRef = React.useRef(null);
  const leftArrowRef = React.useRef(null);
  const rightArrowRef = React.useRef(null);
  const posRaf = React.useRef(null);
  const glassRef = React.useRef(null); // <-- new: ref to the glass wrapper

  React.useEffect(()=>{
    const onPointerMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    }
    window.addEventListener('pointermove', onPointerMove);

    const letters = containerRef.current ? Array.from(containerRef.current.querySelectorAll('.interactive-letter')) : [];
    lettersRef.current = letters;

    const influence = 140; // px radius of influence
    const maxOffset = 28; // max px letters will move away

    const tick = () => {
      const mx = mouse.current.x;
      const my = mouse.current.y;

      lettersRef.current.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = cx - mx;
        const dy = cy - my;
        const dist = Math.hypot(dx, dy);

        if (dist < influence) {
          const strength = (1 - dist / influence); // 0..1
          // normalized push vector away from cursor
          const nx = dx / (dist || 1);
          const ny = dy / (dist || 1);
          const tx = Math.round(nx * maxOffset * strength);
          const ty = Math.round(ny * maxOffset * strength * 0.6); // less vertical push for aesthetics
          el.style.transform = `translate(${tx}px, ${ty}px) scale(${1 + 0.03 * strength})`;
          el.style.zIndex = 2;
        } else {
          el.style.transform = '';
          el.style.zIndex = '';
        }
      });

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);

    // position arrows next to title (outside glass) — update on scroll/resize/container scroll
    const schedulePos = () => {
      if (posRaf.current) return;
      posRaf.current = requestAnimationFrame(()=>{
        posRaf.current = null;
        const t = titleRef.current;
        const h = heroRef.current;
        const leftA = leftArrowRef.current;
        const rightA = rightArrowRef.current;
        const g = glassRef.current;
        if (!t || !h || !leftA || !rightA || !g) return;
        const titleRect = t.getBoundingClientRect();
        const heroRect = h.getBoundingClientRect();
        const glassRect = g.getBoundingClientRect();
        const gap = 12; // px spacing outside the glass
        // position horizontally just outside the glass edges
        const leftPos = glassRect.left - heroRect.left - leftA.offsetWidth - gap;
        const rightPos = glassRect.right - heroRect.left + gap;
        // vertically align to title center
        const topPos = titleRect.top - heroRect.top + (titleRect.height/2) - (leftA.offsetHeight/2);

        leftA.style.left = `${Math.round(leftPos)}px`;
        rightA.style.left = `${Math.round(rightPos)}px`;
        leftA.style.top = `${Math.round(topPos)}px`;
        rightA.style.top = `${Math.round(topPos)}px`;
      });
    }

    window.addEventListener('resize', schedulePos);
    window.addEventListener('scroll', schedulePos, { passive: true });
    const c = containerRef.current;
    if (c) c.addEventListener('scroll', schedulePos, { passive: true });
    // initial position
    schedulePos();

    return ()=>{
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', schedulePos);
      window.removeEventListener('scroll', schedulePos);
      if (c) c.removeEventListener('scroll', schedulePos);
      if (posRaf.current) cancelAnimationFrame(posRaf.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    }
  }, []);

  return (
    <div ref={heroRef} className='relative flex flex-col justify-center items-center min-h-screen max-w-screen-lg mx-auto px-8'>

      {/* Left / Right arrows (absolutely positioned relative to hero root). use buttons so we fully control navigation timing */}
      <button
        ref={leftArrowRef}
        type="button"
        onClick={(e)=>navigateWithFade(e, '/collection')}
        className='hero-arrow'
        aria-label='Go to collection'
      >
        <span aria-hidden className='arrow-symbol'>&larr;</span>
      </button>
      <button
        ref={rightArrowRef}
        type="button"
        onClick={(e)=>navigateWithFade(e, '/contact')}
        className='hero-arrow'
        aria-label='Go to contact'
      >
        <span aria-hidden className='arrow-symbol'>&rarr;</span>
      </button>

      <div className='fixed inset-0 pointer-events-none -z-10 flex justify-center'>

        <div ref={glassRef} className='relative w-full max-w-screen-xl h-full px-12'>
          <div className='absolute inset-0 bg-white bg-opacity-20 backdrop-blur-md rounded-lg ' />
        </div>

      </div>

      {/* Centered Text Content */}
      <div className='w-full flex flex-col items-center justify-center gap-6'>
        <div ref={containerRef} className='rounded-lg p-12 md:p-16 text-[#414141] overflow-x-auto'>
          <div className='flex items-center gap-2'>
            <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
            <p className='font-medium text-base md:text-lg whitespace-nowrap'>
              {'WELCOME TO'.split('').map((c,i)=>(
                <span key={i} className='interactive-letter inline-block' aria-hidden="true">{c}</span>
              ))}
            </p>
          </div>

          {/* title only — arrows are fixed outside the glass pane */}
          <h1 ref={titleRef}
            className={
              'prata-regular text-center select-none pointer-events-auto leading-relaxed ' +
              'text-[3.4rem] sm:text-[5.67rem] md:text-[6.8rem] lg:text-[7.37rem] xl:text-[8.5rem] whitespace-nowrap'
            }
          >
            {
              // split title into letters so each can be moved independently
              'CRYSTALKOKO'.split('').map((char, i) => (
                <span
                  key={i}
                  className='interactive-letter inline-block'
                  aria-hidden="true"
                >
                  {char}
                </span>
              ))
            }
          </h1>

          <div className='flex items-center gap-2'>
            <p className='font-medium text-base md:text-lg whitespace-nowrap'>
              {'WELCOME TO'.split('').map((c,i)=>(
                <span key={i} className='interactive-letter inline-block' aria-hidden="true">{c}</span>
              ))}
            </p>
            <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
