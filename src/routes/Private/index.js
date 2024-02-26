import { UserContext} from "../../contexts/auth";
import { useContext} from "react";
import { Navigate } from 'react-router-dom'

export default function Private({childen}){

    const {islogado} = useContext(UserContext)

    if(!islogado){
        return <Navigate to="/"/>
    }

    return childen;
}

