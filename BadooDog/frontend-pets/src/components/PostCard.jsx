import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
import PetsIcon from '@mui/icons-material/Pets';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function BasicCard({ name, age, image_url, description, price, type, gender}) {
  // Parse the JSON string to get the array of image URLs
  let imageURLArray = image_url.split(',');

  const handleImageError = (event) => {
    event.target.src = 'https://storage.prompt-hunt.workers.dev/0394da80-b4ef-4b1b-b0d5-4ce47f7e0b9b';
  };

  let truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + '...';
  };

  const truncatedDescription = truncateText(description, 100);

  return (
    <Card sx={{ width: 320 }}>
      <div>
        <Typography level="title-lg">
          {name} {gender === 'man' ? 
          <span className="gender" style={{ color: 'blue' }}>
            <PetsIcon />
          </span> : gender === 'woman' ? <span className="gender"  style={{ color: 'pink' }}><PetsIcon /></span> : ''}
        </Typography>
        <Typography level="body-sm">Age: {age}</Typography>
        <p className="post-card-description">{truncatedDescription}</p>
        <IconButton
          aria-label="bookmark Bahamas Islands"
          variant="plain"
          color="neutral"
          size="sm"
          sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem' }}
        >
          <BookmarkAdd />
        </IconButton>
      </div>
      <AspectRatio minHeight="120px" maxHeight="200px">
        {imageURLArray.length > 1 ? (
          <Carousel>
            {imageURLArray.map((img, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={img}
                  alt={`Slide ${index}`}
                  onError={handleImageError}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <img
            src={imageURLArray[0]}
            srcSet={imageURLArray[0]}
            loading="lazy"
            alt=""
            onError={handleImageError}
          />
        )}
      </AspectRatio>
      <CardContent orientation="horizontal">
        <div>
          <Typography level="body-xs">Price:</Typography>
          <Typography fontSize="lg" fontWeight="lg">
            {price} $
          </Typography>
        </div>
        <Button
          variant="solid"
          size="md"
          color="primary"
          aria-label="Explore Bahamas Islands"
          sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
        >
          Explore
        </Button>
      </CardContent>
    </Card>
  );
}
