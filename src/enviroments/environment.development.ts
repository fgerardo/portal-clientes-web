// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const URL_BASE_PORTAL =
  'http://localhost:8092/portal-clientes-services/';
// const URL_BASE_INTERMEDIARIO = 'http://localhost:8089/intermediario-service/'
const URL_BASE_INTERMEDIARIO = 'https://portalb.allianz.com.mx/intermediario-service/'
const URL_BASE = 'https://portalb.allianz.com.mx/'

export const environment = {
  production: false,
  url: {
    loginService: URL_BASE_PORTAL + 'v1/login',
    recuperContrasena: URL_BASE_PORTAL + 'v1/recuperar/contrasenia',
    consultarEstatus: URL_BASE_PORTAL + 'v1/consultar/estatus',
    //Servicios Intermediario Service para la consulta directas a BD
    procesarImagen: URL_BASE_INTERMEDIARIO + 'portalClientes/v1/procesarImagen',
    verificarImagenUsuario: URL_BASE_INTERMEDIARIO + 'portalClientes/v1/verificarImagen',
    accesoPortal: URL_BASE_PORTAL + 'v1/acceso/portal',
    headerPolizas: URL_BASE_PORTAL + 'v1/consultar/header'
  },
  urlIncode: {
    urlLigaIncode: URL_BASE + 'liga-incode/notificaciones-incode?idSac=',
    urlLigaVerificacionVdentidad: URL_BASE + 'liga-incode/verificacion-identidad',
    urlGetEnmascararData: URL_BASE + 'incode-services/v1/get-enmascarar-data',
    urlIsExpedienteCompletoRfc: URL_BASE + 'expediente-identificacion-service/v1/expediente/estatus/',
    urlServicioConsultaCG: URL_BASE + 'condiciones-generales-services/v1/consulta/',
    urlServicioRegistrarFirmasCG: URL_BASE + 'incode-services/v1/docFirmas/condiciones/generales',
    urlApiAvailableToken: URL_BASE + 'incode-services/v1/availableToken',
    urlApiNotificacionFace: URL_BASE + 'incode-services/notificacion/v1/face-recognition/',
    urlApiConsultProcess: URL_BASE + 'incode-services/incode/consult/process/',
    urlApiConsultIntentos: URL_BASE + 'incode-services/incode/consult/intentos',
    urlServicioNombreCliente: URL_BASE + 'expediente-identificacion-service/v1/nombre/cliente/',
    urlServicioValidarEndosoCobro: URL_BASE_INTERMEDIARIO + 'b2b-datoscliente-service/api/datos/cliente/validaEndosoDiaCobro',
    urlServicioValidarRemesasIdepol: URL_BASE + 'b2b-datoscliente-service/api/datos/cliente/validaRemesasIdepol',
    urlServicioActualizarDiaCobro: URL_BASE + 'b2b-datoscliente-service/api/datos/cliente/actualizarDiaCobro',
    urlServicioRegistrarBitacoraContacto: URL_BASE + 'condiciones-generales-services/v1/modificacion-cliente',
    urlEnrolamientoIncode: URL_BASE + 'expediente-identificacion-service/incode/obtener/liga/biometrico/pc',
    urlServicioSaveProcess: URL_BASE + 'incode-services/incode/save/process',
    consultEstatusServiciosIncode: URL_BASE + 'incode-services/v1/getEstatusIncode',
    urlQuejasSugerencias: 'https://www.allianz.com.mx/servicios/tramites/quejas-sugerencias.html',
  },
  web: {
    servicioConstanciaFiscal: URL_BASE + 'constancia/upload?rfc=',
    servicioDatosFiscales: URL_BASE + 'datos-fiscales/?rfc=',
    urlEndosoTraspaso: URL_BASE + 'traspasos-fondos-web/?token=',
    urlEndosoTraspasoOptimax: URL_BASE + 'traspasos-patrimoniales-web/traspasos/',
    urlRetirosAlternativas: URL_BASE + 'automatizacion-retiro-web/',
    urlRedistribucionAlternativas: URL_BASE + 'redistribuciones-web/redistribuciones/',
    portalFindAdvance: URL_BASE + 'az-pensiones/pfportal?p='
  }
};
