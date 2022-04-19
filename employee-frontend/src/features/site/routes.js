const routes = [
	{
		title: 'Employee CRM', // @TODO
		path: '/',
		componentPath: './features/site/pages/homepage/',
	},
	{
		title: 'Employees listing',
		path: '/employee/listing',
		componentPath: './features/site/pages/employee/listing/',
	},
	{
		title: 'Add an employee',
		path: '/employee/add',
		componentPath: './features/site/pages/employee/add-edit/',
	},
	{
		title: 'Update employee',
		path: '/employee/edit/:id',
		componentPath: './features/site/pages/employee/add-edit/',
	},
];

export default routes;
