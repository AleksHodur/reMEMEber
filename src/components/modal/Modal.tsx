import { useContext } from 'react';
import './Modal.css';
import { ModalContext } from '../../context/ModalContext';

function Modal () {

    const { title, content, goButton, setShowModal } = useContext(ModalContext);

    const handleClick = () => {
        setShowModal(false);
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