(window.webpackJsonp=window.webpackJsonp||[]).push([[3,2],{64:function(t,e,n){"use strict";n.r(e);var l={props:{blogPost:{type:Object,required:!0}}},o=n(2),component=Object(o.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("article",[n("div",{staticClass:"space-y-10 sm:space-y-12 lg:space-y-20 xl:space-y-24"},[n("NuxtContent",{staticClass:"prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto leading-3",attrs:{document:t.blogPost}})],1)])}),[],!1,null,null,null);e.default=component.exports},65:function(t,e,n){"use strict";e.a=async(t,path,e)=>{const n=""===path||"/"===path?"index":path;return await t(n).fetch().catch((t=>{e({statusCode:404,message:"Page not found"})}))}},71:function(t,e,n){"use strict";n.r(e);var l=n(65),o={async asyncData({$content:t,route:e,error:n}){const o=await Object(l.a)(t,e.path||"index",n);return{page:o,title:o.title+" | Camphul's Blog"}},data:()=>({page:{},title:"Camphul's GitHub pages blog"}),head(){return{title:this.title}}},r=n(2),component=Object(r.a)(o,(function(){var t=this,e=t.$createElement;return(t._self._c||e)("MarkdownBlogpost",{attrs:{"blog-post":t.page}})}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{MarkdownBlogpost:n(64).default})}}]);