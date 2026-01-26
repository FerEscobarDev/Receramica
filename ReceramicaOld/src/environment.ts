
const esDesarrollo: boolean = location.hostname === 'localhost' || location.hostname === '127.0.0.1';

const urlBaseApi: string = esDesarrollo ? 'http://localhost' : 'https://ricardo-admin.receramica.com';

const authToken: string = esDesarrollo ? `Bearer 6dk7SWKSBvN0975EHGsFtX94xeJ0RtzRSNBDAHKA3500a300` : 'Bearer BC4agMG15lM7Nv1qyNkjg51DVOFilg9hGPNPS90hd707065d';



export default {
    prod: !esDesarrollo,
    urlBaseApi: urlBaseApi,
    authToken: authToken,
    urlImages: `${urlBaseApi}/storage/`,	
};
