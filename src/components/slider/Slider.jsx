import "./slider.scss";
import { register } from 'swiper/element/bundle';
import MoreIcon from "../../utils/moreIcon/MoreIcon";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Topbar from "../ui/topbar/Topbar";

register()
// autoplay="true"
function Slider() {
    return (
        <section className="slider">
            <Topbar title={"featured collections"} IconBox={<MoreIcon Icon={<MoreVertIcon />} />} />
            <swiper-container className="mySwiper" slides-per-view="1" speed="500" loop="true" css-mode="true">
                <swiper-slide><SlideItem /></swiper-slide>
                <swiper-slide><SlideItem /></swiper-slide>
                <swiper-slide><SlideItem /></swiper-slide>
                <swiper-slide><SlideItem /></swiper-slide>
            </swiper-container>
        </section>
    )
};

export default Slider;

function SlideItem() {
    return (
        <div className="slideItem">
            <ImageContainer />
            <User />
        </div>
    )
}

const imageData = {
    first: "https://spruko.com/demo/synto/Synto/dist/assets/img/nft-images/4.png",
    second: "https://spruko.com/demo/synto/Synto/dist/assets/img/nft-images/5.png",
    third: "https://spruko.com/demo/synto/Synto/dist/assets/img/nft-images/6.png",
    four: "https://spruko.com/demo/synto/Synto/dist/assets/img/nft-images/7.png",
}

function ImageContainer() {
    return (
        <div className="imgContainer">
            <div className="imgBox">
                <img src={imageData.first} alt="" />
            </div>
            <div className="imgBox">
                <img src={imageData.second} alt="" />
            </div>
            <div className="imgBox">
                <img src={imageData.third} alt="" />
            </div>
            <div className="imgBox">
                <img src={imageData.four} alt="" />
            </div>
        </div>
    )
}

function User() {
    return (
        <div className="user">
            <div className="desc">
                <img src="https://spruko.com/demo/synto/Synto/dist/assets/img/users/10.jpg" alt="" className="userImg" />
                <div className="text">
                    <p className="title">Jhone doen</p>
                    <p className="userName">@phonhe</p>
                </div>
            </div>
            <div className="btn">
                <MoreVertIcon />
            </div>
        </div>
    )
}