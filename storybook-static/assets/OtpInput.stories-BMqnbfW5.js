import{a as e,n as t}from"./chunk-DnJy8xQt.js";import{M as n,t as r}from"./iframe-PvspA9v5.js";import{n as i,t as a}from"./storyParameters-DAWmaSlC.js";import{n as o,t as s}from"./OtpInput-CuF96VuP.js";var c,l,u,d,f,p,m,h;t((()=>{c=e(n(),1),i(),o(),l=r(),u=`/Volumes/t7/Development/monx/jerome/src/components/molecules/OtpInput.stories.tsx`,d={title:`Molecules/OtpInput`,component:s,tags:[`autodocs`]},f={render:function(){let[e,t]=(0,c.useState)(``);return(0,l.jsxDEV)(s,{value:e,onChange:t},void 0,!1,{fileName:u,lineNumber:15,columnNumber:12},this)}},p={render:function(){let[e,t]=(0,c.useState)(`123`);return(0,l.jsxDEV)(`div`,{className:`space-y-4`,children:[(0,l.jsxDEV)(s,{value:e,onChange:t},void 0,!1,{fileName:u,lineNumber:22,columnNumber:9},this),(0,l.jsxDEV)(s,{value:``,onChange:()=>void 0,disabled:!0},void 0,!1,{fileName:u,lineNumber:23,columnNumber:9},this),(0,l.jsxDEV)(s,{value:`123456`,onChange:()=>void 0,length:6},void 0,!1,{fileName:u,lineNumber:24,columnNumber:9},this)]},void 0,!0,{fileName:u,lineNumber:21,columnNumber:12},this)}},m={render:function(){let[e,t]=(0,c.useState)(``);return(0,l.jsxDEV)(s,{id:`otp-a11y`,value:e,onChange:t,autoFocus:!0,"aria-invalid":e.length>0&&e.length<6,"aria-describedby":`otp-hint`},void 0,!1,{fileName:u,lineNumber:31,columnNumber:12},this)},...a},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: function Render() {
    const [value, setValue] = useState('');
    return <OtpInput value={value} onChange={setValue} />;
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: function Render() {
    const [value, setValue] = useState('123');
    return <div className="space-y-4">
        <OtpInput value={value} onChange={setValue} />
        <OtpInput value="" onChange={() => undefined} disabled />
        <OtpInput value="123456" onChange={() => undefined} length={6} />
      </div>;
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: function Render() {
    const [value, setValue] = useState('');
    return <OtpInput id="otp-a11y" value={value} onChange={setValue} autoFocus aria-invalid={value.length > 0 && value.length < 6} aria-describedby="otp-hint" />;
  },
  ...a11yStoryParameters
}`,...m.parameters?.docs?.source}}},h=[`Default`,`Variants`,`Accessibility`]}))();export{m as Accessibility,f as Default,p as Variants,h as __namedExportsOrder,d as default};