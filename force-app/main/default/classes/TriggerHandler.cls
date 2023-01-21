/**
 * TriggerHandler is responsible for the 
 * implementation of trigger functionality
 */
public with sharing class TriggerHandler {

    /**
     * Adding a trigger in the form of a
     * task to the account of the corresponding type
     * @param accounts - total list of accounts
     * @exception {AuraHandledException} - if the insertion fails, an exception is generated
     */
    public static void taskTrigger(List<Account> accounts) {

        //required type of account to add a task
        String requiredType = 'Technology Partner';
        List<Task> taskList = new List<Task>();

        for (Account account : accounts) 
        {
            if (Trigger.isExecuting && Trigger.isAfter && Trigger.isInsert) 
            {
                if (account.Type == requiredType) 
                //sets values for the record fields
                taskList.add(new Task(  WhatId = account.Id, OwnerId = account.OwnerId, Priority = 'High', Status = 'Not Started', Subject = 'A very important task', Description = 'You have to pet ten cats because you are a technology partner.' ));
            }
        }

        //check for taks in the list
        if (!taskList.isEmpty()) {
            try 
            {
                insert taskList;
            } 
            catch (Exception e) 
            {
                throw new AuraHandledException(e.getMessage());
            }
        }
    }
}