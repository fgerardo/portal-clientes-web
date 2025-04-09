// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const URL_BASE =
  'https://portalb.allianz.com.mx/portal-clientes-services/'; 

export const environment = {
  production: false,
  url: {
      loginService: URL_BASE + 'v1/login',
  },
};
