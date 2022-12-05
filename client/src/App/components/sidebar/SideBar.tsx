import { EventApi, formatDate } from '@fullcalendar/react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { DemoAppState } from '../calendar/Calendar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, Checkbox, Grid } from '@mui/material';
import { InviteToCalendarModal } from '../modal/send_invite';
import { useModal } from '../../hooks/useModal';
import { FormControlLabel } from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { env } from '../../config/env';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';

interface SideBarProps {
  setCalendarState: React.Dispatch<React.SetStateAction<DemoAppState>>;
  calendarState: DemoAppState;
  calendarName: string;
}

export const SideBar = (props: SideBarProps) => {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const modalInvite = useModal(false);
  // const modalChange = useModal(false);
  const renderSidebarEvent = (event: EventApi) => {
    return (
      <li key={event.id}>
        <b>{formatDate(event.start!, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
        <i>{event.title}</i>
      </li>
    );
  };
  const handleInviteModal = () => {
    modalInvite.handleOpen();
  };
  const handleDelete = () => {
    axios
      .delete(`${env.VITE_APP_API}/calendars/${id}`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then(() => {
        toast.success('Calendar deleted successfully');
        navigate('/calendar');
      })
      .catch(() => {
        toast.error('Ooops something went wrong');
      });
  };

  const handleHolidaysToggle = () => {
    setCalendarState({
      ...calendarState,
      holidaysVisible: !calendarState.holidaysVisible,
    });
  };

  const { calendarState, setCalendarState, calendarName } = props;
  return (
    <div>
      <InviteToCalendarModal
        open={modalInvite.isOpen}
        handleClose={modalInvite.handleClose}
        eventInfo={'123'}
        isEditCard={false}
        calendarId={'123' || ''}
      />
      <div className='demo-app-sidebar'>
        <Link to='/calendar'>
          <Grid container direction='row' justifyContent='flex-start' alignItems='center'>
            <ArrowBackIcon style={{ marginLeft: '5px' }} />
            <div style={{ margin: '5px', padding: '5px' }}>Back to calendars</div>
          </Grid>
        </Link>
        <div className='demo-app-sidebar-section'>
          <h2>{calendarName}</h2>
          <ul></ul>
        </div>
        <Button style={{ marginLeft: '20px' }} onClick={() => handleInviteModal()}>
          + Add friends
        </Button>
        <Button style={{ marginLeft: '20px' }} onClick={() => handleDelete()}>
          <DeleteIcon style={{ marginLeft: '5px' }} />
          <div style={{ margin: '5px', padding: '5px' }}>Delete Calendar</div>
        </Button>
        <div className='demo-app-sidebar-section'>
          <FormControlLabel
            control={
              <Checkbox
                color='success'
                checked={calendarState.holidaysVisible}
                onChange={handleHolidaysToggle}
              />
            }
            label='Show holidays'
          />
        </div>
        <div className='container'>
          <p>All Events ({calendarState.currentEvents.length})</p>
          <div className='left'>{calendarState.currentEvents.map(renderSidebarEvent)}</div>
        </div>
      </div>
    </div>
  );
};
