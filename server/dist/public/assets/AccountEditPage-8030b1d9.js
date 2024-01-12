import{r as S,j as t,av as F,aw as f,u as k,a as I,B}from"./index-0855f763.js";import{C as D,D as P,P as L}from"./Employee-c67ee596.js";import{z as x,b as p,u as M,F as A,S as E,t as V,I as c,C as w}from"./CustomLink-6cc9b445.js";import{a as T}from"./account.service-709cf003.js";import{S as h}from"./SecondaryButton-608552b3.js";import"./TextField-a8bbe8ff.js";const U=x.object({firstName:x.string().trim().min(1,{message:"Field can not be empty"}).min(2,{message:"First name must be at least 2 characters"}).max(24,{message:"First name must be less than 24 characters"}),lastName:x.string().trim().min(1,{message:"Field can not be empty"}).min(2,{message:"Last name must be at least 2 characters"}).max(24,{message:"Last name must be less than 24 characters"}),ID:x.string().trim().min(1,{message:"Field can not be empty"}).regex(/^[A-Z0-9]{8,18}$/,"Invalid ID")});function W(n){const[e,s]=S.useState(0);function a(){e<n.length-1&&s(i=>i+1)}function o(){e>0&&s(i=>i-1)}function m(i){s(i)}return{currentStepIndex:e,step:n[e],steps:n,next:a,back:o,goTo:m,isFirstStep:e===0,isLastStep:e===n.length-1}}const z=n=>{const{children:e,onClick:s}=n;return t.jsx(h,{variant:"contained",type:"button",sx:p,onClick:s,children:e||"Back"})},J=n=>{const{children:e,onClick:s}=n;return t.jsx(h,{variant:"contained",type:"button",sx:p,onClick:s,children:e||"Cancel"})},R=n=>{const{children:e,onClick:s}=n;return t.jsx(h,{variant:"contained",type:"button",sx:p,onClick:s,children:e||"Next"})},Z=S.createContext(void 0),$=({children:n,goToNextStep:e,goToPreviousStep:s})=>{const a={children:n,goToNextStep:e,goToPreviousStep:s};return t.jsx(Z.Provider,{value:a,children:n})},q=n=>{const e=F.history.back,{children:s,schema:a,defaultValues:o,submit:m,...i}=n,l=M({resolver:V(a),defaultValues:o,criteriaMode:"all",mode:"onBlur",reValidateMode:"onBlur"}),{handleSubmit:d}=l,r=C=>m(C),{step:u,steps:g,back:j,next:b,currentStepIndex:y,isFirstStep:N,isLastStep:v}=W([...s]);return t.jsx(A,{...l,children:t.jsx($,{goToPreviousStep:j,goToNextStep:b,children:t.jsxs("form",{onSubmit:d(r),...i,children:[y+1," / ",g.length,u,t.jsxs("div",{className:"flex space-between",children:[N?null:t.jsx(z,{onClick:j}),t.jsx(J,{onClick:e}),v?t.jsx(E,{}):t.jsx(R,{onClick:b})]})]})})})},G=x.object({}).merge(U).merge(D).merge(P).merge(L),H=n=>{var l,d;const{children:e}=n,s=f(),a=k(r=>r.profile),o=I(r=>r.employee),m={firstName:(a==null?void 0:a.firstName)||"",lastName:(a==null?void 0:a.lastName)||"",ID:(a==null?void 0:a.ID)||"",companyName:((l=o==null?void 0:o.company)==null?void 0:l.companyName)||"",departmentName:((d=o==null?void 0:o.department)==null?void 0:d.departmentName)||"",position:(o==null?void 0:o.position)||""};async function i(r){const u=await T.updateAccount(r.firstName,r.lastName,r.ID,r.companyName,r.departmentName,r.position);u!=null&&u.isComplete&&s({to:"/"})}return t.jsx(q,{schema:G,defaultValues:m,submit:i,children:e})},K=()=>t.jsxs("div",{children:[t.jsx("h2",{children:"Company"}),t.jsx(c,{name:"companyName",label:"Company",type:"text"}),t.jsx(c,{name:"departmentName",label:"Department",type:"text"}),t.jsx(c,{name:"position",label:"Position",type:"text"})]}),O=()=>t.jsxs("div",{children:[t.jsx("h2",{children:"Profile"}),t.jsx(c,{name:"firstName",label:"First name",type:"text"}),t.jsx(c,{name:"lastName",label:"Last name",type:"text"}),t.jsx(c,{name:"ID",label:"ID",type:"text"})]}),nt=()=>t.jsxs(B,{component:"article",sx:{maxWidth:"25rem",mx:"auto",p:"1rem"},children:[t.jsxs(H,{children:[t.jsx(O,{}),t.jsx(K,{})]}),t.jsxs("p",{children:["Want to join your company?"," ",t.jsx(w,{to:"/account/join",children:"Join a company"})]})]});export{nt as default};