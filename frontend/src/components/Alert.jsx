import { useSelector,useDispatch } from "react-redux";
import { closeAlert } from "../slices/AlertSlice";

const Alert = () => {
    const dispatch = useDispatch();
    const { alert } = useSelector(state=>state);

    return (
        <div className={`w-full py-2 flex justify-between items-center mb-4 px-3 rounded-lg ${alert.variant}`}>
            <h5 className={`font-bold text-sm ${alert.textVariant}`}>{alert.message}</h5>
            <button onClick={()=>dispatch(closeAlert())} className={`font-bold text-md ${alert.textVariant}`}>x</button>
        </div>
    )
}

export default Alert;