import { LightningElement, api, track, wire } from 'lwc';
import TYPE_FIELD from '@salesforce/schema/Account.Type';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import loadAccount from '@salesforce/apex/AccountController.loadAccount';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';

/**
 * PopUpWindow implements the functionality of a pop-up window with such fields as the name 
 * and type of the account, as well as the generation of an event when buttons are pressed
 */
export default class popUpWindow extends LightningElement {

    @track rows = [];
    //boolean tracked variable to indicate if modal is open or not
    @track isOpen = false;
    @api recordId;
    @api objectApiName = "Account";
    //model window fields
    fields = [NAME_FIELD, TYPE_FIELD];

    //wired Apex result so it can be refreshed programmatically
    wiredResult;

    /**
     * Receives the stream of data from the wire service
     * The results are returned in an object with a data/rows property and an error property
     */
    @wire(loadAccount)
    wireData(result) {
            this.wiredResult = result;
            if (result.rows) {
                for (let i = 0; i < result.rows.length; i++) {
                    let obj = {};
                    obj.Id = result.rows[i].Id;
                    obj.NAME_FIELD = result.rows[i].Name;
                    obj.TYPE_FIELD = result.rows[i].Type;
                    this.rows = [...this.rows, obj];
                }
            }
        }
    /**
     * Displaying data providing feedback to the user after closing the pop-up window
     */
    handleClose(event) {
            event.preventDefault();
            const evt = new ShowToastEvent({ title: 'Account not created', variant: 'error' });
            this.dispatchEvent(evt);
            this.isOpen = false;
        }

    /**
     * Displaying data providing feedback to the  the user after saving the data mentioned in the pop-up window
     */
    handleSubmit() {
            const evt = new ShowToastEvent({ title: 'Account created', variant: 'success' });
            this.dispatchEvent(evt);
            this.isOpen = false;
            // in order to refresh data
            return refreshApex(this.wiredResult);
        }
    /**
     * Details for modal window
     */
    submitDetails() {
        // to open modal set isOpen tarck value as true
        this.isOpen = true;
    }
}