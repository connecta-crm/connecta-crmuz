import { LogType } from "../dstribution/DistributionDataType"

export interface MerchantTableDataType{
  "id": number,
  "logs": LogType[]
  "name": string,
  "status": string,
  "merchantType": "authorize"|"firstdata"|"paypal"|null,
  "authorizeLogin": string,
  "authorizePassword": string,
  "authorizePinCode": string,
  "firstdataGatewayId": string,
  "firstdataPassword": string,
  "firstdataKeyId": string,
  "firstdataHmacKey": string,
  "paypalSecretKey": string,
  "updatedFrom": number
}
