import{j as r}from"./index-fc2bed8b.js";import{u as c,F as h,t as x}from"./CustomLink-dfbfca31.js";const F=({message:o})=>r.jsx("div",{children:o}),f=o=>{const{children:t,schema:n,defaultValues:i,submit:m,submitButton:s,...l}=o,e=c({resolver:x(n),defaultValues:i,criteriaMode:"all",mode:"onBlur",reValidateMode:"onBlur"}),{handleSubmit:u}=e,d=a=>{m(a)};return r.jsx(h,{...e,children:r.jsxs("form",{onSubmit:u(d),...l,children:[t,r.jsx("div",{children:s||null})]})})};export{F as E,f as F};
