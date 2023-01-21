import { createElement } from 'lwc';
import PopUpWindow from 'c/popUpWindow';
import createAcc from '@salesforce/apex/AccountController.createAccount';

jest.mock('@salesforce/apex/AccountController.createAccount', () => {
    const {
        createApexTestWireAdapter
    } = require('@salesforce/sfdx-lwc-jest');
    return {
        default: createApexTestWireAdapter(jest.fn())
    };
}, { virtual: true });

describe('c-pop-up-window', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    /**
     * Testing the creation of  pop-up window
     */
    it('Pop-up window test', async() => {
        const element = createElement('c-pop-up-window', {
            is: PopUpWindow
        });

        createAcc.mockResolvedValue({ Name: "Anton", Type: "Other" });
        document.body.appendChild(element);

        await Promise.resolve();
        expect(element.shadowRoot.querySelectorAll('lightning-button').length).toBe(1);
    });
});