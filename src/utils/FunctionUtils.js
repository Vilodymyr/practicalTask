import Toast from 'react-native-simple-toast';
import * as globals from '../utils/globals';
import {PreferenceManager} from './../utils';
class FunctionUtils {
  static showToast(toastString) {
    setTimeout(() => Toast.show(toastString, Toast.SHORT), 10);
  }

  static showLongToast(toastString) {
    setTimeout(() => Toast.show(toastString, Toast.LONG), 10);
  }

  static validateEmail = (email) => {
    var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(email);
  };

  static async clearData() {
    globals.isLoggedIn = false;
    globals.loginUserData = {};
    await PreferenceManager.clearPreference();
  }
}

export default FunctionUtils;
