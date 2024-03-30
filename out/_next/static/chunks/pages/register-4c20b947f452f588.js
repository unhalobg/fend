(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[495],{6242:function(e,n,r){"use strict";r.d(n,{Z:function(){return v}});var t=r(7462),s=r(3366),i=r(7294),o=r(6010),l=r(4780),a=r(948),u=r(1657),c=r(5113),d=r(5677);function x(e){return(0,d.Z)("MuiCard",e)}(0,r(1588).Z)("MuiCard",["root"]);var h=r(5893);const p=["className","raised"],f=(0,a.ZP)(c.Z,{name:"MuiCard",slot:"Root",overridesResolver:(e,n)=>n.root})((()=>({overflow:"hidden"})));var v=i.forwardRef((function(e,n){const r=(0,u.Z)({props:e,name:"MuiCard"}),{className:i,raised:a=!1}=r,c=(0,s.Z)(r,p),d=(0,t.Z)({},r,{raised:a}),v=(e=>{const{classes:n}=e;return(0,l.Z)({root:["root"]},x,n)})(d);return(0,h.jsx)(f,(0,t.Z)({className:(0,o.Z)(v.root,i),elevation:a?8:void 0,ref:n,ownerState:d},c))}))},922:function(e,n,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/register",function(){return r(2996)}])},1597:function(e,n,r){"use strict";var t=r(5893),s=r(5547),i=r(9226),o=r(5861),l=(r(7294),r(1001));n.Z=function(e){var n=e.errorTitle,r=e.errorMessage,a=e.onClose;return(0,t.jsx)(s.Z,{open:null!=r,onClose:a,children:(0,t.jsxs)(i.Z,{sx:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:400,bgcolor:"background.paper",border:"2px solid #000",boxShadow:24,p:4},children:[(0,t.jsx)(o.Z,{variant:"h6",component:"h2",children:n}),(0,t.jsx)(o.Z,{sx:{mt:2,color:l.E7},children:r})]})})}},5133:function(e,n,r){"use strict";var t=r(5893),s=r(6798),i=r(1737);r(7294);n.Z=function(e){var n=e.message,r=e.onClose;return(0,t.jsx)(s.Z,{open:null!=n,autoHideDuration:1e3,onClose:r,children:(0,t.jsx)(i.Z,{severity:"success",onClose:r,children:n})})}},2996:function(e,n,r){"use strict";r.r(n);var t=r(7568),s=r(4924),i=r(6042),o=r(9396),l=r(4051),a=r.n(l),u=r(5893),c=r(6886),d=r(6242),x=r(1903),h=r(913),p=r(3841),f=r(315),v=r(3599),Z=r(3321),j=r(1664),m=r.n(j),g=r(1163),w=r(7294),y=r(1597),C=r(5133),b=r(5172),P=r(1001);n.default=function(){var e=(0,g.useRouter)(),n=(0,b.a)().register,r=(0,w.useState)({id:"",email:"",password:"",confirmPassword:"",role:"student"}),l=r[0],j=r[1],S=function(e){j((0,o.Z)((0,i.Z)({},l),(0,s.Z)({},e.target.name,e.target.value)))},_=(0,w.useState)(null),k=_[0],T=_[1],N=(0,w.useState)(null),R=N[0],E=N[1],W=function(){var r=(0,t.Z)(a().mark((function r(t){return a().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return t.preventDefault(),r.prev=1,r.next=4,n(l.id,l.email,l.password,l.role);case 4:E("Successfully Registered!"),setTimeout((function(){e.push("/login")}),1e3),r.next=11;break;case 8:r.prev=8,r.t0=r.catch(1),T(r.t0.message);case 11:case"end":return r.stop()}}),r,null,[[1,8]])})));return function(e){return r.apply(this,arguments)}}();return(0,u.jsxs)(c.ZP,{container:!0,justifyContent:"center",children:[(0,u.jsx)(C.Z,{message:R,onClose:function(){E(null)}}),(0,u.jsx)(y.Z,{errorMessage:k,onClose:function(){return T(null)},errorTitle:"Registration Failed"}),(0,u.jsx)(d.Z,{variant:"elevation",elevation:16,style:{padding:"20px 50px",marginTop:"5%",borderRadius:"10px"},children:(0,u.jsxs)("form",{onSubmit:W,children:[(0,u.jsx)(c.ZP,{container:!0,justifyContent:"center",children:(0,u.jsx)("p",{style:{fontSize:"30px",fontWeight:"bold"},children:" Sign Up "})}),(0,u.jsx)(c.ZP,{item:!0,children:(0,u.jsx)(x.Z,{type:"text",label:"UTA ID",name:"id",fullWidth:!0,variant:"outlined",value:l.id,onChange:S,required:!0})}),(0,u.jsx)("div",{style:{height:"20px"}}),(0,u.jsx)(c.ZP,{item:!0,children:(0,u.jsx)(x.Z,{type:"email",label:"Email",name:"email",fullWidth:!0,variant:"outlined",value:l.email,onChange:S,required:!0})}),(0,u.jsx)("div",{style:{height:"20px"}}),(0,u.jsx)(c.ZP,{item:!0,children:(0,u.jsx)(x.Z,{type:"password",label:"Password",fullWidth:!0,name:"password",variant:"outlined",value:l.password,onChange:S,required:!0})}),(0,u.jsx)("div",{style:{height:"20px"}}),(0,u.jsx)(c.ZP,{item:!0,children:(0,u.jsx)(x.Z,{type:"password",label:"Confirm password",fullWidth:!0,name:"confirmPassword",variant:"outlined",value:l.confirmPassword,onChange:S,required:!0,helperText:l.password!=l.confirmPassword&&null!=l.confirmPassword?"Password did not matched":null})}),(0,u.jsx)("div",{style:{height:"20px"}}),(0,u.jsxs)(h.Z,{fullWidth:!0,children:[(0,u.jsx)(p.Z,{children:"User Type"}),(0,u.jsxs)(f.Z,{name:"role",label:"Access Level",value:l.role,onChange:S,children:[(0,u.jsx)(v.Z,{value:"student",children:" Student "}),(0,u.jsx)(v.Z,{value:"agency",children:" Agency "}),(0,u.jsx)(v.Z,{value:"fieldInstructor",children:" Field Instructor "})]})]}),(0,u.jsx)("div",{style:{height:"20px"}}),(0,u.jsx)(c.ZP,{container:!0,justifyContent:"center",children:(0,u.jsx)(Z.Z,{variant:"contained",sx:{backgroundColor:P.lr,fontSize:"14px"},type:"submit",fullWidth:!0,className:"button-block",children:"Register"})}),(0,u.jsx)("div",{style:{height:"10px"}}),(0,u.jsx)(c.ZP,{container:!0,justifyContent:"center",children:(0,u.jsxs)("p",{style:{padding:"0px 50px"},children:[(0,u.jsx)("span",{style:{color:"black",fontSize:"16px"},children:"Have an account? "}),(0,u.jsx)(m(),{href:"/login",children:(0,u.jsx)(Z.Z,{sx:{color:P.lr,fontSize:"16px",textDecorationLine:"underline",textUnderlineOffset:"10px",textDecorationThickness:"3px"},children:"Sign In!"},"login")})]})})]})})]})}}},function(e){e.O(0,[592,644,774,888,179],(function(){return n=922,e(e.s=n);var n}));var n=e.O();_N_E=n}]);