import { useAppSelector } from '../../../store/hooks';
import { DrawerSourceType } from '../../../ui/Drawer';
import { getLeadData } from '../../leads/leadSlice';
import { getOrderData } from '../../orders/orderSlice';
import { getQuoteData } from '../../quotes/quoteSlice';

function Map({ sourceType }: DrawerSourceType) {
  const { origin: originLead, destination: destinationLead } =
    useAppSelector(getLeadData);
  const { origin: originQuote, destination: destinationQuote } =
    useAppSelector(getQuoteData);
  const { origin: originOrder, destination: destinationOrder } =
    useAppSelector(getOrderData);

  let origin, destination;

  switch (sourceType) {
    case 'lead':
      origin = originLead;
      destination = destinationLead;
      break;
    case 'quote':
      origin = originQuote;
      destination = destinationQuote;
      break;
    case 'order':
      origin = originOrder;
      destination = destinationOrder;
      break;
    default:
      throw new Error('Wrong origin or destination');
  }

  const API_KEY = 'AIzaSyA0uyKXghT3P9scsghb_9lOErLudw1lnPQ';
  const mapsUrl = `https://www.google.com/maps/embed/v1/directions?key=${API_KEY}&origin=${origin?.lat},${origin?.long}&destination=${destination?.lat},${destination?.long}&mode=driving`;

  return (
    <div className="map">
      <iframe
        src={mapsUrl}
        className="map__frame"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading={'lazy'}
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}

export default Map;
