import{a as e,n as t}from"./chunk-DnJy8xQt.js";import{M as n,t as r}from"./iframe-PvspA9v5.js";import{n as i,t as a}from"./storyParameters-DAWmaSlC.js";import{n as o,t as s}from"./cn-B39jY00a.js";import{i as c,n as l,t as u}from"./lucide-react-D_dXB7QH.js";var d,f,p,m,h=t((()=>{u(),d=e(n(),1),o(),f=r(),p=`/Volumes/t7/Development/monx/jerome/src/components/molecules/MobileNavToggle.tsx`,m=(0,d.forwardRef)(function({open:e,menuId:t,onToggle:n,className:r},i){return(0,f.jsxDEV)(`button`,{ref:i,type:`button`,className:s(`inline-flex h-11 w-11 items-center justify-center rounded-full border border-sand/10 bg-white/5 text-sand transition hover:border-gold-500/30 hover:bg-white/10 focus-visible:focus-ring`,r),"aria-label":e?`Close navigation menu`:`Open navigation menu`,"aria-expanded":e,"aria-controls":t,onClick:n,children:e?(0,f.jsxDEV)(l,{size:18,"aria-hidden":!0},void 0,!1,{fileName:p,lineNumber:27,columnNumber:17},this):(0,f.jsxDEV)(c,{size:18,"aria-hidden":!0},void 0,!1,{fileName:p,lineNumber:27,columnNumber:47},this)},void 0,!1,{fileName:p,lineNumber:15,columnNumber:7},this)}),m.__docgenInfo={description:``,methods:[],displayName:`MobileNavToggle`,props:{open:{required:!0,tsType:{name:`boolean`},description:``},menuId:{required:!0,tsType:{name:`string`},description:``},onToggle:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},className:{required:!1,tsType:{name:`string`},description:``}}}})),g,_,v,y,b,x,S,C;t((()=>{g=e(n(),1),i(),h(),_=r(),v=`/Volumes/t7/Development/monx/jerome/src/components/molecules/MobileNavToggle.stories.tsx`,y={title:`Molecules/MobileNavToggle`,component:m,tags:[`autodocs`]},b={render:function(){let[e,t]=(0,g.useState)(!1);return(0,_.jsxDEV)(m,{open:e,menuId:`mobile-nav-menu`,onToggle:()=>t(e=>!e)},void 0,!1,{fileName:v,lineNumber:15,columnNumber:12},this)}},x={render:function(){let[e,t]=(0,g.useState)(!0);return(0,_.jsxDEV)(`div`,{className:`flex items-center gap-4`,children:[(0,_.jsxDEV)(m,{open:!1,menuId:`mobile-nav-closed`,onToggle:()=>void 0},void 0,!1,{fileName:v,lineNumber:22,columnNumber:9},this),(0,_.jsxDEV)(m,{open:e,menuId:`mobile-nav-open`,onToggle:()=>t(e=>!e)},void 0,!1,{fileName:v,lineNumber:23,columnNumber:9},this)]},void 0,!0,{fileName:v,lineNumber:21,columnNumber:12},this)}},S={render:function(){let[e,t]=(0,g.useState)(!1);return(0,_.jsxDEV)(_.Fragment,{children:[(0,_.jsxDEV)(m,{open:e,menuId:`mobile-nav-a11y`,onToggle:()=>t(e=>!e)},void 0,!1,{fileName:v,lineNumber:31,columnNumber:9},this),(0,_.jsxDEV)(`nav`,{id:`mobile-nav-a11y`,hidden:!e,className:`mt-4 text-sm`,children:`Navigation panel`},void 0,!1,{fileName:v,lineNumber:32,columnNumber:9},this)]},void 0,!0)},...a},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: function Render() {
    const [open, setOpen] = useState(false);
    return <MobileNavToggle open={open} menuId="mobile-nav-menu" onToggle={() => setOpen(value => !value)} />;
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: function Render() {
    const [open, setOpen] = useState(true);
    return <div className="flex items-center gap-4">
        <MobileNavToggle open={false} menuId="mobile-nav-closed" onToggle={() => undefined} />
        <MobileNavToggle open={open} menuId="mobile-nav-open" onToggle={() => setOpen(value => !value)} />
      </div>;
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: function Render() {
    const [open, setOpen] = useState(false);
    return <>
        <MobileNavToggle open={open} menuId="mobile-nav-a11y" onToggle={() => setOpen(value => !value)} />
        <nav id="mobile-nav-a11y" hidden={!open} className="mt-4 text-sm">
          Navigation panel
        </nav>
      </>;
  },
  ...a11yStoryParameters
}`,...S.parameters?.docs?.source}}},C=[`Default`,`Variants`,`Accessibility`]}))();export{S as Accessibility,b as Default,x as Variants,C as __namedExportsOrder,y as default};