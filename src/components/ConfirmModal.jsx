import { useRef, useEffect } from "react";
import Botao from "./Botao";

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
        <dialog ref={dialogRef} onClose={handleClose} className="m-auto rounded-md">
            <div className="bg-olive-300 flex flex-col space-y-3 p-6">
                <h3 className="text-3xl">{title}</h3>
                <p>{message}</p>
                <div className="flex space-x-2 justify-center">
                    <Botao className="bg-red-900" onClick={onCancel}>Cancelar</Botao>
                    <Botao className="bg-blue-900"  onClick={onConfirm}>Confirmar</Botao>
                </div>
            </div>
        </dialog>
    )
}

export default ConfirmModal;