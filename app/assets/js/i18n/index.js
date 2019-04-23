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
      enterPin: 'Enter your PIN',
      pin: 'PIN',
      home: 'Home',
      homeText: 'This is your personal data stored in the DECODE app',
      manageDevices: 'Manage Devices',
      addDevice: 'Add Device',
      deviceToken: 'Device Token',
      enterDeviceToken: 'e.g. ef0012',
      token: 'Token',
      longitude: 'Longitude',
      enterLongitude: 'e.g. 2.15',
      latitude: 'Latitude',
      enterLatitude: 'e.g. 41.39',
      exposure: 'Exposure',
      enterExposure: 'Enter the exposure of the device',
      indoors: 'Indoors',
      outdoors: 'Outdoors',
      reset: 'Reset',
      device: 'Device',
      reload: 'Reload',
      loadPolicies: 'Load Available Policies',
      choosePolicy: 'Please choose an available community policy for your device',
      memberships: 'Community Memberships',
      findCommunity: 'Find Community',
      chooseCommunity: 'Choose Community',
      sensors: 'Sensors',
      shareAllSensors: 'Share all device sensors',
      movingAverage: 'Moving Average',
      bin: 'Binned Data',
      share: 'Share',
      joinCommunity: 'Join Community',
      credentialSharing: 'You are going to ask for a credential from an external service. In order to do so, you need to provide the following information:',
      deviceMembership: 'Manage Membership',
      deleteMembership: 'Delete Membership',
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
      successfulLogin: 'Successfully logged in',
      resetText: 'Resetting your application means all device and community membership configuration details will be deleted and will not be able to be recovered. You should only do this if instructed to by a workshop leader.',
      resetConfirmationText: 'Are you sure you want to reset your app? This will remove all device configuration and community membership details.',
      errors: {
        timeout: 'Request timed out',
        missingLoginParams: 'Missing required login parameters, please return to the dashboard and try logging in again.'
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