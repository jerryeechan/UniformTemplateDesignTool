import { Link } from "react-router-dom";
import Slider from "react-slick";
import { FirebaseCollection } from "../../firebase/FirebaseCollection";
import * as React from "react";
import { Image, Button } from "semantic-ui-react";
//REF:https://github.com/akiran/react-slick/blob/master/examples/CenterMode.js
var settings = {
  dots: true,
  speed: 800,
  slidesToShow: 5,
  arrows: false,
  //autoplay: true,
  autoplaySpeed: 100
};
const featured = new Array();
featured.push("Test");
featured.push("Test1");
featured.push("Tes2");
featured.push("Test1");
featured.push("Test1");
export const HomeSlider = () => (
  <div style={{ position: "relative" }}>
    {/* <div style={{ marginLeft: "-10em", marginRight: "-10em" }}> */}

    <Slider {...settings}>
      {featured.map(a => {
        return (
          <div>
            <Link to={FirebaseCollection.Reference + "/"}>
              <Image src="https://react.semantic-ui.com/assets/images/wireframe/image.png" />
            </Link>
          </div>
        );
      })}
    </Slider>
    {/* </div> 
    <button style={{ position: "absolute", top: 10 }}>左</button>*/}
  </div>
);
