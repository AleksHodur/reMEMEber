import { createContext, useState, ReactNode } from "react";
import { constants } from '../constants';

type ModalContextType = {
    title: string,
    //setTitle: (title: string) => void,
    content: string,
    goButton: string,
    //setContent: (content: string) => void,
    showModal: boolean
    setShowModal: (showModal: boolean) => void,
};

const defaultValue: ModalContextType = {
    title: '',
    //setTitle: () => {},
    content: '',
    //setContent: () => {},
    showModal: false,
    goButton: '',
    setShowModal: () => {}
};

type ModalChildrenType = {
    children: ReactNode
};

export const ModalContext = createContext<ModalContextType>(defaultValue);

export const ModalContextProvider = ({ children }: ModalChildrenType) => {

    const [title, setTitle] = useState(constants.text.init.title);
    const [content, setContent] = useState(constants.text.init.content);
    const [goButton, setGoButton] = useState(constants.text.init.button);
    const [showModal, setShowModal] = useState(true);

    return (
        <ModalContext.Provider value={{ title, content, goButton, showModal, setShowModal }}>
            { children }
        </ModalContext.Provider>
    );
}