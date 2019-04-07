import { Injectable } from '@angular/core';
import { AppConfigService } from './app-config.service';
import { fromEventPattern, Observable, Subject, ReplaySubject, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SignalRService {
    private readonly settings = this.appConfig.settings;
    private connection: SignalR.Hub.Connection;
    private mainHub: SignalR.Hub.Proxy;
    private messageEventListener;

    public onMessage: BehaviorSubject<any>;
    public onReady = new ReplaySubject();

    constructor(private appConfig: AppConfigService) {
        this.init();
    }

    init() {
        this.connection = $.hubConnection(this.settings.signalRPath, { useDefaultPath: false });
        this.mainHub = this.connection.createHubProxy(this.settings.hubName);

        this.messageEventListener = this.broadcastMessage.bind(this);
        this.mainHub.on('message', this.messageEventListener);

        this.connection.start()
                       .done(() => { console.log('Connected.'); this.onReady.next(); })
                       .fail((error) => console.log('Fail: ', error));
    }

    invoke(methodName: string, data: any) {
        this.mainHub.invoke(methodName, data);
    }

    private broadcastMessage(msg: any) {
    }
}
