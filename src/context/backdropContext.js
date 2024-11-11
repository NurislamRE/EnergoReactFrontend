import React, { createContext, useState } from "react";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export const backdropContext = createContext({});

export const BackdropContextProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const closeBackdrop = () => {
        setOpen(false);
    };
    const openBackdrop = () => {
        setOpen(true);
    };

    return (
        <>
            <backdropContext.Provider value={{ openBackdrop, closeBackdrop }}>
                {children}
            </backdropContext.Provider>
            <div>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>
        </>

    );
}