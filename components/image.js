import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { load } from "dotenv";

//walk through all images into public folder
/*
function importAll(r) {
  let images = {};
  r.keys().map((item) => {
    images[item.replace("./", "")] = r(item).default.src;
  });
  return images;
}

//get images array
let cacheImages = {};
cacheImages = importAll(
  require.context(
    process.env.NEXT_PUBLIC_IMAGE_PATH,
    true,
    /\.(png|jpe?g|svg)$/
  )
);
*/

export default function Img({ s, a, c, w, h, l }) {
  const [imageSrc, setImageSrc] = React.useState();
  const base_path = process.env.NEXT_PUBLIC_IMAGE_PATH;
  
  dynamic(() => {
    import(base_path + s).then((img) => {
      console.log({img});
      setImageSrc(img)
    });
    
  });
  /*
  const loadImage = React.useCallback(
    (img) => {
      dynamic(() => {
        import(base_path + img).then((img) => setImageSrc(img));
      });
    },
    [setImageSrc, base_path]
  );
  React.useEffect(()=>{
    loadImage(s);
  }, [loadImage, s]);
  */
  /*
  let subfolders = s.split('/');
  let basedir = process.env.NEXT_PUBLIC_IMAGE_PATH;

  if (subfolders.length>0) {
    let f = subfolders.pop();
    basedir += subfolders.join('/') +"/";
  }
  */

  console.log({imageSrc});

  //not chached? let's get it
  /*
  if (!cacheImages[s]) {
    let images = importAll(
      require.context(
        process.env.NEXT_PUBLIC_IMAGE_PATH,
        true,
        /\.(png|jpe?g|svg)$/
      )
    );

    cacheImages = { ...cacheImages, images };
  }
  */

  c = c ?? "";
  return (
    <>
      {/*
      {!!cacheImages[s] && (
        <img
          className={"ui-image" + (c ? " " : "") + c}
          src={cacheImages[s]}
          layout="fill"
          alt={a ?? ""}
          width={w ?? ""}
        />
      )}

      */}
      {imageSrc && (
      <div
        style={{
          width: `${w ?? "100%"}`,
          height: `${h ?? "100%"}`,
          position: "relative",
        }}
      >
        <Image
          className={"ui-image" + (c ? " " : "") + c}
          src={imageSrc}
          layout={l ?? "fill"}
          alt={a ?? ""}
          width="100%"
          height="100%"
          objectFit="contain"
        />
      </div>
      )}

      {/*{!cacheImages[s] && <small>Image not found: {s}</small>}*/}
    </>
  );
}