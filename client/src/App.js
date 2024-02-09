import React, { useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InfoIcon from '@mui/icons-material/Info';
import Alert from '@mui/material/Alert';

const cardStyle = {
  maxWidth: 400,
  margin: 'auto',
  marginTop: 50,
};

export default function FormInsideCard() {
  const [formData, setFormData] = useState({
    duration: '',
    vehicleSize: '',
  });
  const [parkingDetails, setParkingDetails] = useState(undefined)

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    searchParkingSlot();
  };

  const searchParkingSlot = async () => {
    try {
      const response = await axios.post('http://localhost:5000/search', formData);
      setParkingDetails(response.data.data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
  }

  return (
    <div>
      <Card style={cardStyle} elevation={3}>
        <Alert icon={<InfoIcon fontSize="inherit" />} severity="info">
        const entryPoints = 3; // Assuming all entry has the same distance<br /><br />
        const parkingMap = [[1, 4, 5], [3, 2, 3], [6, 5, 6], [2,3,5], [1,2,3], [4,3,4]];<br /><br />
        const parkingSizes = [0, 2, 1, 0, 2, 1]<br /><br />
        </Alert>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            00 Parking Lot
          </Typography>
          <FormControl fullWidth>
            <Select
              labelId="dropdown-label"
              id="vehicleSize"
              name="vehicleSize"
              value={formData.vehicleSize}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="0">Small</MenuItem>
              <MenuItem value="1">Medium</MenuItem>
              <MenuItem value="2">Large</MenuItem>
            </Select>
            <TextField
              fullWidth
              required
              id="duration"
              name="duration"
              label="Duration (hrs)"
              value={formData.duration}
              onChange={handleChange}
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              onClick={handleSubmit}
              style={{ marginTop: 20 }}
            >
              Search Parking Slot
            </Button>
          </FormControl>
        </CardContent>
      </Card>
      { parkingDetails ? <Card style={cardStyle}>
        <CardHeader
          title="Parking Slot Details"
        />
        <CardMedia
          component="img"
          height="194"
          color="black"
          image={`https://via.placeholder.com/800x600?text=${parkingDetails.parking.parkingSlot}`}
          alt="Placeholder Image"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            <b>Fee: { parkingDetails.fee }</b>
          </Typography>
        </CardContent>
      </Card> : ''}
    </div>
  );
}