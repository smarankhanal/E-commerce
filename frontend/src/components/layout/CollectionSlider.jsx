import { useState } from "react";

import img from "../../assets/images/t-shirt.jpg";

const collections = [
  {
    id: 1,
    title: "Medical Wear",
    image: img,
  },
  {
    id: 2,
    title: "Classic Collection",
    image: img,
  },
  {
    id: 3,
    title: "Premium Scrubs",
    image: img,
  },
  {
    id: 4,
    title: "Hospital Essentials",
    image: img,
  },
  {
    id: 5,
    title: "Luxury Uniform",
    image: img,
  },
];

export default function CollectionSlider() {
  const [active, setActive] = useState(2);

  const previous = () => {
    setActive((active - 1 + collections.length) % collections.length);
  };

  const next = () => {
    setActive((active + 1) % collections.length);
  };

  const getPosition = (index) => {
    const total = collections.length;

    let diff = index - active;

    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    return diff;
  };

  return (
    <section className="w-full py-20 bg-white overflow-hidden">
      <h2 className="text-4xl font-bold text-center mb-16">Our Collections</h2>

      <div className="relative flex justify-center items-center h-150">
        {collections.map((item, index) => {
          const position = getPosition(index);

          let classes =
            "absolute transition-all duration-500 ease-in-out cursor-pointer rounded-3xl overflow-hidden shadow-2xl";

          if (position === 0) {
            classes += " z-30 scale-100 opacity-100 w-[420px] h-[520px]";
          } else if (position === -1) {
            classes +=
              " -translate-x-[340px] scale-90 opacity-40 z-20 w-[320px] h-[450px]";
          } else if (position === 1) {
            classes +=
              " translate-x-[340px] scale-90 opacity-40 z-20 w-[320px] h-[450px]";
          } else {
            classes += " opacity-0 scale-75 pointer-events-none";
          }

          return (
            <div
              key={item.id}
              className={classes}
              onClick={() => setActive(index)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

              <div className="absolute bottom-8 left-8">
                {position === 0 && (
                  <div
                    className="absolute bottom-8 left-8 transition-all duration-500"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h3 className="text-white text-3xl font-bold mb-4 drop-shadow-lg">
                      {item.title}
                    </h3>

                    <button className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-orange-500 hover:text-white transition-all duration-300">
                      Explore
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
