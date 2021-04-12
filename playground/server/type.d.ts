import { IncomingMessage, Server, ServerResponse } from "http";

export interface InitObj {
    useApp?: (app: Server) => void;
    useRequest?: (req: IncomingMessage, res: ServerResponse) => void;
}