import React from 'react';

import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const ShowCategory = (props) => {
  const { list } = props;
  return (
    <div style={{ marginLeft: '15px' ,height: '150px', width: '150px' }} >
      <Paper key={list._id}>
        <p style={{ position: 'relative', top: '40%' }}>{list.name}</p>
      </Paper>
    </div>
  );
};

function Dashboard() {
  const state = [{ _id: 1, name: 'a' }, { _id: 2, name: 'b' } , { _id: 3, name: 'c' }];

  return (
    <>
      <div>
        <Typography variant="h3" style={{ padding: '10px' }}>
          List of Categories
        </Typography>
      </div>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {state.map((list, index) => (
                <ShowCategory key={index} list={list}></ShowCategory>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default Dashboard;