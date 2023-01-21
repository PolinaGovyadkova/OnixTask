/**
 *  AccountTrigger enable you to perform custom actions
 */
trigger AccountTrigger on Account (before insert, before update, before delete, after insert, after update, after delete, after undelete) 
{
    TriggerHandler.taskTrigger(Trigger.new);
}