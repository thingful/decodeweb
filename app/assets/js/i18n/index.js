import Vue from 'vue';
import VueI18n from 'vue-i18n';
import _ from 'lodash';

Vue.use(VueI18n);

const messages = {
  en: {
    message: {
      pinValidation: 'Your PIN must be at least 4 digits long',
      signIn: 'Sign In',
      logout: 'Logout',
      enterPin: 'Please enter a PIN of at least 4 digits that allows you to protect and retrieve your personal data stored in the app. Please take a note of your PIN somewhere as you will not be able to change or retrieve it later.',
      pin: 'PIN',
      home: 'Home',
      manageDevices: 'Manage Devices',
      addDevice: 'Add Device',
      deviceLabel: 'Name',
      enterDeviceLabel: 'e.g. My Sensor',
      deviceToken: 'Code',
      enterDeviceToken: 'e.g. ef0012',
      token: 'Token',
      longitude: 'Longitude',
      enterLongitude: 'e.g. 2.15',
      latitude: 'Latitude',
      enterLatitude: 'e.g. 41.39',
      exposure: 'Exposure',
      indoors: 'Indoors',
      outdoors: 'Outdoors',
      reset: 'Reset',
      device: 'Device',
      reload: 'Reload',
      loadPolicies: 'Load Available Policies',
      choosePolicy: 'Please choose an available community for your device. Joining a community means your data will be shared in accordance with the rules defined in the community policy, and also means you have the right to see the data of others who have also joined this community.',
      memberships: 'Community Memberships',
      findCommunity: 'Find Community',
      chooseCommunity: 'Choose Community',
      communityInfo: 'A community is defined by a set of rules that state which sensors to share and any privacy preserving operations that should be applied to these sensors. By choosing to join a community you are agreeing to share your data in accordance with these rules with other community members.',
      choose: 'Choose',
      sensors: 'Sensors',
      shareAllSensors: 'Share all device sensors',
      movingAverage: 'Moving Average',
      bin: 'Binned Data',
      share: 'Share',
      joinCommunity: 'Join Community',
      credentialSharing: 'You are going to ask for a credential from an external service. In order to do so, you need to provide the following information:',
      credentialInfo: 'Please note to obtain a credential you must have already supplied your email address to the community organiser, and the token will be supplied to you by the community organiser',
      deviceMembership: 'Manage Membership',
      deleteMembership: 'Delete Membership',
      confirm: 'Confirm',
      delete: 'Delete',
      confirmation: 'Confirmation',
      confirmationText: 'Are you sure you want to delete your membership of this community? You will no longer be able to access the community dashboard.',
      deleteDevice: 'Delete Device',
      deviceConfirmationText: 'Are you sure you want to delete your device? This will delete all streams and you will no longer be able to access any associated community dashboards.',
      back: "Back",
      noPoliciesAvailable: 'No policies available',
      deviceAdditionText: 'Are you sure you wish to add this device into the app? This is required if you wish to be able to control how its data is processed and transmitted',
      login: 'Login to dashboard',
      doLogin: 'Login',
      dashboardLogin: 'BCNNow requires a credential to log you in',
      shareCredential: 'Please choose a credential to share with BCNNow',
      selectCredential: 'Please select a credential',
      successfulLogin: 'Successfully logged in - please switch back to the BCNNow page if logging in from a computer',
      resetText: 'Resetting your application means all device and community membership configuration details will be deleted and will not be able to be recovered. You should only do this if instructed to by a workshop leader.',
      resetConfirmationText: 'Are you sure you want to reset your app? This will remove all device configuration and community membership details.',
      errors: {
        timeout: 'Request timed out',
        missingLoginParams: 'Missing required login parameters, please return to BCNNow and try logging in again.',
        wasmNotAvailable: 'In order to use the DECODE webapp your browser must be updated to a more recent version. For details on the required functionality please see {0}'
      },
      bcnnow: 'To visualise your data, please go to {url}',
      registrationComplete: 'Registration Complete',
      registrationText: 'Your device is now fully registered with Decode. Now, its time to finish the Smart Citizen Kit registration so please return to your computer to complete the process.',
      devicePageText: 'Please see a list of the current community memberships for your device below. If you\'d like to add your device to another community please click the "Choose" button below',
      chooseLanguage: 'Choose Language',
      cancel: 'Cancel',
      ok: 'OK',
      lightSensor: 'Light Sensor',
      noiseSensor: 'Noise Sensor',
      pressureSensor: 'Barometric Pressure Sensor',
      batteryLevel: 'Battery Level',
      temperatureSensor: 'Air Temperature Sensor',
      pm25Sensor: 'PM 2.5 Sensor',
      pm10Sensor: 'PM 10 Sensor',
      pm1Sensor: 'PM 1 Sensor',
      humiditySensor: 'Humidity Sensor'
    }
  },
  ca: {
    message: {
      pinValidation: 'El seu PIN ha de ser d\'almenys 4 dígits',
      signIn: 'Registra\'t',
      logout: 'Tancar sessió',
      enterPin: 'Si us plau, introdueixi un PIN d\'almenys 4 dígits que li permeti protegir i recuperar les seves dades personals emmagatzemades en l\'aplicació. Si us plau, prengui nota de la seva PIN, ja que no podrà canviar-lo ni recuperar-lo més tard.',
      pin: 'PIN',
      home: 'Pàgina principal',
      manageDevices: 'Gestionar dispositius',
      addDevice: 'Afegir dispositius',
      deviceLabel: 'Nom',
      enterDeviceLabel: 'p. ex. El meu sensor',
      deviceToken: 'Codi',
      enterDeviceToken: 'p. ex. ef0012',
      token: 'Token',
      longitude: 'Longitud',
      enterLongitude: 'p. ex. 2.15',
      latitude: 'Latitud',
      enterLatitude: 'p. ex. 41.39',
      exposure: 'Ubicació',
      indoors: 'Interior',
      outdoors: 'Exterior',
      reset: 'Reiniciar',
      device: 'Dispositiu',
      reload: 'Recarregar',
      loadPolicies: 'Carregar polítiques disponibles',
      choosePolicy: 'Si us plau, triï una comunitat disponible per al seu dispositiu. Unir-se a una comunitat significa que les seves dades seran compartides d\'acord amb les regles definides en les polítiques de la comunitat, i també que vostè té el dret de veure les dades d\'altres persones que també s\'han unit a aquesta comunitat.',
      memberships: 'Membres de la Comunitat',
      findCommunity: 'Trobar Comunitat',
      chooseCommunity: 'Triar Comunitat',
      communityInfo: 'Una comunitat es defineix per un conjunt de regles que estableixen quins sensors es comparteixen i qualsevol operació per a preservar la privacitat que s\'hagi d\'aplicar a aquests sensors. En triar unir-se a una comunitat, vostè accepta compartir les seves dades d\'acord amb aquestes regles amb altres membres de la comunitat.',
      choose: 'Triar',
      sensors: 'Sensors',
      shareAllSensors: 'Compartir tots els sensors del dispositiu',
      movingAverage: 'Mitjana variable',
      bin: 'Recopilació de Dades',
      share: 'Compartir',
      joinCommunity: 'Unir-se a la Comunitat',
      credentialSharing: 'Vostè sol·licitarà una credencial a un servei extern. Per a això, ha de proporcionar la següent informació:',
      credentialInfo: 'Si us plau, tingui en compte que per a obtenir una credencial ha d\'haver proporcionat la seva adreça de correu electrònic a l\'organitzador de la comunitat, i l\'organitzador de la comunitat li proporcionarà el token.',
      deviceMembership: 'Gestionar membres',
      deleteMembership: 'Esborrar membres',
      confirm: 'Confirmar',
      delete: 'Eliminar',
      confirmation: 'Confirmar',
      confirmationText: 'Estàs segur que vols deixar de ser membre d\'aquesta comunitat? Vostè ja no podrà accedir al panell de control de la comunitat.',
      deleteDevice: 'Eliminar Dispositiu',
      deviceConfirmationText: 'Estàs segur que vols eleminar el teu dispositiu? Això eliminarà totes les seqüències i ja no podrà accedir a cap gràfic associat a la comunitat.',
      back: "Enrere",
      noPoliciesAvailable: 'No hi ha politicas disponibles',
      deviceAdditionText: 'Estàs segur que desitges afegir aquest dispositiu a l\'aplicació? Aquesta acció és necessària si desitja poder controlar com es processen i transmeten les seves dades.',
      login: 'Iniciar sessió en BCNNow',
      doLogin: 'Iniciar sessió',
      dashboardLogin: 'BCNNow requereix una credencial per a iniciar sessió',
      shareCredential: 'Si us plau, seleccioni una credencial per a compartir amb BCNNow',
      selectCredential: 'Si us plau, seleccioni una credencial',
      successfulLogin: 'Inici de sessió realitzat - si us plau, torni a la pàgina de BCNNow si ha iniciat sessió des d\'un ordinador.',
      resetText: 'Reiniciar la seva aplicació significa que tots els detalls de configuració del dispositiu i de la comunitat seran eliminats i no podran ser recuperats. Només ha de realitzar aquesta acció, si s\'ho indica l\'organitzador del taller.',
      resetConfirmationText: 'Estàs segur que vols reiniciar la teva aplicació? Aquesta acció eliminarà tota la configuració del dispositiu i els detalls dels membres de la comunitat.',
      errors: {
        timeout: 'Temps esgotat per a la sol·licitud',
        missingLoginParams: 'Falten els paràmetres d\'inici de sessió necessaris, si us plau torni a BCNNow i intenti iniciar sessió de nou.',
        wasmNotAvailable: 'Per a poder utilitzar la webapp de DECODE, el seu navegador ha d\'estar actualitzat a una versió recent. Per a més detalls sobre la funcionalitat requerida, consulti {0}'
      },
      bcnnow: 'Per a visualitzar les dades, si us plau accedeixi a {url}',
      registrationComplete: 'Registre completat',
      registrationText: 'El seu dispositiu ja està correctament registrat en Decode. Ara, és el moment d\'acabar el registre del Kit Smart Citizen, així que si us plau torni al seu ordinador per a completar el procés.',
      devicePageText: 'Consulti a continuació una llista dels membres actuals de la comunitat per al seu dispositiu. Si desitja afegir el seu dispositiu a una altra comunitat, faci clic en el botó "Triar" que apareix a continuació.',
      chooseLanguage: 'Canviar idioma',
      cancel: 'Cancel·lar',
      ok: 'OK',
      lightSensor: 'Sensor de llum',
      noiseSensor: 'Sensor de soroll',
      pressureSensor: 'Sensor de pressió baromètrica',
      batteryLevel: 'Nivell de bateria',
      temperatureSensor: 'Sensor de temperatura',
      pm25Sensor: 'Sensor 2.5 PM',
      pm10Sensor: 'Sensor 10 PM',
      pm1Sensor: 'Sensor 1 PM',
      humiditySensor: 'Sensor d\'humitat'
    }
  },
  es: {
    message: {
      pinValidation: 'Su PIN tiene que ser de al menos 4 dígitos ',
      signIn: 'Regístrate',
      logout: 'Cerrar sesión',
      enterPin: 'Por favor, introduzca un PIN de al menos 4 dígitos que le permita proteger y recuperar sus datos personales almacenados en la aplicación. Por favor, tome nota de su PIN, ya que no podrá cambiarlo ni recuperarlo más tarde.',
      pin: 'PIN',
      home: 'Página principal',
      manageDevices: 'Gestionar dispositivos',
      addDevice: 'Añadir dispositivos',
      deviceLabel: 'Nom',
      enterDeviceLabel: 'p. ej. Mi sensor',
      deviceToken: 'Código',
      enterDeviceToken: 'p. ej. ef0012',
      token: 'Token',
      longitude: 'Longitud',
      enterLongitude: 'p. ej. 2.15',
      latitude: 'Latitud',
      enterLatitude: 'p. ej. 41.39',
      exposure: 'Ubicación',
      indoors: 'Interior',
      outdoors: 'Exterior',
      reset: 'Reiniciar',
      device: 'Dispositivo',
      reload: 'Recargar',
      loadPolicies: 'Cargar políticas disponibles',
      choosePolicy: 'Por favor, elija una comunidad disponible para su dispositivo. Unirse a una comunidad significa que sus datos serán compartidos de acuerdo con las reglas definidas en las políticas de la comunidad, y también que usted tiene el derecho de ver los datos de otras personas que también se han unido a esta comunidad.',
      memberships: 'Miembros de la Comunidad',
      findCommunity: 'Encontrar Comunidad',
      chooseCommunity: 'Elegir Comunidad',
      communityInfo: 'Una comunidad se define por un conjunto de reglas que establecen qué sensores se comparten y cualquier operación para preservar la privacidad que se deba aplicar a estos sensores. Al elegir unirse a una comunidad, usted acepta compartir sus datos de acuerdo con estas reglas con otros miembros de la comunidad.',
      choose: 'Elegir',
      sensors: 'Sensores',
      shareAllSensors: 'Compartir todos los sensores del dispositivo',
      movingAverage: 'Promedio variable',
      bin: 'Recopilación de Datos',
      share: 'Compartir',
      joinCommunity: 'Unirse a la Comunidad',
      credentialSharing: 'Usted va a solicitar una credencial a un servicio externo. Para ello, debe proporcionar la siguiente información:',
      credentialInfo: 'Por favor, tenga en cuenta que para obtener una credencial debe haber proporcionado su dirección de correo electrónico al organizador de la comunidad, y el organizador de la comunidad le proporcionará el token.',
      deviceMembership: 'Gestionar miembros',
      deleteMembership: 'Borrar miembros',
      confirm: 'Confirmar',
      delete: 'Eliminar',
      confirmation: 'Confirmar',
      confirmationText: '¿Estás seguro de que quieres dejar de ser miembro de esta comunidad? Usted ya no podrá acceder al panel de control de la comunidad.',
      deleteDevice: 'Eliminar Dispositivo',
      deviceConfirmationText: '¿Estás seguro de que quieres eleminar tu dispositivo? Esto eliminará todas las secuencias y ya no podrá acceder a ningún gráfico asociado a la comunidad.',
      back: 'Atrás',
      noPoliciesAvailable: 'No hay politicas disponibles',
      deviceAdditionText: '¿Estás seguro de que deseas añadir este dispositivo a la aplicación? Esta acción es necesaria si desea poder controlar cómo se procesan y transmiten sus datos.',
      login: 'Iniciar sesión en BCNNow',
      doLogin: 'Iniciar sesión',
      dashboardLogin: 'BCNNow requiere una credencial para iniciar sesión',
      shareCredential: 'Por favor, seleccione una credencial para compartir con BCNNow',
      selectCredential: 'Por favor, seleccione una credencial',
      successfulLogin: 'Inicio de sesión realizado - por favor, vuelva a la página de BCNNow si ha iniciado sesión desde un ordenador.',
      resetText: 'Reiniciar su aplicación significa que todos los detalles de configuración del dispositivo y de la comunidad serán eliminados y no podrán ser recuperados. Sólo debe realizar esta acción, si se lo indica el organizador del taller.',
      resetConfirmationText: '¿Estás seguro de que quieres reiniciar tu aplicación? Esta acción eliminará toda la configuración del dispositivo y los detalles de los miembros de la comunidad.',
      errors: {
        timeout: 'Tiempo agotado para la solicitud',
        missingLoginParams: 'Faltan los parámetros de inicio de sesión necesarios, por favor vuelva a BCNNow e intente iniciar sesión de nuevo.',
        wasmNotAvailable: 'Para poder utilizar la webapp de DECODE, su navegador debe estar actualizado a una versión reciente. Para más detalles sobre la funcionalidad requerida, consulte {0}'
      },
      bcnnow: 'Para visualizar los datos, por favor acceda a {url}',
      registrationComplete: 'Registro completado',
      registrationText: 'Su dispositivo ya está correctamente registrado en Decode. Ahora, es el momento de terminar el registro del Kit Smart Citizen, así que por favor regrese a su ordenador para completar el proceso.',
      devicePageText: 'Consulte a continuación una lista de los miembros actuales de la comunidad para su dispositivo. Si desea añadir su dispositivo a otra comunidad, haga clic en el botón "Elegir" que aparece a continuación.',
      chooseLanguage: 'Cambiar idioma',
      cancel: 'Cancelar',
      ok: 'OK',
      lightSensor: 'Sensor de luz',
      noiseSensor: 'Sensor de ruido',
      pressureSensor: 'Sensor de presión barométrica',
      batteryLevel: 'Nivel de bateria',
      temperatureSensor: 'Sensor de temperatura',
      pm25Sensor: 'Sensor 2.5 PM',
      pm10Sensor: 'Sensor 10 PM',
      pm1Sensor: 'Sensor 1 PM',
      humiditySensor: 'Sensor de humedad'
    }
  }
};

const choosableLanguages = _.intersection(Object.keys(messages), navigator.languages);
var locale;

if (choosableLanguages.length === 0) {
  locale = "en";
} else {
  locale = choosableLanguages[0];
}

const i18n = new VueI18n({
  locale: locale,
  messages,
});

export default i18n;
