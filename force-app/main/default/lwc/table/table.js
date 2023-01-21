/* eslint-disable @lwc/lwc/no-api-reassignments */
import { LightningElement, api } from 'lwc';
import loadAccount from '@salesforce/apex/AccountController.loadAccount';
import searchData from '@salesforce/apex/AccountController.searchData';

/**
 * Columns for the account table
 */
const columns = [{
    label: "Name",
    fieldName: 'Name'
}, {
    label: "Type",
    fieldName: 'Type'
}, {
    label: "Owner",
    fieldName: 'OwnerId'
}, {
    label: "Created Date",
    fieldName: 'CreatedDate',
    type: 'date'
}];

/**
 * Table implements methods responsible for loading
 * and searching data in the table
 */
export default class Table extends LightningElement {

    @api enableInfiniteLoading;

    columns = columns;
    rows = [];
    //limit of the number of records displayed
    rowLimit = 10;
    rowOffSet = 0;
    error;
    searchValue;

    /**
     * Loads raw data
     */
    connectedCallback() {
            this.enableInfiniteLoading = true;
            this.loadData();
        }
        
    /**
     * To load more record from Apex base on offset
     */
    loadData() {
            return loadAccount({ limitSize: this.rowLimit, offset: this.rowOffSet })
                .then(
                    res => {
                        const updatedRecords = [...this.rows, ...res];
                        this.rows = updatedRecords;
                        this.error = undefined;
                    }
                )
                .catch(error => {
                    this.error = error;
                    this.rows = undefined;
                });
        }

    /**
     * The onloadmore event handler retrieves more data when you scroll 
     * to the bottom of the table until there are no more data to load
     */
    loadMoreData() {
            this.enableInfiniteLoading = false;
            this.rowOffSet = this.rowOffSet + this.rowLimit
            this.loadData().then(() => {
                    if (this.rows.length >= this.rowLimit) {
                        this.enableInfiniteLoading = true;
                    }
                });
        }

    /**
     * Searches for data entered by the user
     */
    handleSearch(event) {
            this.searchValue = event.target.value;
            this.ImperativeCall();
        }

    /**
     * Search data from the Apex base 
     */
    ImperativeCall() {
            searchData({ inputData: this.searchValue })
                .then((result) => {
                    this.rows = result;
                })
                .catch(error => {
                    this.error = error;
                    this.rows = undefined;
                });
        }

    /**
     * Hрandle pop-up event
     */
    handlePopupEvent() {
        this.template.querySelector('c-pop-up-window');
    }
}