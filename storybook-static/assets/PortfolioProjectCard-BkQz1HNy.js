const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./preloadPortfolioImage-raC6G5Y0.js","./chunk-DnJy8xQt.js"])))=>i.map(i=>d[i]);
import{a as e,n as t}from"./chunk-DnJy8xQt.js";import{n,t as r}from"./preload-helper-DVWkohm0.js";import{M as i,t as a}from"./iframe-PvspA9v5.js";import{n as o,t as s}from"./cn-B39jY00a.js";import{t as c}from"./buttonStyles-B65OMv9V.js";import{m as l,t as u}from"./lucide-react-D_dXB7QH.js";import{t as d}from"./CopyLinkButton-DEgwGd-E.js";import{t as f}from"./PortfolioImage-DVWGW0TJ.js";import{t as p}from"./atomic-BFL3eLy6.js";import{n as m,t as h}from"./portfolio-D6kqb6O8.js";import{n as g,r as _}from"./ImpactBadge-UU0uRHXw.js";import{n as v,t as y}from"./PortfolioCarousel-CxyPOc9i.js";import{n as b,t as x}from"./PortfolioTechStack-DBjcvA4h.js";function S(e=.35){let t=(0,C.useRef)(null),[n,r]=(0,C.useState)(!1);return(0,C.useEffect)(()=>{let n=t.current;if(!n)return;let i=new IntersectionObserver(([e])=>{e?.isIntersecting&&r(!0)},{threshold:e});return i.observe(n),()=>i.disconnect()},[e]),{ref:t,inView:n}}var C,w=t((()=>{C=e(i(),1)}));function T(e={}){let{threshold:t=.1,root:n=null,rootMargin:r,fallbackInView:i=!0}=e,a=(0,E.useRef)(null),[o,s]=(0,E.useState)(!D&&i);return(0,E.useEffect)(()=>{let e=a.current;if(!e||!D)return;let i=new IntersectionObserver(([e])=>{e?.isIntersecting&&s(!0)},{threshold:t,root:n,rootMargin:r});return i.observe(e),()=>i.disconnect()},[i,n,r,t]),{ref:a,inView:o,supportsIntersectionObserver:D}}var E,D,O=t((()=>{E=e(i(),1),D=typeof window<`u`&&typeof IntersectionObserver<`u`}));function k(){let[e,t]=(0,A.useState)(!1);return(0,A.useEffect)(()=>{let e=window.matchMedia(`(prefers-reduced-motion: reduce)`),n=()=>t(e.matches);return n(),e.addEventListener(`change`,n),()=>e.removeEventListener(`change`,n)},[]),e}var A,j=t((()=>{A=e(i(),1)}));function M({project:e,aspectClassName:t}){return(0,R.jsxDEV)(`div`,{className:s(e.imageSrc||e.images?.length?`animate-pulse bg-ink2/60`:`bg-gradient-to-br ${e.accent}`,`border-b border-sand/10`,t),"aria-hidden":!0},void 0,!1,{fileName:z,lineNumber:25,columnNumber:5},this)}function N({project:e,onOpenImage:t,aspectClassName:n=B,mediaReady:r}){return r?e.images&&e.images.length>0?(0,R.jsxDEV)(y,{images:e.images,className:s(n,`h-auto`),onImageClick:n=>t(e,n)},void 0,!1,{fileName:z,lineNumber:55,columnNumber:7},this):e.imageSrc?(0,R.jsxDEV)(`button`,{type:`button`,onClick:()=>t(e,0),className:s(`relative block cursor-zoom-in overflow-hidden border-b border-sand/10 bg-ink2/50 text-left focus-visible:focus-ring`,n),"aria-label":`View larger ${e.title} screenshot`,children:(0,R.jsxDEV)(f,{src:e.imageSrc,alt:e.imageAlt??e.title,className:`h-full w-full transition duration-300 group-hover:scale-[1.02]`,loading:`lazy`},void 0,!1,{fileName:z,lineNumber:74,columnNumber:9},this)},void 0,!1,{fileName:z,lineNumber:65,columnNumber:7},this):(0,R.jsxDEV)(`div`,{className:s(`bg-gradient-to-br ${e.accent}`,`border-b border-sand/10`,n),"aria-hidden":!0},void 0,!1,{fileName:z,lineNumber:85,columnNumber:5},this):(0,R.jsxDEV)(M,{project:e,aspectClassName:n},void 0,!1,{fileName:z,lineNumber:50,columnNumber:12},this)}function P(e){let t=(0,L.useRef)(null),[n,r]=(0,L.useState)({x:0,y:0}),[i,a]=(0,L.useState)(!1);return{cardRef:t,tilt:n,hovered:i,onPointerMove:n=>{if(!e)return;let i=t.current;if(!i)return;let a=i.getBoundingClientRect(),o=(n.clientX-a.left)/a.width-.5;r({x:((n.clientY-a.top)/a.height-.5)*-6,y:o*8})},onPointerEnter:()=>a(!0),resetTilt:()=>{r({x:0,y:0}),a(!1)}}}function F(e,t){if(t)return t;if(typeof window>`u`)return`/project/${e.id}`;let{origin:n,pathname:r,hash:i}=window.location;return r===`/showcase`?`${n}/showcase#project-${e.id}`:`${n}/project/${e.id}${i}`}function I({project:e,onOpenImage:t,onViewDetails:n,className:i,variant:a=`default`,isActive:o=!1,disableCoverFlowMotion:u=!1,shareUrl:f}){let p=e.impactMetric??e.impactMetrics?.[0],m=a===`gallery`,_=a===`album`,v=!!u,y=k(),{ref:b,inView:C}=S(),{ref:w,inView:E}=T({threshold:.12,rootMargin:`120px 0px`,fallbackInView:!0}),[D,O]=(0,L.useState)(!1),A=!v&&(m&&o||_),{cardRef:j,tilt:M,hovered:I,onPointerMove:H,onPointerEnter:U,resetTilt:W}=P(A&&!y);(0,L.useEffect)(()=>{if(!E||D)return;let t=!1;return r(async()=>{let{preloadPortfolioImages:e}=await import(`./preloadPortfolioImage-raC6G5Y0.js`).then(e=>(e.t(),e.n));return{preloadPortfolioImages:e}},__vite__mapDeps([0,1]),import.meta.url).then(({preloadPortfolioImages:t})=>t(h(e).map(e=>e.src))).then(()=>{t||O(!0)}).catch(()=>{t||O(!0)}),()=>{t=!0}},[E,D,e]);let G=!v&&(_||m)?s(C&&`border-gold-400/70 shadow-gold-glow hero-glow-pulse ring-1 ring-gold-500/35`,`group-hover:border-gold-400/70 group-hover:shadow-gold-glow group-hover:hero-glow-pulse group-hover:ring-1 group-hover:ring-gold-500/35`,`group-focus-within:border-gold-400/70 group-focus-within:shadow-gold-glow group-focus-within:hero-glow-pulse group-focus-within:ring-1 group-focus-within:ring-gold-500/35`):void 0,K=`${e.title}, ${e.client}. ${e.summary}`,q=F(e,f),J=e=>{j.current=e,b.current=e,w.current=e},Y=A&&!y?{transform:`perspective(1000px) rotateX(${M.x}deg) rotateY(${M.y+(_&&I?4:0)}deg) scale(${_&&I?1.05:1})`,transformStyle:`preserve-3d`}:void 0;return(0,R.jsxDEV)(`article`,{ref:J,onPointerMove:v?void 0:H,onPointerEnter:v?void 0:U,onPointerLeave:v?void 0:W,"aria-label":K,className:s(`group flex h-full flex-col overflow-hidden rounded-3xl border border-sand/10 bg-white/5 shadow-soft transition-[border-color,box-shadow,background-color] duration-300`,_&&`min-h-[24rem] hover:border-gold-500/45 hover:bg-white/[0.07] hover:shadow-[0_24px_56px_rgba(0,0,0,0.42),0_0_0_1px_rgba(139,92,246,0.28)] focus-within:border-gold-500/45 focus-within:shadow-[0_24px_56px_rgba(0,0,0,0.42),0_0_0_1px_rgba(139,92,246,0.28)]`,m&&(v?`min-h-[24rem]`:`min-h-[24rem] hover:scale-[1.02] hover:border-gold-500/40 hover:shadow-[0_20px_48px_rgba(0,0,0,0.35)]`),!m&&!_&&`min-h-[28rem] hover:border-gold-500/35 hover:bg-white/[0.07]`,i),style:Y,children:[(0,R.jsxDEV)(`div`,{className:`relative flex-none`,children:[(0,R.jsxDEV)(N,{project:e,onOpenImage:t,aspectClassName:m||_?V:B,mediaReady:D},void 0,!1,{fileName:z,lineNumber:236,columnNumber:9},this),p?(0,R.jsxDEV)(g,{metric:p,className:s(`absolute right-3 top-3 z-10 max-w-[calc(100%-1.5rem)]`,G)},void 0,!1,{fileName:z,lineNumber:243,columnNumber:11},this):null]},void 0,!0,{fileName:z,lineNumber:235,columnNumber:7},this),(0,R.jsxDEV)(`div`,{className:s(`flex flex-1 flex-col`,m||_?`p-4 sm:p-5`:`p-5`),children:[(0,R.jsxDEV)(`div`,{className:`flex items-start justify-between gap-3`,children:[(0,R.jsxDEV)(`div`,{className:`min-w-0`,children:[(0,R.jsxDEV)(`p`,{className:`text-[10px] font-semibold uppercase tracking-[0.28em] text-sand/45`,children:e.client},void 0,!1,{fileName:z,lineNumber:253,columnNumber:13},this),(0,R.jsxDEV)(`div`,{className:`mt-2 flex items-start gap-2`,children:[(0,R.jsxDEV)(`h3`,{className:s(`min-w-0 font-display font-semibold tracking-tight text-sand`,m||_?`text-lg sm:text-xl`:`text-xl`),children:e.title},void 0,!1,{fileName:z,lineNumber:257,columnNumber:15},this),(0,R.jsxDEV)(d,{url:q},void 0,!1,{fileName:z,lineNumber:265,columnNumber:15},this)]},void 0,!0,{fileName:z,lineNumber:256,columnNumber:13},this)]},void 0,!0,{fileName:z,lineNumber:252,columnNumber:11},this),e.url?(0,R.jsxDEV)(`a`,{href:e.url,target:`_blank`,rel:`noreferrer`,className:`inline-flex h-9 w-9 flex-none items-center justify-center rounded-full border border-sand/10 bg-ink2/70 text-sand/55 transition hover:border-gold-500/30 hover:text-gold-200 focus-visible:focus-ring`,"aria-label":`Open ${e.title} in a new tab`,children:(0,R.jsxDEV)(l,{size:16,"aria-hidden":!0},void 0,!1,{fileName:z,lineNumber:276,columnNumber:15},this)},void 0,!1,{fileName:z,lineNumber:269,columnNumber:13},this):null]},void 0,!0,{fileName:z,lineNumber:251,columnNumber:9},this),(0,R.jsxDEV)(x,{tags:e.tags,className:`mt-3 border-t-0 pt-0`},void 0,!1,{fileName:z,lineNumber:281,columnNumber:9},this),!m&&!_?(0,R.jsxDEV)(`p`,{className:`mt-2 font-mono text-xs text-sand/45`,children:e.period},void 0,!1,{fileName:z,lineNumber:284,columnNumber:11},this):null,(0,R.jsxDEV)(`p`,{className:s(`mt-3 flex-1 text-sm leading-relaxed text-sand/70`,m||_?`line-clamp-4`:`line-clamp-3`),children:e.summary},void 0,!1,{fileName:z,lineNumber:287,columnNumber:9},this),(0,R.jsxDEV)(`div`,{className:s(`mt-4`,_&&`relative min-h-[2.5rem]`),children:m&&e.url?(0,R.jsxDEV)(`a`,{href:e.url,target:`_blank`,rel:`noreferrer`,className:c({variant:`secondary`,size:`sm`,className:`w-full justify-center border-sand/10 bg-ink2/40 text-sand/85 transition hover:border-gold-500/30 hover:bg-ink2/70 hover:text-sand`}),children:[`View live demo`,(0,R.jsxDEV)(l,{size:14,"aria-hidden":!0},void 0,!1,{fileName:z,lineNumber:310,columnNumber:15},this)]},void 0,!0,{fileName:z,lineNumber:298,columnNumber:13},this):_?(0,R.jsxDEV)(`button`,{type:`button`,onClick:()=>n(e),className:c({variant:`primary`,size:`sm`,className:s(`absolute inset-x-0 bottom-0 w-full justify-center opacity-0 transition-opacity duration-300`,`group-hover:opacity-100 group-focus-within:opacity-100`,`focus-visible:opacity-100 focus-visible:focus-ring`)}),"aria-label":`View details for ${e.title}`,children:[`View Details`,(0,R.jsxDEV)(l,{size:14,"aria-hidden":!0},void 0,!1,{fileName:z,lineNumber:328,columnNumber:15},this)]},void 0,!0,{fileName:z,lineNumber:313,columnNumber:13},this):(0,R.jsxDEV)(`button`,{type:`button`,onClick:()=>n(e),className:c({variant:`secondary`,size:`sm`,className:`w-full justify-center border-sand/10 bg-ink2/40 text-sand/85 transition hover:border-gold-500/30 hover:bg-ink2/70 hover:text-sand`}),children:[`View project details`,(0,R.jsxDEV)(l,{size:14,"aria-hidden":!0},void 0,!1,{fileName:z,lineNumber:342,columnNumber:15},this)]},void 0,!0,{fileName:z,lineNumber:331,columnNumber:13},this)},void 0,!1,{fileName:z,lineNumber:296,columnNumber:9},this)]},void 0,!0,{fileName:z,lineNumber:250,columnNumber:7},this)]},void 0,!0,{fileName:z,lineNumber:216,columnNumber:5},this)}var L,R,z,B,V,H=t((()=>{u(),L=e(i(),1),m(),w(),O(),j(),o(),p(),_(),v(),b(),R=a(),n(),z=`/Volumes/t7/Development/monx/jerome/src/components/molecules/PortfolioProjectCard.tsx`,B=`aspect-[16/10] w-full`,V=`aspect-[4/3] w-full`,I.__docgenInfo={description:``,methods:[],displayName:`PortfolioProjectCard`,props:{project:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
  id: string
  title: string
  client: string
  period: string
  summary: string
  tags: string[]
  accent: string
  /** Primary recruiter-facing metric shown on portfolio cards. */
  impactMetric?: PortfolioImpactMetric
  impactMetrics?: PortfolioImpactMetric[]
  /** Recruiter-facing problem → solution → result story for the detail page. */
  impactNarrative?: PortfolioImpactNarrative
  imageSrc?: string
  imageAlt?: string
  images?: PortfolioImage[]
  span?: 'default' | 'full'
  url?: string
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`title`,value:{name:`string`,required:!0}},{key:`client`,value:{name:`string`,required:!0}},{key:`period`,value:{name:`string`,required:!0}},{key:`summary`,value:{name:`string`,required:!0}},{key:`tags`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0}},{key:`accent`,value:{name:`string`,required:!0}},{key:`impactMetric`,value:{name:`signature`,type:`object`,raw:`{
  label: string
  value: string
}`,signature:{properties:[{key:`label`,value:{name:`string`,required:!0}},{key:`value`,value:{name:`string`,required:!0}}]},required:!1},description:`Primary recruiter-facing metric shown on portfolio cards.`},{key:`impactMetrics`,value:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  label: string
  value: string
}`,signature:{properties:[{key:`label`,value:{name:`string`,required:!0}},{key:`value`,value:{name:`string`,required:!0}}]},required:!1}],raw:`PortfolioImpactMetric[]`,required:!1}},{key:`impactNarrative`,value:{name:`signature`,type:`object`,raw:`{
  problem: string
  solution: string
  result: string
}`,signature:{properties:[{key:`problem`,value:{name:`string`,required:!0}},{key:`solution`,value:{name:`string`,required:!0}},{key:`result`,value:{name:`string`,required:!0}}]},required:!1},description:`Recruiter-facing problem → solution → result story for the detail page.`},{key:`imageSrc`,value:{name:`string`,required:!1}},{key:`imageAlt`,value:{name:`string`,required:!1}},{key:`images`,value:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  src: string
  alt: string
  label?: string
}`,signature:{properties:[{key:`src`,value:{name:`string`,required:!0}},{key:`alt`,value:{name:`string`,required:!0}},{key:`label`,value:{name:`string`,required:!1}}]}}],raw:`PortfolioImage[]`,required:!1}},{key:`span`,value:{name:`union`,raw:`'default' | 'full'`,elements:[{name:`literal`,value:`'default'`},{name:`literal`,value:`'full'`}],required:!1}},{key:`url`,value:{name:`string`,required:!1}}]}},description:``},onOpenImage:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(project: PortfolioProject, index: number) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  id: string
  title: string
  client: string
  period: string
  summary: string
  tags: string[]
  accent: string
  /** Primary recruiter-facing metric shown on portfolio cards. */
  impactMetric?: PortfolioImpactMetric
  impactMetrics?: PortfolioImpactMetric[]
  /** Recruiter-facing problem → solution → result story for the detail page. */
  impactNarrative?: PortfolioImpactNarrative
  imageSrc?: string
  imageAlt?: string
  images?: PortfolioImage[]
  span?: 'default' | 'full'
  url?: string
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`title`,value:{name:`string`,required:!0}},{key:`client`,value:{name:`string`,required:!0}},{key:`period`,value:{name:`string`,required:!0}},{key:`summary`,value:{name:`string`,required:!0}},{key:`tags`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0}},{key:`accent`,value:{name:`string`,required:!0}},{key:`impactMetric`,value:{name:`signature`,type:`object`,raw:`{
  label: string
  value: string
}`,signature:{properties:[{key:`label`,value:{name:`string`,required:!0}},{key:`value`,value:{name:`string`,required:!0}}]},required:!1},description:`Primary recruiter-facing metric shown on portfolio cards.`},{key:`impactMetrics`,value:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  label: string
  value: string
}`,signature:{properties:[{key:`label`,value:{name:`string`,required:!0}},{key:`value`,value:{name:`string`,required:!0}}]},required:!1}],raw:`PortfolioImpactMetric[]`,required:!1}},{key:`impactNarrative`,value:{name:`signature`,type:`object`,raw:`{
  problem: string
  solution: string
  result: string
}`,signature:{properties:[{key:`problem`,value:{name:`string`,required:!0}},{key:`solution`,value:{name:`string`,required:!0}},{key:`result`,value:{name:`string`,required:!0}}]},required:!1},description:`Recruiter-facing problem → solution → result story for the detail page.`},{key:`imageSrc`,value:{name:`string`,required:!1}},{key:`imageAlt`,value:{name:`string`,required:!1}},{key:`images`,value:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  src: string
  alt: string
  label?: string
}`,signature:{properties:[{key:`src`,value:{name:`string`,required:!0}},{key:`alt`,value:{name:`string`,required:!0}},{key:`label`,value:{name:`string`,required:!1}}]}}],raw:`PortfolioImage[]`,required:!1}},{key:`span`,value:{name:`union`,raw:`'default' | 'full'`,elements:[{name:`literal`,value:`'default'`},{name:`literal`,value:`'full'`}],required:!1}},{key:`url`,value:{name:`string`,required:!1}}]}},name:`project`},{type:{name:`number`},name:`index`}],return:{name:`void`}}},description:``},onViewDetails:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(project: PortfolioProject) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  id: string
  title: string
  client: string
  period: string
  summary: string
  tags: string[]
  accent: string
  /** Primary recruiter-facing metric shown on portfolio cards. */
  impactMetric?: PortfolioImpactMetric
  impactMetrics?: PortfolioImpactMetric[]
  /** Recruiter-facing problem → solution → result story for the detail page. */
  impactNarrative?: PortfolioImpactNarrative
  imageSrc?: string
  imageAlt?: string
  images?: PortfolioImage[]
  span?: 'default' | 'full'
  url?: string
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`title`,value:{name:`string`,required:!0}},{key:`client`,value:{name:`string`,required:!0}},{key:`period`,value:{name:`string`,required:!0}},{key:`summary`,value:{name:`string`,required:!0}},{key:`tags`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0}},{key:`accent`,value:{name:`string`,required:!0}},{key:`impactMetric`,value:{name:`signature`,type:`object`,raw:`{
  label: string
  value: string
}`,signature:{properties:[{key:`label`,value:{name:`string`,required:!0}},{key:`value`,value:{name:`string`,required:!0}}]},required:!1},description:`Primary recruiter-facing metric shown on portfolio cards.`},{key:`impactMetrics`,value:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  label: string
  value: string
}`,signature:{properties:[{key:`label`,value:{name:`string`,required:!0}},{key:`value`,value:{name:`string`,required:!0}}]},required:!1}],raw:`PortfolioImpactMetric[]`,required:!1}},{key:`impactNarrative`,value:{name:`signature`,type:`object`,raw:`{
  problem: string
  solution: string
  result: string
}`,signature:{properties:[{key:`problem`,value:{name:`string`,required:!0}},{key:`solution`,value:{name:`string`,required:!0}},{key:`result`,value:{name:`string`,required:!0}}]},required:!1},description:`Recruiter-facing problem → solution → result story for the detail page.`},{key:`imageSrc`,value:{name:`string`,required:!1}},{key:`imageAlt`,value:{name:`string`,required:!1}},{key:`images`,value:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  src: string
  alt: string
  label?: string
}`,signature:{properties:[{key:`src`,value:{name:`string`,required:!0}},{key:`alt`,value:{name:`string`,required:!0}},{key:`label`,value:{name:`string`,required:!1}}]}}],raw:`PortfolioImage[]`,required:!1}},{key:`span`,value:{name:`union`,raw:`'default' | 'full'`,elements:[{name:`literal`,value:`'default'`},{name:`literal`,value:`'full'`}],required:!1}},{key:`url`,value:{name:`string`,required:!1}}]}},name:`project`}],return:{name:`void`}}},description:``},className:{required:!1,tsType:{name:`string`},description:``},variant:{required:!1,tsType:{name:`union`,raw:`'default' | 'gallery' | 'album'`,elements:[{name:`literal`,value:`'default'`},{name:`literal`,value:`'gallery'`},{name:`literal`,value:`'album'`}]},description:``,defaultValue:{value:`'default'`,computed:!1}},isActive:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},disableCoverFlowMotion:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},shareUrl:{required:!1,tsType:{name:`string`},description:``}}}}));export{k as i,H as n,j as r,I as t};