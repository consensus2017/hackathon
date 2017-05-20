pragma solidity ^0.4.10;

contract Blackbox
{
    enum LogType {Poximity, Speeding, Indication, RedLight}

    event LogEvent(address observer, LogType, int8 Severity, string location, uint64 time, string carId);

    function logEvent(LogType eventType, int8 severity, string location, uint64 time, string carId)
    {
        if (severity < 0 || severity > 5)
        {
            throw;
        }
        
        LogEvent(msg.sender, eventType, severity, location, time, carId);
    }
}