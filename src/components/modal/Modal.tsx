import { useContext } from 'react';
import './Modal.css';
import { ModalContext } from '../../context/ModalContext';

type ModalProps = {
    newGame: Function
}

function Modal ({ newGame }: ModalProps) {

    const { modalTitle: title, modalContent: content, goButton, newGameButton, dispatch } = useContext(ModalContext);

    const handleClose = () => {
        dispatch({ type: 'CLOSE_MODAL', payload: null });
    }

    const handleNewGame = () => {
        newGame();
        handleClose();
    }

    return ( 
        <>
        <div className="behind-modal"></div>
        <div className="modal">
            <h2>{ title }</h2>
            <p>{ content }</p>
            <button className='x-button' onClick={ handleClose }>X</button>


            <div className="button-panel">
                { newGameButton !== null && (
                    <button className='option-button' onClick={ handleNewGame }>{ newGameButton }</button>
                ) }

                { goButton !== null && (
                    <button className={ newGameButton === null ? 'option-button' : 'option-button only-portrait' }
                    onClick={ handleClose }
                    >{ goButton }</button>
                )}

            </div>
            
        </div>
        </>
    );
}

export default Modal;