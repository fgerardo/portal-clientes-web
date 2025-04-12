// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const URL_BASE =
  'http://localhost:8092/portal-clientes-services/';
const URL_BASE_INTERMEDIARIO = 'http://localhost:8089/intermediario-service/'

export const environment = {
  production: false,
  url: {
    loginService: URL_BASE + 'v1/login',
    recuperContrasena: URL_BASE + 'v1/recuperar/contrasenia',
    consultarEstatus: URL_BASE + 'v1/consultar/estatus',
    //Servicios Intermediario Service para la consulta directas a BD
    procesarImagen: URL_BASE_INTERMEDIARIO + 'portalClientes/v1/procesarImagen',
    verificarImagenUsuario: URL_BASE_INTERMEDIARIO + 'portalClientes/v1/verificarImagen'
  },
};
