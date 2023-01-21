# LABORATORY EXAM

## Task
1. Complete your exam on a new Developer edition environment: https://developer.salesforce.com/signup
2. Create LWC component on the Sales App > Home page
    a. Put table inside this component, which has:
        i. Accounts with the necessary columns: Name, Type, Owner, Created Date
        ii. Search input field
        ![search](https://user-images.githubusercontent.com/79301432/213876047-0d92b89f-8e84-4ed2-a76d-0ba71a6a58d0.gif)
        iii. Lazy loading functionality
        ![lazyLoding](https://user-images.githubusercontent.com/79301432/213876051-4dd2456b-3495-4cc0-ab9a-797a7e4590a2.gif)

    b. Near the table should be a button “Create Account” that opens a modal window (pop-up)
        i. Modal window should have the following fields: Name & Type
        ii. At the footer should be two buttons: Cancel & Save, which should do the necessary actions
        ![crateAccount](https://user-images.githubusercontent.com/79301432/213875868-9c85d1a3-00ae-4fca-866e-51ee64f2f321.gif)

3. Create a Trigger on Account object using all Apex events
    a. Logic should create a Task record if Account’s Type is “Technology Partner”
    b. Set fields on a Task record on your discretion
    ![Task](https://user-images.githubusercontent.com/79301432/213875885-4c531248-0c7d-41f0-ac89-4a15eee6404a.png)

4. Write Unit tests
5. Add basic & javadoc comments in code
6. Set the IP Range on System Admin Profile: 0.0.0.0 - 255.255.255.255
![ipRange](https://user-images.githubusercontent.com/79301432/213875947-ae9b7bba-e01f-4936-a98a-70cae67c277e.PNG)
