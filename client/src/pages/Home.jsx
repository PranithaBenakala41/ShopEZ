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
    <>
      <div
        onClick={() =>
          navigate(`/products?category=${slides[current].category}`)
        }
        style={{
          height: "500px",
          width: "100%",
          backgroundImage: `url(${slides[current].image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          cursor: "pointer",
          transition: "0.5s",
          overflow: "hidden",
        }}
      >
        {/* Dark Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: "80px",
            color: "white",
          }}
        >
          <h1
            style={{
              fontSize: "50px",
              marginBottom: "15px",
            }}
          >
            {slides[current].title}
          </h1>

          <p
            style={{
              fontSize: "22px",
              marginBottom: "35px",
            }}
          >
            {slides[current].subtitle}
          </p>

          <span
            style={{
              fontSize: "22px",
              fontWeight: "bold",
              width: "fit-content",
              borderBottom: "2px solid white",
              paddingBottom: "5px",
            }}
          >
            Explore Collection →
          </span>
        </div>

        {/* Left Arrow */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          style={{
            position: "absolute",
            top: "50%",
            left: "20px",
            transform: "translateY(-50%)",
            background: "rgba(255,255,255,0.3)",
            color: "white",
            border: "none",
            fontSize: "30px",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            cursor: "pointer",
          }}
        >
          ❮
        </button>

        {/* Right Arrow */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          style={{
            position: "absolute",
            top: "50%",
            right: "20px",
            transform: "translateY(-50%)",
            background: "rgba(255,255,255,0.3)",
            color: "white",
            border: "none",
            fontSize: "30px",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            cursor: "pointer",
          }}
        >
          ❯
        </button>

        {/* Dots */}
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: "12px",
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
                width: current === index ? "18px" : "12px",
                height: current === index ? "18px" : "12px",
                borderRadius: "50%",
                background: current === index ? "white" : "#ccc",
                cursor: "pointer",
                transition: "0.3s",
              }}
            ></span>
          ))}
        </div>
      </div>

      {/* Your homepage content starts below this */}
    </>
  );
}

export default Home;