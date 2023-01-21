/**
 * AccountControllerTest contains methods for testing 
 * all methods of the AccountController class
 */
@isTest
public with sharing class AccountControllerTest {
    /**
     * Data preparation for testing
     */
    @TestSetup
    static void createData(){
        //insert accounts
        List<Account> addAccount = new List<Account>();
        Integer i;
        for (i = 0; i < 10; i++) 
        {
            //create 9 test accounts
            Account acct = new Account();
            if (i < 9) 
            {
                acct.Name = 'Test' + (i + 1);
                acct.Type = 'Other';
            //create one account with a special name to check the search 
            } 
            else 
            {
                acct.Name = 'Anton'  + (i + 1);
                acct.Type = 'Technology Partner';
            }
         AccountController.createAccount(acct);
        }
    }

    /**
     * Testing of account creation.
     */
    @isTest
    static void insertAccountTest() {
        //sample of accounts
        List<Account> accounts = [
            SELECT Id 
            FROM Account
        ];
        Test.StartTest();
        //verifying equality of the required 
        //quantity of accounts with the received quantity of accounts
        System.assertEquals(10, accounts.size());
        Test.StopTest();
    }

    /**
     * Testing the data search engine among accounts
     */
    @isTest
    static void searchAccountTest() {

        Test.StartTest();
        System.assertEquals(1, AccountController.searchData('Anton').size());
        Test.StopTest();
    }

    /**
     * Testing lazy loading of accounts
     */
    @isTest
     private static void lazyLoadingTest() {

        Test.startTest();
        //gets the total number of accounts
        Integer count = AccountController.totalCount();
        System.assertEquals(count,10);
        //gets the loaded accounts
        List<Account> accList =  AccountController.loadAccount(5, 0);
        System.assertEquals(accList.size(), 5);
        Test.stopTest();
    }
}