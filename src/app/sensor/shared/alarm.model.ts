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

export interface TotalMachineSensor {
    TotalMachines: number;
    TotalSensors: number;
    TotalSensorGroups: number;
}

export interface IndividualSensorRespons {
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
    MachineId: number;
}

export interface Item {
    MachineId: number;
    MachineName: string;
    IndividualSensorResponses: IndividualSensorRespons[];
}

export interface IndividualTableModel {
    Items: Item[];
}
