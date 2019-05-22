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
      enterPin: 'Please enter a PIN of at least 4 digits that will allow you to retrieve your device data stored within the browser. Please take a note of your PIN somewhere as you will not be able to change or retrieve it later.',
      pin: 'PIN',
      home: 'Home',
      homeText: 'This is your personal data stored in the DECODE app',
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
      choosePolicy: 'Please choose an available community for your device. Joining a community means your data will be shared in accordance with the rules defined in the community policy, and you will have the right to see others data who have also joined this community.',
      memberships: 'Community Memberships',
      findCommunity: 'Find Community',
      chooseCommunity: 'Choose Community',
      communityInfo: ' A community means a set of rules defining what sensors to share and any operations that should be applied to these sensors. By choosing to join a community you are agreeing to share your data with other members after the communities processing rules have been applied.',
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
      shareCredential: 'Please choose a credential to share with the dashboard',
      selectCredential: 'Please select a credential',
      successfulLogin: 'Successfully logged in - please switch back to the BCNNow page if logging in from a computer',
      resetText: 'Resetting your application means all device and community membership configuration details will be deleted and will not be able to be recovered. You should only do this if instructed to by a workshop leader.',
      resetConfirmationText: 'Are you sure you want to reset your app? This will remove all device configuration and community membership details.',
      errors: {
        timeout: 'Request timed out',
        missingLoginParams: 'Missing required login parameters, please return to the dashboard and try logging in again.'
      },
      bcnnow: 'To view the dashboard, plase go to http://bcnnow.decodeproject.eu',
      registrationComplete: 'Registration Complete',
      registrationText: 'Your device is now fully registered with Decode. Now, its time to finish the Smart Citizen Kit registration so please return to your computer to complete the process.',
      devicePageText: 'Please see a list of the current community memberships for your device below. If you\'d like to add your device to another community please click the "Choose" button below'
    }
  },
  es: {
    message: {
      pinValidation: 'Su PIN debe tener al menos 4 dígitos',
      signIn: '',
      logout: '',
      enterPin: '',
      pin: '',
      home: '',
      homeText: '',
      manageDevices: '',
      addDevice: '',
      deviceToken: '',
      enterDeviceToken: '',
      token: '',
      longitude: '',
      enterLongitude: '',
      latitude: '',
      enterLatitude: '',
      exposure: '',
      indoors: '',
      outdoors: '',
      reset: '',
      device: '',
      reload: '',
      loadPolicies: '',
      choosePolicy: '',
      memberships: '',
      findCommunity: '',
      chooseCommunity: '',
      sensors: '',
      shareAllSensors: '',
      movingAverage: '',
      bin: '',
      share: '',
      joinCommunity: '',
      credentialSharing: '',
      deviceMembership: '',
      deleteMembership: '',
      confirmation: '',
      confirmationText: '',
      deleteDevice: '',
      deviceConfirmationText: '',
      back: '',
      deviceAdditionText: '',
      login: '',
      doLogin: '',
      dashboardLogin: '',
      shareCredential: '',
      selectCredential: '',
      successfulLogin: '',
      resetText: '',
      resetConfirmationText: '',
      errors: {
        timeout: ''
      }
    }
  },
  ca: {
    message: {
      pinValidation: 'El vostre PIN ha de tenir com a mínim 4 dígits',
      signIn: '',
      logout: '',
      enterPin: '',
      pin: '',
      home: '',
      homeText: '',
      manageDevices: '',
      addDevice: '',
      deviceToken: '',
      enterDeviceToken: '',
      token: '',
      longitude: '',
      enterLongitude: '',
      latitude: '',
      enterLatitude: '',
      exposure: '',
      indoors: '',
      outdoors: '',
      reset: '',
      device: '',
      reload: '',
      loadPolicies: '',
      choosePolicy: '',
      memberships: '',
      findCommunity: '',
      chooseCommunity: '',
      sensors: '',
      shareAllSensors: '',
      movingAverage: '',
      bin: '',
      share: '',
      joinCommunity: '',
      credentialSharing: '',
      deviceMembership: '',
      deleteMembership: '',
      confirmation: '',
      confirmationText: '',
      deleteDevice: '',
      deviceConfirmationText: '',
      back: '',
      deviceAdditionText: '',
      login: '',
      doLogin: '',
      dashboardLogin: '',
      shareCredential: '',
      selectCredential: '',
      successfulLogin: '',
      resetText: '',
      resetConfirmationText: '',
      errors: {
        timeout: ''
      }
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
