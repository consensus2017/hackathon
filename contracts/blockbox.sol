pragma solidity ^0.4.10;

contract Blockbox
{
    event LogEvent(address observer, string EventType, uint Severity, uint Speed, string location, uint time, string carId);
    event TestEvent(address observer);

    function logEvent(string eventType, uint severity, uint speed, string location, uint time, string carId)
    {
        if (severity < 0 || severity > 5)
        {
            throw;
        }

        LogEvent(msg.sender, eventType, severity, speed, location, time, carId);
    }

    function testEvent()
    {
        TestEvent(msg.sender);
    }
}
