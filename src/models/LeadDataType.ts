export type LeadDataType = {
    vehicles: { vehicle: string | null; vehicleYear: FormDataEntryValue | null }[];
    status: string | null;
    price: number,
    condition: string | null;
    trailerType: string | null;
    notes: FormDataEntryValue | null;
    reservationPrice: number,
    dateEstShip: FormDataEntryValue | null;
    customer: string | null;
    source: string | null;
    origin: string | null;
    destination: string | null;
    user: string | undefined;
    // extraUser: 0,
  };