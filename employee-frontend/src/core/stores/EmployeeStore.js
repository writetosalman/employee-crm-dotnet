import { getFormattedPrice, getArrayElementByKey, getLevelOfCoverFromStar, convertGWDateForStore } from '../../utils';
/**
 * Employee Store
 */
class EmployeeStore {
    constructor() {
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
    }

    /**
     * Get states
     * @returns []
     */
    getStates() {
        return this.states;
    }
}

export default EmployeeStore;
