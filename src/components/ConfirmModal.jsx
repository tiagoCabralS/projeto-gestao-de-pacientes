import { useRef, useEffect } from "react";

function ConfirmModal({isOpen, title, message, onConfirm, onCancel}){
    const dialogRef = useRef(null)
    useEffect(() => {
        const dialog = dialogRef.current
        if (!dialog) return

        if (isOpen){
            dialog.showModal()
        }
        else{
            dialog.close()
        }
    }, [isOpen])

    const handleClose = () => {
        onCancel()
    }

    return (
        <dialog ref={dialogRef} onClose={handleClose} className="bg-olive-700">
            <h3>{title}</h3>
            <p>{message}</p>
            <div>
                <button onClick={onCancel}>Cancelar</button>
                <button onClick={onConfirm}>Confirmar</button>
            </div>
        </dialog>
    )
}

export default ConfirmModal;