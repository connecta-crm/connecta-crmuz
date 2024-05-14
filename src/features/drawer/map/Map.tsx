import { useAppSelector } from '../../../store/hooks';
import { getLeadData } from '../../leads/leadSlice';

function Map() {
  const { origin, destination } = useAppSelector(getLeadData);

  const API_KEY = 'AIzaSyDiWOQ9Y4Xh28n71iK_SnLmRCzrQAk638k';
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
