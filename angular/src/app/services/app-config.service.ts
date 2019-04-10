import { Injectable } from '@angular/core';

interface AppInfo {
    readonly apiRootPath: string;
    readonly apiPath: string;
    readonly apiResultsPath: string;
    readonly apiDetails: (id: string | number) => string;
    readonly apiSignalRPath: string;
    readonly apiHubName: string;

    readonly routes: {
        readonly root: string;
        readonly results: string;
        readonly details: (id: string | number) => string;
    };
}

@Injectable({
    providedIn: 'root'
})
export class AppConfigService {
    private config: AppInfo;

    constructor() {
        const apiRootPath = 'http://localhost';
        const apiPath = `${apiRootPath}/api`;
        const apiResultsPath = `${apiPath}/results`;
        const apiDetails = (id: string | number): string => `${apiResultsPath}/${id}/details`;
        const apiSignalRPath = `${apiRootPath}/signalr`;

        const results = 'results';
        const details = (id: string | number) => `${results}/${id}/details`;

        this.config = {
            apiRootPath,
            apiPath,
            apiResultsPath,
            apiDetails,
            apiSignalRPath,
            apiHubName: 'mainHub',
            routes: {
                root: '',
                results,
                details,
            }
        };
    }

    get settings(): AppInfo {
        return this.config;
    }
}
