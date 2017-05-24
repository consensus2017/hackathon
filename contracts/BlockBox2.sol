pragma solidity ^0.4.10;

contract BlockBox
{
    event LogEvent(address observer, int8 eventType, int8 Severity,
        string latitude, string longitude, uint64 time, string deviceId);

    function logEvent(int8 eventType, int8 severity,
        string latitude, string longitude, uint64 time, string deviceId)
    {
        LogEvent(msg.sender, eventType, severity, latitude, longitude, time, deviceId);
    }
}