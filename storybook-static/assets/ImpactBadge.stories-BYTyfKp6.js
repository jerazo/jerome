import{n as e}from"./chunk-DnJy8xQt.js";import{t}from"./iframe-PvspA9v5.js";import{n,t as r}from"./storyParameters-DAWmaSlC.js";import{i,t as a}from"./fixtures-ByHyF4UG.js";import{n as o,r as s,t as c}from"./ImpactBadge-UU0uRHXw.js";var l,u,d,f,p,m,h,g;e((()=>{a(),n(),s(),l=t(),u=`/Volumes/t7/Development/monx/jerome/src/components/molecules/ImpactBadge.stories.tsx`,d={title:`Molecules/ImpactBadge`,component:c,tags:[`autodocs`]},f=i.impactMetrics??[{label:`Latency`,value:`-45%`},{label:`Users`,value:`1M+`}],p={args:{metrics:f}},m={render:()=>(0,l.jsxDEV)(`div`,{className:`space-y-6 max-w-md`,children:[(0,l.jsxDEV)(c,{metrics:f},void 0,!1,{fileName:u,lineNumber:26,columnNumber:7},void 0),(0,l.jsxDEV)(c,{metrics:f,variant:`summary`},void 0,!1,{fileName:u,lineNumber:27,columnNumber:7},void 0),f[0]&&(0,l.jsxDEV)(o,{metric:f[0],glow:!0},void 0,!1,{fileName:u,lineNumber:28,columnNumber:22},void 0)]},void 0,!0,{fileName:u,lineNumber:25,columnNumber:17},void 0)},h={args:{metrics:f},...r},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    metrics
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <div className="space-y-6 max-w-md">
      <ImpactBadge metrics={metrics} />
      <ImpactBadge metrics={metrics} variant="summary" />
      {metrics[0] && <ImpactMetricHighlight metric={metrics[0]} glow />}
    </div>
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    metrics
  },
  ...a11yStoryParameters
}`,...h.parameters?.docs?.source}}},g=[`Default`,`Variants`,`Accessibility`]}))();export{h as Accessibility,p as Default,m as Variants,g as __namedExportsOrder,d as default};