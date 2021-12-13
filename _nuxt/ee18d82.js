(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(t,e,n){"use strict";n.r(e);var l={},o=n(2),component=Object(o.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("NuxtLink",{attrs:{to:"/index"}},[n("span",{staticClass:"pl-2 flex w-full justify-center items-center"},[n("img",{staticClass:"h-8 w-auto",attrs:{id:"camphul-logo",content:"eager",alt:"logo",src:"/logo.png"}}),t._v(" "),n("p",{staticClass:"pl-2 font-medium"},[t._t("default")],2)])])}),[],!1,null,null,null);e.default=component.exports},14:function(t,e,n){"use strict";n.r(e);var l={components:{HomeIcon:n(43).default},props:{isOpen:{type:Boolean,required:!0},name:{type:String,required:!0},hasIcon:{type:Boolean,required:!1,default:!0}},methods:{setOpen(t){this.$emit("itemClick",t)}}},o=n(2),component=Object(o.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",{staticClass:"flex items-center p-4 bg-gray-800 p-1 text-gray-300 hover:text-white  hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 transition ease-in-out duration-200",on:{click:function(e){return t.setOpen(!1)}}},[n("span",{directives:[{name:"show",rawName:"v-show",value:t.hasIcon,expression:"hasIcon"}],staticClass:"mr-2"},[t._t("default",(function(){return[n("HomeIcon")]}))],2),t._v(" "),n("span",[t._v(t._s(t.name))])])}),[],!1,null,null,null);e.default=component.exports},23:function(t,e,n){t.exports={}},42:function(t,e,n){"use strict";var l={methods:{contentClickHandle(t){this.$root.$emit("onMainContentClick",t)}}},o=n(2),component=Object(o.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"antialiased text-gray-900"},[n("BlogNavbar"),t._v(" "),n("div",{staticClass:"px-4 py-20 md:py-24 max-w-3xl mx-auto sm:px-6 sm:py-12 lg:max-w-4xl lg:py-16 lg:px-8 xl:max-w-6xl",on:{click:t.contentClickHandle}},[n("Nuxt")],1)],1)}),[],!1,null,null,null);e.a=component.exports;installComponents(component,{BlogNavbar:n(61).default})},43:function(t,e,n){"use strict";n.r(e);var l=n(2),component=Object(l.a)({},(function(){var t=this.$createElement,e=this._self._c||t;return e("svg",{staticClass:"h-6 w-6",attrs:{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"}},[e("path",{attrs:{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"}})])}),[],!1,null,null,null);e.default=component.exports},44:function(t,e,n){"use strict";n.r(e);var l=n(2),component=Object(l.a)({},(function(){var t=this.$createElement,e=this._self._c||t;return e("svg",{staticClass:"h-8 w-8",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"white"}},[e("path",{attrs:{"fill-rule":"evenodd",d:"M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z","clip-rule":"evenodd"}})])}),[],!1,null,null,null);e.default=component.exports},45:function(t,e,n){n(46),t.exports=n(47)},61:function(t,e,n){"use strict";n.r(e);var l=n(13),o=n(14),r={components:{HamburgerMenuIcon:n(44).default,SidebarItem:o.default,CamphulLogo:l.default},data:()=>({isOpen:!1,blogs:[]}),watch:{isOpen:{immediate:!0,handler(t){t?document.body.style.setProperty("overflow","hidden"):document.body.style.removeProperty("overflow")}}},async mounted(){this.$root.$on("onMainContentClick",(t=>{this.setIsOpen(!1)})),this.blogs=await this.$content("a",{deep:!0}).only(["slug","path","title"]).limit(20).fetch().catch((t=>{this.$toast.show({title:"Failed to fetch blogs",message:"We could not fetch the blogs from the server. Try again later.",type:"danger"})})),document.addEventListener("keydown",(t=>{27===t.keyCode&&this.isOpen&&(this.isOpen=!1)}))},methods:{openBlog(t){this.setIsOpen(!1),this.$router.push(t.path)},drawer(){this.isOpen=!this.isOpen},setIsOpen(t){this.isOpen=t}}},c=n(2),component=Object(c.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("nav",{staticClass:"pl-2 flex fixed w-full items-center justify-between px-6 h-16 bg-gray-800 z-10"},[n("div",{staticClass:"flex-shrink-0 flex items-start"},[n("button",{staticClass:"mr-2",attrs:{"aria-label":"Open Menu"},on:{click:t.drawer}},[n("HamburgerMenuIcon")],1),t._v(" "),n("CamphulLogo",[n("span",{staticClass:"invisible font-medium text-lg font-sans md:text-xl md:visible md:text-white justify-center md:font-bold"},[t._v("Camphul")])])],1),t._v(" "),n("div",{staticClass:"relative flex items-center justify-end h-16 w-full"},[n("div",{staticClass:"absolute inset-y-0 right-0 flex items-center pr-0 sm:static sm:inset-auto sm:ml-6 sm:pr-0"},[n("a",{staticClass:"inline-flex items-center py-2 bg-gray-800 p-2 mr-0 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 transition ease-in-out duration-100",attrs:{href:"https://github.com/Camphul/Camphul",target:"_blank",alt:"Github link"}},[n("GitHubLogo"),t._v(" "),n("span",{staticClass:"pl-1"},[t._v("View on GitHub")])],1)]),t._v(" "),n("aside",{staticClass:"transform top-0 left-0 w-64 bg-gray-800 fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30",class:t.isOpen?"translate-x-0":"-translate-x-full"},[n("span",{staticClass:"flex w-full items-center p-4 bg-gray-800",on:{click:function(e){t.isOpen=!1}}},[n("button",{staticClass:"mr-2",attrs:{"aria-label":"Open Menu"},on:{click:t.drawer}},[n("HamburgerMenuIcon")],1),t._v(" "),n("CamphulLogo",{staticClass:"text-white font-sans text-lg md:text-xl"},[t._v("\n          Camphul\n        ")])],1),t._v(" "),n("SidebarItem",{attrs:{name:"Home","is-open":t.isOpen},on:{itemClick:function(e){t.setIsOpen(!1),t.$router.push("/index")}}}),t._v(" "),t._l(t.blogs,(function(e){return[n("SidebarItem",{key:"blog-"+e,staticClass:"transition ease-in duration-100",attrs:{name:e.title,"is-open":t.isOpen,"has-icon":!1},on:{itemClick:function(n){return t.openBlog(e)}}})]})),t._v(" "),n("div",{staticClass:"fixed bottom-0 w-full"},[n("SidebarItem",{attrs:{name:"Install to Homescreen","is-open":t.isOpen,"has-icon":""},on:{itemClick:function(e){return t.$toast.show({type:"danger",title:"Not implemented",message:"This feature hasn't even been implemented yet lol."})}}},[n("svg",{staticClass:"h-6 w-6",attrs:{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"}},[n("path",{attrs:{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"}})])])],1)],2)])])}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{CamphulLogo:n(13).default,GitHubLogo:n(62).default,SidebarItem:n(14).default})},62:function(t,e,n){"use strict";n.r(e);var l=n(2),component=Object(l.a)({},(function(){var t=this.$createElement,e=this._self._c||t;return e("svg",{staticClass:"h-5 w-5 text-gray-500",attrs:{fill:"currentColor",viewBox:"0 0 20 20"}},[e("path",{attrs:{"fill-rule":"evenodd",d:"M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z","clip-rule":"evenodd"}})])}),[],!1,null,null,null);e.default=component.exports}},[[45,5,1,6]]]);