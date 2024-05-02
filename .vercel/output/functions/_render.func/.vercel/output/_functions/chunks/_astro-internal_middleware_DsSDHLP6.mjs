import 'cookie';
import { a as als } from './prerender_BFV-8sXw.mjs';

function sequence(...handlers) {
  const filtered = handlers.filter((h) => !!h);
  const length = filtered.length;
  if (!length) {
    const handler = defineMiddleware((context, next) => {
      return next();
    });
    return handler;
  }
  return defineMiddleware((context, next) => {
    return applyHandle(0, context);
    function applyHandle(i, handleContext) {
      const handle = filtered[i];
      const result = handle(handleContext, async () => {
        if (i < length - 1) {
          return applyHandle(i + 1, handleContext);
        } else {
          return next();
        }
      });
      return result;
    }
  });
}

function defineMiddleware(fn) {
  return fn;
}

const options = {"defaultLocale":"fr","locales":["fr","de","en"],"strategy":"prefix","pages":{},"localesDir":"./src/locales","defaultNamespace":"common","client":{"data":false,"translations":false,"paths":false},"sitemap":{}};
								const routes = [{"locale":"fr","params":[],"pattern":"/","injectedRoute":{"pattern":"/fr/","entrypoint":"/Users/kopp/Desktop/astro-sanity3/.astro/astro-i18n/entrypoints/fr/index.astro"}},{"locale":"de","params":[],"pattern":"/","injectedRoute":{"pattern":"/de/","entrypoint":"/Users/kopp/Desktop/astro-sanity3/.astro/astro-i18n/entrypoints/de/index.astro"}},{"locale":"en","params":[],"pattern":"/","injectedRoute":{"pattern":"/en/","entrypoint":"/Users/kopp/Desktop/astro-sanity3/.astro/astro-i18n/entrypoints/en/index.astro"}}];
								const i18nextConfig = {"namespaces":["common"],"defaultNamespace":"common","resources":{"fr":{"common":{}}}};

const extractLocaleFromUrl = (pathname) => {
  for (const locale of options.locales) {
    {
      if (pathname.startsWith(`/${locale}/`)) {
        return locale;
      }
    }
  }
  return options.defaultLocale;
};
const onRequest$1 = defineMiddleware((context, next) => {
  const pathname = context.url.pathname;
  const locale = extractLocaleFromUrl(pathname);
  return als.run(
    {
      clientOptions: options.client,
      translations: {
        initialized: false,
        i18nextConfig
      },
      data: {
        locale,
        locales: options.locales,
        defaultLocale: options.defaultLocale
      },
      paths: {
        pathname,
        routes,
        dynamicParams: {},
        strategy: options.strategy
      }
    },
    next
  );
});

const onRequest = sequence(
	onRequest$1,
	
	
);

export { defineMiddleware as d, onRequest as o, sequence as s };
