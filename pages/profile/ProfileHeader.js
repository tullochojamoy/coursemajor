import React from 'react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
//import "./ProfileHeader.css";
import { CssBaseline, Grid, Typography, AppBar, Container } from '@mui/material';
import { makeStyles } from '@mui/styles';

export default function ProfileHeader() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

    if (!isClient) {
      return <p>Loading...</p>
    }


  function iconStyles() {
    return {
      gridAnchorStyle: {
        color: 'white',
      }
    };
  }

  const classes = makeStyles(iconStyles)();



    return (
      <>
        <AppBar position='static'>
          <Container>
            <Grid container spacing={0.5} justify='center'>
              <Grid
                item
                xs={2}
                justifyContent='center'
                justify='center'
                style={{ border: '1px solid red' }}
              >
                <Typography justify='center'>
                  <Link href='/'>
                    <center>
                      <a className={classes.gridAnchorStyle}>Home</a>
                    </center>
                  </Link>
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>
                  <Link href='/profile/editprofile'>
                    <center>
                      <a style={{ color: 'white' }}>Edit Profile</a>
                    </center>
                  </Link>
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>
                  <Link href='/profile/sociallinks'>
                    <center>
                      <a>Social Links</a>
                    </center>
                  </Link>
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>
                  <Link href='/profile/paypal'>
                    <center>
                      <a>PayPal</a>
                    </center>
                  </Link>
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>
                  <Link href='/profile/notifications'>
                    <center>
                      <a>Notifications</a>
                    </center>
                  </Link>
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>
                  <Link href='/profile/closeaccount'>
                    <center>
                      <a>Close Account</a>
                    </center>
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </AppBar>
      </>

      /*
      <header className='profile-header'>
        <img
          className='profile-header-image'
          alt='coursemajor logo'
          src='/images/default-logo.png'
        />
        <hr className='cm-profile-horizontal' />
        <div className='cm-profile-header-links'>
          <div className='cm-profile-header-links-section'>
            <Link href='/home' className='profile-menu-item'>
              <a>Back to CourseMajor</a>
            </Link>
            <Link href='/profile/editprofile' className='profile-menu-item'>
              <a>Edit Profile</a>
            </Link>
          </div>
          <div className='cm-profile-header-links-section'>
            <Link href='/profile/sociallinks' className='profile-menu-item'>
              <a>Social Links</a>
            </Link>
            <Link href='/profile/paypal' className='profile-menu-item'>
              <a>PayPal</a>
            </Link>
          </div>
          <div className='cm-profile-header-links-section'>
            <Link href='/profile/notifications' className='profile-menu-item'>
              <a>Notifications</a>
            </Link>
            <Link href='/profile/closeaccount' className='profile-menu-item'>
              <a>Close Account</a>
            </Link>
          </div>
        </div>
      </header>
      */
    );
}