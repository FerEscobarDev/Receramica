
const esDesarrollo: boolean = location.hostname === 'localhost' || location.hostname === '127.0.0.1';

const urlBaseApi: string = esDesarrollo ? 'http://localhost' : 'https://receramica.com';

const authToken: string = esDesarrollo ? `Bearer YKgCrV95nc1AOL66hYUzWBSyC3YhVhU8SwLTm13A3b0eaf5e` : 'Bearer YKgCrV95nc1AOL66hYUzWBSyC3YhVhU8SwLTm13A3b0eaf5e';



export default {
    prod: !esDesarrollo,
    urlBaseApi: urlBaseApi,
    authToken: authToken,
    urlImages: `${urlBaseApi}/storage/`,	
};
