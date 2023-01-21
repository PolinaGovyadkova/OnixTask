import { createElement } from 'lwc';
import Table from 'c/table';
import getAccounts from '@salesforce/apex/AccountController.loadAccount';

jest.mock('@salesforce/apex/AccountController.loadAccount', () => {
    const { createApexTestWireAdapter } = require('@salesforce/sfdx-lwc-jest');
    return {
        default: createApexTestWireAdapter(jest.fn())
    };
}, { virtual: true });

describe('c-table', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    /**
     * Testing the creation of search input
     */
    it('Search rest', async() => {
            const element = createElement('c-table', { is: Table });

            getAccounts.mockResolvedValue({
                //сreating initial data for the account
                Name: "Test",
                Type: "Other",
            }, );
            document.body.appendChild(element);

            await Promise.resolve();
            expect(element.shadowRoot.querySelectorAll('lightning-input').length).toBe(1);
        }
    );
    
    /**
     * Testing the creation of  table
     */
    it('Table test', async() => {
        const element = createElement('c-table', { is: Table });

        getAccounts.mockResolvedValue({
            //сreating initial data for the account
            Name: "Test",
            OwnerId: "0052w00000CeQeXAAV",
            Type: "Prospect",
            CreatedDate: "2023-01-17T22:08:16.000+0000 "
        }, );
        document.body.appendChild(element);

        await Promise.resolve();
        expect(element.shadowRoot.querySelectorAll('lightning-datatable').length).toBe(1);
    });
});