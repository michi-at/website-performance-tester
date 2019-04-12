import { Injectable } from '@angular/core';
import { AppConfigService } from './app-config.service';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SignalRService {
    private readonly settings = this.appConfig.settings;
    private connection: SignalR.Hub.Connection;
    private mainHub: SignalR.Hub.Proxy;
    private messageEventListener;

    private broadcastSource = new Subject<any>();
    onResultMessage$ = this.broadcastSource.asObservable();

    constructor(private appConfig: AppConfigService) {
        this.init();
    }

    init() {
        this.connection = $.hubConnection(this.settings.apiSignalRPath, { useDefaultPath: false });
        this.mainHub = this.connection.createHubProxy(this.settings.apiHubName);

        this.messageEventListener = this.broadcastMessage.bind(this);
        this.mainHub.on('message', this.messageEventListener);

        this.connection.start()
            .done(() => { console.log('Connected.'); })
            .fail((error) => console.log('Fail: ', error));
    }

    invoke(methodName: string, data: any) {
        this.mainHub.invoke(methodName, data);
    }

    private broadcastMessage(msg: any) {
        this.broadcastSource.next(msg);
    }
}
