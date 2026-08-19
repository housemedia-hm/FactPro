import { access, readFile, stat } from "node:fs/promises";

const required = [
  "index.html",
  "assets/house-media-logo.svg",
  "assets/house-media-isotipo.svg",
  "assets/firma-house-media.svg",
  "assets/qr-house-media.svg",
  "assets/favicon.svg",
  "vendor/pdf-lib.min.js",
  "vendor/pdfjs.min.js",
  "vendor/pdfjs-worker-source.js"
];

await Promise.all(required.map(path => access(path)));
const html = await readFile("index.html", "utf8");
const pdfReader = await readFile("vendor/pdfjs.min.js", "utf8");
const pdfWorker = await readFile("vendor/pdfjs-worker-source.js", "utf8");
const checks = [
  "www.HouseMedia.art",
  "Bienvenido a FactPro",
  "<title>FactPro | Bienvenido</title>",
  "<h4>Documentos</h4>",
  "loginScreen",
  "loginForm",
  "defaultLoginUsername = \"HM.ADMIN\"",
  "defaultLoginPassword = \"HMfactpro09\"",
  "placeholder=\"Ingresa su usuario\"",
  "placeholder=\"Ingresa la contraseña\"",
  "changePasswordButton",
  "Modificar datos de la empresa",
  "Registrar Usuario",
  "userSettingsPanel",
  "registeredUsersList",
  "usersStoreName",
  "ownerUsername",
  "role:\"master\"",
  "registerUserButton",
  "appLoader",
  "Cargando FactPro",
  "userMenuButton",
  "topLogoutButton",
  "sessionStorageKey",
  "restoreActiveSession",
  "clientsView",
  "clientsStoreName",
  "Registrar cliente",
  "savedClientOptions",
  "clientTableBody",
  "saveClientRecord",
  "applySavedClientSuggestion",
  "logoutButton",
  "passwordHash",
  "SHA-256",
  "settingsStoreName",
  "<span>FactPro</span>",
  "assets/house-media-isotipo.svg\" alt=\"Isotipo House Media",
  "Importar y procesar PDF",
  "Mostrar descuento",
  "Mostrar adelanto",
  "Seleccionar documento",
  "Agregar hoja de guion",
  "Agregar hoja de imágenes",
  "Agregar comprobantes de pago",
  "Documentos guardados",
  "archiveSearch",
  "archiveTypeFilter",
  "archiveStatusFilter",
  "archiveDateFrom",
  "archiveDateTo",
  "data-view-record",
  "data-edit-record",
  "data-delete-record",
  "FactProArchivoLocal",
  "indexedDB.open",
  "Exportar respaldo",
  "Importar respaldo",
  "galleryCategoryList",
  "paymentProofList",
  "galleryHTML",
  "paymentProofsHTML",
  "data-gallery-upload",
  "data-proof-upload",
  "TOTAL DEL DOCUMENTO",
  "PAGOS ENVIADOS",
  "PAGO PENDIENTE",
  "Estado del documento",
  "value=\"active\">Activo",
  "Conservar estado actual",
  "Estado actual",
  "status-card",
  "currentStatusClass",
  "const rawTitle = page.items.find",
  "pdfPaymentMethod",
  "pdfPaymentBank",
  "pdfPaymentReference",
  "documentPaymentMethod",
  "Pago: Deposito | Banco:",
  "LAFISE",
  "BAC",
  "BANPRO",
  "FICOHSA",
  "BDF",
  "AVANZ",
  "layout: {",
  "originalCommercial.clientName",
  "pdfDocumentStatus",
  "status-badge",
  "assets/qr-house-media.svg",
  "assets/favicon.svg",
  "Editar completo el documento",
  "extractEditablePdfData",
  "titleAnchors",
  "quantityStart",
  "pdfjsWorker",
  "src=\"vendor/pdfjs.min.js\"",
  "showTax",
  "successModal",
  "assets/house-media-isotipo.svg"
];
for (const value of checks) {
  if (!html.includes(value)) throw new Error(`Falta contenido requerido: ${value}`);
}
if (/localStorage/.test(html)) throw new Error("Los documentos deben almacenarse en IndexedDB, no en Web Storage limitado.");
if (/Herramienta local|Documentos profesionales, listos en minutos|Formato carta<\/span><span class="hero-tag"|Documentos locales|<div class="brand-mark">HM<\/div>/.test(html)) throw new Error("El Dashboard todavía contiene textos o distintivos anteriores.");
if (!html.includes('document.title = "FactPro | Bienvenido"')) throw new Error("La pestaña debe recuperar el título de bienvenida después de imprimir.");
if (html.includes("width: width * .76, height: height * .084")) throw new Error("El cambio de estado no debe cubrir la información del documento.");
if (html.includes("Carta compatible")) throw new Error("La validación importada no debe mostrar la tarjeta de formato.");
if (!html.includes('`${label}#${filenamePart(number, "SinNumero")}-${client}.pdf`')) throw new Error("El PDF importado debe usar tipo, número y cliente en el nombre.");
if (!html.includes('Archivo</span><strong>${escapeHTML(file.name)}</strong></div>\n            <div class="validation-card status-card')) throw new Error("El estado actual debe mostrarse inmediatamente después del archivo.");
if (!html.includes("const titleSize = 17.25")) throw new Error("El título procesado debe conservar su escala de impresión.");
if (!html.includes('const paymentChanged = originalPayment.method !== requestedPayment.method')) throw new Error("Los cambios de pago deben activar el procesamiento del PDF.");
if (!html.includes('.totals-wrap { width: 175px;')) throw new Error("El bloque de totales debe mantenerse compacto y alineado con Cant.");
if (!html.includes('commercialDocumentHTML() + galleryHTML() + paymentProofsHTML()')) throw new Error("Las hojas opcionales deben imprimirse después de la factura o proforma.");
if (!html.includes('grid-template-columns: repeat(var(--image-count), minmax(0, 1fr))')) throw new Error("La galería debe ajustar sus imágenes horizontalmente.");
if (!html.includes('state.imageCategories = []') || !html.includes('state.paymentProofs = []')) throw new Error("Los anexos deben vaciarse al limpiar el documento.");
if (!html.includes('Promise.all(files.map(imageFileToDataURL))')) throw new Error("La galería debe permitir cargar varias imágenes a la vez.");
if (html.includes('.totals-wrap { width: 310px;')) throw new Error("El bloque de totales anterior era demasiado ancho.");
if (!html.includes('.nav { width: 100%; display: grid; grid-template-columns: repeat(6, minmax(0, 1fr))')) throw new Error("Falta la navegación adaptable de seis módulos.");
if (!html.includes('await saveCurrentDocument(false)')) throw new Error("Generar PDF debe guardar primero el documento en el archivo local.");
if (!html.includes('navigator.storage?.persist?.()')) throw new Error("FactPro debe solicitar persistencia del almacenamiento local.");
if (!html.includes('indexedDB.open(archiveDatabaseName, 4)')) throw new Error("La base local debe incluir usuarios, documentos y clientes individuales.");
if (!html.includes('await ensureAuthSettings()')) throw new Error("El inicio debe preparar las credenciales locales.");
if (!html.includes('$("#loginForm").addEventListener("submit", handleLogin)')) throw new Error("Falta activar el formulario de inicio de sesión.");
if (!html.includes('sessionStorage.setItem(sessionStorageKey, username)') || !html.includes('sessionStorage.removeItem(sessionStorageKey)')) throw new Error("La sesión debe conservarse al actualizar y eliminarse al cerrar sesión.");
if (!html.includes('return restoreActiveSession()')) throw new Error("El inicio debe restaurar la sesión activa de la pestaña.");
if (!html.includes('$("#topLogoutButton").addEventListener("click", logout)')) throw new Error("El menú del usuario debe permitir cerrar la sesión.");
if (/<input id="loginUsername"[^>]*\bvalue=/.test(html)) throw new Error("El usuario no debe aparecer rellenado en la pantalla de acceso.");
if (!/<input id="loginUsername"[^>]*\bautofocus\b/.test(html)) throw new Error("El campo Usuario debe recibir el enfoque inicial.");
if (/<input id="loginPassword"[^>]*\bautofocus\b/.test(html)) throw new Error("La contraseña no debe recibir el enfoque inicial.");
if (!html.includes('id="loggedInUsername"') || !html.includes('$("#loggedInUsername").textContent = username')) throw new Error("La barra superior debe mostrar el usuario autenticado.");
if (!html.includes('record.ownerUsername === ownerUsername')) throw new Error("El archivo debe filtrar los documentos por el usuario autenticado.");
if (!html.includes('ownerUsername: state.currentUser.username')) throw new Error("Cada documento nuevo debe guardar su usuario propietario.");
if (!html.includes('client.ownerUsername === ownerUsername')) throw new Error("Los clientes deben filtrarse por el usuario autenticado.");
if (!html.includes('Selecciona un cliente registrado o escribe uno nuevo sin guardarlo.')) throw new Error("El documento debe permitir clientes registrados y clientes libres.");
if (!html.includes('Ingresa tus datos para acceder a FactPro y documentos.')) throw new Error("Falta el nuevo texto de acceso.");
if (html.includes('Acceso local. Tus credenciales y documentos permanecen únicamente en este navegador.')) throw new Error("Debe eliminarse el aviso inferior del login.");
if (!html.includes('Solo HM.ADMIN puede registrar usuarios.')) throw new Error("El registro de usuarios debe estar restringido a la cuenta maestra.");
if (html.includes("Archivo local activo") || html.includes("privacy-note")) throw new Error("Debe eliminarse el indicador y el cuadro informativo local anteriores.");
if (/No usa base de datos ni conserva la información|Tus datos solo viven durante esta sesión|Sin conexión · sin base de datos/.test(html)) throw new Error("La interfaz todavía comunica el comportamiento anterior sin archivo local.");
if ((await stat("vendor/pdf-lib.min.js")).size < 500000) throw new Error("Procesador PDF incompleto.");
if ((await stat("vendor/pdfjs.min.js")).size < 400000) throw new Error("Lector de texto PDF incompleto.");
if ((await stat("vendor/pdfjs-worker-source.js")).size < 1000000) throw new Error("Worker de lectura PDF incompleto.");
if (!pdfReader.startsWith("(()=>{") || !pdfWorker.startsWith("(()=>{")) throw new Error("Los componentes PDF deben estar aislados para evitar conflictos en el navegador.");
if (/import\.meta|\bexport\s*\{/.test(pdfReader + pdfWorker)) throw new Error("Los componentes PDF no son compatibles con apertura local directa.");
console.log("Validación local completada.");
