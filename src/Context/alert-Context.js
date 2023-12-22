import { createContext } from 'react';

const AlertContext = createContext({ showAlert: (type, message) => {}, alert: false, alertType: null, alertMessage: null });

export default AlertContext;
