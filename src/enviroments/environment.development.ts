// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const URL_BASE =
  'http://localhost:8092/portal-clientes-services/';
const URL_BASE_INTERMEDIARIO = 'http://localhost:8089/intermediario-service/'
const URL_BASE_INCODE = 'https://portalb.allianz.com.mx/'

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
  urlIncode: {
    urlLigaIncode: URL_BASE_INCODE + 'liga-incode/notificaciones-incode?idSac=',
    urlLigaVerificacionVdentidad: URL_BASE_INCODE + 'liga-incode/verificacion-identidad',
    urlGetEnmascararData: URL_BASE_INCODE + 'incode-services/v1/get-enmascarar-data',
    urlIsExpedienteCompletoRfc: URL_BASE_INCODE + 'expediente-identificacion-service/v1/expediente/estatus/',
    urlServicioConsultaCG: URL_BASE_INCODE + 'condiciones-generales-services/v1/consulta/',
    urlServicioRegistrarFirmasCG: URL_BASE_INCODE + 'incode-services/v1/docFirmas/condiciones/generales',
    urlApiAvailableToken: URL_BASE_INCODE + 'incode-services/v1/availableToken',
    urlApiNotificacionFace: URL_BASE_INCODE + 'incode-services/notificacion/v1/face-recognition/',
    urlApiConsultProcess: URL_BASE_INCODE + 'incode-services/incode/consult/process/',
    urlApiConsultIntentos: URL_BASE_INCODE + 'incode-services/incode/consult/intentos',
    urlServicioNombreCliente: URL_BASE_INCODE + 'expediente-identificacion-service/v1/nombre/cliente/',
    urlServicioValidarEndosoCobro: URL_BASE_INTERMEDIARIO + 'b2b-datoscliente-service/api/datos/cliente/validaEndosoDiaCobro',
    urlServicioValidarRemesasIdepol: URL_BASE_INCODE + 'b2b-datoscliente-service/api/datos/cliente/validaRemesasIdepol',
    urlServicioActualizarDiaCobro: URL_BASE_INCODE + 'b2b-datoscliente-service/api/datos/cliente/actualizarDiaCobro',
    urlServicioRegistrarBitacoraContacto: URL_BASE_INCODE + 'condiciones-generales-services/v1/modificacion-cliente',
    urlEnrolamientoIncode: URL_BASE + 'expediente-identificacion-service/incode/obtener/liga/biometrico/pc',
    urlServicioSaveProcess: URL_BASE_INCODE + 'incode-services/incode/save/process',
    consultEstatusServiciosIncode: URL_BASE_INCODE +'incode-services/v1/getEstatusIncode',
    urlQuejasSugerencias: 'https://www.allianz.com.mx/servicios/tramites/quejas-sugerencias.html'
  }
};
