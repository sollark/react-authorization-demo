import{r as y,aw as l,j as e,B as x}from"./index-90a9f0c0.js";import{a as b,E as j}from"./Employee-a1432837.js";import{a as h}from"./account.service-6e45cace.js";import{z as d,S as f,I as o,C as g}from"./CustomLink-13480850.js";import{F as C,E as N}from"./Form-bea3d8cc.js";import"./TextField-e1768982.js";const E=d.object({}).merge(b).merge(j),S={companyNumber:"",employeeNumber:""},B=()=>{const[s,a]=y.useState(""),t=l();async function m(r){const{companyNumber:n,employeeNumber:c}=r;a("");const u=await h.joinCompany(n,c),{success:p,message:i}=u;if(!p){a(i);return}t({to:"/"})}return e.jsxs(C,{schema:E,defaultValue:S,submit:m,submitButton:e.jsx(f,{}),children:[e.jsx(o,{name:"companyNumber",label:"Company number",type:"text"}),e.jsx(o,{name:"employeeNumber",label:"Employee number",type:"text"}),e.jsx(N,{message:s})]})},V=()=>e.jsxs(x,{component:"article",sx:{maxWidth:"25rem",mx:"auto",p:"1rem"},children:[e.jsx("h2",{children:"Join a company"}),e.jsx(B,{}),e.jsxs("p",{children:["Want to create your company?"," ",e.jsx(g,{to:"/account/edit",children:"Create a company"})]})]});export{V as default};