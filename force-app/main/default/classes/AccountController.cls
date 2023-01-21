/**
 * AccountController is responsible for such user accounts` functioning
 * as lazy loading, account creation process and searching for data
 */
public with sharing class AccountController {

    /**
     * Lazy loading method
     * @param limitSize - limit of the number of records displayed
     * @param offset - to load more offsets
     * @return  `List<Account>`- list of accounts received
     * @exception {AuraHandledException} - if an error occurs during data extraction, an exception is generated
     */
    @AuraEnabled
    public static List<Account> loadAccount(Integer limitSize, Integer offset) {
       try
       {
        return [SELECT Name, Type, OwnerId, CreatedDate 
                FROM Account 
                WITH SECURITY_ENFORCED 
                ORDER BY Name LIMIT :limitSize OFFSET :offset];
       }
       catch (Exception e) 
       {
           throw new AuraHandledException(e.getMessage());
       } 
    }

    /**
     * Сalculates the total number of accounts 
     * @return  `Integer` - total number of accounts
     */
    @AuraEnabled 
    public static Integer totalCount() {
        return [SELECT count() FROM Account];
    }
    /**
     * Searches for data by input parameter.
     * @param inputData - key for data retrieval
     * @return `List<Account>` - accounts that contain key data 
     * @exception {AuraHandledException} if an error occurs during data extraction, an exception is generated
     */
    @AuraEnabled
    public static List<Account> searchData( String inputData ){
       try
       {
        String name = '%'+ inputData +'%';
        return [SELECT Name, Type, OwnerId, CreatedDate 
                FROM Account 
                WHERE Name LIKE: name
                ORDER BY Name];
       }
        catch (Exception e) 
        {
            throw new AuraHandledException(e.getMessage());
        } 
    }
    /**
     * This method takes account parameter and makes a new Account. 
     * @param account - stores the data on the basis of which the new account will be created
     * @return  `Account` - if insert succeeds, it will return that account object
     * @exception {AuraHandledException} - if the insertion fails, an exception is generated
     */
    @AuraEnabled(cacheable=true)
    public static Account createAccount( Account account ){
        try 
        {
            insert account;
            return account;
        } 
        catch (Exception e) 
        {
            throw new AuraHandledException(e.getMessage());
        } 
    }
}