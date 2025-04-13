import { useContext } from 'react';
import './Modal.css';
import { ModalContext } from '../../context/ModalContext';

function Modal () {

    const { modalTitle: title, modalContent: content, modalButton: goButton, dispatch } = useContext(ModalContext);

    const handleClick = () => {
        dispatch({ type: 'CLOSE_MODAL', payload: null });
    }

    return ( 
        <>
        <div className="behind-modal"></div>
        <div className="modal">
            <h2>{ title }</h2>
            <p>{ content }</p>
            <button className='x-button' onClick={ handleClick }>X</button>
            <button className='option-button' onClick={ handleClick }>{ goButton }</button>
        </div>
        </>
    );
}

export default Modal;