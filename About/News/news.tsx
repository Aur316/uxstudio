import { useRouter } from "next/router";
import slugify from "slugify";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActions,
} from "@mui/material";
import { useLocalization } from "../../../context/languageContext";

interface NewsProps {
  collections: any[];
}
interface CardProps {
  item: {
    name: string;
    slug?: string;
    tldr?: string;
    "001"?: { url?: string };
    [key: string]: any;
  };
  type: "collection";
}

const News: React.FC<NewsProps> = ({ collections }) => {
  const { t } = useLocalization();

  const StyledCard: React.FC<CardProps> = ({ item }) => {
    const router = useRouter();
    return (
      <Card className="card-styled">
        {item["001"]?.url && (
          <CardMedia
            component="img"
            height="140"
            image={item["001"].url}
            alt={item.name}
            sx={{ borderBottom: "1px solid #009DDC", objectFit: "cover" }}
          />
        )}
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ textAlign: "center", fontWeight: "bold" }}
          >
            <span className="webflowCardName">{item.name}</span>
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ minHeight: "64px", textAlign: "justify" }}
          >
            <span className="webflowCardDesc">
              {item.tldr && item.tldr.length > 160
                ? `${item.tldr.substring(0, 157)}...`
                : item.tldr}
            </span>
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>
          <Button
            aria-label="Read More"
            size="small"
            onClick={() =>
              router.push(
                `/${"newsCards"}/${slugify(item.slug ?? "undefined")}`
              )
            }
            className="button-read-more"
            variant="outlined"
          >
            <span className="webflowCardName">Read More</span>
          </Button>
        </CardActions>
      </Card>
    );
  };

  return (
    <>
      <h2 className="newsTitle">{t.news}</h2>
      <div className="webflowCardContainer">
        {collections.map((item, index) => (
          <StyledCard key={index} item={item} type={item.type} />
        ))}
      </div>
    </>
  );
};

export default News;
