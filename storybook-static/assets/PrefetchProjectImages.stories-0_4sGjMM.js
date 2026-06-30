import{a as e,n as t}from"./chunk-DnJy8xQt.js";import{M as n,t as r}from"./iframe-PvspA9v5.js";import{n as i,t as a}from"./storyParameters-DAWmaSlC.js";import{n as o,r as s,t as c}from"./portfolio-D6kqb6O8.js";import{r as l,t as u}from"./preloadPortfolioImage-raC6G5Y0.js";function d({projects:e,activeIndex:t,prefetchCount:n=2}){return(0,f.useEffect)(()=>{if(e.length===0)return;let r=[];for(let i=1;i<=n;i+=1){let n=e[(t+i)%e.length];if(!n)continue;let a=c(n)[0]?.src;a&&r.push(a)}r.length!==0&&l(r)},[t,n,e]),null}var f,p=t((()=>{f=e(n(),1),o(),u()})),m,h,g,_,v,y,b,x;t((()=>{o(),i(),p(),m=r(),h=`/Volumes/t7/Development/monx/jerome/src/components/molecules/PrefetchProjectImages.stories.tsx`,g={title:`Molecules/PrefetchProjectImages`,component:d,tags:[`autodocs`]},_=s.slice(0,4),v={args:{projects:_,activeIndex:0},render:e=>(0,m.jsxDEV)(m.Fragment,{children:[(0,m.jsxDEV)(d,{...e},void 0,!1,{fileName:h,lineNumber:19,columnNumber:7},void 0),(0,m.jsxDEV)(`p`,{className:`text-sm text-sand/70`,children:`Side-effect component — prefetches next portfolio images (renders nothing).`},void 0,!1,{fileName:h,lineNumber:20,columnNumber:7},void 0)]},void 0,!0)},y={render:()=>(0,m.jsxDEV)(`div`,{className:`space-y-2 text-sm text-sand/70`,children:[(0,m.jsxDEV)(d,{projects:_,activeIndex:0,prefetchCount:1},void 0,!1,{fileName:h,lineNumber:27,columnNumber:7},void 0),(0,m.jsxDEV)(d,{projects:_,activeIndex:2,prefetchCount:3},void 0,!1,{fileName:h,lineNumber:28,columnNumber:7},void 0),(0,m.jsxDEV)(`p`,{children:`Multiple prefetch configurations mounted for demonstration.`},void 0,!1,{fileName:h,lineNumber:29,columnNumber:7},void 0)]},void 0,!0,{fileName:h,lineNumber:26,columnNumber:17},void 0)},b={args:{projects:_,activeIndex:1,prefetchCount:2},render:e=>(0,m.jsxDEV)(m.Fragment,{children:[(0,m.jsxDEV)(d,{...e},void 0,!1,{fileName:h,lineNumber:39,columnNumber:7},void 0),(0,m.jsxDEV)(`p`,{className:`text-sm text-sand/70`,children:`No visible UI — accessibility checks apply to surrounding docs.`},void 0,!1,{fileName:h,lineNumber:40,columnNumber:7},void 0)]},void 0,!0),...a},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    projects,
    activeIndex: 0
  },
  render: args => <>
      <PrefetchProjectImages {...args} />
      <p className="text-sm text-sand/70">
        Side-effect component — prefetches next portfolio images (renders nothing).
      </p>
    </>
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <div className="space-y-2 text-sm text-sand/70">
      <PrefetchProjectImages projects={projects} activeIndex={0} prefetchCount={1} />
      <PrefetchProjectImages projects={projects} activeIndex={2} prefetchCount={3} />
      <p>Multiple prefetch configurations mounted for demonstration.</p>
    </div>
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    projects,
    activeIndex: 1,
    prefetchCount: 2
  },
  render: args => <>
      <PrefetchProjectImages {...args} />
      <p className="text-sm text-sand/70">No visible UI — accessibility checks apply to surrounding docs.</p>
    </>,
  ...a11yStoryParameters
}`,...b.parameters?.docs?.source}}},x=[`Default`,`Variants`,`Accessibility`]}))();export{b as Accessibility,v as Default,y as Variants,x as __namedExportsOrder,g as default};