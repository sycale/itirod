import { Image } from "antd";
import React from "react";

export default function Home() {
  return (
    <div className="container d-flex flex-column align-items-center my-5">
      <h1>Website for generating tests</h1>
      <Image src="https://www.meme-arsenal.com/memes/3addbd97d08b09076b1ef0e55c5d8022.jpg" />
      <Image
        className="mt-3"
        src="http://risovach.ru/upload/2016/04/mem/kogda-s-dedom_112267989_orig_.jpg"
      />
    </div>
  );
}
