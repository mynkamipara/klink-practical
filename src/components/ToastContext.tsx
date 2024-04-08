import React, { createContext, useContext } from 'react';

import { ToastContainer, toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type ToastFunction = (message: string, options?: ToastOptions) => void;

interface ToastContextType {
    showError: ToastFunction;
    showSuccess: ToastFunction;
}


export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export const ToastProvider = ({ children }: any) => {
    const showError: ToastFunction = (message, options) => toast.error(message, { ...options, position: "bottom-right", });
    const showSuccess: ToastFunction = (message, options) => toast.success(message, { ...options, position: "bottom-right", });

    const contextValue: ToastContextType = {
        showError,
        showSuccess,
    };

    return (
        <ToastContext.Provider value={contextValue}>
            <ToastContainer />
            {children}
        </ToastContext.Provider>
    );
};