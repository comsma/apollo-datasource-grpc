# apollo-datasource-grpc
gRPC implementation of Apollo Server's Datasources. Makes it possible to use Partial Query Caching

## Usage

To get started, install the apollo-datasource-grpc package:

```
npm i @comsma\apollo-datasource-grpc
```
To define a data source, extend the GRPCDataSource class

```ts
import GRPCDataSource from 'apollo-datasource-grpc';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import {Metadata} from '@grpc/grpc-js';

const packageDefinition: any = protoLoader.loadSync(
    `${process.env.PROPHET_PACKAGE}`,
);
const proto: any = grpc.loadPackageDefinition(packageDefinition).prophet;

const client = new proto.OrderService(
    `${process.env.PROPHET_URL}:${process.env.PROPHET_PORT}`,
    grpc.credentials.createInsecure(),
);

export class ProphetOrderApi extends GRPCDataSource {
    constructor() {
        super();
        this.client = client;
    }

    async getOrder(orderId: string, includeItems = false) {
        try {
            const metadata = new Metadata();
            return await this.callRPC(0, {
                rpcName: 'GetOrder',
                params: {orderId: orderId, includeItems: includeItems},
                meta: metadata,
            });
        } catch (e: any) {
            console.log(e);
        }
    }

    async getPickTicket(id: number) {
        try {
            const metadata = new Metadata();
            return await this.callRPC(0, {
                rpcName: 'GetPickTicket',
                params: {pickTicketId: id},
                meta: metadata,
            });
        } catch (e: any) {
            console.log(e);
        }
    }
}

```

