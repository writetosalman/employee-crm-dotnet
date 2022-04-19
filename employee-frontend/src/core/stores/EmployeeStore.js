import { getFormattedPrice, getArrayElementByKey, getLevelOfCoverFromStar, convertGWDateForStore } from '../../utils';
/**
 * Quotation Store
 */
class EmployeeStore {
    constructor() {
        this.testData = {
            preliminaryInfo: {
                animalType: 'bull',
                state: 'AU_NSW',
                email: 's@s.com',
                purchasePrice: '20000',
                selectedPremiumType: {
                    animalType: 'bull',
                    basePrice: '$1,800.00',
                    gst: '$180.00',
                    index: 1,
                    month: '12 Months',
                    policyTerm: 12,
                    percentage: 9,
                    premium: '$1,980.00',
                    purchasePrice: '20000',
                    stampDuty: '$0.00',
                    starIndex: 2,
                },
            },
            entities: [
                {
                    id: 0,
                    abnAcn: '26008672179',
                    email: 's@s.com',
                    address: {
                        addressLine1: '321 Kent Street',
                        city: 'SYDNEY',
                        fullAddress: '321 Kent Street, SYDNEY NSW 2000',
                        postCode: '2000',
                        state: 'AU_NSW',
                    },
                    companyName: null,
                    entityType: 'Individual',
                    firstName: 'Salman',
                    isGSTRegistered: '',
                    lastName: 'Ahmed',
                    phoneNumber: '0431724000',
                    role: 'Account Holder',
                },
                {
                    id: 1,
                    abnAcn: '008672179',
                    email: 's2@s.com',
                    address: {
                        addressLine1: '321 Kent Street',
                        city: 'SYDNEY',
                        fullAddress: 'Level 1, 321 Kent Street, SYDNEY NSW 2000',
                        postCode: '2000',
                        state: 'NSW',
                        unit: 'Level 1',
                    },
                    companyName: 'Tenzing Ltd.',
                    entityType: 'Company',
                    firstName: undefined,
                    isGSTRegistered: 'YES',
                    lastName: undefined,
                    phoneNumber: '0431700000',
                    role: 'AdditionalInsurer',
                }
            ],
            animals: [
                {
                    animalDOB: '2022-01-20',
                    animalName: 'Animal 1',
                    animalType: 'bull',
                    animalSubType: 'belmont_red',
                    lotNumber: '11',
                    policyTerm: '12',
                    purchasePrice: '20000',
                    rfid: '112233',
                    saleDate: '2022-01-10',
                    saleName: 'Sale 1',
                    starCover: '2',
                    isGSTRegistered: '',
                },
                {
                    animalDOB: '2022-01-20',
                    animalName: 'Animal 2',
                    animalType: 'bull',
                    animalSubType: 'angus',
                    lotNumber: '11',
                    policyTerm: '12',
                    purchasePrice: '20000',
                    rfid: '112233',
                    saleDate: '2022-01-10',
                    saleName: 'Sale 1',
                    starCover: '3',
                    isGSTRegistered: '',
                },
            ],
            quoteId: null,
            sessionUUID: null,
        };
        this.blankData = {
            preliminaryInfo: {
                email: null,
                selectedPremiumType: {},
            },
            entities: [],
            animals: [],
            quoteId: null,
            sessionUUID: null,
        };
        this.quotation = this.blankData; //this.testData
        this.quotedPremiumTypes = {};
        this.guidewireQuote = {};

        // Hard coded premium percentage
        this.PREMIUM_PERCENTAGES_RAM = [
            [2, 3, 4],      // 3 Months
            [3, 6, 7],      // 6 Months
            [5, 9, 10],     // 12 Months
        ];
        this.PREMIUM_PERCENTAGES_BULL = [
            [2, 3, 4],      // 3 Months
            [3, 6, 7],      // 6 Months
            [5, 9, 10],     // 12 Months
        ];

        this.states = [
            { id: 'AU_ACT', name: 'A.C.T.', rate: 0 },
            { id: 'AU_NSW', name: 'New South Wales', rate: 0 },
            { id: 'AU_NT', name: 'Northern Territory', rate: 0 },
            { id: 'AU_QLD', name: 'Queensland', rate: 0.09 },
            { id: 'AU_SA', name: 'South Australia', rate: 0.11 },
            { id: 'AU_TAS', name: 'Tasmania', rate: 0.1 },
            { id: 'AU_VIC', name: 'Victoria', rate: 0 },
            { id: 'AU_WA', name: 'Western Australia', rate: 0.1 },
        ];
        this.animalSubTypes = {
            bull: [
                { id: 'beef_breed', name: 'Beef Breed'},
                { id: 'angus', name: 'Angus'},
                { id: 'angus_x', name: 'Angus X'},
                { id: 'belmont_red', name: 'Belmont Red'},
                { id: 'belted_galloway', name: 'Belted Galloway'},
                { id: 'blonde_dd_aquitaine', name: 'Blonde dd\'Aquitaine'},
                { id: 'braford', name: 'Braford'},
                { id: 'brahman', name: 'Brahman'},
                { id: 'brangus', name: 'Brangus'},
                { id: 'charbray', name: 'Charbray'},
                { id: 'charolais', name: 'Charolais'},
                { id: 'droughmaster', name: 'Droughmaster'},
                { id: 'greyman', name: 'Greyman'},
                { id: 'hereford', name: 'Hereford (including poll)'},
                { id: 'lowline', name: 'Lowline'},
                { id: 'murray_grey', name: 'Murray Grey'},
                { id: 'red_angus', name: 'Red Angus'},
                { id: 'red_poll', name: 'Red Poll'},
                { id: 'santa_gertrudis', name: 'Santa Gertrudis'},
                { id: 'shorthorn', name: 'Shorthorn (including poll)'},
                { id: 'simmental', name: 'Simmental'},
                { id: 'other', name: 'Other'},
            ],
            ram: [
                { id: 'merino', name: 'Merino'},
                { id: 'poll_dorset', name: 'Poll Dorset'},
                { id: 'border_leicester', name: 'Border Leicester'},
                { id: 'suffolk', name: 'Suffolk'},
                { id: 'dohne', name: 'Dohne'},
                { id: 'dorper', name: 'Dorper'},
                { id: 'other', name: 'Other'},
            ],
        };
    }

    /**
     * Set step 1 in store
     * @param animalType
     * @param purchasePrice
     * @param email
     * @param state
     */
    setStep1({ animalType, purchasePrice, email, state }) {
        this.quotation.preliminaryInfo = {
            animalType: animalType,
            state: state,
            email: email,
            purchasePrice: purchasePrice,
            selectedPremiumType: {},
        };
    }

    /**
     * This function returns all premium types
     * @return array
     */
    getQuotedPremiumTypes() {
        const { animalType, purchasePrice, state } = this.quotation.preliminaryInfo;
        const premiumPercentages = animalType?.search(/bull/gi) > 0 ? this.PREMIUM_PERCENTAGES_BULL:this.PREMIUM_PERCENTAGES_RAM;
        const retArr = [];
        if ( !purchasePrice ) return retArr;

        // Months loop
        for (let index1=0; index1 < premiumPercentages.length; index1++){
            const monArr = [];

            // 3 / 6 / 12 Month calculations
            for (let index2=0; index2 < premiumPercentages[index1].length; index2++){
                const percentage= premiumPercentages[index1][index2];
                let basePrice = purchasePrice *  percentage / 100;
                if ( basePrice < 100 ) basePrice = 100;
                const stampDuty = this._getStampDuty(basePrice);
                const gst       = (basePrice + stampDuty) * 0.1;
                const premium   = basePrice + stampDuty + gst;

                // push all calculations in array
                monArr.push({
                    state: state,
                    premium: getFormattedPrice(premium),
                    month: index1 === 0 ? '3 Months' : index1 === 1 ? '6 Months':'12 Months',
                    policyTerm: index1 === 0 ? 3 : index1 === 1 ? 6:12,
                    percentage: percentage,
                    basePrice: getFormattedPrice(basePrice),
                    gst: getFormattedPrice(gst),
                    stampDuty: getFormattedPrice(stampDuty),
                    purchasePrice: purchasePrice,
                    animalType: animalType,
                });
            }

            retArr.push(monArr);
        }
        this.quotedPremiumTypes = retArr;
        return this.quotedPremiumTypes;
    }

    /**
     * Set selected premium in store
     * @param premiumType
     */
    setSelectedPremiumType(premiumType) {
        this.quotation.preliminaryInfo.selectedPremiumType = premiumType;
    }

    /**
     * Get selected premium in store
     */
    getSelectedPremiumType() {
        return this.quotation.preliminaryInfo.selectedPremiumType;
    }

    /**
     * Set entities in the store
     * @param arr
     */
    setEntities = arr => {
        this.quotation.entities = arr;
    }

    /**
     * Get entities from the store
     * @return arr
     */
    getEntities = () => {
        return this.quotation.entities;
    }

    /**
     * Get true or false if one entity is primary
     * @return boolean
     */
    isOneEntityPrimary = () => {
        const entities = this.quotation.entities;
        for (let index=0; index < entities.length; index++) {
            if ( entities[index].role === 'Account Holder' ) {
                return true;
            }
        }
        return false;
    }

    /**
     * Set animals in the store
     * @param arr
     */
    setAnimals = arr => {
        this.quotation.animals = arr;
    }

    /**
     * Get animals from the store
     * @return arr
     */
    getAnimals = () => {
        return this.quotation.animals;
    }

    /**
     * Get Session UUID from the store
     * @return arr
     */
    getSessionUUID = () => {
        return this.quotation.sessionUUID;
    }

    /**
     * Set Session UUID in the store
     */
    setSessionUUID = ({sessionUUID}) => {
        this.quotation.sessionUUID = sessionUUID;
    }

    /**
     * Get quotation id from the store
     * @return arr
     */
    getQuoteId = () => {
        return this.quotation.quoteId;
    };

    /**
     * Set quotation id in the store
     */
    setQuoteId = ({quoteId}) => {
        this.quotation.quoteId = quoteId;
    }

    /**
     * Set quotation id and Session UUID in the store
     */
    setQuoteSessionId = ({quoteId, sessionUUID}) => {
        this.quotation.quoteId = quoteId;
        this.quotation.sessionUUID = sessionUUID;
    }

    /**
     * Get states
     * @returns []
     */
    getStates() {
        return this.states;
    }

    /**
     * This function returns animal sub types
     * @param $animalType
     * @returns array
     */
    getAnimalSubTypes($animalType) {
        if ( $animalType === 'bull' )
            return this.animalSubTypes.bull;

        if ( $animalType === 'ram' )
            return this.animalSubTypes.ram;

        return [];
    }

    /**
     * Set quotation
     * @param q
     */
    setQuotation(q) {
        this.quotation = q;
    }

    /**
     * Get quotation
     * @returns {{}}
     */
    getQuotation() {
        return this.quotation;
    }

    /**
     * Get guidewire quotation
     * @returns {{}}
     */
    getGuidewireQuote() {
        return this.guidewireQuote;
    }

    /**
     * Set guidewire quotation
     * @param quote
     */
    setGuidewireQuote(quote) {
        this.guidewireQuote = quote;
    }

    /**
     * Reset session
     */
    resetQuotation() {
        this.quotation = {
            preliminaryInfo: {
                email: null,
                selectedPremiumType: {},
            },
            entities: [],
            animals: [],
            quoteId: null,
            sessionUUID: null,
        };
    }

    /**
     * This converts data from endpoint to store
     */
    convertAndSetQuotation(quotation) {
        const quoteId = quotation?.quoteID;
        const sessionUUID = quotation?.sessionUUID;
        const tmpAnimals = quotation?.lobData?.inx_StudStock?.coverables;
        const primaryEntity = quotation?.baseData?.accountHolder;
        const additionalEntities = quotation?.baseData?.accountContacts;
        const periodStartDate = quotation?.baseData?.periodStartDate;
        const quoteData = quotation?.quoteData?.offeredQuotes[0]?.premium;

        // Data to load
        const quote = {
            preliminaryInfo: {
                email: null,
                selectedPremiumType: {},
            },
            quoteId,
            sessionUUID,
            animals: [],
            entities: [],
        };

        if ( tmpAnimals && tmpAnimals.length > 0 ) {
            quote.animals = tmpAnimals.map ( animal => {
                return {
                    animalType: animal.studStockType,
                    animalSubType: animal.studStockSubtype,
                    animalDOB: convertGWDateForStore(animal.animalDateOfBirth),
                    animalName: animal.description,
                    lotNumber: animal.lotNumber,
                    policyTerm: quoteData?.termMonths,
                    purchasePrice: animal.insuredSum,
                    rfid: animal.rfid,
                    saleDate: convertGWDateForStore(periodStartDate),
                    saleName: animal.nameOfSale,
                    starCover: getLevelOfCoverFromStar(animal.levelOfCover),
                    isGSTRegistered: animal.inx_GSTStatus.toUpperCase(),
                }
            });
        }

        if ( quoteData ) {
            quote.preliminaryInfo.selectedPremiumType = {
                starIndex: parseInt(quote.animals[0]?.starCover, 10),
                animalType: quote.animals[0]?.animalType,
                gst: getFormattedPrice(quoteData.taxes?.amount),
                stampDuty: getFormattedPrice(quoteData.stampDuty?.amount), // FIXME
                basePrice: getFormattedPrice(quoteData.totalBeforeTaxes?.amount),
                premium: getFormattedPrice(quoteData.total?.amount),
                monthlyPremium: getFormattedPrice(quoteData.monthlyPremium?.amount),
                policyTerm: quoteData.termMonths,
            };
        }

        if ( primaryEntity ) {
            quote.entities[0] = this.covertFromGWEntityObject(primaryEntity, 0, 'Account Holder');
            quote.preliminaryInfo.email = primaryEntity.emailAddress1;
        }

        if ( additionalEntities && additionalEntities.length > 0 ) {
            const entities = additionalEntities.map ( (entity, index) => {
                return this.covertFromGWEntityObject(entity, (index+1), 'AdditionalInsurer');
            });
            quote.entities.push(...entities);
        }
        return quote;
    }

    /**
     * This function converts entity from guidewire to store
     * @param entity
     * @param index
     * @param roleType
     * @returns object
     * @private
     */
    covertFromGWEntityObject(entity, index, roleType='AdditionalInsurer') {
        return {
            id: index,
            role: roleType,
            entityType: entity.subtype === 'Person' ? 'Individual':'Company',
            companyName: entity.displayName,
            firstName: entity.firstName,
            lastName: entity.lastName,
            email: entity.emailAddress1,
            phoneNumber: entity.primaryPhoneType === 'work' ? entity.workNumber:entity.cellNumber,
            abnAcn: entity.abnAcn,
            isGSTRegistered: entity.inx_GSTStatus.toUpperCase(),
            publicID: entity.publicID,
            address: {
                publicID: entity.primaryAddress?.publicID,
                addressLine1: entity.primaryAddress?.addressLine1,
                city: entity.primaryAddress?.city,
                fullAddress: entity.primaryAddress?.addressLine1,
                postCode: entity.primaryAddress?.postalCode,
                state: entity.primaryAddress?.state?.replace('AU_', ''),
                country: entity.primaryAddress?.country,
            },
        };
    }

    /**
     * This function returns stamp duty based on state
     * @param price
     * @private
     */
    _getStampDuty = price => {
        const match = getArrayElementByKey(this.states, this.quotation.preliminaryInfo.state);
        return price * match.rate;
    };
}

export default EmployeeStore;
