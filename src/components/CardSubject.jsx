import { Card, CardContent, CardHeader, Typography } from "@mui/material";

function CardSubject(){
    return (
        <Card sx={{maxWidth: 345, }}>
            <CardHeader
                title="A"
                sx={{backgroundColor: "#A1B4C6", height: 6}}
                titleTypographyProps={{variant: "body2", fontSize: 14, color: "white", fontWeight: "bold"}}
            />
            <CardContent>
                <Typography variant="body2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, earum. Hic, doloribus!
                </Typography>
            </CardContent>
        </Card>
    );
}

export default CardSubject;