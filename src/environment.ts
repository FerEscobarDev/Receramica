
const esDesarrollo: boolean = location.hostname === 'localhost' || location.hostname === '127.0.0.1';

const urlBaseApi: string = esDesarrollo ? 'http://localhost' : 'https://ricardo-admin.receramica.com';

const authToken: string = esDesarrollo ? `Bearer YKgCrV95nc1AOL66hYUzWBSyC3YhVhU8SwLTm13A3b0eaf5e` : 'Bearer ojstPtWPNm7nguTDiyqSY7dMopSQOlLB6GvgPSCf087d6484';



export default {
    prod: !esDesarrollo,
    urlBaseApi: urlBaseApi,
    authToken: authToken,
    urlImages: `${urlBaseApi}/storage/`,	
};
