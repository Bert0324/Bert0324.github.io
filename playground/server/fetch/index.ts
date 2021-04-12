import { InitObj } from "../type.d";

export default {
    useRequest: (req, res) => {
        console.log(req.url);
    }
} as InitObj;