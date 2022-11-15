import {Metadata} from "@grpc/grpc-js";

export interface CallOptionsI {
    rpcName: any;
    params: {};
    meta?: Metadata;
}