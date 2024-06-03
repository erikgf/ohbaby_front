import { useContext } from 'react';
import ConfirmContext from '../context/ConfirmContext';

let resolveCallback;
export default function useConfirm() {
    const { showing, setShowing }= useContext(ConfirmContext);

    const onConfirm = () => {
        closeConfirm();
        resolveCallback(true);
    };

    const onCancel = () => {
        closeConfirm();
        resolveCallback(false);
    };

    const confirm = ({title, description}) => {
        setShowing({
            show: true,
            title, 
            description
        });

        return new Promise((res, rej) => {
            resolveCallback = res;
        });
    };

    const closeConfirm = () => {
       setShowing({
        show: false,
        title: null,
        description: null
       });
    };

    return { confirm, onConfirm, onCancel, showing };
}