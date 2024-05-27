import React, { useState } from "react";
import ImagesGrid from "./ImagesGrid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Textarea from '@mui/joy/Textarea';
import Button from '@mui/joy/Button';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom'; // Импортируйте useNavigate

function Create(props) {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    description: "",
    price: "",
    type_: "",
    gender: "",
    imageURL: "", // Add imageURL field to form data
  });

  const navigate = useNavigate(); // Используйте useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === "age" || name === "price" ? parseInt(value) : value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: parsedValue,
    }));
  };
  
  const handleImageSelect = (imageURL) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      imageURL: imageURL,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5296/api/DogsStorage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log("Post successful!");
        // Reset form data
        setFormData({
          name: "",
          age: "",
          description: "",
          price: "",
          type_: "",
          gender: "",
          imageURL: "",
        });
        navigate('/'); // Перейти на главную страницу после успешной отправки
      } else {
        console.error("Failed to post data");
      }
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <div className="create">
      <h1>Post your dog - make your dog happiest </h1>
      <br />
      <div className="create_flex">
        <ImagesGrid onImageSelect={handleImageSelect} />
        <div className="create_inputs">
          <h3>Set infos about your pet</h3>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div style={{ marginBottom: '20px' }}>
              <TextField
                id="outlined-multiline-flexible"
                label="Title"
                name="name"
                value={formData.name}
                onChange={handleChange}
                multiline
              />
              <TextField
                id="outlined-multiline-flexible"
                label="Age of your pet"
                name="age"
                value={formData.age}
                onChange={handleChange}
                multiline
              />
              <TextField
                id="outlined-select-currency"
                select
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                helperText="Please select a gender"
              >
                <MenuItem value='man'>Man</MenuItem>
                <MenuItem value='woman'>Woman</MenuItem>
              </TextField>
              <TextField
                id="outlined-select-currency"
                select
                label="Type"
                name="type_"
                value={formData.type_}
                onChange={handleChange}
                helperText="Please select a type"
              >
                <MenuItem value='dog'>Dog</MenuItem>
                <MenuItem value='cat'>Cat</MenuItem>
                <MenuItem value='bird'>Bird</MenuItem>
              </TextField>
            </div>
            <Textarea
              color="neutral"
              placeholder="Set your description here"
              minRows={7}
              size="lg"
              variant="soft"
              name="description"
              value={formData.description}
              onChange={handleChange}
              style={{ marginBottom: '20px' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
              <TextField
                id="filled-number"
                label="$Price"
                placeholder="$"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
              <Button size="lg" onClick={handleSubmit}>Post</Button>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default Create;
