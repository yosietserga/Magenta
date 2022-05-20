import React from "react";
import Script from "next/script";
import Link from "next/link";
import Image from "next/image";

export default function Slider() {
  
  const [sliders, setSliders] = React.useState([]);

  React.useEffect(() => {
    fetch('/api/posts?where={"post_type":"slider"}')
      .then((r) => r.json())
      .then((d) => {
        try {
          setSliders(d);
        } catch (error) {
          console.log(error);
        }
      });
  }, [setSliders]);

  return (
    <>
      {/* Start Slider content */}
      <div className="slider-main">
        {sliders.map((item, key) => {
          return <Slide key={key} data={item} />;
        })}
      </div>
      {sliders.length > 1 && (
        <Script
          dangerouslySetInnerHTML={{
            __html: `if ($('.slider-main').length) $('.slider-main').owlCarousel( {
            loop: true,
            nav: true,
            margin: 0,
            dots: false,
            autoplay: true,
            navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
            responsive: {
              0: {
                items: 1
              },
              768: {
                items: 1
              },
              1000: {
                items: 1
              }
            }
          } );`,
          }}
          strategy="lazyOnload"
        />
      )}
      {/* End Slider content */}
    </>
  );
}

export function Slide(props) {

  const bg = props?.data?.image
      ? { backgroundImage: `url(/uploads/${props.data.image}) !important` }
      : false;
      
  return (
    <div
      className="slide-area fix"
      data-stellar-background-ratio=".4"
      style={bg ?? ""}
    >
      <div className="display-table">
        <div className="display-table-cell">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-sm-12 col-xs-12">
                <div className="slide-content">
                  <h2 className="title2">
                    {props?.data?.title.length > 0
                      ? props?.data?.title
                      : ""}
                  </h2>
                  <p>
                    {props?.data?.description ??
                      ""}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
