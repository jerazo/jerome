import{a as e,n as t}from"./chunk-DnJy8xQt.js";import{M as n,t as r}from"./iframe-PvspA9v5.js";import{n as i,t as a}from"./storyParameters-DAWmaSlC.js";import{n as o,t as s}from"./showcase-BHGasGdK.js";import{n as c,t as l}from"./ShowcaseCarouselControls-uPT-wKrS.js";var u,d,f,p,m,h,g,_,v;t((()=>{u=e(n(),1),s(),i(),c(),d=r(),f=`/Volumes/t7/Development/monx/jerome/src/components/molecules/ShowcaseCarouselControls.stories.tsx`,p={title:`Molecules/ShowcaseCarouselControls`,component:l,tags:[`autodocs`]},m=o.slice(0,4).map(e=>({id:e.id,label:e.title})),h={render:function(){let[e,t]=(0,u.useState)(0);return(0,d.jsxDEV)(l,{items:m,activeIndex:e,onPrev:()=>t(e=>Math.max(0,e-1)),onNext:()=>t(e=>Math.min(m.length-1,e+1)),onSelect:t},void 0,!1,{fileName:f,lineNumber:20,columnNumber:12},this)}},g={render:function(){let[e,t]=(0,u.useState)(2);return(0,d.jsxDEV)(l,{items:m,activeIndex:e,onPrev:()=>t(e=>Math.max(0,e-1)),onNext:()=>t(e=>Math.min(m.length-1,e+1)),onSelect:t,className:`opacity-90`,ariaLabel:`Showcase carousel navigation`},void 0,!1,{fileName:f,lineNumber:26,columnNumber:12},this)}},_={render:function(){let[e,t]=(0,u.useState)(0);return(0,d.jsxDEV)(l,{items:m,activeIndex:e,onPrev:()=>t(e=>Math.max(0,e-1)),onNext:()=>t(e=>Math.min(m.length-1,e+1)),onSelect:t,ariaLabel:`Showcase projects`},void 0,!1,{fileName:f,lineNumber:32,columnNumber:12},this)},...a},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: function Render() {
    const [activeIndex, setActiveIndex] = useState(0);
    return <ShowcaseCarouselControls items={items} activeIndex={activeIndex} onPrev={() => setActiveIndex(index => Math.max(0, index - 1))} onNext={() => setActiveIndex(index => Math.min(items.length - 1, index + 1))} onSelect={setActiveIndex} />;
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: function Render() {
    const [activeIndex, setActiveIndex] = useState(2);
    return <ShowcaseCarouselControls items={items} activeIndex={activeIndex} onPrev={() => setActiveIndex(index => Math.max(0, index - 1))} onNext={() => setActiveIndex(index => Math.min(items.length - 1, index + 1))} onSelect={setActiveIndex} className="opacity-90" ariaLabel="Showcase carousel navigation" />;
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: function Render() {
    const [activeIndex, setActiveIndex] = useState(0);
    return <ShowcaseCarouselControls items={items} activeIndex={activeIndex} onPrev={() => setActiveIndex(index => Math.max(0, index - 1))} onNext={() => setActiveIndex(index => Math.min(items.length - 1, index + 1))} onSelect={setActiveIndex} ariaLabel="Showcase projects" />;
  },
  ...a11yStoryParameters
}`,..._.parameters?.docs?.source}}},v=[`Default`,`Variants`,`Accessibility`]}))();export{_ as Accessibility,h as Default,g as Variants,v as __namedExportsOrder,p as default};