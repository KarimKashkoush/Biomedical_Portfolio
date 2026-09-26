'use client';
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { Activity, ArrowUpRight, ClipboardCheck, Monitor, Wrench } from 'lucide-react';
import { useLocale } from './locale';
import { portraitSrc, aboutPortraitSrc } from './profile';

export function LoadingScreen() {
  const {t}=useLocale();
  return <div className="site-loader" role="status" aria-live="polite"><div className="loader-mark" aria-hidden="true">K<span/></div><strong>{t('Kareem Qashqoush')}</strong><p>{t('Preparing your experience')}</p><div className="loader-track" aria-hidden="true"><span/></div></div>;
}

export function Experience({children}:{children:ReactNode}) {
  const [loading,setLoading]=useState(true);
  const contentRef=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    let cancelled=false;
    let minimumTimer:ReturnType<typeof setTimeout>;
    let image:HTMLImageElement|undefined;
    const previousOverflow=document.body.style.overflow;
    document.body.style.overflow='hidden';
    if(contentRef.current)contentRef.current.inert=true;
    const minimum=new Promise<void>(resolve=>{minimumTimer=setTimeout(resolve,650)});
    const fonts=document.fonts?.ready??Promise.resolve();
    const portrait=new Promise<void>(resolve=>{
      if(!portraitSrc){resolve();return}
      image=new Image();image.onload=()=>resolve();image.onerror=()=>resolve();image.src=portraitSrc;
    });
    function finish(){if(!cancelled){setLoading(false);document.body.style.overflow=previousOverflow;if(contentRef.current)contentRef.current.inert=false}}
    // A slow font or failed image must never trap visitors behind the loader.
    const fallback=setTimeout(finish,2600);
    Promise.allSettled([minimum,fonts,portrait]).then(finish);
    return()=>{cancelled=true;clearTimeout(minimumTimer);clearTimeout(fallback);if(image){image.onload=null;image.onerror=null}document.body.style.overflow=previousOverflow};
  },[]);
  useEffect(()=>{
    if(loading)return;
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
    if(reduced.matches||!('IntersectionObserver' in window))return;
    const nodes=document.querySelectorAll<HTMLElement>('.process-card, .experience-card, .training-card, .service-list article, .education-card, .course-list > div, .section-heading, .contact-card > div, .contact-card form');
    const observer=new IntersectionObserver(entries=>{
      for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}
    },{threshold:.08,rootMargin:'0px 0px -24px 0px'});
    nodes.forEach(node=>{
      const siblings=Array.from(node.parentElement?.children??[]);
      node.style.setProperty('--reveal-delay',`${(siblings.indexOf(node)%3)*100}ms`);
      node.classList.add('reveal-ready');observer.observe(node);
    });
    const showAll=()=>{if(reduced.matches)nodes.forEach(node=>node.classList.add('is-visible'))};
    reduced.addEventListener('change',showAll);
    return()=>{observer.disconnect();reduced.removeEventListener('change',showAll);nodes.forEach(node=>node.classList.remove('reveal-ready','is-visible'))};
  },[loading]);
  return <><div className={`loader-layer ${loading?'':'loader-finished'}`} aria-hidden={!loading}><LoadingScreen/></div><div ref={contentRef} className={`site-content ${loading?'site-preparing':'site-ready'}`} aria-busy={loading}>{children}</div><noscript><style>{`.loader-layer{display:none!important}.site-content{opacity:1!important}`}</style><p className="no-script-note">فعّل JavaScript لتبديل اللغة والتفاعل مع الموقع. Enable JavaScript for interactive features.</p></noscript></>;
}

export function Identity({small=false}:{small?:boolean}) {
  const {t}=useLocale();
  const imageSrc=small?aboutPortraitSrc:portraitSrc;
  const [imageFailed,setImageFailed]=useState(false);
  const cards=[{icon:Activity,title:'Medical imaging',detail:'X-ray · CT · MRI'},{icon:ClipboardCheck,title:'Medical Planning',detail:'Medical equipment'},{icon:Wrench,title:'Equipment support',detail:'Installation · Maintenance'},{icon:Monitor,title:'Healthcare systems',detail:'Node.js · SQL'}];
  return <div className={`portrait-scene ${small?'portrait-scene-small':''}`}>
    {!small&&<svg className="skill-connectors" viewBox="0 0 500 550" preserveAspectRatio="none" aria-hidden="true"><path d="M175 46 H35 V135 H95 M325 46 H465 V220 H405 M175 500 H35 V410 H95 M325 500 H465 V480 H405"/><circle cx="175" cy="46" r="4"/><circle cx="325" cy="46" r="4"/><circle cx="175" cy="500" r="4"/><circle cx="325" cy="500" r="4"/></svg>}
    <div className={`identity ${small?'identity-small':''}`}><div className="identity-top"><span>{t('ENGINEERING × HEALTHCARE')}</span><Activity size={22}/></div>
    {imageSrc&&!imageFailed?<div className="portrait-image"><img src={imageSrc} alt={t('Kareem Qashqoush')} width={600} height={760} loading={small?'lazy':'eager'} fetchPriority={small?'auto':'high'} onError={()=>setImageFailed(true)}/></div>:<div className="monogram" aria-label={t('Kareem Qashqoush')} dir="ltr">K<span>Q</span><i>+</i></div>}
    <div className="identity-bottom"><span>{t('Kareem Qashqoush')}<small>{t('Biomedical Engineer')}</small></span><ArrowUpRight/></div>{small?null:<div className="identity-tag"><span className="status-dot"/>{t('Based in Taif, Saudi Arabia')}</div>}</div>
    {!small&&<div className="orbit-skills" aria-label={t('Skills')}>{cards.map((card,i)=><div className={`orbit-card orbit-${i}`} style={{'--float-delay':`${i*-.85}s`,'--entry-delay':`${250+i*120}ms`} as CSSProperties} key={card.title}><div className="orbit-card-surface"><span className="orbit-icon"><card.icon size={21}/></span><strong>{t(card.title)}</strong><small dir="auto">{t(card.detail)}</small></div></div>)}</div>}
  </div>;
}
