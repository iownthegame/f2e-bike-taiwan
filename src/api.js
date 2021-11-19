import axios from 'axios';
import jsSHA from 'jssha';

const Api = {
  getCyclingShape(city, skip=0) {
    return axios.get(
      `${this.url()}/Cycling/Shape/${city}`, {
      params: {
        '$top': 10,
        '$format': 'JSON',
        '$skip': skip
        // 'Town': null
      },
      headers: this.getAuthorizationHeader()
    });
  },

  getBasicCity() {
    return axios.get(
      `${this.govUrl()}/Basic/City`, {
      params: {
        '$format': 'JSON'
      },
      headers: this.getAuthorizationHeader()
    });
  },

  getBikeStationNearBy(spatialFilter) {
    return axios.get(
      `${this.url()}/Bike/Station/NearBy`, {
      params: {
        '$top': 10,
        '$spatialFilter': spatialFilter,
        '$format': 'JSON'
      },
      headers: this.getAuthorizationHeader()
    });
  },

  getBikeAvailabilityNearBy(spatialFilter) {
    return axios.get(
      `${this.url()}/Bike/Availability/NearBy`, {
      params: {
        '$top': 10,
        '$spatialFilter': spatialFilter,
        '$format': 'JSON'
      },
      headers: this.getAuthorizationHeader()
    });
  },

  getBasicCityTown(city) {
    city
    return []
    // return axios.get(
    //   `${this.govUrl()}/Basic/City/${city}/Town`, {
    //   params: {
    //     '$format': 'JSON'
    //   },
    //   // headers: this.getAuthorizationHeader()
    // });
  },

  url() {
    return 'https://ptx.transportdata.tw/MOTC/v2'
  },

  govUrl() {
    return 'https://gist.motc.gov.tw/gist_api/V3/Map'
  },

  getAuthorizationHeader() {
    let AppID = '3df46b6355de4253b95fe1bbb28e86c6';
    let AppKey = 'pJnhOqJshLsVmEl7W91p5ZIq9iU';
    let GMTString = new Date().toGMTString();
    let ShaObj = new jsSHA('SHA-1', 'TEXT');
    ShaObj.setHMACKey(AppKey, 'TEXT');
    ShaObj.update('x-date: ' + GMTString);
    let HMAC = ShaObj.getHMAC('B64');
    let Authorization = 'hmac username="' + AppID + '", algorithm="hmac-sha1", headers="x-date", signature="' + HMAC + '"';
    return { 'Authorization': Authorization, 'X-Date': GMTString };
  }
}

export default Api;
