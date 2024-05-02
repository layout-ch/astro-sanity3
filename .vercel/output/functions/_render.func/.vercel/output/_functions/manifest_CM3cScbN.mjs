import 'cookie';
import { bold, red, yellow, dim, blue } from 'kleur/colors';
import 'html-escaper';
import 'clsx';
import './chunks/astro_B04bpCZj.mjs';
import { compile } from 'path-to-regexp';

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, label, message, newLine = true) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    label,
    level,
    message,
    newLine
  };
  if (!isLogLevelEnabled(logLevel, level)) {
    return;
  }
  dest.write(event);
}
function isLogLevelEnabled(configuredLogLevel, level) {
  return levels[configuredLogLevel] <= levels[level];
}
function info(opts, label, message, newLine = true) {
  return log(opts, "info", label, message, newLine);
}
function warn(opts, label, message, newLine = true) {
  return log(opts, "warn", label, message, newLine);
}
function error(opts, label, message, newLine = true) {
  return log(opts, "error", label, message, newLine);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
function getEventPrefix({ level, label }) {
  const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
  const prefix = [];
  if (level === "error" || level === "warn") {
    prefix.push(bold(timestamp));
    prefix.push(`[${level.toUpperCase()}]`);
  } else {
    prefix.push(timestamp);
  }
  if (label) {
    prefix.push(`[${label}]`);
  }
  if (level === "error") {
    return red(prefix.join(" "));
  }
  if (level === "warn") {
    return yellow(prefix.join(" "));
  }
  if (prefix.length === 1) {
    return dim(prefix[0]);
  }
  return dim(prefix[0]) + " " + blue(prefix.splice(1).join(" "));
}
if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}
class Logger {
  options;
  constructor(options) {
    this.options = options;
  }
  info(label, message, newLine = true) {
    info(this.options, label, message, newLine);
  }
  warn(label, message, newLine = true) {
    warn(this.options, label, message, newLine);
  }
  error(label, message, newLine = true) {
    error(this.options, label, message, newLine);
  }
  debug(label, ...messages) {
    debug(label, ...messages);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
}
class AstroIntegrationLogger {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  info(message) {
    info(this.options, this.label, message);
  }
  warn(message) {
    warn(this.options, this.label, message);
  }
  error(message) {
    error(this.options, this.label, message);
  }
  debug(message) {
    debug(this.label, message);
  }
}

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const path = toPath(params);
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/vercel/serverless","routes":[{"file":"de/index.html","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","isIndex":false,"route":"/de","pattern":"^\\/de\\/?$","segments":[[{"content":"de","dynamic":false,"spread":false}]],"params":[],"component":".astro/astro-i18n/entrypoints/de/index.astro","pathname":"/de","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"en/index.html","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","isIndex":false,"route":"/en","pattern":"^\\/en\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}]],"params":[],"component":".astro/astro-i18n/entrypoints/en/index.astro","pathname":"/en","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"fr/index.html","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","isIndex":false,"route":"/fr","pattern":"^\\/fr\\/?$","segments":[[{"content":"fr","dynamic":false,"spread":false}]],"params":[],"component":".astro/astro-i18n/entrypoints/fr/index.astro","pathname":"/fr","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"body{margin:0;padding:0}\n"}],"routeData":{"type":"page","isIndex":false,"route":"/admin/[...params]","pattern":"^\\/admin(?:\\/(.*?))?\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"...params","dynamic":true,"spread":true}]],"params":["...params"],"component":"node_modules/@sanity/astro/dist/studio/studio-route.astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/kopp/Desktop/astro-sanity3/node_modules/@sanity/astro/dist/studio/studio-route.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000astro-internal:middleware":"_astro-internal_middleware.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","/node_modules/astro/dist/assets/endpoint/generic.js":"chunks/pages/generic_BAczDgpc.mjs","\u0000@astrojs-manifest":"manifest_CM3cScbN.mjs","/Users/kopp/Desktop/astro-sanity3/node_modules/@astrojs/react/vnode-children.js":"chunks/vnode-children_BkR_XoPb.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_BDXx3fIV.mjs","\u0000@astro-page:node_modules/@sanity/astro/dist/studio/studio-route@_@astro":"chunks/studio-route_DO6H5Ko0.mjs","\u0000@astro-page:.astro/astro-i18n/entrypoints/de/index@_@astro":"chunks/index_Bm0aSbEZ.mjs","\u0000@astro-page:.astro/astro-i18n/entrypoints/en/index@_@astro":"chunks/index_C75igsAl.mjs","\u0000@astro-page:.astro/astro-i18n/entrypoints/fr/index@_@astro":"chunks/index_DG_b03EK.mjs","\u0000@astro-page:src/pages/[lang]/[slug]@_@astro":"chunks/_slug__BvrOv2JK.mjs","@astrojs/react/client.js":"_astro/client.DS2WAbWs.js","/Users/kopp/Desktop/astro-sanity3/node_modules/sanity/lib/_chunks-es/resources2.mjs":"_astro/resources2.CKHYIDaz.js","/Users/kopp/Desktop/astro-sanity3/node_modules/sanity/lib/_chunks-es/resources.mjs":"_astro/resources.DvnQ6ljW.js","/Users/kopp/Desktop/astro-sanity3/node_modules/@sanity/vision/lib/_chunks-es/resources.mjs":"_astro/resources.zQVrw6vg.js","/Users/kopp/Desktop/astro-sanity3/node_modules/sanity/lib/_chunks-es/resources3.mjs":"_astro/resources3.D4f_jtgJ.js","/Users/kopp/Desktop/astro-sanity3/node_modules/@sanity/astro/dist/studio/studio-component":"_astro/studio-component.BYTLE2bG.js","/Users/kopp/Desktop/astro-sanity3/node_modules/sanity/lib/_chunks-es/index.mjs":"_astro/index.BnrSPYMZ.js","/Users/kopp/Desktop/astro-sanity3/node_modules/@sanity/client/dist/_chunks-es/stegaEncodeSourceMap.js":"_astro/stegaEncodeSourceMap.Y9B1uJFi.js","/Users/kopp/Desktop/astro-sanity3/node_modules/sanity/lib/_chunks-es/index2.mjs":"_astro/index2.DYXOH8SJ.js","/Users/kopp/Desktop/astro-sanity3/node_modules/sanity/lib/_chunks-es/index3.mjs":"_astro/index3.Bgd-Ixw-.js","/Users/kopp/Desktop/astro-sanity3/node_modules/@sanity/vision/lib/_chunks-es/SanityVision.mjs":"_astro/SanityVision.B-wBaZpp.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/favicon.svg","/_astro/SanityVision.B-wBaZpp.js","/_astro/browser.wZdYrLiH.js","/_astro/client.CwOmHWpG.js","/_astro/client.DS2WAbWs.js","/_astro/index.BnrSPYMZ.js","/_astro/index2.DYXOH8SJ.js","/_astro/index3.Bgd-Ixw-.js","/_astro/resources.DvnQ6ljW.js","/_astro/resources.zQVrw6vg.js","/_astro/resources2.CKHYIDaz.js","/_astro/resources3.D4f_jtgJ.js","/_astro/stegaEncodeSourceMap.Y9B1uJFi.js","/_astro/studio-component.BYTLE2bG.js","/_astro/studio-component.f6TC7wlY.js","/de/index.html","/en/index.html","/fr/index.html"],"buildFormat":"directory","checkOrigin":false});

export { AstroIntegrationLogger as A, Logger as L, getEventPrefix as g, levels as l, manifest };
