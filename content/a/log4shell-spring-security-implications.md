---
title: Log4Shell RCE implications for Spring Security
author: Luca Camphuisen
description: In this article we will research the logging implementation used in Spring Security and find out if there are any possible ways of unauthorized entry into a Spring application using the recently published Log4Shell RCE
---
# Implications of Log4Shell in Spring Security

In this article we will research the logging implementation used in Spring Security and find out if there are any possible ways of unauthorized entry into a Spring application using the recently published Log4Shell RCE.

I wrote this in a hurry and this will contain spelling and grammar mistakes. Please dont mind some words missing and/or being misplaced.

Please factcheck my research and check with Spring's statements regarding the known CVE's. Use your own common sense to see if any of your applications are vulnerable. The Dutch NCSC(national cyber security center) have [an extensive list of applications](https://github.com/NCSC-NL/log4shell/tree/main/software) and their vulnerability status.

Log4Shell is known as [CVE-2021-44228](https://nvd.nist.gov/vuln/detail/CVE-2021-44228) and allows RCE by loading an external resource for logging message parameter lookup (comparable to a string format function).
In the case of Log4Shell the lookup may end up classloading the given resource through a combination of JNDI and LDAP/RMI/DNS.

Spring based web-applications have integrated these vulnerable libraries in as way of logging. 
This article want to research deeper into the Log4j exploit and see if it is possible to execute remote code and/or retrieve information secured on an endpoint by Spring Security.

**UPDATE AS OF 15TH OF DECEMBER**

I was on the right path of finding another logging related vuln but had too much other work to do. I was on the right path as of December 13th when I discussed a possible vuln that used MDC and non-default configurations for logging patterns.
Mostly enterprises would be affected by this I am assuming due to the nature of the MDC feature(cant use ThreadLocal in distributed systems lol).

My researech predictions were right. [CVE-2021-45046](https://nvd.nist.gov/vuln/detail/CVE-2021-45046) is currently being analysed. This bypasses the previous mitigations and might have a bigger attack surface across the entire globe(thank u Larry Ellison for the 3 billion java devices lol).
I am hoping that this stays limited to log4j and doesnt apply to Slf4j and logback.

This article will be updated soon but here's a snippet of the conversation I had on the 13th regarding possible exploitation of the MDC feature if a non default configuration for pattern layout was used.
The chat is in dutch and I'm too busy to make a translation for any english speakers right now. Use google translate or something.
![Whatsapp conversation regarding MDC exploitation](/010_mdc_possible_vector.jpg "Whatsapp conversation regarding MDC exploitation when a non default patternlayout is used")


## Hypothesis and prerequisites

For my attempt at RCE on a Spring (Boot) application which has Spring Security enabled the following requirements must be met:

- The application runs on a vulnerable version of Java 8
- No mitigations such as msglookup options have been enabled
- Incase the application runs under a system service/unit the user that it's ran under must have access to a shell(or I might try sabotaging Spring Security at runtime allowing for data to be leaked)
- A security filter within the Spring Security filter chain logs user input before the client request is authorized or authenticated(headers/query parameters/user agent/etc...) or there's a public endpoint which does the same.
- The Spring libraries log directly using log4j2, and not with a pluggable logging api such as Slf4j2(reasons of which will be explained later)
- The log4j log message will still be parsed and a lookup must still occur even when the logging level is configured to ignore debug logs(this will be the main focus due to the obsessive debug logging at Spring Security)
- The firewall of the system running the Spring application must not block the loading of the target payload.

## Log4j2 and Slf4j

[SLF4j](http://www.slf4j.org/) is a facade/abstraction which allows the end user to plug in the desired logging framework.
In most cases the default option would be Log4j2(especially in Spring).

**TODO: explain how slf4j doesnt format messages/do lookups if loglevel is not met**

## Our demo Spring app

A spring boot application with spring web, security and devtools is created from the initializer tool.

It is configured with an in-memory user database and stateless auth with http basic.
Three endpoints have been setup:

1. /public which has permitAll/no security
2. /private which requires the user to have role USER
3. /escalated which requires the user to have role MANAGER

A script called `testcalls.sh` has been made which does various curl api calls to automate the research.
All resources can be found in my [research repository](https://github.com/Camphul/log4shell-spring-framework-research).

Our first run without any configuration changes in `application.properties` does not log cause any log output to be shown in the console(and denies access to our unauthorized requests).

The one thing it does tell us is the security chain in use:

```
Will secure any request with [org.springframework.security.web.context.request.async.WebAsyncManagerIntegrationFilter@21fb8b7d, org.springframework.security.web.context.SecurityContextPersistenceFilter@18a211ed, org.springframework.security.web.header.HeaderWriterFilter@1c0db917, org.springframework.security.web.authentication.logout.LogoutFilter@7254abd2, org.springframework.security.web.authentication.www.BasicAuthenticationFilter@330c3bc, org.springframework.security.web.savedrequest.RequestCacheAwareFilter@590a3aa5, org.springframework.security.web.servletapi.SecurityContextHolderAwareRequestFilter@3f0647ee, org.springframework.security.web.authentication.AnonymousAuthenticationFilter@7fb8211f, org.springframework.security.web.session.SessionManagementFilter@5abfcd36, org.springframework.security.web.access.ExceptionTranslationFilter@66fea064, org.springframework.security.web.access.intercept.FilterSecurityInterceptor@7e18ff72]
```

This this makes it easier to see where our authentication takes place. We have:

1. WebAsyncManagerIntegrationFilter
2. SecurityContextPersistenceFilter
3. HeaderWriterFilter
4. LogoutFilter
5. BasicAuthenticationFilter
6. RequestCacheAwareFilter
7. SecurityContextHolderAwareRequestFilter
8. AnonymousAuthenticationFilter
9. SessionManagementFilter
10. FilterSecurityInterceptor

To make our intial search easier the logging level for spring security will be set to `logging.level.org.springframework.security=DEBUG`

## Finding a possible point of entry

Accessing a public endpoint without authentication yields the following debug logs:
```
2021-12-13 11:25:09.212 DEBUG 137096 --- [nio-8080-exec-1] o.s.security.web.FilterChainProxy        : Securing GET /public
2021-12-13 11:25:09.217 DEBUG 137096 --- [nio-8080-exec-1] s.s.w.c.SecurityContextPersistenceFilter : Set SecurityContextHolder to empty SecurityContext
2021-12-13 11:25:09.220 DEBUG 137096 --- [nio-8080-exec-1] o.s.s.w.a.AnonymousAuthenticationFilter  : Set SecurityContextHolder to anonymous SecurityContext
2021-12-13 11:25:09.227 DEBUG 137096 --- [nio-8080-exec-1] o.s.s.w.a.i.FilterSecurityInterceptor    : Authorized filter invocation [GET /public] with attributes [permitAll]
2021-12-13 11:25:09.227 DEBUG 137096 --- [nio-8080-exec-1] o.s.security.web.FilterChainProxy        : Secured GET /public
2021-12-13 11:25:54.126 DEBUG 137096 --- [nio-8080-exec-1] s.s.w.c.SecurityContextPersistenceFilter : Cleared SecurityContextHolder to complete request
```

No possible way of entry to be seen. However, we are free to pass a query parameter. The logs will then include client input:
```
2021-12-13 11:28:04.934 DEBUG 137096 --- [nio-8080-exec-2] o.s.security.web.FilterChainProxy        : Securing GET /public?evilparam=RCEstring
2021-12-13 11:28:04.935 DEBUG 137096 --- [nio-8080-exec-2] s.s.w.c.SecurityContextPersistenceFilter : Set SecurityContextHolder to empty SecurityContext
2021-12-13 11:28:04.935 DEBUG 137096 --- [nio-8080-exec-2] o.s.s.w.a.AnonymousAuthenticationFilter  : Set SecurityContextHolder to anonymous SecurityContext
2021-12-13 11:28:04.936 DEBUG 137096 --- [nio-8080-exec-2] o.s.s.w.a.i.FilterSecurityInterceptor    : Authorized filter invocation [GET /public?evilparam=RCEstring] with attributes [permitAll]
2021-12-13 11:28:04.936 DEBUG 137096 --- [nio-8080-exec-2] o.s.security.web.FilterChainProxy        : Secured GET /public?evilparam=RCEstring
```

The same happens even when we attempt to call a secured endpoint by an unauthorized client:
```
2021-12-13 11:30:04.200 DEBUG 137096 --- [nio-8080-exec-3] o.s.security.web.FilterChainProxy        : Securing GET /private?evilparam=RCEstring
2021-12-13 11:30:04.201 DEBUG 137096 --- [nio-8080-exec-3] s.s.w.c.SecurityContextPersistenceFilter : Set SecurityContextHolder to empty SecurityContext
2021-12-13 11:30:04.201 DEBUG 137096 --- [nio-8080-exec-3] o.s.s.w.a.AnonymousAuthenticationFilter  : Set SecurityContextHolder to anonymous SecurityContext
2021-12-13 11:30:04.202 DEBUG 137096 --- [nio-8080-exec-3] o.s.s.w.a.i.FilterSecurityInterceptor    : Failed to authorize filter invocation [GET /private?evilparam=RCEstring] with attributes [hasRole('ROLE_USER')]
2021-12-13 11:30:04.206 DEBUG 137096 --- [nio-8080-exec-3] s.w.a.DelegatingAuthenticationEntryPoint : Trying to match using RequestHeaderRequestMatcher [expectedHeaderName=X-Requested-With, expectedHeaderValue=XMLHttpRequest]
2021-12-13 11:30:04.206 DEBUG 137096 --- [nio-8080-exec-3] s.w.a.DelegatingAuthenticationEntryPoint : No match found. Using default entry point org.springframework.security.web.authentication.www.BasicAuthenticationEntryPoint@6fa4382
2021-12-13 11:30:04.207 DEBUG 137096 --- [nio-8080-exec-3] s.s.w.c.SecurityContextPersistenceFilter : Cleared SecurityContextHolder to complete request
2021-12-13 11:30:04.211 DEBUG 137096 --- [nio-8080-exec-3] o.s.security.web.FilterChainProxy        : Securing GET /error?evilparam=RCEstring
2021-12-13 11:30:04.212 DEBUG 137096 --- [nio-8080-exec-3] s.s.w.c.SecurityContextPersistenceFilter : Set SecurityContextHolder to empty SecurityContext
2021-12-13 11:30:04.212 DEBUG 137096 --- [nio-8080-exec-3] o.s.s.w.a.AnonymousAuthenticationFilter  : Set SecurityContextHolder to anonymous SecurityContext
2021-12-13 11:30:04.212 DEBUG 137096 --- [nio-8080-exec-3] o.s.security.web.FilterChainProxy        : Secured GET /error?evilparam=RCEstring
2021-12-13 11:30:04.276 DEBUG 137096 --- [nio-8080-exec-3] s.s.w.c.SecurityContextPersistenceFilter : Cleared SecurityContextHolder to complete request
```

When doing the same request but with httpbasic through curl we still get a similar logging output:
```
2021-12-13 11:47:20.552 DEBUG 137096 --- [nio-8080-exec-4] o.s.security.web.FilterChainProxy        : Securing GET /private?evilparam=RCEstring
2021-12-13 11:47:20.553 DEBUG 137096 --- [nio-8080-exec-4] s.s.w.c.SecurityContextPersistenceFilter : Set SecurityContextHolder to empty SecurityContext
2021-12-13 11:47:20.809 DEBUG 137096 --- [nio-8080-exec-4] o.s.s.a.dao.DaoAuthenticationProvider    : Authenticated user
2021-12-13 11:47:20.811 DEBUG 137096 --- [nio-8080-exec-4] o.s.s.w.a.www.BasicAuthenticationFilter  : Set SecurityContextHolder to UsernamePasswordAuthenticationToken [Principal=org.springframework.security.core.userdetails.User [Username=bob, Password=[PROTECTED], Enabled=true, AccountNonExpired=true, credentialsNonExpired=true, AccountNonLocked=true, Granted Authorities=[ROLE_USER]], Credentials=[PROTECTED], Authenticated=true, Details=WebAuthenticationDetails [RemoteIpAddress=127.0.0.1, SessionId=null], Granted Authorities=[ROLE_USER]]
2021-12-13 11:47:20.812 DEBUG 137096 --- [nio-8080-exec-4] o.s.s.w.a.i.FilterSecurityInterceptor    : Authorized filter invocation [GET /private?evilparam=RCEstring] with attributes [hasRole('ROLE_USER')]
2021-12-13 11:47:20.812 DEBUG 137096 --- [nio-8080-exec-4] o.s.security.web.FilterChainProxy        : Secured GET /private?evilparam=RCEstring
2021-12-13 11:47:20.815 DEBUG 137096 --- [nio-8080-exec-4] s.s.w.c.SecurityContextPersistenceFilter : Cleared SecurityContextHolder to complete request
```

## Breakpoints across the filter chain

Spring Security works by intercepting the servlet request and putting the request through a chain that can at any point return an unauthorized response.

Now that we know that we can get past some filter without authentication I'll place some debug breakpoints in these filter chains and see what logging technique they use.
In `SecurityFilterChain` we see our log calls being produced.

During the first request an instance of a Spring LogAdapter was discovered. This instance was of type Slf4j and only allowed strings and exceptions as input.
No client input. I'll just dump my findings/pics as im in quite a hurry myself. People who have the slightest bit of experience with Spring/AOP/this debacle will understand this(and the security riscs later posted).

![LogAdapter_slf4j](/001_LogAdapter_slf4j.png "Spring's LogAdapter class")

We can also see that no logs are really done if the log level is not met. This is due to the performance impact on the application if it were to perform these message parsing activities even if the log level is not met.

![Performance reasoning](/002_LogAdapter_slf4j_debug.png "Performance reasoning")

This is further proven by our debug breakpoint in the filter chain during a client's request.

![Performance reasoning2](/003_LogAdapter_slf4j_performance_protections.png "Performance reasoning part 2")

The way the message was formatted in the filter looked suspicious to me. We can later see that Spring uses a custom logging message abstraction in their core library(ontop of I dont know how many abstractions at this point lol).

![Spring Core Log](/004_LogAdapter_custom_formatter.png "Spring Core Log")

After some digging I discovered a Log formatter called `org.spring.core.log.LogMessage`.
Using this class a FormatMessage is formed from an input string and passed arguments. It uses `String.format(input, args...)` so no lookup is performed here.
