import { environment } from '../../../environments/environment';

export const APP_CONFIG = {
    apiBaseUrl: environment.apiBaseUrl,
    signalRUrl: environment.signalRUrl,
    sensyrUser: environment.sensyrUser,
    sortQueryParam: 'sort',
    sortRequestParam: 'sort',
};
