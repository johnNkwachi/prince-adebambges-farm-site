import React, { useState } from "react";

const formatCurrency = (value) =>
  typeof value === "number" ? `₦${value.toLocaleString("en-NG")}` : "";

const products = [
  {
    name: "Chicken Eggs",
    image:
      "https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=800",
    highlight: "Fresh table eggs from healthy layers.",
    details: "Available for retailers, hotels, bakeries and households.",
    tags: ["Retail", "Wholesale"],
    retailPrice: "₦5,000 / crate",
    wholesalePrice: "₦4,900 / crate",
    unitPrice: 5000,
  },
  {
    name: "Whole Live Broilers",
    image: "/images/broilers.jpg",
    highlight: "Well–fed broilers with excellent meat yield.",
    details: "Ideal for occasions, restaurants and large buyers.",
    tags: ["Live broilers", "Bulk orders"],
    retailPrice: "₦15,000 / bird",
    wholesalePrice: "Talk to us for bulk pricing",
    unitPrice: 15000,
  },
  {
    name: "Whole Live Chickens",
    image: "/images/Whole Live Chickens.jpg",
    highlight: "Strong, healthy local and improved breeds.",
    details: "For home consumption and ceremonies.",
    tags: ["Live birds"],
    retailPrice: "₦14,000 / bird",
    wholesalePrice: "Discounts available for volume orders",
    unitPrice: 14000,
  },
  {
    name: "Plantain, Banana & Palm Oil",
    images: ["/images/plantain.jpg", "/images/oil.jpg"],
    highlight: "Farm–fresh plantain, banana and premium palm oil.",
    details: "Available in bulk on request.",
    tags: [],
    retailPrice: "Price varies with market rate",
    wholesalePrice: "Call for current bulk prices",
    unitPrice: null,
  },
  {
    name: "Pigs, Goats & Rabbits",
    image: "/images/images.jpg",
    highlight: "Healthy livestock raised under good welfare conditions.",
    details: "Breeding stock and meat animals available.",
    tags: ["Livestock"],
    retailPrice: "Price on request",
    wholesalePrice: "Custom quotes for large orders",
    unitPrice: null,
  },
];

const services = [
  {
    title: "Broiler & Layer Production",
    description:
      "We run large–scale production of broilers and layers for consistent supply of quality meat and eggs all year round.",
    icon: "🐔",
  },
  {
    title: "Distribution & Logistics",
    description:
      "Reliable distribution of eggs and meat to wholesalers, retailers, supermarkets, hotels and caterers.",
    icon: "🚚",
  },
  {
    title: "Farm Produce Sales",
    description:
      "Sales of pigs, rabbits, goats and other farm produce directly from the farm at competitive prices.",
    icon: "🌾",
  },
  {
    title: "Investment & Advisory Services",
    description:
      "Practical advice on farm investment decisions, cost saving strategies and financial risk management.",
    icon: "📊",
  },
  {
    title: "Breeding & Hatchery",
    description:
      "Breeding and hatchery services to support farmers that need quality day–old chicks and point–of–lay birds.",
    icon: "🐣",
  },
  {
    title: "Training for Beginners",
    description:
      "Hands–on training for beginners in poultry and livestock farming — from housing to feeding, health and marketing.",
    icon: "🎓",
  },
];

const contactInfo = {
  phones: ["+234 806 022 2377", "+234 788 697 0951", "+571 275 8420"],
  email: "christopheradebiyi@example.com",
  address:
    "Iwaro Village, New Gbongan / Ife Express Road, Gbongan, Osun State, Nigeria.",
};

function App() {
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);

  const totalItemsInCart = Object.values(cart).reduce(
    (sum, qty) => sum + qty,
    0
  );

  const increaseQty = (productName) => {
    setCart((prev) => ({
      ...prev,
      [productName]: (prev[productName] || 0) + 1,
    }));
  };

  const decreaseQty = (productName) => {
    setCart((prev) => {
      const current = prev[productName] || 0;
      if (current <= 1) {
        const { [productName]: _removed, ...rest } = prev;
        return rest;
      }
      return { ...prev, [productName]: current - 1 };
    });
  };

  return (
    <div className="page">
      <header className="nav">
        <div className="nav-brand">
          <div className="logo-triangle">
            <span className="logo-inner">🐔</span>
          </div>
          <div>
            <div className="brand-title">Prince Adebamgbe&apos;s Farm</div>
            <div className="brand-subtitle">
              Breeding · Hatchery · Farm Produce
            </div>
          </div>
        </div>
        <nav className="nav-links">
          <a href="#products">Products</a>
          <a href="#services">Services</a>
          <a href="#training">Training</a>
          <a href="#about">About</a>
          <a href="#contact" className="nav-cta">
            Contact
          </a>
          <button
            type="button"
            className="cart-pill"
            onClick={() => setCartOpen((open) => !open)}
          >
            <span className="cart-icon">🛒</span>
            <span className="cart-label">
              Cart{" "}
              <span className="cart-count">
                {totalItemsInCart > 99 ? "99+" : totalItemsInCart}
              </span>
            </span>
          </button>
        </nav>
        {cartOpen && totalItemsInCart > 0 && (
          <>
            <button
              type="button"
              className="cart-backdrop"
              onClick={() => setCartOpen(false)}
              aria-label="Close cart"
            />
            <div className="cart-dropdown">
              <div className="cart-dropdown-header">
                <h4>Cart</h4>
                <button
                  type="button"
                  className="cart-close-btn"
                  onClick={() => setCartOpen(false)}
                  aria-label="Close cart"
                >
                  ×
                </button>
              </div>
              <ul>
                {Object.entries(cart).map(([name, qty]) => (
                  <li key={name} className="cart-item">
                    <div className="cart-item-main">
                      <span className="cart-item-name">{name}</span>
                      <div className="qty-row">
                        <button
                          type="button"
                          className="qty-btn"
                          onClick={() => decreaseQty(name)}
                        >
                          −
                        </button>
                        <span className="qty-value">{qty}</span>
                        <button
                          type="button"
                          className="qty-btn"
                          onClick={() => increaseQty(name)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="cart-item-pricing">
                      {(() => {
                        const product = products.find((p) => p.name === name);
                        const unit = product?.unitPrice ?? null;
                        if (unit) {
                          const total = unit * qty;
                          return (
                            <>
                              <span className="cart-item-unit">
                                {formatCurrency(unit)} ea
                              </span>
                              <span className="cart-item-total">
                                {formatCurrency(total)}
                              </span>
                            </>
                          );
                        }
                        return (
                          <span className="cart-item-unit">
                            Contact for price
                          </span>
                        );
                      })()}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </header>

      <main>
        <section className="hero">
          <div className="hero-text">
            <h1>
              Fresh Eggs, Quality Meat &amp; Trusted Farm Services in{" "}
              <span className="accent">Osun State</span>
            </h1>
            <p>
              Prince Adebamgbe&apos;s Farm is your reliable source for chicken eggs,
              live broilers and chickens, livestock and farm produce — backed by
              professional breeding, hatchery and training services.
            </p>
            <div className="hero-actions">
              <a href="#products" className="btn btn-primary">
                View Products
              </a>
              <a href="#contact" className="btn btn-outline">
                Talk to Us
              </a>
            </div>
            <div className="hero-highlights">
              <span>✔ Large–scale production</span>
              <span>✔ Reliable delivery</span>
              <span>✔ Expert advisory &amp; training</span>
            </div>
          </div>
          <div className="hero-panel">
            <div className="hero-stats">
              <div>
                <strong>Eggs</strong>
                <span>Retail &amp; wholesale supply</span>
              </div>
              <div>
                <strong>Livestock</strong>
                <span>Pigs · Goats · Rabbits</span>
              </div>
              <div>
                <strong>Produce</strong>
                <span>Plantain · Banana · Palm Oil</span>
              </div>
            </div>
          </div>
        </section>

        <section id="products" className="section">
          <div className="section-header">
            <h2>Our Products</h2>
            <p>
              High–quality poultry and farm produce available for individuals,
              retailers, hotels, caterers and bulk buyers.
            </p>
          </div>
          <div className="grid">
            {products.map((product) => (
              <article key={product.name} className="card">
                {(product.images && product.images.length > 0) || product.image ? (
                  <div className="card-image-wrap">
                    {product.images && product.images.length > 0
                      ? product.images.map((src) => (
                          <img
                            key={src}
                            src={src}
                            alt={product.name}
                            className="card-image"
                            loading="lazy"
                          />
                        ))
                      : (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="card-image"
                          loading="lazy"
                        />
                      )}
                  </div>
                ) : null}
                <header className="card-header">
                  <h3>{product.name}</h3>
                  {product.tags && product.tags.length > 0 && (
                    <div className="tags">
                      {product.tags.map((tag) => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </header>
                <p className="card-highlight">{product.highlight}</p>
                <p className="card-details">{product.details}</p>
                <div className="prices">
                  <div>
                    <span className="label">Retail</span>
                    <strong>{product.retailPrice}</strong>
                  </div>
                  <div>
                    <span className="label">Wholesale</span>
                    <strong>{product.wholesalePrice}</strong>
                  </div>
                </div>
                <div className="card-actions">
                  <button
                    type="button"
                    className="btn btn-primary btn-small"
                    onClick={() => increaseQty(product.name)}
                  >
                    Add to cart
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="services" className="section section-alt">
          <div className="section-header">
            <h2>Our Services</h2>
            <p>
              Beyond selling products, we partner with farmers, investors and
              businesses through reliable services designed around your needs.
            </p>
          </div>
          <div className="grid">
            {services.map((service) => (
              <article key={service.title} className="card card-soft">
                <header className="service-header">
                  <div className="service-icon">{service.icon}</div>
                  <h3>{service.title}</h3>
                </header>
                <p className="card-details">{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="training" className="section training-section">
          <div className="training-content">
            <h2>Training &amp; Advisory for Beginners and Investors</h2>
            <p>
              Whether you are starting your first poultry farm or expanding an
              existing operation, we provide practical training and clear
              financial guidance to help you succeed.
            </p>
            <ul className="list">
              <li>Farm design, housing and stocking density</li>
              <li>Feeding, health management and biosecurity</li>
              <li>Cost control, record‑keeping and profitability</li>
              <li>Market access, pricing and risk management</li>
            </ul>
            <a href="#contact" className="btn btn-primary">
              Book Training or Consultation
            </a>
          </div>
        </section>

        <section id="about" className="section">
          <div className="section-header">
            <h2>About Prince Adebamgbe&apos;s Farm</h2>
          </div>
          <div className="about-layout">
            <div>
              <p>
                Prince Adebamgbe&apos;s Farm is a growing agricultural enterprise
                located in Gbongan, Osun State. Our focus is on sustainable
                poultry production, breeding and hatchery, as well as livestock
                and crop produce for the local and regional market.
              </p>
              <p>
                We combine practical on–farm experience with sound financial and
                risk–management principles, making us a trusted partner for
                families, retailers, investors and aspiring farmers.
              </p>
            </div>
            <div className="about-highlight">
              <h3>Breeding &amp; Hatchery</h3>
              <p>
                From parent stock to day–old chicks, we pay attention to genetic
                quality, vaccination, feeding and handling to deliver strong,
                productive birds that perform well on your farm.
              </p>
            </div>
          </div>
        </section>

        <section id="contact" className="section section-alt">
          <div className="section-header">
            <h2>Contact &amp; Orders</h2>
            <p>
              Reach out for product orders, delivery, training schedules or
              advisory sessions. We respond quickly and professionally.
            </p>
          </div>
          <div className="contact-layout">
            <div className="contact-details">
              <h3>Talk to Us Directly</h3>
              <div className="contact-block">
                <span className="label">Phone / WhatsApp</span>
                <ul>
                  {contactInfo.phones.map((phone) => (
                    <li key={phone}>{phone}</li>
                  ))}
                </ul>
              </div>
              <div className="contact-block">
                <span className="label">Email</span>
                <p>{contactInfo.email}</p>
              </div>
              <div className="contact-block">
                <span className="label">Farm Address</span>
                <p>{contactInfo.address}</p>
              </div>
            </div>

            <form
              className="contact-form"
              onSubmit={(e) => {
                e.preventDefault();
                alert(
                  "Thank you! Please configure form handling (e.g. email or API)."
                );
              }}
            >
              <h3>Send a Message</h3>
              <div className="form-row">
                <label>
                  Full Name
                  <input type="text" name="name" required />
                </label>
              </div>
              <div className="form-row">
                <label>
                  Phone Number
                  <input type="tel" name="phone" required />
                </label>
              </div>
              <div className="form-row">
                <label>
                  Email (optional)
                  <input type="email" name="email" />
                </label>
              </div>
              <div className="form-row">
                <label>
                  What do you need?
                  <select name="need" defaultValue="products">
                    <option value="products">
                      Buy products (eggs, birds, produce)
                    </option>
                    <option value="delivery">Delivery / logistics</option>
                    <option value="training">Training</option>
                    <option value="advisory">Investment / advisory</option>
                    <option value="other">Other enquiry</option>
                  </select>
                </label>
              </div>
              <div className="form-row">
                <label>
                  Message
                  <textarea name="message" rows="4" required />
                </label>
              </div>
              <button type="submit" className="btn btn-primary btn-full">
                Send Message
              </button>
              <p className="form-note">
                You can also call or message us on WhatsApp using the phone
                numbers on this page.
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>
          © {new Date().getFullYear()} Prince Adebamgbe&apos;s Farm. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
