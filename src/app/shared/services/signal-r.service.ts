import { Injectable, EventEmitter } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;
  alarmTableEvent = new EventEmitter<any>();

  constructor() {
    this.startConnection();
    this.registerEvents();
  }

  private registerEvents(): void {
    this.hubConnection.on('sendToUser', (data: any) => {
      this.alarmTableEvent.emit(data);
    });
  }

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.uri + 'NotificationHub/')
      .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));
  }

  public addTransferChartDataListener = () => {
    this.hubConnection.on('transferchartdata', (data) => {
      // this.data = data;
      console.log(data);
    });
  }

  sendToUser() {
    console.log(this.hubConnection.state);
    this.hubConnection.invoke('sendToUser');
  }

  public disconnect() {
    this.hubConnection.stop();
  }
}
