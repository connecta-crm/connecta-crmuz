export interface FilterTableDataType  {
  id?:string,
    customerName: string,
    customerPhone: string,
    originName: string,
    destinationName: string,
    vehicleName: string,
    guid: string,
    createdAt: string,
    updatedAt: string,
    price: number,
    condition: string,
    trailerType: string,
    notes: string,
    reservationPrice: number,
    dateEstShip: string
    status: string,
    paymentTotalTariff: number,
    paymentReservation: number,
    paymentPaidReservation: number,
    paymentCarrierPay: number,
    paymentCodToCarrier: string,
    paymentPaidToCarrier: number,
    dateEstPu: string,
    dateEstDel: string,
    dateDispatched: string
    datePickedUp: string
    dateDelivered: string,
    customer: number,
    source: number,
    origin: number,
    destination: number
  }