import React from 'react'
import { Container , Grid , Typography } from '@mui/material'
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';

export default function StudentAnnouncements() {
  return (
    <div>
            <Container  maxWidth="sm">
      <Grid container sx={{ marginY: "30px", padding: "30px", backgroundColor: "white", boxShadow: "5px 5px 30px lightgray", borderRadius: "10px" }} >
      <Grid item xs={12} md={12} sm={12} lg={12} >
<Typography component="div" variant="h5">Announcements</Typography>

<AvatarGroup total={24}>
  <Avatar alt="Remy Sharp"  />
  <Avatar alt="Travis Howard" />
  <Avatar alt="Agnes Walker"/>
  <Avatar alt="Trevor Henderson" />
</AvatarGroup>

<Avatar>H</Avatar><Typography>Notification for quiz . Quiz will be today after 12 A.M...</Typography>
<Avatar>N</Avatar>
<Typography>Result of Previous Quiz has been uploaded...</Typography>
<Avatar>R</Avatar>
<Typography>Admission of new courses are opened.You can enroll yourself on other courses...</Typography>


</Grid>
</Grid>
</Container>
    </div>
  )
}
