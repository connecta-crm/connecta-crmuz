import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
export default function UseCalendar() {
  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridDay"
        headerToolbar={{
          start: '',
          center: 'title',
          end: 'prev next',
        }}
        //   weekends={false}
        events={[
          { title: 'event 1', date: '2024-04-28 15:00' },
          { title: 'event 1', date: '2024-04-28 05:00' },
          { title: 'event 3', date: '2024-04-28 16:00' },
        ]}
        height="400px"
        slotMinTime={'07:00:00'}
      />
    </div>
  );
}
