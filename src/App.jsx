import React, { useEffect, useMemo, useState } from "react";

const formatCurrency = (value) =>
  typeof value === "number" ? `₦${value.toLocaleString("en-NG")}` : "";

const CART_STORAGE_KEY = "princeFarmCart";
const ORDER_REF_STORAGE_KEY = "princeFarmOrderRef";

const FORM_ENDPOINT_GENERAL = "https://formspree.io/f/mgonpadj";
const FORM_ENDPOINT_JOBS = "https://formspree.io/f/mjgapylr";

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

const jobOpenings = [
  {
    title: "Poultry Attendant",
    openings: null,
    location: "Gbongan, Osun State",
    schedule: "Full-time",
    responsibilities: [
      "Feeding and watering birds",
      "Cleaning pens and equipment",
      "Basic record keeping and reporting",
    ],
  },
  {
    title: "Bookkeeper",
    openings: null,
    location: "Gbongan, Osun State",
    schedule: "Full-time",
    responsibilities: [
      "Daily sales and expense records",
      "Stock and production records support",
      "Weekly/monthly reporting",
    ],
  },
  {
    title: "Farm Worker / Laborer",
    openings: null,
    location: "Gbongan, Osun State",
    schedule: "Full-time",
    responsibilities: [
      "General farm support and handling tasks",
      "Loading/offloading and facility upkeep",
      "Assisting with harvest/produce handling when needed",
    ],
  },
  {
    title: "Cleaner",
    openings: null,
    location: "Gbongan, Osun State",
    schedule: "Full-time",
    responsibilities: [
      "Maintain clean office/store areas",
      "Sanitation support around work spaces",
      "General housekeeping duties",
    ],
  },
];

const contactInfo = {
  phones: ["+234 806 022 2377", "+234 788 697 0951"],
  whatsapp: "+1 (571) 275-8420",
  email: "Christopheradebiyi@yahoo.com",
  address:
    "Iwaro Village, New Gbongan / Ife Express Road, Gbongan, Osun State, Nigeria.",
};

function App() {
  const [cart, setCart] = useState(() => {
    if (typeof window === "undefined") return {};
    try {
      const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);
      if (!storedCart) return {};
      const parsed = JSON.parse(storedCart);
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch {
      return {};
    }
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [applyOpen, setApplyOpen] = useState(false);
  const [applyRole, setApplyRole] = useState("");
  const [orderRef, setOrderRef] = useState(() => {
    if (typeof window === "undefined") {
      return `PF-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    }
    try {
      const storedRef = window.localStorage.getItem(ORDER_REF_STORAGE_KEY);
      if (storedRef) return storedRef;
    } catch {
      // ignore read error, fall through to new ref
    }
    return `PF-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  });

  const jobRoles = useMemo(() => jobOpenings.map((job) => job.title), []);
  const [statusOpen, setStatusOpen] = useState(false);
  const [statusTitle, setStatusTitle] = useState("Sent");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      if (orderRef) {
        window.localStorage.setItem(ORDER_REF_STORAGE_KEY, orderRef);
      }
    } catch {
      // ignore storage errors
    }
  }, [cart, orderRef]);

  useEffect(() => {
    if (!applyOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setApplyOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [applyOpen]);

  useEffect(() => {
    if (!statusOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setStatusOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [statusOpen]);

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

  const submitToFormspree = async ({ endpoint, form, extraFields = {} }) => {
    const fd = new FormData(form);
    Object.entries(extraFields).forEach(([key, value]) => {
      if (value !== undefined && value !== null) fd.set(key, String(value));
    });

    const res = await fetch(endpoint, {
      method: "POST",
      body: fd,
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      let message = "Please try again in a moment.";
      try {
        const data = await res.json();
        if (data?.errors?.length) {
          message = data.errors.map((e) => e.message).join(" ");
        }
      } catch {
        // ignore parse errors
      }
      throw new Error(message);
    }
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
          <a href="#jobs">Jobs</a>
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
              <div className="cart-payment">
                <p className="cart-payment-title">Bank transfer details</p>
                <p className="cart-payment-text">
                  <strong>Account name:</strong> Christopher Adebiyi
                  <br />
                  <strong>Bank:</strong> Zenith Bank
                  <br />
                  <strong>Account number:</strong> 2179352465
                </p>
                <p className="cart-payment-ref">
                  <span className="label">Order reference</span>
                  <span className="value">{orderRef}</span>
                </p>
                <p className="cart-payment-note">
                  Please put this reference in your transfer description and
                  send proof of payment with your name and this reference to our
                  WhatsApp numbers on the Contact section so we can verify
                  payment.
                </p>
                <button
                  type="button"
                  className="btn btn-outline btn-small cart-clear"
                  onClick={() => {
                    setCart({});
                    const freshRef = `PF-${Math.random()
                      .toString(36)
                      .slice(2, 8)
                      .toUpperCase()}`;
                    setOrderRef(freshRef);
                  }}
                >
                  Clear cart after payment
                </button>
              </div>
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
          <div className="grid products-grid">
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

        <section id="jobs" className="section section-alt">
          <div className="section-header">
            <h2>Employment Opportunities</h2>
            <p>
              We occasionally recruit dependable people to join our team. To
              apply, click “Apply” and fill the form.
            </p>
          </div>
          <div className="grid">
            {jobOpenings.map((job) => (
              <article key={job.title} className="card job-card">
                <header className="job-card-header">
                  <h3>{job.title}</h3>
                  <span className="job-pill">
                    {typeof job.openings === "number"
                      ? `${job.openings} opening${job.openings === 1 ? "" : "s"}`
                      : "Open role"}
                  </span>
                </header>
                <div className="job-meta">
                  <span>{job.location}</span>
                  <span>•</span>
                  <span>{job.schedule}</span>
                </div>
                <ul className="job-list">
                  {job.responsibilities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="card-actions">
                  <button
                    type="button"
                    className="btn btn-primary btn-small"
                    onClick={() => {
                      setApplyRole(job.title);
                      setApplyOpen(true);
                    }}
                  >
                    Apply
                  </button>
                </div>
              </article>
            ))}
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
                  <li>
                    <span className="whatsapp-icon">🟢</span>{" "}
                    {contactInfo.whatsapp} (WhatsApp)
                  </li>
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
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget;
                try {
                  await submitToFormspree({
                    endpoint: FORM_ENDPOINT_GENERAL,
                    form,
                    extraFields: {
                      _subject: "Prince Farm - Contact message",
                      orderRef,
                    },
                  });
                  form.reset();
                  setStatusTitle("Message sent");
                  setStatusMessage(
                    "Thanks for reaching out. We’ve received your message and will respond shortly."
                  );
                  setStatusOpen(true);
                } catch (err) {
                  setStatusTitle("Not sent");
                  setStatusMessage(
                    `We could not send your message. ${err?.message || ""}`.trim()
                  );
                  setStatusOpen(true);
                }
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

      {applyOpen && (
        <>
          <button
            type="button"
            className="modal-backdrop"
            onClick={() => setApplyOpen(false)}
            aria-label="Close application form"
          />
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-label="Job application form"
          >
            <div className="modal-header">
              <h3>Apply for a Job</h3>
              <button
                type="button"
                className="modal-close"
                onClick={() => setApplyOpen(false)}
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <form
              className="modal-form"
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget;
                try {
                  await submitToFormspree({
                    endpoint: FORM_ENDPOINT_JOBS,
                    form,
                    extraFields: {
                      _subject: "Prince Farm - Job application",
                      orderRef,
                    },
                  });
                  form.reset();
                  setApplyOpen(false);
                  setStatusTitle("Application sent");
                  setStatusMessage(
                    "Your application has been received. We’ll contact you if you’re shortlisted."
                  );
                  setStatusOpen(true);
                } catch (err) {
                  setStatusTitle("Not sent");
                  setStatusMessage(
                    `We could not submit your application. ${err?.message || ""}`.trim()
                  );
                  setStatusOpen(true);
                }
              }}
            >
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
                  Email
                  <input type="email" name="email" required />
                </label>
              </div>
              <div className="form-row">
                <label>
                  Role
                  <select
                    name="jobRole"
                    value={applyRole}
                    onChange={(e) => setApplyRole(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select a role
                    </option>
                    {jobRoles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                </label>
              </div>
              <div className="form-row">
                <label>
                  Message
                  <textarea
                    name="message"
                    rows="4"
                    placeholder="Tell us about your experience and availability."
                    required
                  />
                </label>
              </div>
              <button type="submit" className="btn btn-primary btn-full">
                Submit Application
              </button>
              <p className="form-note">
                All listed roles are currently <strong>Full-time</strong>.
              </p>
            </form>
          </div>
        </>
      )}

      {statusOpen && (
        <>
          <button
            type="button"
            className="modal-backdrop"
            onClick={() => setStatusOpen(false)}
            aria-label="Close message"
          />
          <div className="modal modal-status" role="dialog" aria-modal="true">
            <div className="modal-header">
              <h3>{statusTitle}</h3>
              <button
                type="button"
                className="modal-close"
                onClick={() => setStatusOpen(false)}
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <p className="status-text">{statusMessage}</p>
            <div className="status-actions">
              <button
                type="button"
                className="btn btn-primary btn-full"
                onClick={() => setStatusOpen(false)}
              >
                OK
              </button>
            </div>
          </div>
        </>
      )}

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
