import React, { useEffect, useState } from "react";

const ReelsSection = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = process.env.GATSBY_INSTA_API_ID;

  const accessToken = process.env.GATSBY_INSTA_API_TOKEN;

  const url = `https://graph.instagram.com/${userId}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,children,like_count,comments_count&access_token=${accessToken}`;

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.data.slice(0, 16)); // Limitar a 12 posteos
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // console.log("User ID:", process.env.GATSBY_INSTA_API_ID);
    // console.log("Access Tokeaan:", process.env.DATABASE_CLIENT);
  }, []);

  // Si hay error, mostramos un mensaje
  if (error) {
    return null;
  }

  // Si está cargando, mostramos un mensaje de loading
  if (loading) {
    return <div></div>;
  }

  return (
    <div className="reels-section">
      <div className="grid grid-cols-2  sm:grid-cols-3 llg:grid-cols-4 gap-2 sm:gap-8 mx-5 sm:mx-12  lg:max-w-[1200px] xl:m-auto ">
        {posts
          .filter(
            (post) => post.media_type === "VIDEO" || post.media_type === "REELS"
          ) // SOLO REELS O VIDEOS
          .map((post) => (
            <div key={post.id} className="reel-item">
              <video
                className="w-full h-auto rounded-lg"
                controls={false}
                autoPlay={true}
                muted={true}
                playsInline
                loop
                src={post.media_url} // URL del video
                type="video/mp4"
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ReelsSection;
