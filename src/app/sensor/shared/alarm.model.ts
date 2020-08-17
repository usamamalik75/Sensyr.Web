export interface AlarmModel {
    SensorId: number;
    Voltage: number;
    LiveValue: number;
    SensorStatusId: number;
    SensorStatusName: string;
    DateTime: Date;
    Avg?: any;
    DayMin: number;
    DayMax: number;
    TimeElapsed: number;
    SensorName: string;
    SensorTypeName: string;
    MachineName: string;
}
