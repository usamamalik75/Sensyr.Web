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

export interface SensorModel {
    SensorId: number;
    SensorName: string;
    MachineName: string;
    DataTypeName: string;
    MachineId: number;
    SensorTypeId: number;
    FrequencyNumber: number;
    CriticalMin: number;
    CriticalMax: number;
    WarningMin: number;
    WarningMax: number;
    DataTypeId: number;
    CustomEquation: string;
    GatewayId: number;
    PortNumber: number;
    SleepStart: string;
    SleepEnd: string;
    DigitalAlarm?: any;
    DateCreated: Date;
    DigitalLowMin?: any;
    DigitalLowMax?: any;
    DigitalHighMin?: any;
    DigitalHighMax?: any;
    DateModified?: any;
    LastModifiedBy?: any;
    CreatedBy?: any;
    SensorTemplateId?: any;
    VoltageCriticalMin?: any;
    VoltageCriticalMax?: any;
    VoltageWarningMin?: any;
    VoltageWarningMax?: any;
    LastValue: number;
}
