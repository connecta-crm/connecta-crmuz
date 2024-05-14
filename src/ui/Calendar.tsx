import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
function Calendar() {
  const handleDateClick = (arg: { dateStr: string }) => {
    alert(arg.dateStr);
  };
  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="timeGridDay"
      headerToolbar={{
        left: 'today',
        start: '',
        center: 'title',
        end: 'prev next',
      }}
      events={[
        { title: 'event 1', date: '2024-05-13 15:02' },
        { title: 'event 1', date: '2024-05-13 05:30' },
        { title: 'event 3', date: '2024-05-13 16:40' },
      ]}
      height="100%"
      slotMinTime={'00:00:00'}
      dateClick={handleDateClick}
      allDaySlot={false}
    />
  );
}
export default Calendar;
