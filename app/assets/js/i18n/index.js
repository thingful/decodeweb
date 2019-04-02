import Vue from 'vue';
import VueI18n from 'vue-i18n';

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
      loadPolicies: 'Load Available Policies',
      choosePolicy: 'Please choose a community policy for your device',
      memberships: 'Community Memberships',
      findCommunity: 'Find Community',
      sensors: 'Sensors',
      shareAllSensors: 'Share all device sensors',
      movingAverage: 'Moving Average',
      bin: 'Binned Data',
      share: 'Share',
      joinCommunity: 'Join Community'
    }
  }
};

const i18n = new VueI18n({
  locale: 'en',
  messages,
});

export default i18n;