export class SensorEndPoints {
    public readonly getAlarmsEndPoint = 'GetAlarms';
    public readonly getIndividualSensorsEndPoint = 'GetIndividualSensors';
    public readonly getSensorGroupsEndPoint = 'GetSensorGroups';
    public readonly getAlarmsStatusesEndPoint = 'GetAlarmsStatuses';
    public readonly getSensorsByGroupIdEndPoint = 'GetSensorsByGroupId';
    public readonly getSensorByIdEndPoint = 'getSensorById';
    public readonly getSensorGroupSensorsPerformanceEndPoint = 'GetSensorGroupSensorsPerformance';
    public readonly deleteSensorsEndPoint = 'DeleteSensors';
}

export class DashboardEndPoints {
    public readonly getTotalMachinesGroupsSensorsEndPoint = 'GetTotalMachinesGroupsSensors';
}