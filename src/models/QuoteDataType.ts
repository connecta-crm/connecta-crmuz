export type QuoteDataType = {
    vehicles: { vehicle: string | null; vehicleYear: FormDataEntryValue | null }[];
    status: string | null;
    price: FormDataEntryValue | null,
    condition: string | null;
    trailerType: string | null;
    notes: FormDataEntryValue | null;
    reservationPrice: FormDataEntryValue | null,
    dateEstShip: FormDataEntryValue | null;
    customer: string | null;
    source: string | null;
    origin: string | null;
    destination: string | null;
    user: string | undefined;
    // extraUser: 0,
  };