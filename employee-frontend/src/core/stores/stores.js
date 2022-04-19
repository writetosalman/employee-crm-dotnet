import RootStore from './RootStore';
import EmployeeStore from './EmployeeStore';

const stores = {
    rootStore: new RootStore(),
    employeeStore: new EmployeeStore(),
};

export default stores;
