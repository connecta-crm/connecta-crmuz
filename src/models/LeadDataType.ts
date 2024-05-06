export type LeadDataType = {
    vehicles: { vehicle: string | null; vehicleYear: FormDataEntryValue | null }[];
    status: string | null;
    // price: 2147483647,
    condition: string | null;
    trailerType: string | null;
    notes: FormDataEntryValue | null;
    // reservationPrice: 2147483647,
    dateEstShip: FormDataEntryValue | null;
    customer: string | null;
    source: string | null;
    origin: string | null;
    destination: string | null;
    user: string | undefined;
    // extraUser: 0,
  };