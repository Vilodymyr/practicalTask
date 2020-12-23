/* eslint-disable eqeqeq */
import constantUtils from './ConstantUtils';
import WebService from './WebService';
import PreferenceManager from './PreferenceManager';
import PreferenceKey from './PreferenceKey';
import functionUtils from './FunctionUtils';

const TAG = 'ApiUtils';

class ApiUtils {
  static headers() {
    return {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    };
  }

  static headersJson() {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
  }

  static get(route, BASE_URL) {
    return this.webserviceExplorer(route, null, 'GET', BASE_URL);
  }

  static get1(route) {
    return this.webserviceExplorerWC(route, null, 'GET');
  }

  static getWithToken(route, token) {
    return this.webserviceWithToken(route, null, token, 'GET');
  }

  static put(route, params) {
    return this.webserviceExplorer(route, params, 'PUT');
  }

  static post(route, params, BASE_URL) {
    return this.webserviceExplorer(route, params, 'POST', BASE_URL);
  }

  static postPay(route, params, BASE_URL) {
    return this.webserviceExplorer(route, params, 'POST', BASE_URL, true);
  }

  static postWithToken(route, params, token) {
    return this.webserviceWithToken(route, params, token, 'POST');
  }

  static delete(route, BASE_URL, params) {
    return this.webserviceExplorer(route, params, 'DELETE', BASE_URL);
  }

  static webserviceExplorer(route, params, verb, BASE_URL, isJsonTypeParam) {
    const host = BASE_URL;
    const url = `${host}${route}`;

    let options = {
      method: verb,
      headers: isJsonTypeParam ? ApiUtils.headersJson() : ApiUtils.headers(),
      body: params,
    };
    return fetch(url, options)
      .then((resp) => {
        let json = resp.json();
        if (resp.ok) {
          return json;
        }
        return json.then((err) => {
          if (err.status == 401) {
            functionUtils.clearData();
          }
          throw err;
        });
      })
      .then((json) => json);
  }

  static webserviceExplorerWC(route, params, verb) {
    const host = WebService.BASE_URL;
    const url = `${host}${route}`;

    let options = {method: verb, headers: ApiUtils.headers(), body: params};
    return fetch(url, options)
      .then((resp) => {
        let json = resp.json();
        if (resp.ok) {
          return json;
        }

        return json.then((err) => {
          if (err.status == 401) {
            functionUtils.clearData();
          }
          throw err;
        });
      })
      .then((json) => json);
  }
}

export default ApiUtils;
