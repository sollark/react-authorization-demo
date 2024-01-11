import{a as j,j as t,U as E,A,B as O}from"./index-cef6223c.js";import{e as d,T,a as g}from"./Table-a9260344.js";import{u as D}from"./useQuery-49761d12.js";import"./SecondaryButton-34ac6c7b.js";import"./TextField-e1f98dd0.js";let f,b;const S=[{field:"firstName",headerName:"First name",editable:!1,flex:1},{field:"lastName",headerName:"Last name",editable:!1,flex:1},{field:"ID",headerName:"ID",editable:!1,flex:1},{field:"employeeNumber",headerName:"Employee number",editable:!1,flex:1},{field:"role",headerName:"Role",editable:!0,flex:1,type:"singleSelect",valueOptions:e=>f(e)},{field:"status",headerName:"Status",editable:!0,flex:1,type:"singleSelect",valueOptions:e=>b(e)}];function w(){return async e=>{const l=g(e),{employeeNumber:s,role:r,status:n}=l;return await d.updateEmployeeAccount(s,r,n),!0}}const R=()=>{if(!j(a=>{var o;return(o=a.employee)==null?void 0:o.company}))return t.jsx("span",{children:"Error: Company is not found in the store"});const{isPending:l,isError:s,data:r,error:n}=D({queryKey:["accounts"],queryFn:d.getEmployeeAccountData});if(l)return t.jsx("span",{children:"Loading..."});if(s)return t.jsxs("span",{children:["Error: ",n.message]});if(!r)return t.jsx("span",{children:"Empty data"});const i=r,x=Object.values(E),y=Object.values(A);f=c(x),b=c(y);const h=i==null?void 0:i.map(a=>{var o,u,m,p;return{firstName:(o=a.profile)==null?void 0:o.firstName,lastName:(u=a.profile)==null?void 0:u.lastName,ID:(m=a.profile)==null?void 0:m.ID,employeeNumber:(p=a.employee)==null?void 0:p.employeeNumber,role:a.role,status:a.status}}),N=w();return t.jsxs("div",{children:[t.jsx("h2",{children:"Employee Table"}),t.jsx(T,{basicProps:{dataRows:h,tableColumns:S},specialProps:{updateRow:N,config:{showAddButton:!1,showDeleteButton:!1}},editable:!0})]})};function c(e){return function(l){const s=[];return e==null||e.map(r=>s.push(r)),s}}const P=()=>{const e=R;return t.jsxs(O,{sx:{p:4},children:[t.jsx("h1",{children:"Account page"}),t.jsx(e,{})]})};export{P as default};
