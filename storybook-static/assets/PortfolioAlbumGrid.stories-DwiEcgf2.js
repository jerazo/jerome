import{n as e}from"./chunk-DnJy8xQt.js";import{t}from"./iframe-PvspA9v5.js";import{n,t as r}from"./storyParameters-DAWmaSlC.js";import{n as i,t as a}from"./cn-B39jY00a.js";import{n as o,r as s}from"./portfolio-D6kqb6O8.js";import{n as c,t as l}from"./PortfolioProjectCard-BkQz1HNy.js";function u(e,t){if(e.span===`full`)return`sm:col-span-2 lg:col-span-3`;let n=t%6;if(n===0)return`lg:row-span-2`;if(n===3)return`sm:col-span-2 lg:col-span-1`}function d({projects:e,onOpenImage:t,onViewDetails:n,className:r}){return(0,f.jsxDEV)(`div`,{className:a(`portfolio-album-grid`,r),children:(0,f.jsxDEV)(`div`,{className:`portfolio-album-grid__inner grid auto-rows-[minmax(18rem,auto)] grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7`,role:`list`,"aria-label":`Portfolio projects`,children:e.map((e,r)=>(0,f.jsxDEV)(`div`,{role:`listitem`,className:a(`portfolio-album-grid__tile min-h-0`,u(e,r)),children:(0,f.jsxDEV)(l,{project:e,variant:`album`,onOpenImage:t,onViewDetails:n,className:`h-full`},void 0,!1,{fileName:p,lineNumber:40,columnNumber:13},this)},e.id,!1,{fileName:p,lineNumber:35,columnNumber:11},this))},void 0,!1,{fileName:p,lineNumber:29,columnNumber:7},this)},void 0,!1,{fileName:p,lineNumber:28,columnNumber:5},this)}var f,p,m=e((()=>{i(),c(),f=t(),p=`/Volumes/t7/Development/monx/jerome/src/components/molecules/PortfolioAlbumGrid.tsx`,d.__docgenInfo={description:``,methods:[],displayName:`PortfolioAlbumGrid`,props:{projects:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
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
}`,signature:{properties:[{key:`src`,value:{name:`string`,required:!0}},{key:`alt`,value:{name:`string`,required:!0}},{key:`label`,value:{name:`string`,required:!1}}]}}],raw:`PortfolioImage[]`,required:!1}},{key:`span`,value:{name:`union`,raw:`'default' | 'full'`,elements:[{name:`literal`,value:`'default'`},{name:`literal`,value:`'full'`}],required:!1}},{key:`url`,value:{name:`string`,required:!1}}]}}],raw:`PortfolioProject[]`},description:``},onOpenImage:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(project: PortfolioProject, index: number) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
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
}`,signature:{properties:[{key:`src`,value:{name:`string`,required:!0}},{key:`alt`,value:{name:`string`,required:!0}},{key:`label`,value:{name:`string`,required:!1}}]}}],raw:`PortfolioImage[]`,required:!1}},{key:`span`,value:{name:`union`,raw:`'default' | 'full'`,elements:[{name:`literal`,value:`'default'`},{name:`literal`,value:`'full'`}],required:!1}},{key:`url`,value:{name:`string`,required:!1}}]}},name:`project`}],return:{name:`void`}}},description:``},className:{required:!1,tsType:{name:`string`},description:``}}}})),h,g,_,v,y,b,x,S;e((()=>{o(),n(),m(),h=t(),g=`/Volumes/t7/Development/monx/jerome/src/components/molecules/PortfolioAlbumGrid.stories.tsx`,_={title:`Molecules/PortfolioAlbumGrid`,component:d,tags:[`autodocs`]},v=s.slice(0,3),y={args:{projects:v,onOpenImage:()=>void 0,onViewDetails:()=>void 0}},b={render:()=>(0,h.jsxDEV)(d,{projects:v,onOpenImage:()=>void 0,onViewDetails:()=>void 0,className:`max-w-5xl`},void 0,!1,{fileName:g,lineNumber:21,columnNumber:17},void 0)},x={args:{projects:v,onOpenImage:()=>void 0,onViewDetails:()=>void 0},...r},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    projects,
    onOpenImage: () => undefined,
    onViewDetails: () => undefined
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <PortfolioAlbumGrid projects={projects} onOpenImage={() => undefined} onViewDetails={() => undefined} className="max-w-5xl" />
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    projects,
    onOpenImage: () => undefined,
    onViewDetails: () => undefined
  },
  ...a11yStoryParameters
}`,...x.parameters?.docs?.source}}},S=[`Default`,`Variants`,`Accessibility`]}))();export{x as Accessibility,y as Default,b as Variants,S as __namedExportsOrder,_ as default};