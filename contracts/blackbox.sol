pragma solidity ^0.4.10;

contract Blackbox
{
    event LogEvent(address observer, string logType, int8 Severity, string latitude, string longitude, uint64 time, string vehicleId);

    function logEvent(string eventType, int8 severity, string latitude, string longitude, uint64 time, string vehicleId)
    {
        if (severity < 0 || severity > 5)
        {
            throw;
        }
        
        LogEvent(msg.sender, eventType, severity, latitude, longitude, time, vehicleId);
    }
}