import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './PostSlider.css'; // 👈 import CSS file

const PostSlider = () => {
  const [posts, setPosts] = useState([]);

  const API_URL = 'https://gos-testing.tantra-gyan.com/wp-json/wp/v2/posts';

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${API_URL}?_embed`);
      const data = await response.json();

      const postsWithImages = data.map((post) => {
        const featuredImg =
          post._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
          'https://via.placeholder.com/600x400?text=No+Image';
        return { ...post, featured_image_url: featuredImg };
      });

      setPosts(postsWithImages);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (!Array.isArray(posts) || posts.length === 0) {
    return <p style={{ textAlign: 'center' }}>Loading posts...</p>;
  }

  return (
    <div className="post-slider-container">
      <h2 className="post-slider-title">🖼️ Latest Posts</h2>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        grabCursor={true}
        style={{ paddingBottom: '40px' }}
        breakpoints={{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {posts.map((post) => (
          <SwiperSlide key={post.id}>
            <div
              className="post-slide"
              onClick={() => window.open(post.link, '_blank')}
            >
              <img
                src={post.featured_image_url}
                alt={post.title.rendered}
              />
              <div className="post-overlay">
                <h3 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PostSlider;
