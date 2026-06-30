import{a as e,n as t}from"./chunk-DnJy8xQt.js";import{M as n,t as r}from"./iframe-PvspA9v5.js";import{n as i,t as a}from"./storyParameters-DAWmaSlC.js";import{n as o,t as s}from"./cn-B39jY00a.js";import{n as c,r as l}from"./portfolio-D6kqb6O8.js";import{i as u,n as d,r as f,t as p}from"./PortfolioProjectCard-BkQz1HNy.js";import{n as m,t as h}from"./ShowcaseCarouselControls-uPT-wKrS.js";function g(e){return`${_}${e}`}var _,v=t((()=>{_=`project-`}));function y(e,t,n){let r=e-t;return r>n/2&&(r-=n),r<-n/2&&(r+=n),r}function b({projects:e,activeIndex:t,onActiveIndexChange:n,onOpenImage:r,onViewDetails:i,className:a}){let o=u(),[c,l]=(0,S.useState)(!1),d=e.length,f=d>0?(t%d+d)%d:0,p=(0,S.useMemo)(()=>e.map(e=>({id:e.id,label:e.title})),[e]),m=(0,S.useCallback)(()=>{d<=1||n((f-1+d)%d,!0)},[n,f,d]),g=(0,S.useCallback)(()=>{d<=1||n((f+1)%d,!0)},[n,f,d]);return(0,S.useEffect)(()=>{if(o||c||d<=1)return;let e=window.setInterval(()=>{n((f+1)%d)},7e3);return()=>window.clearInterval(e)},[n,c,o,f,d]),d===0?null:(0,C.jsxDEV)(`div`,{className:s(`relative`,a),onMouseEnter:()=>l(!0),onMouseLeave:()=>l(!1),onFocusCapture:()=>l(!0),onBlurCapture:e=>{let t=e.relatedTarget;t instanceof Node&&e.currentTarget.contains(t)||l(!1)},children:[(0,C.jsxDEV)(`div`,{role:`region`,"aria-label":`Showcase project album`,"aria-roledescription":`carousel`,tabIndex:0,onKeyDown:e=>{e.key===`ArrowLeft`&&(e.preventDefault(),m()),e.key===`ArrowRight`&&(e.preventDefault(),g())},className:`focus-visible:focus-ring rounded-[2rem]`,children:(0,C.jsxDEV)(`div`,{className:`relative mx-auto h-[min(72vh,640px)] max-w-6xl [perspective:1400px]`,"aria-live":`polite`,children:e.map((e,t)=>{let a=y(t,f,d);return(0,C.jsxDEV)(x,{project:e,offset:a,isActive:a===0,hidden:Math.abs(a)>2,reducedMotion:o,onOpenImage:r,onViewDetails:i,onActivate:()=>n(t,!0)},e.id,!1,{fileName:w,lineNumber:113,columnNumber:15},this)})},void 0,!1,{fileName:w,lineNumber:102,columnNumber:9},this)},void 0,!1,{fileName:w,lineNumber:94,columnNumber:7},this),d>1?(0,C.jsxDEV)(`div`,{className:`mt-8 flex flex-col gap-4 border-t border-sand/10 pt-6 sm:flex-row sm:items-center sm:justify-between`,children:[(0,C.jsxDEV)(`p`,{className:`font-mono text-xs text-sand/50`,children:[`Project `,f+1,` of `,d]},void 0,!0,{fileName:w,lineNumber:131,columnNumber:11},this),(0,C.jsxDEV)(h,{items:p,activeIndex:f,onPrev:m,onNext:g,onSelect:e=>n(e,!0),ariaLabel:`Showcase album controls`},void 0,!1,{fileName:w,lineNumber:134,columnNumber:11},this)]},void 0,!0,{fileName:w,lineNumber:130,columnNumber:9},this):null]},void 0,!0,{fileName:w,lineNumber:83,columnNumber:5},this)}function x({project:e,offset:t,isActive:n,hidden:r,reducedMotion:i,onOpenImage:a,onViewDetails:o,onActivate:c}){let l=(0,S.useRef)(null),[u,d]=(0,S.useState)({x:0,y:0}),[f,m]=(0,S.useState)(!1),h=Math.abs(t),_=t*58,v=n?80:-h*90,y=n?1:Math.max(.72,1-h*.12),b=t*-14,x=r?0:n?1:Math.max(.35,1-h*.28),T=20-h;return(0,C.jsxDEV)(`div`,{ref:l,id:g(e.id),className:s(`absolute inset-x-8 top-1/2 mx-auto w-[min(100%,420px)] -translate-y-1/2 ease-out sm:inset-x-16 lg:w-[min(100%,480px)]`,f?`transition-opacity duration-500`:`transition-[transform,opacity] duration-500`,r&&`pointer-events-none`,!n&&!r&&`cursor-pointer`),style:{transform:`translateX(calc(-50% + ${_}%)) translateY(-50%) translateZ(${v}px) rotateY(${b+u.y}deg) rotateX(${u.x}deg) scale(${y})`,opacity:x,zIndex:T,left:`50%`,transformStyle:`preserve-3d`},onClick:()=>{n||c()},onPointerEnter:()=>m(!0),onPointerMove:e=>{if(!n||i)return;let t=l.current;if(!t)return;let r=t.getBoundingClientRect(),a=(e.clientX-r.left)/r.width-.5;d({x:((e.clientY-r.top)/r.height-.5)*-8,y:a*10})},onPointerLeave:()=>{d({x:0,y:0}),m(!1)},"aria-hidden":!n,children:(0,C.jsxDEV)(p,{project:e,variant:`gallery`,isActive:n,disableCoverFlowMotion:!0,onOpenImage:a,onViewDetails:o,className:s(!n&&`pointer-events-none select-none`,n&&`border-gold-500/45 shadow-[0_24px_60px_rgba(202,138,4,0.18)] ring-1 ring-gold-500/25`)},void 0,!1,{fileName:w,lineNumber:219,columnNumber:7},this)},void 0,!1,{fileName:w,lineNumber:195,columnNumber:5},this)}var S,C,w,T=t((()=>{S=e(n(),1),v(),o(),f(),d(),m(),C=r(),w=`/Volumes/t7/Development/monx/jerome/src/components/molecules/ShowcaseAlbumFlow.tsx`,b.__docgenInfo={description:``,methods:[],displayName:`ShowcaseAlbumFlow`,props:{projects:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
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
}`,signature:{properties:[{key:`src`,value:{name:`string`,required:!0}},{key:`alt`,value:{name:`string`,required:!0}},{key:`label`,value:{name:`string`,required:!1}}]}}],raw:`PortfolioImage[]`,required:!1}},{key:`span`,value:{name:`union`,raw:`'default' | 'full'`,elements:[{name:`literal`,value:`'default'`},{name:`literal`,value:`'full'`}],required:!1}},{key:`url`,value:{name:`string`,required:!1}}]}}],raw:`PortfolioProject[]`},description:``},activeIndex:{required:!0,tsType:{name:`number`},description:``},onActiveIndexChange:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(index: number, userInitiated?: boolean) => void`,signature:{arguments:[{type:{name:`number`},name:`index`},{type:{name:`boolean`},name:`userInitiated`}],return:{name:`void`}}},description:``},onOpenImage:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(project: PortfolioProject, index: number) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
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
}`,signature:{properties:[{key:`src`,value:{name:`string`,required:!0}},{key:`alt`,value:{name:`string`,required:!0}},{key:`label`,value:{name:`string`,required:!1}}]}}],raw:`PortfolioImage[]`,required:!1}},{key:`span`,value:{name:`union`,raw:`'default' | 'full'`,elements:[{name:`literal`,value:`'default'`},{name:`literal`,value:`'full'`}],required:!1}},{key:`url`,value:{name:`string`,required:!1}}]}},name:`project`}],return:{name:`void`}}},description:``},className:{required:!1,tsType:{name:`string`},description:``}}}})),E,D,O,k,A,j,M,N,P;t((()=>{E=e(n(),1),c(),i(),T(),D=r(),O=`/Volumes/t7/Development/monx/jerome/src/components/molecules/ShowcaseAlbumFlow.stories.tsx`,k={title:`Molecules/ShowcaseAlbumFlow`,component:b,tags:[`autodocs`]},A=l.slice(0,4),j={render:function(){let[e,t]=(0,E.useState)(0);return(0,D.jsxDEV)(b,{projects:A,activeIndex:e,onActiveIndexChange:t,onOpenImage:()=>void 0,onViewDetails:()=>void 0},void 0,!1,{fileName:O,lineNumber:17,columnNumber:12},this)}},M={render:function(){let[e,t]=(0,E.useState)(1);return(0,D.jsxDEV)(b,{projects:A,activeIndex:e,onActiveIndexChange:t,onOpenImage:()=>void 0,onViewDetails:()=>void 0,className:`max-w-5xl`},void 0,!1,{fileName:O,lineNumber:23,columnNumber:12},this)}},N={render:function(){let[e,t]=(0,E.useState)(0);return(0,D.jsxDEV)(b,{projects:A,activeIndex:e,onActiveIndexChange:t,onOpenImage:()=>void 0,onViewDetails:()=>void 0},void 0,!1,{fileName:O,lineNumber:29,columnNumber:12},this)},...a},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: function Render() {
    const [activeIndex, setActiveIndex] = useState(0);
    return <ShowcaseAlbumFlow projects={projects} activeIndex={activeIndex} onActiveIndexChange={setActiveIndex} onOpenImage={() => undefined} onViewDetails={() => undefined} />;
  }
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: function Render() {
    const [activeIndex, setActiveIndex] = useState(1);
    return <ShowcaseAlbumFlow projects={projects} activeIndex={activeIndex} onActiveIndexChange={setActiveIndex} onOpenImage={() => undefined} onViewDetails={() => undefined} className="max-w-5xl" />;
  }
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: function Render() {
    const [activeIndex, setActiveIndex] = useState(0);
    return <ShowcaseAlbumFlow projects={projects} activeIndex={activeIndex} onActiveIndexChange={setActiveIndex} onOpenImage={() => undefined} onViewDetails={() => undefined} />;
  },
  ...a11yStoryParameters
}`,...N.parameters?.docs?.source}}},P=[`Default`,`Variants`,`Accessibility`]}))();export{N as Accessibility,j as Default,M as Variants,P as __namedExportsOrder,k as default};