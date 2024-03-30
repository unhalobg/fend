(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[769],{8760:function(e,t,n){"use strict";n.d(t,{Z:function(){return g}});var r=n(3366),s=n(7462),a=n(7294),i=n(6010),o=n(8320),c=n(5677),u=n(4780),p=n(5149);var d=(0,n(182).ZP)(),l=n(6500),h=n(5893);const x=["className","component","disableGutters","fixed","maxWidth","classes"],f=(0,l.Z)(),m=d("div",{name:"MuiContainer",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[`maxWidth${(0,o.Z)(String(n.maxWidth))}`],n.fixed&&t.fixed,n.disableGutters&&t.disableGutters]}}),b=e=>(0,p.Z)({props:e,name:"MuiContainer",defaultTheme:f});const v=function(e={}){const{createStyledComponent:t=m,useThemeProps:n=b,componentName:p="MuiContainer"}=e,d=t((({theme:e,ownerState:t})=>(0,s.Z)({width:"100%",marginLeft:"auto",boxSizing:"border-box",marginRight:"auto",display:"block"},!t.disableGutters&&{paddingLeft:e.spacing(2),paddingRight:e.spacing(2),[e.breakpoints.up("sm")]:{paddingLeft:e.spacing(3),paddingRight:e.spacing(3)}})),(({theme:e,ownerState:t})=>t.fixed&&Object.keys(e.breakpoints.values).reduce(((t,n)=>{const r=n,s=e.breakpoints.values[r];return 0!==s&&(t[e.breakpoints.up(r)]={maxWidth:`${s}${e.breakpoints.unit}`}),t}),{})),(({theme:e,ownerState:t})=>(0,s.Z)({},"xs"===t.maxWidth&&{[e.breakpoints.up("xs")]:{maxWidth:Math.max(e.breakpoints.values.xs,444)}},t.maxWidth&&"xs"!==t.maxWidth&&{[e.breakpoints.up(t.maxWidth)]:{maxWidth:`${e.breakpoints.values[t.maxWidth]}${e.breakpoints.unit}`}}))),l=a.forwardRef((function(e,t){const a=n(e),{className:l,component:f="div",disableGutters:m=!1,fixed:b=!1,maxWidth:v="lg"}=a,g=(0,r.Z)(a,x),k=(0,s.Z)({},a,{component:f,disableGutters:m,fixed:b,maxWidth:v}),Z=((e,t)=>{const{classes:n,fixed:r,disableGutters:s,maxWidth:a}=e,i={root:["root",a&&`maxWidth${(0,o.Z)(String(a))}`,r&&"fixed",s&&"disableGutters"]};return(0,u.Z)(i,(e=>(0,c.Z)(t,e)),n)})(k,p);return(0,h.jsx)(d,(0,s.Z)({as:f,ownerState:k,className:(0,i.Z)(Z.root,l),ref:t},g))}));return l}();var g=v},6529:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/notifications",function(){return n(637)}])},1597:function(e,t,n){"use strict";var r=n(5893),s=n(5547),a=n(9226),i=n(5861),o=(n(7294),n(1001));t.Z=function(e){var t=e.errorTitle,n=e.errorMessage,c=e.onClose;return(0,r.jsx)(s.Z,{open:null!=n,onClose:c,children:(0,r.jsxs)(a.Z,{sx:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:400,bgcolor:"background.paper",border:"2px solid #000",boxShadow:24,p:4},children:[(0,r.jsx)(i.Z,{variant:"h6",component:"h2",children:t}),(0,r.jsx)(i.Z,{sx:{mt:2,color:o.E7},children:n})]})})}},637:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return k}});var r=n(7568),s=n(4051),a=n.n(s),i=n(5893),o=(n(7294),n(9662)),c=n(9783),u=function(e){return{authorization:"Bearer "+e,spsecretkey:o.q}},p=function(){var e=(0,r.Z)(a().mark((function e(t,n){return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.b.post("http://localhost:8080/api/v1/notifications/retrieve/all",{userId:n},{headers:u(t)}).then((function(e){return e.data})).catch((function(e){throw e}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),d=n(6886),l=n(3321),h=n(8760);var x=(0,n(1354).Z)(),f=n(381),m=n.n(f),b=n(1597),v=n(1163);function g(e){var t=e.notifications,n=e.user,r=(e.token,e.error),s=(0,v.useRouter)();return(0,i.jsxs)(h.Z,{children:[(0,i.jsx)(b.Z,{errorTitle:"Error",errorMessage:r,onClose:function(){}}),(0,i.jsx)("h3",{children:"Notifications"}),(0,i.jsx)("div",{children:t.map((function(e,t){return(0,i.jsx)(x,{boxShadow:2,style:{marginBottom:"10px",borderRadius:"20px",padding:"10px 10px",backgroundColor:"whitesmoke"},children:(0,i.jsxs)(d.ZP,{container:!0,children:[(0,i.jsxs)(d.ZP,{item:!0,xs:11,md:11,children:[(0,i.jsxs)("p",{style:{fontSize:"15px"},children:[e.message," ",(0,i.jsx)("span",{children:console.log(e)})]}),(0,i.jsx)("p",{style:{fontSize:"12px",color:"GrayText"},children:m()(e.createdAt).format("MM/DD/YYYY hh:mm A")})]}),(0,i.jsx)(d.ZP,{item:!0,xs:1,md:1,children:(0,i.jsx)(l.Z,{onClick:function(t){t.preventDefault(),"agency_application"==e.type&&2==n.accessLevel?s.push("/agency/application/status"):"agency_student_request_application"==e.type&&2==n.accessLevel?s.push("/placement/"+e.formId):"student_application"==e.type&&1==n.accessLevel?s.push("/student/application/status"):"agency_student_request_application"==e.type&&1==n.accessLevel?s.push("/student/placement"):"student_application"==e.type&&3==n.accessLevel?s.push("/admin/review/student/"+e.formId):"agency_application"==e.type&&3==n.accessLevel&&s.push("/admin/review/agency/"+e.formId)},children:"Detail"})})]})},t)}))})]})}var k=g;g.getInitialProps=function(){var e=(0,r.Z)(a().mark((function e(t){var n,r,s,i,c,u;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=t.req,e.prev=1,r=(0,o.h)(n),s=r.token,3!=(i=r.user).accessLevel){e.next=10;break}return e.next=6,p(s,1111111111);case 6:return c=e.sent,e.abrupt("return",{notifications:c,user:i,token:s});case 10:return e.next=12,p(s,i.id);case 12:return u=e.sent,e.abrupt("return",{notifications:u,user:i,token:s});case 14:e.next=19;break;case 16:return e.prev=16,e.t0=e.catch(1),e.abrupt("return",{notifications:[],user:null,token:null,error:e.t0.message});case 19:case"end":return e.stop()}}),e,null,[[1,16]])})));return function(t){return e.apply(this,arguments)}}()}},function(e){e.O(0,[885,774,888,179],(function(){return t=6529,e(e.s=t);var t}));var t=e.O();_N_E=t}]);