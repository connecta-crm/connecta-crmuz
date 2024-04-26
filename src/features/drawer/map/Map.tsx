function Map() {
  return (
    <div className="map">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d440730.03321172483!2d-82.01276720139975!3d30.34516921437771!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e5b716f1ceafeb%3A0xc4cd7d3896fcc7e2!2sJeksonvill%2C%20Florida%2C%20Amerika%20Qo%E2%80%98shma%20Shtatlari!5e0!3m2!1suz!2s!4v1710663286379!5m2!1suz!2s"
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
