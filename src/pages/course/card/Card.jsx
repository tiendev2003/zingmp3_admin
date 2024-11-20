import "./card.scss";
import StarIcon from '@mui/icons-material/Star';
import { courseCard } from "../../../data/dashSource";

function Card() {
    return (
        <>
            {
                courseCard.map((item, i) =>
                    <article className="card" key={i}>
                        <div className="left">
                            <img src={item?.courseImg} alt="" />
                        </div>
                        <div className="right">
                            <p className="category">{item?.category}</p>
                            <h3 className="title">{item?.title}</h3>
                            <div className="info">
                                <div className="profile">
                                    <img src={item?.userImg} alt="" />
                                    <p className="userName">{item?.userName}</p>
                                </div>
                                <div className="impression">
                                    <p>{item?.views} Views</p>
                                    <span className="rating"><StarIcon />
                                        <span>({item?.rating})</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </article>)
            }
        </>
    )
};

export default Card;
