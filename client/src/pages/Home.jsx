import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const slides = [
    {
      title: "Discover the Latest Fashion",
      subtitle: "Explore styles made for every season.",
      category: "Fashion",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600",
    },
    {
      title: "Step Into Comfort",
      subtitle: "Find the perfect pair for every occasion.",
      category: "Footwear",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1600",
    },
    {
      title: "Upgrade Your Tech",
      subtitle: "Discover the latest devices and accessories.",
      category: "Electronics",
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600",
    },
    {
      title: "Beauty Starts Here",
      subtitle: "Everything you need for your daily routine.",
      category: "Beauty",
      image:
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1600",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div
      onClick={() =>
        navigate(`/products?category=${slides[current].category}`)
      }
      style={{
        width: "100%",
        minHeight: "calc(100vh - 70px)",
        backgroundImage: `url(${slides[current].image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        cursor: "pointer",
      }}
    >
      {/* OVERLAY */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "40px 20px",
          color: "white",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(24px, 5vw, 56px)",
            fontWeight: "700",
            marginBottom: "15px",
          }}
        >
          {slides[current].title}
        </h1>

        <p
          style={{
            fontSize: "clamp(14px, 3vw, 24px)",
            marginBottom: "25px",
          }}
        >
          {slides[current].subtitle}
        </p>

        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/products?category=${slides[current].category}`);
          }}
          style={{
            padding: "12px 24px",
            border: "none",
            borderRadius: "25px",
            background: "#2874f0",
            color: "#fff",
            fontSize: "clamp(14px, 2vw, 18px)",
            fontWeight: "bold",
          }}
        >
          Shop Now →
        </button>
      </div>

      {/* LEFT ARROW */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          prevSlide();
        }}
        style={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: "none",
          background: "rgba(255,255,255,0.4)",
          color: "#fff",
          fontSize: "20px",
        }}
      >
        ❮
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          nextSlide();
        }}
        style={{
          position: "absolute",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: "none",
          background: "rgba(255,255,255,0.4)",
          color: "#fff",
          fontSize: "20px",
        }}
      >
        ❯
      </button>

      {/* DOTS */}
      <div
        style={{
          position: "absolute",
          bottom: "15px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "10px",
        }}
      >
        {slides.map((_, index) => (
          <span
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              setCurrent(index);
            }}
            style={{
              width: current === index ? "12px" : "8px",
              height: current === index ? "12px" : "8px",
              borderRadius: "50%",
              background: current === index ? "#fff" : "#aaa",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;