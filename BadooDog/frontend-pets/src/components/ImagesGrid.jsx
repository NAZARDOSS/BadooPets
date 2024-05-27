import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, useEffect} from 'react';

export default function TitlebarImageList({onImageSelect}) {

  const [itemData, setItemData] = useState([
        {
          img: 'https://storage.googleapis.com/pai-images/9da50d64c9cd4c0cb01f05cb28a5d718.jpeg',
        },
        {
          img: 'https://storage.prompt-hunt.workers.dev/0394da80-b4ef-4b1b-b0d5-4ce47f7e0b9b',
        },
        {
          img: 'https://storage.prompt-hunt.workers.dev/5efb9a42-f2d6-46ca-ba0f-894d04874c15',
        },
        {
          img: 'https://storage.prompt-hunt.workers.dev/clfooiql9000cmi08fze56r5j_1',
        },
        {
          img: 'https://storage.prompt-hunt.workers.dev/clfoolq0e000glb08pg2qbbz4_1',
        },
        {
          img: 'https://storage.prompt-hunt.workers.dev/clhl0o14m001pjt08hzqkssxx_1',
        },
        {
          img: 'https://storage.prompt-hunt.workers.dev/clh47asss0008l908yxz8g6q6_1',
        },
        {
          img: 'https://storage.prompt-hunt.workers.dev/clgm4mk3q001flc0820rrwzml_1',
        },
        {
          img: 'https://storage.prompt-hunt.workers.dev/cf8de5f9-ac85-4c70-bc3e-db6d805c014f',
        }
      ]);

      const [open, setOpen] = useState(false);
      const [selectedImage, setSelectedImage] = useState(null);
      const [inputValue, setInputValue] = useState('');
      const [selectedIndex, setSelectedIndex] = useState(null);
      const [changedIndexes, setChangedIndexes] = useState([]); // Массив индексов измененных объектов
    
      const handleClickOpen = (img, index) => {
        setOpen(true);
        setSelectedImage(img);
        setSelectedIndex(index);
      };
    
      const handleClose = () => {
        setOpen(false);
        setInputValue('');
      };
    
      const handleInputChange = (event) => {
        setInputValue(event.target.value);
      };
    
      const handleSave = () => {
        let updatedImage = inputValue.trim();
        if (updatedImage && isValidImageUrl(updatedImage)) {
          const updatedItemData = [...itemData];
          updatedItemData[selectedIndex].img = updatedImage;
          setItemData(updatedItemData);
          if (!changedIndexes.includes(selectedIndex)) {
            // Добавляем индекс в массив измененных объектов, если его там еще нет
            setChangedIndexes([...changedIndexes, selectedIndex]);
          }
          setOpen(false);
          setInputValue('');
        } else {
          alert("Failed to insert photo. The link is not valid.");
        }
      };
    
      useEffect(() => {
        // Собираем массив строк с значениями ключа 'img' только для измененных объектов
        const changedImages = changedIndexes.map((index) => itemData[index].img);
        // Передаем массив строк в качестве аргумента обратному вызову onImageSelect
        onImageSelect(changedImages);
      }, [changedIndexes, itemData, onImageSelect]);
    
      const isValidImageUrl = (url) => {
        return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
      };
    
      return (
        <div className='images' style={{display: 'flex', alignItems: 'center'}}>
          <ImageList sx={{ width: 700, height: 650 }} cols={3}>
            {itemData.map((item, index) => (
              <ImageListItem key={item.img} className="image-item" onClick={() => handleClickOpen(item.img, index)}>
                <img
                  className='create_img'
                  srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item.img}?w=248&fit=crop&auto=format`}
                  alt={item.title}
                  loading="lazy"
                />
                <span className="hover-plus">+</span>
              </ImageListItem>
            ))}
          </ImageList>
          <Dialog open={open} onClose={handleClose}>
            <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <TextField
                style={{ width: '500px', margin: '20px' }}
                autoFocus
                margin="dense"
                id="image-description"
                label="Image Description"
                type="text"
                fullWidth
                value={inputValue}
                onChange={handleInputChange}
              />
              <Button variant="contained" style={{ marginBottom: '20px', width: '100px' }} onClick={handleSave}>Save</Button>
            </div>
          </Dialog>
        </div>
      );
    };