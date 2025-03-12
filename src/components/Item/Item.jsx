import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { useNavigate } from 'react-router-dom';

const Item = ({ producto }) => {
    const navigate = useNavigate()

    return (
        <>



            <Card  sx={{ maxWidth: 345 }}>
                <CardActionArea onClick={() => navigate(`/item/${producto.id}`)}>
                    <CardMedia
                        component="img"
                        height="300px"
                        width="100px"
                        image={producto.image}
                        alt={producto.title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        {producto.title}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </>

    )
};


export default Item;