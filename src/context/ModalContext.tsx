import { createContext, useState, ReactNode, useReducer } from "react";
import { constants } from '../constants';

type ModalContextType = {
    modalTitle: string,
    modalContent: string,
    goButton: string | null,
    newGameButton: string | null,
    showModal: boolean,
    dispatch: React.Dispatch<ModalAction>
};

type ModalStateType = {
    modalTitle: string,
    modalContent: string,
    goButton: string | null,
    newGameButton: string | null,
    showModal: boolean
}

type ModalAction = {
    type: 'WELCOME_PAGE' | 'WIN_MESSAGE' | 'CLOSE_MODAL',
    payload: any
}

type ModalChildrenType = {
    children: ReactNode
};

const defaultValue: ModalContextType = {
    modalTitle: '',
    modalContent: '',
    goButton: '',
    newGameButton: null,
    showModal: false,
    dispatch: () => {}
};


const initialState: ModalStateType = {
    modalTitle: constants.text.init.title,
    modalContent: constants.text.init.content,
    goButton: constants.text.init.button,
    newGameButton: null,
    showModal: true,
} 

const modalReducer = (state: ModalStateType, action: ModalAction): ModalStateType => {
    switch(action.type) {

        case 'WELCOME_PAGE':
            return {
                modalTitle: constants.text.init.title,
                modalContent: constants.text.init.content,
                goButton: constants.text.init.button,
                newGameButton: null,
                showModal: true
            }

        case 'WIN_MESSAGE':
            return {
                modalTitle: constants.text.win.title,
                modalContent: constants.text.win.content,
                goButton: null,
                newGameButton: constants.text.win.button,
                showModal: true
            }

        case 'CLOSE_MODAL':
            return {
                ...state,
                showModal: false
            }

        default:
            return state;
    }

}

export const ModalContext = createContext<ModalContextType>(defaultValue);

export const ModalContextProvider = ({ children }: ModalChildrenType) => {

    const [state, dispatch] = useReducer(modalReducer, initialState);

    return (
        <ModalContext.Provider value={{ ...state, dispatch }}>
            { children }
        </ModalContext.Provider>
    );
}