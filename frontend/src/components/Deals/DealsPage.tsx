import { useState, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import NavBar from "../global/NavBar";
import SearchBar from "../global/SearchBar";
import Footer from "../global/Footer";
import "../../style/ArrivalDeals.css";

type ProductInfo = {
  id: string;
  imgSrc: string;
  name: string;
  category: string;
  brand: string;
  description: string;
  price: number;
  oriPrice: number;
  rating: number;
  quantity: number;
  specs: string;
};

const PRODUCTS_PER_PAGE = 16;

const dealsProducts: ProductInfo[] = [
  {
    id: "FNDG-001",
    imgSrc: "/products/fender_p2_st_white.png",
    name: "Fender Player II Stratocaster HSS Electric Guitar, RW FB, Polar White",
    category: "Guitar",
    brand: "Fender",
    description:
      "Step into the spotlight and experience iconic Fender® sound and style with the Player II Stratocaster® HSS — a stage-ready guitar with contemporary updates to power your performance and inspire your playing. The Player II Stratocaster HSS radiates timeless Fender charm, but under the hood, it's primed for today's players.",
    price: 4799,
    oriPrice: 4999,
    rating: 5,
    quantity: 20,
    specs:
      "Body Shape: Stratocaster®;Body Material: Alder;Body Finish: Gloss Polyester;Neck Profile: Modern 'C';Fretboard Material: Slab Rosewood;Pickups: Player Series Alnico 2 Humbucker (Bridge), Player Series Alnico 5 Single-Coil (Middle, Neck);",
  },
  {
    id: "ROLK-002",
    imgSrc:
      "/products/roland_gp_3_baby_grand_digital_piano_polished_ebony_with_bench.png",
    name: "Roland GP-3 Baby Grand Digital Piano, Polished Ebony with Bench",
    category: "Keyboard",
    brand: "Roland",
    description:
      "The GP-3 is the most compact and affordable grand in the acclaimed GP series, bringing you premium piano performance in a unique low-profile design that makes a statement in any living space. Roland's modern features and benefits are infused throughout, from the organic piano sound engine and responsive hammer-action keyboard to onboard recording, BluetoothÂ® audio/MIDI connectivity, and deep integration with the Roland Piano App. If you've always wanted a grand piano but thought you didn't have the space or budget to make it happen, the GP-3 turns your dream into reality.",
    price: 13990,
    oriPrice: 15990,
    rating: 5,
    quantity: 3,
    specs:
      "No. of Keys: 88 keys;Type of Keys: Piano Reality Standard Keyboard with Escapement, Ivory Feel, and Dynamic Sensor Acceleration Technology;Max. Polyphony: 256 voices;Piano Sound: Piano Reality Standard Sound Engine;Touch Response: 5 types, fixed touch;Effects: Ambience, Brilliance;Number of Tones: 285;Built-in Songs: 394 songs;Lesson Function: 287 songs (Scale, Hanon, Beyer, Burgmuller, Czerny 100);Pedal: Damper (Piano Reality Standard Pedal, capable of continuous detection), Soft (capable of continuous detection, function assignable), Sostenuto (function assignable);Recorder: Standard MIDI Files (Format 0, 1 parts, Approx. 70,000 notes memory);Connectors: DC In jack, USB Computer port: USB B type (supports USB MIDI/AUDIO), USB Memory port: USB A type, Phones jack x 2: Stereo miniature phone type, Stereo 1/4-inch phone type;Convenient Functions: Metronome (adjustable Tempo/Beat/Volume), Dual, TwinPiano, Transpose (in semitones), Speaker volume and Headphones volume automatically select function, Speaker Auto Mute, Auto Off;App: Roland Piano App;Bluetooth: Bluetooth Ver 4.2, Profile: A2DP (Audio), GATT (MIDI over Bluetooth Low Energy), CODEC: SBC (Supports SCMS-T content protection);Sound System: Piano Reality Standard Sound System;Speakers: Two - 12 cm (4-3/4 inches);Headphones: Piano Reality Headphones Ambience;Cabinet: Piano Reality Cabinet Design, Music rest: Fixed angle, with Music holders, Keyboard cover: Slide type;Power Supply: AC adaptor;Power Consumption: 10 W (When using the included AC adaptor);Dimensions: 1,394 mm (W) Ã— 698 mm (D) Ã— 1214 mm (H) with music rest;Weight: 57.3 kg / 126 lbs 6 oz",
  },
  {
    id: "ROLD-001",
    imgSrc: "/products/roland_td_27KV2_bundle.png",
    name: "Roland TD-27KV2 (Version 2) Digital Drum Kit, Bundle Set",
    category: "Drum",
    brand: "Roland",
    description:
      "When you need an expressive drum kit for recording and rehearsal duties, the TD-27KV2 V-Drums delivers. With generously sized pads all around, there's plenty of space to get comfortable behind the kit. Then there's the natural and superior expression that you only get from Roland's unique digital snare, hi-hat, and ride pads. And it's all hooked up to the updated TD-27 module, complete with new preset kits, effects, and processing capabilitiesâ€”based on the same technology found in Roland's flagship TD-50X. Practice with songs via wireless BluetoothÂ® audio. Record up to 28 channels of audio through a single USB cable, and then take your sound out on the road with assignable direct audio outputs. Whether practising, recording, rehearsing, or gigging, a drummer's life is a busy oneâ€”so pick the kit that can do it all.",
    price: 17990,
    oriPrice: 19990,
    rating: 5,
    quantity: 3,
    specs:
      "Extra Trigger Input Jack: 4 (AUX1-AUX3, CRASH 2);Included Accessories: Sound module mount, AC adaptor, Special connection cable, Connection cable (Crash2), Drum key, Setup Guide, Owner's manuals;Dimensions: 1,550mm (W) x 1,200mm (D) x 1,200mm (H) including Kick pad, Cymbals, Hi-hat stand and Drum throne;Weight: 33 kg / 72 lbs 13 oz",
  },
  {
    id: "FNDG-005",
    imgSrc: "/products/fender_70th_ultra_st_maple_fB_amethyst.png",
    name: "Fender 70th Anniversary Ultra Stratocaster Electric Guitar, Maple FB, Amethyst",
    category: "Guitar",
    brand: "Fender",
    description:
      'Experience elevated tones and playability with the 70th Anniversary American Ultra Stratocaster HSS. An incredible sight to behold, the lustrous and pearly iridescent Amethyst finish dances across the alder body\'s sculpted contours - changing colours before your very eyes. The 70th Anniversary American Ultra Stratocaster HSS features a unique "Modern D" neck profile with ultra-rolled fingerboard edges for hours of playing comfort. Roasted maple ensures absolute stability and enhanced resonance, while the tapered neck heel allows easy access to the highest register. A speedy 10"-14" compound-radius fingerboard and 22 medium-jumbo frets provide effortless playability across the entire neck. The 70th Anniversary Ultra Noiseless™ Strat® pickups and 70th Anniversary Ultra Quadra Tap™ Humbucker, along with advanced wiring options, provide endless tonal possibilities - with pristine clarity and no hum. Other key features include an Ultra 2-point tremolo bridge, sealed locking tuning machines, chrome hardware and bone nut. Includes vintage-style Black Tweed case. The 70th Anniversary American Ultra Stratocaster HSS: a versatile, state-of-the-art instrument designed to push your playing to new heights.',
    price: 14129,
    oriPrice: 17999,
    rating: 5,
    quantity: 6,
    specs:
      'Body Shape: Stratocaster®; Body Material: Alder; Body Finish: Gloss Urethane; Neck Profile: Modern "D"; Fretboard Material: Maple; Fretboard Radius: 10" to 14" Compound Radius (254 mm to 355.6 mm); Scale Length: 25.5" (64.77 cm); No. of Frets: 22 Medium Jumbo Frets; Fretboard Inlays: Black Pearloid Dots; Pickups: 70th Anniversary Ultra Quadra Tap™ Humbucker (Bridge), 70th Anniversary Ultra Noiseless™ Strat® (Middle), 70th Anniversary Ultra Noiseless™ Strat® (Neck); Bridge: 2-Point Deluxe Synchronized Tremolo with Pop-In Arm; Pickguard: 3-Ply Black/White/Black; Strings: Fender® USA 250L Nickel Plated Steel (.009-.042 Gauges), PN 0730250403; Tuning Machines: Deluxe Cast/Sealed Locking (all short posts); Hardware Finish: Nickel/Chrome; Case: Deluxe Black Tweed Hardshell with Embroidered 70th Anniversary Logo',
  },
  {
    id: "FNDG-018",
    imgSrc: "/products/fender_am_acous_st_natural.png",
    name: "Fender American Acoustasonic Stratocaster with Bag, Natural",
    category: "Guitar",
    brand: "Fender",
    description:
      "The American Acoustasonic™ Stratocaster® continues to embody the spirit of purposeful innovation that drives Fender guitars. The power of the Fender and Fishman®-designed Acoustic Engine is sure to deliver true inspiration. From acoustic shapeshifting to electric rhythm tones, this extremely versatile guitar creates a brand-new lane on the sonic highway.",
    price: 10109,
    oriPrice: 11999,
    rating: 5,
    quantity: 3,
    specs:
      'Body Shape: Modified Stratocaster®;Body Material: Solid A Sitka Spruce (Top), Mahogany (Back & Sides);Body Colour: Natural;Body Finish: Polyester Satin Matte;Neck Profile: Modern "Deep C";Fretboard Material: Ebony;Fretboard Radius: 12" (305 mm);Scale Length: 25.5" (648 mm);No. of Frets: 22;Fretboard Inlays: White Dot;Pickup(s): 3-pickup configuration: Under-Saddle Piezo/Internal Body Sensor/N4 Magnetic;Bridge: Modern Asymmetrical;Pickguard: None;Strings: Fender® Dura-Tone® 860CL Coated Phosphor Bronze (.011-.052 Gauge);Tuning Machines: Fender® Standard Cast/Sealed Staggered;Hardware Finish: Chrome;Case: 1225 Deluxe Gig Bag',
  },
];

function renderStars(rating: number) {
  const totalStars = 5;
  const stars = [];
  for (let i = 1; i <= totalStars; i++) {
    stars.push(
      <span key={i} className={i <= rating ? "filled-star" : "unfilled-star"}>
        {i <= rating ? "★" : "☆"}
      </span>
    );
  }
  return stars;
}

function getStockStatus(quantity: number) {
  if (quantity === 0) {
    return { text: "Out of stock", color: "red" };
  } else if (quantity > 0 && quantity <= 5) {
    return { text: "Low in stock", color: "orange" };
  } else {
    return { text: "Available", color: "green" };
  }
}

function DealsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("Latest");
  const productSectionRef = useRef<HTMLDivElement>(null);

  const sortedProducts = useMemo(() => {
    const sorted = [...dealsProducts];
    if (sortOrder === "Latest") {
      sorted.reverse();
    } else if (sortOrder === "Price (Low to High)") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "Price (High to Low)") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortOrder === "Most Popular") {
      sorted.sort((a, b) => b.rating - a.rating);
    }
    return sorted;
  }, [sortOrder]);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const currentPageProducts = sortedProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE
  );

  return (
    <>
      <div className="deals-section">
        <NavBar />
        <SearchBar />
        <h2>Deals</h2>
        <div className="deals-banner">
          <img
            src="/assets/DealsPage.webp"
            alt="Deals"
            className="banner-image"
          />
          <div className="banner-info">
            <h3 className="hot-deals">Our Ultimate Hot Deals!</h3>
            <p>
              Dive into our exclusive collection of musical instruments and
              accessories featuring unbeatable prices. From discontinued models
              to brand-new items still in their boxes, every piece is priced to
              move fast. This is your chance to snag that guitar, keyboard, or
              drum set you've been eyeing at a fraction of the cost!
            </p>
          </div>
        </div>
      </div>
      <div className="product-section" ref={productSectionRef}>
        <div className="filter">
          <p style={{ textAlign: "right" }}>Sort by</p>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="sort"
          >
            <option value="Most Popular">Most Popular</option>
            <option value="Latest">Latest</option>
            <option value="Price (Low to High)">Price (Low to High)</option>
            <option value="Price (High to Low)">Price (High to Low)</option>
          </select>
        </div>
        <div className="product-grid">
          {currentPageProducts.map((product) => (
            <Link
              to={`/product/${product.name.replace(/ /g, "-").toLowerCase()}`}
              state={{ product: { ...product, originalPrice: undefined } }}
              key={product.id}
              style={{ textDecoration: "none", color: "#000000" }}
            >
              <div className="product-section-card">
                <img
                  src={product.imgSrc}
                  alt={product.name}
                  style={{ width: "100%", height: "auto" }}
                />
                <div className="product-grid-info">
                  <h2>{product.name}</h2>
                  <p className="price">
                    RM{" "}
                    {product.price.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                    <p
                      style={{
                        textDecoration: "line-through",
                        color: "red",
                        fontSize: "1rem",
                        marginTop: "0.5rem",
                      }}
                    >
                      RM{" "}
                      {product.oriPrice.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </p>
                  <div className="rating">{renderStars(product.rating)}</div>
                  <div
                    className="stock-status"
                    style={{
                      color: getStockStatus(product.quantity).color,
                    }}
                  >
                    {getStockStatus(product.quantity).text}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="pagination">
          <button onClick={handlePrevious} disabled={currentPage <= 1}>
            Previous
          </button>
          <button onClick={handleNext} disabled={currentPage >= totalPages}>
            Next
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default DealsPage;
