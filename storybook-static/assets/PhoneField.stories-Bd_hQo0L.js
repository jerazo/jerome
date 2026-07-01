import{a as e,n as t}from"./chunk-DnJy8xQt.js";import{M as n,t as r}from"./iframe-PvspA9v5.js";import{n as i,t as a}from"./storyParameters-DAWmaSlC.js";import{n as o,t as s}from"./PhoneField-DOB34g2d.js";var c,l,u,d,f,p,m,h;t((()=>{c=e(n(),1),i(),o(),l=r(),u=`/Volumes/t7/Development/monx/jerome/src/components/molecules/PhoneField.stories.tsx`,d={title:`Molecules/PhoneField`,component:s,tags:[`autodocs`]},f={render:function(){let[e,t]=(0,c.useState)(`US`),[n,r]=(0,c.useState)(``);return(0,l.jsxDEV)(s,{countryCode:e,nationalNumber:n,onCountryChange:t,onNationalNumberChange:r},void 0,!1,{fileName:u,lineNumber:16,columnNumber:12},this)}},p={render:function(){let[e,t]=(0,c.useState)(`GB`),[n,r]=(0,c.useState)(`7700900000`);return(0,l.jsxDEV)(`div`,{className:`space-y-4 max-w-md`,children:[(0,l.jsxDEV)(s,{countryCode:e,nationalNumber:n,onCountryChange:t,onNationalNumberChange:r},void 0,!1,{fileName:u,lineNumber:24,columnNumber:9},this),(0,l.jsxDEV)(s,{countryCode:`US`,nationalNumber:``,onCountryChange:()=>void 0,onNationalNumberChange:()=>void 0,placeholder:`Optional phone`},void 0,!1,{fileName:u,lineNumber:25,columnNumber:9},this),(0,l.jsxDEV)(s,{countryCode:`US`,nationalNumber:`123`,onCountryChange:()=>void 0,onNationalNumberChange:()=>void 0,error:`Enter a valid phone number`},void 0,!1,{fileName:u,lineNumber:26,columnNumber:9},this)]},void 0,!0,{fileName:u,lineNumber:23,columnNumber:12},this)}},m={render:function(){let[e,t]=(0,c.useState)(`US`),[n,r]=(0,c.useState)(``);return(0,l.jsxDEV)(s,{countryCode:e,nationalNumber:n,onCountryChange:t,onNationalNumberChange:r,countrySelectId:`phone-country-a11y`,phoneInputId:`phone-number-a11y`},void 0,!1,{fileName:u,lineNumber:34,columnNumber:12},this)},...a},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: function Render() {
    const [countryCode, setCountryCode] = useState('US');
    const [nationalNumber, setNationalNumber] = useState('');
    return <PhoneField countryCode={countryCode} nationalNumber={nationalNumber} onCountryChange={setCountryCode} onNationalNumberChange={setNationalNumber} />;
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: function Render() {
    const [countryCode, setCountryCode] = useState('GB');
    const [nationalNumber, setNationalNumber] = useState('7700900000');
    return <div className="space-y-4 max-w-md">
        <PhoneField countryCode={countryCode} nationalNumber={nationalNumber} onCountryChange={setCountryCode} onNationalNumberChange={setNationalNumber} />
        <PhoneField countryCode="US" nationalNumber="" onCountryChange={() => undefined} onNationalNumberChange={() => undefined} placeholder="Optional phone" />
        <PhoneField countryCode="US" nationalNumber="123" onCountryChange={() => undefined} onNationalNumberChange={() => undefined} error="Enter a valid phone number" />
      </div>;
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: function Render() {
    const [countryCode, setCountryCode] = useState('US');
    const [nationalNumber, setNationalNumber] = useState('');
    return <PhoneField countryCode={countryCode} nationalNumber={nationalNumber} onCountryChange={setCountryCode} onNationalNumberChange={setNationalNumber} countrySelectId="phone-country-a11y" phoneInputId="phone-number-a11y" />;
  },
  ...a11yStoryParameters
}`,...m.parameters?.docs?.source}}},h=[`Default`,`Variants`,`Accessibility`]}))();export{m as Accessibility,f as Default,p as Variants,h as __namedExportsOrder,d as default};