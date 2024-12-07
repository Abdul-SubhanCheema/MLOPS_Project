import React, { useState } from "react";
import {
  TextField,
  MenuItem,

  Button,
  Container,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
function WeatherPredictor() {
  const [inputs, setInputs] = useState({
    summary: "",
    precipType: "",
    apparentTemperature: "",
    humidity: "",
    windSpeed: "",
    windBearing: "",
    visibility: "",
    pressure: "",
  });
  const [temperature, setTemperature] = useState(null);
  const navigate = useNavigate();
  // Options for the Summary dropdown
  const summaryOptions = [
    'Partly Cloudy' ,'Mostly Cloudy', 'Overcast' ,'Foggy',
 'Breezy and Mostly Cloudy' ,'Clear' ,'Breezy and Partly Cloudy',
 'Breezy and Overcast', 'Humid and Mostly Cloudy', 'Humid and Partly Cloudy',
 'Windy and Foggy', 'Windy and Overcast', 'Breezy and Foggy',
 'Windy and Partly Cloudy', 'Breezy', 'Dry and Partly Cloudy',
 'Windy and Mostly Cloudy' ,'Dangerously Windy and Partly Cloudy', 'Dry',
 'Windy', 'Humid and Overcast', 'Light Rain', 'Drizzle' ,'Windy and Dry',
 'Dry and Mostly Cloudy', 'Breezy and Dry' ,'Rain'
  ];

  // Options for the Precip Type dropdown
  const precipTypeOptions = ["rain", "snow"];

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send data to backend for prediction
    const response = await fetch("http://localhost:3001/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputs),
    });

    const data = await response.json();
    setTemperature(data.predicted_temperature);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: "center", marginBottom: 3 }}>
        <Typography variant="h3" color="primary" gutterBottom>
          Weather Predictor
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Enter weather parameters to predict the temperature
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        {/* Summary Dropdown */}
        <TextField
          select
          label="Summary"
          name="summary"
          value={inputs.summary}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        >
          {summaryOptions.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        {/* Precip Type Dropdown */}
        <TextField
          select
          label="Precip Type"
          name="precipType"
          value={inputs.precipType}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        >
          {precipTypeOptions.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        {/* Other Inputs */}
        <Grid container spacing={2} direction="column" alignItems="center">
          <Grid item>
            <TextField
              label="Apparent Temperature (°C)"
              name="apparentTemperature"
              value={inputs.apparentTemperature}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
              type="number"
            />
          </Grid>
          <Grid item>
            <TextField
              label="Humidity"
              name="humidity"
              value={inputs.humidity}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
              type="number"
              step="0.01"
            />
          </Grid>
          <Grid item>
            <TextField
              label="Wind Speed (km/h)"
              name="windSpeed"
              value={inputs.windSpeed}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
              type="number"
            />
          </Grid>
          <Grid item>
            <TextField
              label="Wind Bearing (°)"
              name="windBearing"
              value={inputs.windBearing}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
              type="number"
            />
          </Grid>
          <Grid item>
            <TextField
              label="Visibility (km)"
              name="visibility"
              value={inputs.visibility}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
              type="number"
            />
          </Grid>
          <Grid item>
            <TextField
              label="Pressure (millibars)"
              name="pressure"
              value={inputs.pressure}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
              type="number"
            />
          </Grid>
        </Grid>

        {/* Submit Button */}
        <Box sx={{ marginTop: 2 }}>
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Predict Temperature
          </Button>
        </Box>
        <Box sx={{ marginTop: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/")}
            fullWidth
          >
            Logout
          </Button>
        </Box>
      </form>

      {/* Display the predicted temperature */}
      {temperature && (
        <Box sx={{ textAlign: "center", marginTop: 3 }}>
          <Typography variant="h4" color="success.main">
            Predicted Temperature: {temperature} °C
          </Typography>
        </Box>
      )}
    </Container>
  );
}

export default WeatherPredictor;
