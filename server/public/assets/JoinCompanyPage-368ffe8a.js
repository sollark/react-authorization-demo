import{r as x,aw as y,j as e,ax as l,B as b}from"./index-cef6223c.js";import{a as j,E as h}from"./Employee-47c9d153.js";import{z as d,S as g,I as o,C as f}from"./CustomLink-f4802a8b.js";import{F as C,E as N}from"./Form-a6db6cdb.js";import"./TextField-e1f98dd0.js";const E=d.object({}).merge(j).merge(h),S={companyNumber:"",employeeNumber:""},B=()=>{const[s,a]=x.useState(""),t=y();async function m(r){const{companyNumber:n,employeeNumber:c}=r;a("");const u=await l.joinCompany(n,c),{success:p,message:i}=u;if(!p){a(i);return}t({to:"/"})}return e.jsxs(C,{schema:E,defaultValue:S,submit:m,submitButton:e.jsx(g,{}),children:[e.jsx(o,{name:"companyNumber",label:"Company number",type:"text"}),e.jsx(o,{name:"employeeNumber",label:"Employee number",type:"text"}),e.jsx(N,{message:s})]})},I=()=>e.jsxs(b,{component:"article",sx:{maxWidth:"25rem",mx:"auto",p:"1rem"},children:[e.jsx("h2",{children:"Join a company"}),e.jsx(B,{}),e.jsxs("p",{children:["Want to create your company?"," ",e.jsx(f,{to:"/account/edit",children:"Create a company"})]})]});export{I as default};
