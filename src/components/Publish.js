import {getCurrentUser, logout} from "../utils/auth";
import fetch from 'cross-fetch';

export const Publish = async (state) => {
    const {token} = getCurrentUser()
    const body = new URLSearchParams({
        data: state.data
    })
    body.append("topic", state.topic)
    const opt = {method: "POST", body};
    opt.headers = {Authorization: `Bearer ${token}`};
    try {
        await fetch('https://localhost/.well-known/mercure', opt)
            .then(data => {
                if(data.status === 401) {
                    logout()
                }
                console.log(data)
            });
    } catch (e) {
        console.log(e);
    }
}