import { CheckBox } from "@mui/icons-material";
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
                <CheckBox />
            </CardContent>
        </Card>
    );
}

export default CardSubject;