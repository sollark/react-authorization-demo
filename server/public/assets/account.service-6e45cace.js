import{a4 as a,ay as u}from"./index-90a9f0c0.js";async function p(c,n,t,e,r,o){const s=await a.post("account/update",{firstName:c,lastName:n,ID:t,companyName:e,departmentName:r,position:o});if(s&&s.success){const{account:i}=s.data;return u.saveAccount(i),i}return null}async function f(c,n){const t=await a.post("account/join",{companyNumber:c,employeeNumber:n});if(!t)return{success:!1,message:"Cannot connect to server"};const{success:e,message:r}=t;if(e){const{data:o}=t,{account:s}=o;return u.saveAccount(s),t}return t}async function v(){const c=await a.get("account");if(c&&c.success){const{account:n}=c.data;return u.saveAccount(n),n}return null}const l={updateAccount:p,joinCompany:f,getAccount:v};export{l as a};