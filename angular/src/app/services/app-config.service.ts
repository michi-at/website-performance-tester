import { Injectable } from '@angular/core';

interface AppInfo {
    readonly rootPath: string;
    readonly apiPath: string;
    readonly signalRPath: string;
    readonly hubName: string;
}

@Injectable({
    providedIn: 'root'
})
export class AppConfigService {
    private config: AppInfo;

    constructor() {
        const rootPath = 'http://localhost';
        const apiPath = `${rootPath}/api`;
        const signalRPath = `${rootPath}/signalr`;
        this.config = {
            rootPath,
            apiPath,
            signalRPath,
            hubName: 'mainHub'
        };
    }

    get settings(): AppInfo {
        return this.config;
    }
}
