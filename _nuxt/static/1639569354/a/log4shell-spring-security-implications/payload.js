__NUXT_JSONP__("/a/log4shell-spring-security-implications", (function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M){return {data:[{page:{slug:"log4shell-spring-security-implications",description:"In this article we will research the logging implementation used in Spring Security and find out if there are any possible ways of unauthorized entry into a Spring application using the recently published Log4Shell RCE",title:"Log4Shell RCE implications for Spring Security",author:"Luca Camphuisen",toc:[{id:y,depth:m,text:z},{id:A,depth:m,text:B},{id:C,depth:m,text:D},{id:E,depth:m,text:F},{id:G,depth:m,text:H}],body:{type:"root",children:[{type:b,tag:"h1",props:{id:"implications-of-log4shell-in-spring-security"},children:[{type:b,tag:g,props:{href:"#implications-of-log4shell-in-spring-security",ariaHidden:h,tabIndex:i},children:[{type:b,tag:j,props:{className:[k,l]},children:[]}]},{type:a,value:"Implications of Log4Shell in Spring Security"}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"In this article we will research the logging implementation used in Spring Security and find out if there are any possible ways of unauthorized entry into a Spring application using the recently published Log4Shell RCE."}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"I wrote this in a hurry and this will contain spelling and grammar mistakes. Please dont mind some words missing and\u002For being misplaced."}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"Log4Shell is known as "},{type:b,tag:g,props:{href:"https:\u002F\u002Fnvd.nist.gov\u002Fvuln\u002Fdetail\u002FCVE-2021-44228",rel:[u,v,w],target:x},children:[{type:a,value:"CVE-2021-44228"}]},{type:a,value:" and allows RCE by loading an external resource for logging message parameter lookup (comparable to a string format function).\nIn the case of Log4Shell the lookup may end up classloading the given resource through a combination of JNDI and LDAP."}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"Spring based web-applications have integrated these vulnerable libraries in as way of logging.\nThis article want to research deeper into the Log4j exploit and see if it is possible to execute remote code and\u002For retrieve information secured on an endpoint by Spring Security."}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:b,tag:I,props:{},children:[{type:a,value:"UPDATE AS OF 15TH OF DECEMBER"}]}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"I was on the right path of finding another logging related vuln but had too much other work to do. I was on the right path as of December 13th when I discussed a possible vuln that used MDC and non-default configurations for logging patterns.\nMostly enterprises would be affected by this I am assuming due to the nature of the MDC feature(cant use ThreadLocal in distributed systems lol)."}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"My researech predictions were right. "},{type:b,tag:g,props:{href:"https:\u002F\u002Fnvd.nist.gov\u002Fvuln\u002Fdetail\u002FCVE-2021-45046",rel:[u,v,w],target:x},children:[{type:a,value:"CVE-2021045046"}]},{type:a,value:" is currently being analysed. This bypasses the previous mitigations and might have a bigger attack surface across the entire globe(thank u Larry Ellison for the 3 billion java devices lol).\nI am hoping that this stays limited to log4j and doesnt apply to Slf4j and logback."}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"This article will be updated soon but here's a snippet of the conversation I had on the 13th regarding possible exploitation of the MDC feature if a non default configuration for pattern layout was used.\nThe chat is in dutch and I'm too busy to make a translation for any english speakers right now. Use google translate or something.\n"},{type:b,tag:n,props:{alt:"Whatsapp conversation regarding MDC exploitation",src:"\u002F010_mdc_possible_vector.jpg",title:"Whatsapp conversation regarding MDC exploitation when a non default patternlayout is used"},children:[]}]},{type:a,value:c},{type:b,tag:o,props:{id:y},children:[{type:b,tag:g,props:{href:"#hypothesis-and-prerequisites",ariaHidden:h,tabIndex:i},children:[{type:b,tag:j,props:{className:[k,l]},children:[]}]},{type:a,value:z}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"For my attempt at RCE on a Spring (Boot) application which has Spring Security enabled the following requirements must be met:"}]},{type:a,value:c},{type:b,tag:"ul",props:{},children:[{type:a,value:c},{type:b,tag:e,props:{},children:[{type:a,value:"The application runs on a vulnerable version of Java 8"}]},{type:a,value:c},{type:b,tag:e,props:{},children:[{type:a,value:"No mitigations such as msglookup options have been enabled"}]},{type:a,value:c},{type:b,tag:e,props:{},children:[{type:a,value:"Incase the application runs under a system service\u002Funit the user that it's ran under must have access to a shell(or I might try sabotaging Spring Security at runtime allowing for data to be leaked)"}]},{type:a,value:c},{type:b,tag:e,props:{},children:[{type:a,value:"A security filter within the Spring Security filter chain logs user input before the client request is authorized or authenticated(headers\u002Fquery parameters\u002Fuser agent\u002Fetc...) or there's a public endpoint which does the same."}]},{type:a,value:c},{type:b,tag:e,props:{},children:[{type:a,value:"The Spring libraries log directly using log4j2, and not with a pluggable logging api such as Slf4j2(reasons of which will be explained later)"}]},{type:a,value:c},{type:b,tag:e,props:{},children:[{type:a,value:"The log4j log message will still be parsed and a lookup must still occur even when the logging level is configured to ignore debug logs(this will be the main focus due to the obsessive debug logging at Spring Security)"}]},{type:a,value:c},{type:b,tag:e,props:{},children:[{type:a,value:"The firewall of the system running the Spring application must not block the loading of the target payload."}]},{type:a,value:c}]},{type:a,value:c},{type:b,tag:o,props:{id:A},children:[{type:b,tag:g,props:{href:"#log4j2-and-slf4j",ariaHidden:h,tabIndex:i},children:[{type:b,tag:j,props:{className:[k,l]},children:[]}]},{type:a,value:B}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:b,tag:g,props:{href:"http:\u002F\u002Fwww.slf4j.org\u002F",rel:[u,v,w],target:x},children:[{type:a,value:"SLF4j"}]},{type:a,value:" is a facade\u002Fabstraction which allows the end user to plug in the desired logging framework.\nIn most cases the default option would be Log4j2(especially in Spring)."}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:b,tag:I,props:{},children:[{type:a,value:"TODO: explain how slf4j doesnt format messages\u002Fdo lookups if loglevel is not met"}]}]},{type:a,value:c},{type:b,tag:o,props:{id:C},children:[{type:b,tag:g,props:{href:"#our-demo-spring-app",ariaHidden:h,tabIndex:i},children:[{type:b,tag:j,props:{className:[k,l]},children:[]}]},{type:a,value:D}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"A spring boot application with spring web, security and devtools is created from the initializer tool."}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"It is configured with an in-memory user database and stateless auth with http basic.\nThree endpoints have been setup:"}]},{type:a,value:c},{type:b,tag:J,props:{},children:[{type:a,value:c},{type:b,tag:e,props:{},children:[{type:a,value:"\u002Fpublic which has permitAll\u002Fno security"}]},{type:a,value:c},{type:b,tag:e,props:{},children:[{type:a,value:"\u002Fprivate which requires the user to have role USER"}]},{type:a,value:c},{type:b,tag:e,props:{},children:[{type:a,value:"\u002Fescalated which requires the user to have role MANAGER"}]},{type:a,value:c}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"A script called "},{type:b,tag:f,props:{},children:[{type:a,value:"testcalls.sh"}]},{type:a,value:" has been made which does various curl api calls to automate the research.\nAll resources can be found in my "},{type:b,tag:g,props:{href:"https:\u002F\u002Fgithub.com\u002FCamphul\u002Flog4shell-spring-framework-research",rel:[u,v,w],target:x},children:[{type:a,value:"research repository"}]},{type:a,value:"."}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"Our first run without any configuration changes in "},{type:b,tag:f,props:{},children:[{type:a,value:"application.properties"}]},{type:a,value:" does not log cause any log output to be shown in the console(and denies access to our unauthorized requests)."}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"The one thing it does tell us is the security chain in use:"}]},{type:a,value:c},{type:b,tag:p,props:{className:[q]},children:[{type:b,tag:r,props:{className:[s,t]},children:[{type:b,tag:f,props:{},children:[{type:a,value:"Will secure any request with [org.springframework.security.web.context.request.async.WebAsyncManagerIntegrationFilter@21fb8b7d, org.springframework.security.web.context.SecurityContextPersistenceFilter@18a211ed, org.springframework.security.web.header.HeaderWriterFilter@1c0db917, org.springframework.security.web.authentication.logout.LogoutFilter@7254abd2, org.springframework.security.web.authentication.www.BasicAuthenticationFilter@330c3bc, org.springframework.security.web.savedrequest.RequestCacheAwareFilter@590a3aa5, org.springframework.security.web.servletapi.SecurityContextHolderAwareRequestFilter@3f0647ee, org.springframework.security.web.authentication.AnonymousAuthenticationFilter@7fb8211f, org.springframework.security.web.session.SessionManagementFilter@5abfcd36, org.springframework.security.web.access.ExceptionTranslationFilter@66fea064, org.springframework.security.web.access.intercept.FilterSecurityInterceptor@7e18ff72]\n"}]}]}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"This this makes it easier to see where our authentication takes place. We have:"}]},{type:a,value:c},{type:b,tag:J,props:{},children:[{type:a,value:c},{type:b,tag:e,props:{},children:[{type:a,value:"WebAsyncManagerIntegrationFilter"}]},{type:a,value:c},{type:b,tag:e,props:{},children:[{type:a,value:"SecurityContextPersistenceFilter"}]},{type:a,value:c},{type:b,tag:e,props:{},children:[{type:a,value:"HeaderWriterFilter"}]},{type:a,value:c},{type:b,tag:e,props:{},children:[{type:a,value:"LogoutFilter"}]},{type:a,value:c},{type:b,tag:e,props:{},children:[{type:a,value:"BasicAuthenticationFilter"}]},{type:a,value:c},{type:b,tag:e,props:{},children:[{type:a,value:"RequestCacheAwareFilter"}]},{type:a,value:c},{type:b,tag:e,props:{},children:[{type:a,value:"SecurityContextHolderAwareRequestFilter"}]},{type:a,value:c},{type:b,tag:e,props:{},children:[{type:a,value:"AnonymousAuthenticationFilter"}]},{type:a,value:c},{type:b,tag:e,props:{},children:[{type:a,value:"SessionManagementFilter"}]},{type:a,value:c},{type:b,tag:e,props:{},children:[{type:a,value:"FilterSecurityInterceptor"}]},{type:a,value:c}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"To make our intial search easier the logging level for spring security will be set to "},{type:b,tag:f,props:{},children:[{type:a,value:"logging.level.org.springframework.security=DEBUG"}]}]},{type:a,value:c},{type:b,tag:o,props:{id:E},children:[{type:b,tag:g,props:{href:"#finding-a-possible-point-of-entry",ariaHidden:h,tabIndex:i},children:[{type:b,tag:j,props:{className:[k,l]},children:[]}]},{type:a,value:F}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"Accessing a public endpoint without authentication yields the following debug logs:"}]},{type:a,value:c},{type:b,tag:p,props:{className:[q]},children:[{type:b,tag:r,props:{className:[s,t]},children:[{type:b,tag:f,props:{},children:[{type:a,value:"2021-12-13 11:25:09.212 DEBUG 137096 --- [nio-8080-exec-1] o.s.security.web.FilterChainProxy        : Securing GET \u002Fpublic\n2021-12-13 11:25:09.217 DEBUG 137096 --- [nio-8080-exec-1] s.s.w.c.SecurityContextPersistenceFilter : Set SecurityContextHolder to empty SecurityContext\n2021-12-13 11:25:09.220 DEBUG 137096 --- [nio-8080-exec-1] o.s.s.w.a.AnonymousAuthenticationFilter  : Set SecurityContextHolder to anonymous SecurityContext\n2021-12-13 11:25:09.227 DEBUG 137096 --- [nio-8080-exec-1] o.s.s.w.a.i.FilterSecurityInterceptor    : Authorized filter invocation [GET \u002Fpublic] with attributes [permitAll]\n2021-12-13 11:25:09.227 DEBUG 137096 --- [nio-8080-exec-1] o.s.security.web.FilterChainProxy        : Secured GET \u002Fpublic\n2021-12-13 11:25:54.126 DEBUG 137096 --- [nio-8080-exec-1] s.s.w.c.SecurityContextPersistenceFilter : Cleared SecurityContextHolder to complete request\n"}]}]}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"No possible way of entry to be seen. However, we are free to pass a query parameter. The logs will then include client input:"}]},{type:a,value:c},{type:b,tag:p,props:{className:[q]},children:[{type:b,tag:r,props:{className:[s,t]},children:[{type:b,tag:f,props:{},children:[{type:a,value:"2021-12-13 11:28:04.934 DEBUG 137096 --- [nio-8080-exec-2] o.s.security.web.FilterChainProxy        : Securing GET \u002Fpublic?evilparam=RCEstring\n2021-12-13 11:28:04.935 DEBUG 137096 --- [nio-8080-exec-2] s.s.w.c.SecurityContextPersistenceFilter : Set SecurityContextHolder to empty SecurityContext\n2021-12-13 11:28:04.935 DEBUG 137096 --- [nio-8080-exec-2] o.s.s.w.a.AnonymousAuthenticationFilter  : Set SecurityContextHolder to anonymous SecurityContext\n2021-12-13 11:28:04.936 DEBUG 137096 --- [nio-8080-exec-2] o.s.s.w.a.i.FilterSecurityInterceptor    : Authorized filter invocation [GET \u002Fpublic?evilparam=RCEstring] with attributes [permitAll]\n2021-12-13 11:28:04.936 DEBUG 137096 --- [nio-8080-exec-2] o.s.security.web.FilterChainProxy        : Secured GET \u002Fpublic?evilparam=RCEstring\n"}]}]}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"The same happens even when we attempt to call a secured endpoint by an unauthorized client:"}]},{type:a,value:c},{type:b,tag:p,props:{className:[q]},children:[{type:b,tag:r,props:{className:[s,t]},children:[{type:b,tag:f,props:{},children:[{type:a,value:"2021-12-13 11:30:04.200 DEBUG 137096 --- [nio-8080-exec-3] o.s.security.web.FilterChainProxy        : Securing GET \u002Fprivate?evilparam=RCEstring\n2021-12-13 11:30:04.201 DEBUG 137096 --- [nio-8080-exec-3] s.s.w.c.SecurityContextPersistenceFilter : Set SecurityContextHolder to empty SecurityContext\n2021-12-13 11:30:04.201 DEBUG 137096 --- [nio-8080-exec-3] o.s.s.w.a.AnonymousAuthenticationFilter  : Set SecurityContextHolder to anonymous SecurityContext\n2021-12-13 11:30:04.202 DEBUG 137096 --- [nio-8080-exec-3] o.s.s.w.a.i.FilterSecurityInterceptor    : Failed to authorize filter invocation [GET \u002Fprivate?evilparam=RCEstring] with attributes [hasRole('ROLE_USER')]\n2021-12-13 11:30:04.206 DEBUG 137096 --- [nio-8080-exec-3] s.w.a.DelegatingAuthenticationEntryPoint : Trying to match using RequestHeaderRequestMatcher [expectedHeaderName=X-Requested-With, expectedHeaderValue=XMLHttpRequest]\n2021-12-13 11:30:04.206 DEBUG 137096 --- [nio-8080-exec-3] s.w.a.DelegatingAuthenticationEntryPoint : No match found. Using default entry point org.springframework.security.web.authentication.www.BasicAuthenticationEntryPoint@6fa4382\n2021-12-13 11:30:04.207 DEBUG 137096 --- [nio-8080-exec-3] s.s.w.c.SecurityContextPersistenceFilter : Cleared SecurityContextHolder to complete request\n2021-12-13 11:30:04.211 DEBUG 137096 --- [nio-8080-exec-3] o.s.security.web.FilterChainProxy        : Securing GET \u002Ferror?evilparam=RCEstring\n2021-12-13 11:30:04.212 DEBUG 137096 --- [nio-8080-exec-3] s.s.w.c.SecurityContextPersistenceFilter : Set SecurityContextHolder to empty SecurityContext\n2021-12-13 11:30:04.212 DEBUG 137096 --- [nio-8080-exec-3] o.s.s.w.a.AnonymousAuthenticationFilter  : Set SecurityContextHolder to anonymous SecurityContext\n2021-12-13 11:30:04.212 DEBUG 137096 --- [nio-8080-exec-3] o.s.security.web.FilterChainProxy        : Secured GET \u002Ferror?evilparam=RCEstring\n2021-12-13 11:30:04.276 DEBUG 137096 --- [nio-8080-exec-3] s.s.w.c.SecurityContextPersistenceFilter : Cleared SecurityContextHolder to complete request\n"}]}]}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"When doing the same request but with httpbasic through curl we still get a similar logging output:"}]},{type:a,value:c},{type:b,tag:p,props:{className:[q]},children:[{type:b,tag:r,props:{className:[s,t]},children:[{type:b,tag:f,props:{},children:[{type:a,value:"2021-12-13 11:47:20.552 DEBUG 137096 --- [nio-8080-exec-4] o.s.security.web.FilterChainProxy        : Securing GET \u002Fprivate?evilparam=RCEstring\n2021-12-13 11:47:20.553 DEBUG 137096 --- [nio-8080-exec-4] s.s.w.c.SecurityContextPersistenceFilter : Set SecurityContextHolder to empty SecurityContext\n2021-12-13 11:47:20.809 DEBUG 137096 --- [nio-8080-exec-4] o.s.s.a.dao.DaoAuthenticationProvider    : Authenticated user\n2021-12-13 11:47:20.811 DEBUG 137096 --- [nio-8080-exec-4] o.s.s.w.a.www.BasicAuthenticationFilter  : Set SecurityContextHolder to UsernamePasswordAuthenticationToken [Principal=org.springframework.security.core.userdetails.User [Username=bob, Password=[PROTECTED], Enabled=true, AccountNonExpired=true, credentialsNonExpired=true, AccountNonLocked=true, Granted Authorities=[ROLE_USER]], Credentials=[PROTECTED], Authenticated=true, Details=WebAuthenticationDetails [RemoteIpAddress=127.0.0.1, SessionId=null], Granted Authorities=[ROLE_USER]]\n2021-12-13 11:47:20.812 DEBUG 137096 --- [nio-8080-exec-4] o.s.s.w.a.i.FilterSecurityInterceptor    : Authorized filter invocation [GET \u002Fprivate?evilparam=RCEstring] with attributes [hasRole('ROLE_USER')]\n2021-12-13 11:47:20.812 DEBUG 137096 --- [nio-8080-exec-4] o.s.security.web.FilterChainProxy        : Secured GET \u002Fprivate?evilparam=RCEstring\n2021-12-13 11:47:20.815 DEBUG 137096 --- [nio-8080-exec-4] s.s.w.c.SecurityContextPersistenceFilter : Cleared SecurityContextHolder to complete request\n"}]}]}]},{type:a,value:c},{type:b,tag:o,props:{id:G},children:[{type:b,tag:g,props:{href:"#breakpoints-across-the-filter-chain",ariaHidden:h,tabIndex:i},children:[{type:b,tag:j,props:{className:[k,l]},children:[]}]},{type:a,value:H}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"Spring Security works by intercepting the servlet request and putting the request through a chain that can at any point return an unauthorized response."}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"Now that we know that we can get past some filter without authentication I'll place some debug breakpoints in these filter chains and see what logging technique they use.\nIn "},{type:b,tag:f,props:{},children:[{type:a,value:"SecurityFilterChain"}]},{type:a,value:" we see our log calls being produced."}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"During the first request an instance of a Spring LogAdapter was discovered. This instance was of type Slf4j and only allowed strings and exceptions as input.\nNo client input. I'll just dump my findings\u002Fpics as im in quite a hurry myself. People who have the slightest bit of experience with Spring\u002FAOP\u002Fthis debacle will understand this(and the security riscs later posted)."}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:b,tag:n,props:{alt:"LogAdapter_slf4j",src:"\u002F001_LogAdapter_slf4j.png",title:"Spring's LogAdapter class"},children:[]}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"We can also see that no logs are really done if the log level is not met. This is due to the performance impact on the application if it were to perform these message parsing activities even if the log level is not met."}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:b,tag:n,props:{alt:K,src:"\u002F002_LogAdapter_slf4j_debug.png",title:K},children:[]}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"This is further proven by our debug breakpoint in the filter chain during a client's request."}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:b,tag:n,props:{alt:"Performance reasoning2",src:"\u002F003_LogAdapter_slf4j_performance_protections.png",title:"Performance reasoning part 2"},children:[]}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"The way the message was formatted in the filter looked suspicious to me. We can later see that Spring uses a custom logging message abstraction in their core library(ontop of I dont know how many abstractions at this point lol)."}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:b,tag:n,props:{alt:L,src:"\u002F004_LogAdapter_custom_formatter.png",title:L},children:[]}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"After some digging I discovered a Log formatter called "},{type:b,tag:f,props:{},children:[{type:a,value:"org.spring.core.log.LogMessage"}]},{type:a,value:".\nUsing this class a FormatMessage is formed from an input string and passed arguments. It uses "},{type:b,tag:f,props:{},children:[{type:a,value:"String.format(input, args...)"}]},{type:a,value:" so no lookup is performed here."}]}]},dir:"\u002Fa",path:"\u002Fa\u002Flog4shell-spring-security-implications",extension:".md",createdAt:M,updatedAt:M},title:"Log4Shell RCE implications for Spring Security | Camphul's Blog"}],fetch:{},mutations:void 0}}("text","element","\n","p","li","code","a","true",-1,"span","icon","icon-link",2,"img","h2","div","nuxt-content-highlight","pre","language-text","line-numbers","nofollow","noopener","noreferrer","_blank","hypothesis-and-prerequisites","Hypothesis and prerequisites","log4j2-and-slf4j","Log4j2 and Slf4j","our-demo-spring-app","Our demo Spring app","finding-a-possible-point-of-entry","Finding a possible point of entry","breakpoints-across-the-filter-chain","Breakpoints across the filter chain","strong","ol","Performance reasoning","Spring Core Log","2021-12-15T11:54:22.694Z")));