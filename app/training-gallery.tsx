'use client';
import {useRef,useState,type KeyboardEvent} from 'react';
import {ChevronLeft,ChevronRight,type LucideIcon} from 'lucide-react';
import {useLocale} from './locale';
export type TrainingImage={src:string;alt?:string;altAr?:string};
export function TrainingGallery({images,title,icon:Icon,number}:{images:TrainingImage[];title:string;icon:LucideIcon;number:number}){
  const {locale}=useLocale();
  const [index,setIndex]=useState(0);
  const [failed,setFailed]=useState<Record<string,boolean>>({});
  const touchStart=useRef<number|null>(null);
  const selected=images[index%Math.max(images.length,1)];
  const multiple=images.length>1;
  const rtl=locale==='ar';
  function move(delta:number){setIndex(current=>(current+delta+images.length)%images.length)}
  function keyboard(e:KeyboardEvent<HTMLDivElement>){
    if(!multiple)return;
    if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();move(e.key==='ArrowRight'?(rtl?-1:1):(rtl?1:-1))}
  }
  if(!images.length)return <div className={`training-art art-${number%3}`}><Icon size={56} strokeWidth={1.3}/><span>0{number+1}</span></div>;
  const alt=(rtl?selected.altAr:selected.alt)||title;
  return <div className={`training-gallery ${multiple?'has-slides':''}`} role={multiple?'region':undefined} aria-roledescription={multiple?(rtl?'عارض صور':'carousel'):undefined} aria-label={multiple?(rtl?`صور ${title}`:`${title} photos`):undefined} tabIndex={multiple?0:undefined} onKeyDown={keyboard}
    onTouchStart={e=>{touchStart.current=e.touches[0].clientX}}
    onTouchEnd={e=>{if(touchStart.current===null||!multiple)return;const distance=e.changedTouches[0].clientX-touchStart.current;touchStart.current=null;if(Math.abs(distance)>45)move(distance<0?(rtl?-1:1):(rtl?1:-1))}}>
    <div className="gallery-slide" key={selected.src+index}>
      {failed[selected.src]?<div className="gallery-fallback"><Icon size={35}/><span>{rtl?'تعذّر تحميل الصورة':'Image unavailable'}</span></div>:<img src={selected.src} alt={alt} width={700} height={460} loading="lazy" onError={()=>setFailed(old=>({...old,[selected.src]:true}))}/>}
    </div>
    {multiple&&<><button type="button" className="gallery-arrow gallery-previous" aria-label={rtl?'الصورة السابقة':'Previous image'} onClick={()=>move(-1)}>{rtl?<ChevronRight size={18}/>:<ChevronLeft size={18}/>}</button><button type="button" className="gallery-arrow gallery-next" aria-label={rtl?'الصورة التالية':'Next image'} onClick={()=>move(1)}>{rtl?<ChevronLeft size={18}/>:<ChevronRight size={18}/>}</button><div className="gallery-dots">{images.map((image,i)=><button type="button" key={image.src+i} aria-label={rtl?`عرض الصورة ${i+1}`:`Show image ${i+1}`} aria-current={index===i?'true':undefined} onClick={()=>setIndex(i)}/>)}</div><span className="gallery-counter" aria-live="polite" aria-atomic="true">{rtl?`${index+1} من ${images.length}`:`${index+1} of ${images.length}`}</span></>}
  </div>;
}
