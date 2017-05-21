pragma solidity ^0.4.10;

contract Blockbox
{
    event LogEvent(address observer, string EventType, uint Severity, string location, uint time, string carId);
    event TestEvent(address observer);

    function logEvent(string eventType, uint severity, string location, uint time, string carId)
    {
        if (severity < 0 || severity > 5)
        {
            throw;
        }

        LogEvent(msg.sender, eventType, severity, location, time, carId);
    }

    function testEvent()
    {
        TestEvent(msg.sender);
    }
}
