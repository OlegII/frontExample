export const validate = values => {
    const errors = {};
    if (values && !values.email) {
        errors.email = 'Requared'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values && values.email)) {
        errors.email = 'Invalid email address'
    }
    if (values && !values.password) {
        errors.password = 'Requared'
    } else if (values && values.password.length < 6) {
        errors.password = 'Must be 7 characters or more';
    }
    if (values && !values.firstName) {
        errors.firstName = 'Requared'
    }
    if (values && !values.lastName) {
        errors.lastName = 'Requared'
    }

    return errors
};


