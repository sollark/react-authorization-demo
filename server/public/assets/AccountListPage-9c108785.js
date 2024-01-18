import{a as A,j as a,b as _,U as g,A as O,B as T}from"./index-94c5a148.js";import{e as x,T as w,a as D}from"./Table-46928938.js";import{u as S}from"./useQuery-d8faf213.js";import"./SecondaryButton-d8be78ef.js";import"./TextField-5daeca9c.js";let d,f;function v(){return async s=>{const t=D(s),{employeeNumber:o,role:r,status:n}=t;return await x.updateEmployeeAccount(o,r,n),!0}}const R=()=>{if(!A(e=>{var l;return(l=e.employee)==null?void 0:l.company}))return a.jsx("span",{children:"Error: Company is not found in the store"});const{t}=_(),o=[{field:"firstName",headerName:t("profile.first_name"),editable:!1,flex:1},{field:"lastName",headerName:t("profile.last_name"),editable:!1,flex:1},{field:"ID",headerName:t("profile.id"),editable:!1,flex:1},{field:"employeeNumber",headerName:t("employee.employee_number"),editable:!1,flex:1},{field:"role",headerName:t("user_role.user_role"),editable:!0,flex:1,type:"singleSelect",valueOptions:e=>d(e)},{field:"status",headerName:t("account_status.account_status"),editable:!0,flex:1,type:"singleSelect",valueOptions:e=>f(e)}],{isPending:r,isError:n,data:u,error:y}=S({queryKey:["accounts"],queryFn:x.getEmployeeAccountData});if(r)return a.jsx("span",{children:"Loading..."});if(n)return a.jsxs("span",{children:["Error: ",y.message]});if(!u)return a.jsx("span",{children:"Empty data"});const i=u,h=Object.values(g),N=Object.values(O);d=b(h),f=b(N);const j=i==null?void 0:i.map(e=>{var l,c,p,m;return{firstName:(l=e.profile)==null?void 0:l.firstName,lastName:(c=e.profile)==null?void 0:c.lastName,ID:(p=e.profile)==null?void 0:p.ID,employeeNumber:(m=e.employee)==null?void 0:m.employeeNumber,role:e.role,status:e.status}}),E=v();return a.jsxs("div",{children:[a.jsx("h2",{children:t("accounts_page.account_table")}),a.jsx(w,{basicProps:{dataRows:j,tableColumns:o},specialProps:{updateRow:E,config:{showAddButton:!1,showDeleteButton:!1}},editable:!0})]})};function b(s){return function(t){const o=[];return s==null||s.map(r=>o.push(r)),o}}const L=()=>{const s=R;return a.jsxs(T,{sx:{p:4},children:[a.jsx("h1",{children:"Account page"}),a.jsx(s,{})]})};export{L as default};
