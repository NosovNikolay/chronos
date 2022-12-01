import { useEffect, useState } from 'react';
import '../../styles/dashboard.scss';
import { CircularProgress } from '@mui/material';

import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import useAuth from '../../hooks/useAuth';
import { env } from '../../config/env';
// TODO: interface forlist of calendars
const ShowCategory = (props) => {
  const { list } = props;
  return (
    <div style={{ marginLeft: '15px', height: '150px', width: '150px' }}>
      <Paper key={list.id}>
        <p style={{ position: 'relative', top: '40%' }}>{list.title}</p>
      </Paper>
    </div>
  );
};

function Dashboard() {
  const { token } = useAuth();
  const [state, setState] = useState([]);

  useEffect(() => {
    fetch(env.VITE_APP_API + '/calendars', {
      headers: { 
        'Authorization': 'Bearer ' + token,
      },
    }).then(function(response) {

      return response.json();
    }).then(function(data) {
      setState(data.items)
    });
  }, [])
  // TODO: remove string concat + types
  return (
    <>
      <div>
        <Typography variant='h3' style={{ padding: '30px', textAlign: 'center'}}>
          List of Calendars
        </Typography>
      </div>
      { state?.length ? (
        <div>
        <Grid
          container
          spacing={0}
          direction='column'
          alignItems='center'
          justifyContent='center'
          style={{ minHeight: '100vh' }}
        >
        {state.map((calendar, index) => (
          <Grid key={index} item xs={12}>
            <Link to={'/calendar/' + calendar.id + '?' + 'title=' + calendar.title } >
              <Grid container spacing={2}>
                <ShowCategory list={calendar}></ShowCategory>
              </Grid>
            </Link>
          </Grid>
          ))}
        </Grid>
      </div>
      ) : <CircularProgress className="loading_indicator" color="secondary" />}
    </>
  );
}

export default Dashboard;
