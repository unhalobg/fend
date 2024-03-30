(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{3184:function(e,t,n){"use strict";n.d(t,{Z:function(){return v}});var r=n(7462),s=n(3366),i=n(7294),o=n(6010),a=n(4780),l=n(4063),c=n(1657),u=n(948),d=n(5677);function p(e){return(0,d.Z)("MuiTableHead",e)}(0,n(1588).Z)("MuiTableHead",["root"]);var h=n(5893);const x=["className","component"],f=(0,u.ZP)("thead",{name:"MuiTableHead",slot:"Root",overridesResolver:(e,t)=>t.root})({display:"table-header-group"}),m={variant:"head"},j="thead";var v=i.forwardRef((function(e,t){const n=(0,c.Z)({props:e,name:"MuiTableHead"}),{className:i,component:u=j}=n,d=(0,s.Z)(n,x),v=(0,r.Z)({},n,{component:u}),g=(e=>{const{classes:t}=e;return(0,a.Z)({root:["root"]},p,t)})(v);return(0,h.jsx)(l.Z.Provider,{value:m,children:(0,h.jsx)(f,(0,r.Z)({as:u,className:(0,o.Z)(g.root,i),ref:t,role:u===j?null:"rowgroup",ownerState:v},d))})}))},5728:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(9823)}])},9823:function(e,t,n){"use strict";n.r(t),n.d(t,{__N_SSG:function(){return m},default:function(){return j}});var r=n(5893),s=n(6886),i=n(5861),o=n(3321),a=n(7906),l=n(3184),c=n(3816),u=n(3252),d=n(295),p=n(1163),h=(n(5172),n(1001)),x=n(381),f=n.n(x),m=!0;function j(e){var t=e.placements,n=e.user,x=(e.token,(0,p.useRouter)()),m=function(){return(0,r.jsxs)(s.ZP,{item:!0,direction:"column",textAlign:"center",children:[(0,r.jsx)(i.Z,{variant:"h5",sx:{fontWeight:"bold"},children:"You must have a subscription to access Smart Placement"}),(0,r.jsx)(i.Z,{textAlign:"start",sx:{marginBottom:"15px",padding:"2% 10%"},children:"The Field Office began using InPlace in Spring 2020, InPlace is a comprehensive internship management platform. Students will use the system to apply, be assigned, track timesheets, complete weekly supervision logs, complete and review evaluations. After all pre-requisite courses for field have been met, every student enrolling in field (School of Social Work BSW, MSW Foundation, and MSW AS programs) are required to purchase an InPlace subscription. The cost for a one-year subscription is $67.  For BSW students with plans to pursue their MSW at UTA, or, MSW Foundation students completing multiple field placements, a multi-year subscription is available for $130. Students please note that the subscription is NOT included in your tuition, students must pay the fee on the first day of class. Each student will need a subscription for the duration of their program(s). Due to the ability of InPlace to organize and store timesheets, weekly supervision logs, learning contracts and evaluations, by the completion of a student\u2019s program, the student will have a comprehensive record to support the achievement of a professional license in the field of social work."}),(0,r.jsx)(o.Z,{variant:"outlined",onClick:function(e){e.preventDefault(),x.push("/register")},children:"Get Started"})]})},j=function(){if("student"==n.role){if("new"!=n.status)return(0,r.jsxs)(s.ZP,{container:!0,justifyContent:"center",children:[(0,r.jsx)(s.ZP,{item:!0,xs:10,lg:6,textAlign:"center",children:(0,r.jsx)(i.Z,{variant:"h5",children:"Hi "+n.firstName})}),(0,r.jsxs)(s.ZP,{container:!0,xs:10,lg:6,justifyContent:"center",children:[(0,r.jsxs)(i.Z,{variant:"h6",children:["UTA ID ",(0,r.jsx)(o.Z,{onClick:function(e){e.preventDefault(),x.push("/student/application/status")},sx:{":hover":{backgroundColor:h.dY,color:"white"},color:h.dY,fontSize:"20px"},children:n.id})]}),(0,r.jsx)("div",{style:{width:"20px"}}),(0,r.jsxs)(i.Z,{variant:"h6",children:["Placement Status ",(0,r.jsx)(o.Z,{onClick:function(e){e.preventDefault(),"matched"==n.status?x.push("/student/placement"):x.push("/student/application/status")},sx:{fontSize:"20px",":hover":{backgroundColor:h.lr,color:"white"},color:"matched"==n.status?h.lr:"approved"==n.status?h.nq:"rejected"==n.status?h.E7:h.dY},children:n.status.toUpperCase()})]})]})]});x.push("/student/application/request")}else{if("agency"!=n.role)return"fieldInstructor"==n.role?(0,r.jsx)(s.ZP,{}):(0,r.jsx)(r.Fragment,{children:(0,r.jsx)(s.ZP,{container:!0,justifyContent:"center",children:(0,r.jsx)(s.ZP,{item:!0,xs:10,lg:6,textAlign:"center",children:(0,r.jsx)(i.Z,{variant:"h5",children:"Hi Admin"})})})});if("new"!=n.status)return(0,r.jsxs)(s.ZP,{children:[(0,r.jsx)(s.ZP,{container:!0,justifyContent:"end",children:(0,r.jsxs)(s.ZP,{container:!0,xs:10,lg:6,justifyContent:"center",children:[(0,r.jsxs)(i.Z,{variant:"h6",children:["UTA ID ",(0,r.jsx)(o.Z,{onClick:function(e){e.preventDefault(),x.push("/agency/application/status")},sx:{":hover":{backgroundColor:h.dY,color:"white"},color:h.dY,fontSize:"20px"},children:n.id})]}),(0,r.jsx)("div",{style:{width:"20px"}}),(0,r.jsxs)(i.Z,{variant:"h6",children:["Application Status ",(0,r.jsx)(o.Z,{onClick:function(e){e.preventDefault(),"approved"==n.status?x.push("/agency/placement"):x.push("/agency/application/status")},sx:{fontSize:"20px",":hover":{backgroundColor:h.lr,color:"white"},color:"approved"==n.status?h.nq:"rejected"==n.status?h.E7:h.dY},children:n.status.toUpperCase()})]})]})}),(0,r.jsx)(s.ZP,{container:!0,justifyContent:"center",style:{marginTop:"3%"},children:(0,r.jsxs)(s.ZP,{container:!0,justifyContent:"center",style:{width:"60%"},children:[(0,r.jsx)("h3",{children:"Active Placements"}),(0,r.jsxs)(a.Z,{border:!0,size:"medium",sx:{tableLayout:"auto"},children:[(0,r.jsx)(l.Z,{children:(0,r.jsxs)(c.Z,{sx:{border:"1px solid black"},children:[(0,r.jsx)(u.Z,{sx:{border:"1px solid black",fontSize:"18px"},align:"center",children:"Degree Level"}),(0,r.jsx)(u.Z,{sx:{border:"1px solid black",fontSize:"18px"},align:"center",children:"Vacancies Left"}),(0,r.jsx)(u.Z,{sx:{border:"1px solid black",fontSize:"18px"},align:"center",children:"Start Date"}),(0,r.jsx)(u.Z,{sx:{border:"1px solid black",fontSize:"18px"},align:"center",children:"Review"})]})}),(0,r.jsx)(d.Z,{children:t.filter((function(e){return e.numberOfVacancy>0})).map((function(e,t){return(0,r.jsxs)(c.Z,{sx:{border:"1px solid black"},children:[(0,r.jsx)(u.Z,{sx:{border:"1px solid black",fontSize:"16px"},align:"center",children:"bsw"==e.degreeLevel?"Bachelor of Social Work":"msw"==e.degreeLevel?"Master of Social Work":"Any"}),(0,r.jsx)(u.Z,{sx:{border:"1px solid black",fontSize:"16px"},align:"center",children:e.numberOfVacancy}),(0,r.jsx)(u.Z,{sx:{border:"1px solid black",fontSize:"16px"},align:"center",children:f()(e.createdAt).format("MM/DD/YYYY")}),(0,r.jsx)(u.Z,{sx:{border:"1px solid black",fontSize:"16px"},align:"center",children:(0,r.jsx)(o.Z,{sx:{color:h.lr,":hover":{backgroundColor:h.lr,color:"white"}},onClick:function(t){t.preventDefault(),x.push("/placement/"+e.formId)},children:"Review"})})]},t)}))})]})]})})]});x.push("/agency/application/request")}};return(0,r.jsx)(s.ZP,{container:!0,justifyContent:"center",sx:{marginTop:"20px"},children:n?(0,r.jsx)(j,{}):(0,r.jsx)(m,{})})}}},function(e){e.O(0,[885,453,774,888,179],(function(){return t=5728,e(e.s=t);var t}));var t=e.O();_N_E=t}]);