/**
 * TriggerHandlerTest contains methods for 
 * testing all methods of the TriggerHandler class
 */
@isTest
public with sharing class TriggerHandlerTest {

    /**
     * Testing of task creation
     */
    @isTest
    static void TaskIsCreatedTest() {

        //raw data creation
        Account myAccount = new Account(Name = 'Anton', Type = 'Technology Partner');
        List<Task> noTasks = [SELECT Id FROM Task WHERE WhatId =: myAccount.Id];
        
        Test.startTest();
        //insert account
        AccountController.createAccount(myAccount);
        Test.stopTest();

        Account newAccount = [SELECT Id FROM Account];
        List<Task> newTasks = [SELECT WhatId, Subject, Description FROM Task];
        Task myNewTask = [SELECT WhatId, Subject, Description FROM Task LIMIT 1];
        
        //сheck for a created task
        System.assertEquals(0, noTasks.size());
        System.assertEquals(1, newTasks.size());

        System.assertEquals('A very important task', myNewTask.Subject);
        System.assertEquals('You have to pet ten cats because you are a technology partner.', myNewTask.Description);
        
    }
}