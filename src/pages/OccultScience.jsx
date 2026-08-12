import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  LuCompass as Compass,
  LuHeart as Heart,
  LuInfinity as InfinityIcon,
  LuWaves as Waves,
  LuHourglass as Hourglass,
  LuSparkles as Sparkles,
} from "react-icons/lu";
import krsnaImage from "../assets/Krsna.jpg";
import sharanagatiQrCode from "../assets/Sharanagati QRCode.jpeg";

const ROBOTS_META_NAME = "robots";

const questionCards = [
  {
    title: "Life Purpose",
    description: "Reflect on direction, meaning and what feels aligned in this season of life.",
    icon: Compass,
  },
  {
    title: "Relationships",
    description: "Explore connection dynamics, communication and emotional patterns.",
    icon: Heart,
  },
  {
    title: "Repeating Patterns",
    description: "Notice experiences and inner loops that seem to return over time.",
    icon: InfinityIcon,
  },
  {
    title: "Emotional Themes",
    description: "Bring awareness to feelings and beliefs that ask for gentle attention.",
    icon: Waves,
  },
  {
    title: "Life Transitions",
    description: "Find perspective during uncertainty, endings and new beginnings.",
    icon: Hourglass,
  },
  {
    title: "Spiritual Growth",
    description: "Explore your inner journey through grounded, personal reflection.",
    icon: Sparkles,
  },
];

const processSteps = [
  {
    index: "01",
    title: "Your Questions",
    description: "You arrive with the questions or themes you'd like to explore.",
  },
  {
    index: "02",
    title: "The Reading",
    description: "Tamanna facilitates a guided Akashic Reading.",
  },
  {
    index: "03",
    title: "The Exploration",
    description: "Insights and themes are explored together.",
  },
  {
    index: "04",
    title: "The Reflection",
    description: "You take away perspectives to contemplate and integrate into your life.",
  },
];

const initialForm = {
  session: "Akashic Reading",
  format: "Online",
  date: "",
  time: "",
  name: "",
  email: "",
  phone: "",
  focus: "",
  transactionId: "",
};

const OccultScience = () => {
  const API_URL = (
    import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || ""
  ).replace(/\/$/, "");
  const apiUrl = (path) => `${API_URL}${path}`;

  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingStep, setBookingStep] = useState("details");
  const [form, setForm] = useState(initialForm);
  const [paymentAttachment, setPaymentAttachment] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const previousTitle = document.title;
    const existingRobotsMeta = document.querySelector(`meta[name="${ROBOTS_META_NAME}"]`);
    const robotsMeta = existingRobotsMeta || document.createElement("meta");
    const previousRobotsContent = existingRobotsMeta?.getAttribute("content") || "";

    document.title = "Occult Science";

    if (!existingRobotsMeta) {
      robotsMeta.setAttribute("name", ROBOTS_META_NAME);
      document.head.appendChild(robotsMeta);
    }

    robotsMeta.setAttribute("content", "noindex, nofollow");

    return () => {
      document.title = previousTitle;

      if (existingRobotsMeta) {
        robotsMeta.setAttribute("content", previousRobotsContent);
        return;
      }

      robotsMeta.remove();
    };
  }, []);

  const handleBookingSubmit = async (event) => {
    event.preventDefault();
    if (bookingStep === "details") {
      setBookingStep("payment");
      return;
    }

    if (!paymentAttachment) {
      setSubmitError("Please upload your payment attachment before submitting.");
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError("");

      const payload = new FormData();
      payload.append("session", form.session);
      payload.append("format", form.format);
      payload.append("date", form.date);
      payload.append("time", form.time);
      payload.append("name", form.name);
      payload.append("email", form.email);
      payload.append("phone", form.phone);
      payload.append("focus", form.focus);
      payload.append("transactionId", form.transactionId);
      payload.append("paymentAttachment", paymentAttachment);

      const response = await fetch(apiUrl("/api/occult/bookings"), {
        method: "POST",
        body: payload,
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.message || "Unable to submit booking request");
      }

      setSubmitted(true);
      setBookingStep("details");
      setForm(initialForm);
      setPaymentAttachment(null);
    } catch (error) {
      setSubmitError(error.message || "Unable to submit booking request");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-12rem)] bg-[#FFF7E0] px-4 py-12 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-4xl rounded-[2rem] border border-[rgba(212,175,55,0.22)] bg-white/70 p-8 shadow-[0_24px_80px_rgba(30,58,138,0.08)] backdrop-blur-sm sm:p-10 lg:p-12">
        <header className="border-b border-[#F59E0B]/30 pb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#F59E0B]">
            Sharanagati
          </p>
          <h1 className="animate-fade-up mt-6 max-w-3xl font-display text-[clamp(2.8rem,12vw,4rem)] font-medium leading-[1.04] text-brand-text lg:text-[clamp(3.5rem,7vw,6.5rem)]">
            Discover a deeper perspective on your journey.
          </h1>
          <p className="animate-fade-up mt-8 max-w-2xl text-base leading-relaxed text-brand-textSecondary sm:text-lg">
            Explore the Akashic Records through guided sessions designed to help you
            reflect on the questions, patterns and experiences shaping your life.
          </p>
        </header>

        <section className="mt-10" aria-labelledby="focus-areas-heading">
          <h2
            id="focus-areas-heading"
            className="text-2xl font-semibold tracking-tight text-[#1E3A8A] sm:text-3xl"
          >
            Some questions stay with us.
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
            There are moments when we want to understand not just what is happening in our lives, but why certain experiences, patterns and questions keep returning.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {questionCards.map((card) => {
              const Icon = card.icon;

              return (
                <article
                  key={card.title}
                  className="rounded-2xl border border-[#1E3A8A]/10 bg-white/80 p-5 shadow-sm transition-colors hover:border-[#F59E0B]/50"
                >
                  <div className="flex items-start gap-4">
                    <span
                      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1E3A8A]/10 text-[#1E3A8A]"
                      aria-hidden="true"
                    >
                      <Icon size={20} />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-[#1E3A8A]">{card.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-700">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-[#D4AF37]/25 bg-[#FFF7E0]/70 p-6 sm:p-8" aria-labelledby="akashic-records-heading">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative">
              <span
                className="pointer-events-none absolute -left-8 top-2 hidden h-28 w-28 rounded-full bg-[#F59E0B]/25 blur-2xl md:block"
                aria-hidden="true"
              />
              <h2
                id="akashic-records-heading"
                className="text-2xl font-semibold tracking-tight text-[#1E3A8A] sm:text-3xl"
              >
                What are the Akashic Records?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-700 sm:text-lg">
                The Akashic Records are understood within certain spiritual traditions as a subtle
                field of information associated with the journey and experiences of consciousness.
              </p>
              <p className="mt-6 text-sm leading-relaxed text-slate-600 sm:text-base">
                An Akashic Reading offers a guided space to explore questions, recurring themes and
                experiences that may be meaningful to your present journey.
              </p>
              {/* <Link
                to="/contact"
                className="mt-8 inline-flex items-center rounded-xl bg-[#1E3A8A] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#142a63] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
              >
                Learn More
              </Link> */}
            </div>

            <div className="relative h-[360px] overflow-hidden rounded-[22px] border border-[#D4AF37]/30 bg-white/85 shadow-[0_12px_36px_rgba(30,58,138,0.12)]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(245,158,11,0.2),transparent_38%),radial-gradient(circle_at_75%_82%,rgba(30,58,138,0.2),transparent_40%)]" aria-hidden="true" />
              <div className="pointer-events-none absolute inset-0 [background-size:28px_28px] [background-image:linear-gradient(to_right,rgba(30,58,138,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,58,138,0.07)_1px,transparent_1px)]" aria-hidden="true" />

              <div className="relative z-10 flex h-full flex-col justify-between p-5">
                <div className="flex items-center justify-between text-[#1E3A8A]">
                  {/* <span className="inline-flex items-center gap-2 rounded-full border border-[#1E3A8A]/20 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em]">
                    <EtherIcon size={14} aria-hidden="true" />
                    Subtle Field
                  </span> */}
                  {/* <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#F59E0B]/40 bg-[#FFF7E0]">
                    <Sparkles size={18} aria-hidden="true" />
                  </span> */}
                </div>

                <div className="mx-auto flex h-75 w-75 items-center justify-center rounded-full border border-[#1E3A8A]/20 bg-white/70 shadow-inner">
                  <img
                    src={krsnaImage}
                    alt="Krsna"
                    className="h-70 w-70 rounded-full object-cover"
                  />
                </div>

                <p className="text-xs uppercase tracking-[0.2em] text-slate-600">
                  The Supreme Instructor: Krsna
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12" aria-labelledby="process-steps-heading">
          <h2
            id="process-steps-heading"
            className="text-2xl font-semibold tracking-tight text-[#1E3A8A] sm:text-3xl"
          >
            How A Session Flows
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
            A simple, supportive structure helps you move from question to reflection.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {processSteps.map((step) => (
              <article
                key={step.index}
                className="rounded-2xl border border-[#1E3A8A]/10 bg-white/80 p-5 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <span
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1E3A8A] text-sm font-semibold text-white"
                    aria-hidden="true"
                  >
                    {step.index}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-[#1E3A8A]">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">
                      {step.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-[#1E3A8A]/10 bg-white/75 p-6 sm:p-8" aria-labelledby="meet-tamanna-heading">
          <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <h2
                id="meet-tamanna-heading"
                className="text-2xl font-semibold tracking-tight text-[#1E3A8A] sm:text-3xl"
              >
                Meet Tamanna
              </h2>
              <div className="mt-5 h-[2px] w-20 bg-[#F59E0B]/70" aria-hidden="true" />
              <p className="mt-6 text-slate-700">
                Every person&apos;s journey carries its own questions, experiences and
                patterns. My role is not to tell you what your life should look like, but to
                create a space where you can explore what lies beneath the questions you are
                already asking.
              </p>
              <p className="mt-4 text-slate-600">
                Tamanna Bhowmik is an Akashic Practitioner who facilitates guided sessions for
                individuals seeking deeper reflection, perspective and understanding around
                their personal journeys.
              </p>
              <p className="mt-4 text-sm text-slate-600">
                [Add Tamanna&apos;s biography, training and experience]
              </p>
              {/* <Link
                to="/about"
                className="mt-8 inline-flex items-center rounded-xl bg-[#1E3A8A] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#142a63] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
              >
                Read Tamanna&apos;s Story
              </Link> */}
            </div>

            <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] border border-[#D4AF37]/25 bg-white/70">
              <div
                className="pointer-events-none absolute inset-0 [background-size:30px_30px] [background-image:linear-gradient(to_right,rgba(30,58,138,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,58,138,0.08)_1px,transparent_1px)] opacity-50"
                aria-hidden="true"
              />
              <p className="absolute bottom-5 left-5 text-xs uppercase tracking-[0.2em] text-slate-500">
                Tamanna Bhowmik, Akashic Practitioner
              </p>
            </div>
          </div>
        </section>

        <section
          className="relative isolate mt-14 overflow-hidden rounded-3xl bg-[#FEF3C7] px-6 py-16 sm:px-8 lg:px-12"
          aria-labelledby="booking-cta-heading"
        >
          <span
            className="pointer-events-none absolute -bottom-20 -left-16 hidden h-56 w-56 rounded-full bg-[#1E3A8A]/10 blur-3xl sm:block"
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute right-6 top-8 hidden h-24 w-24 rounded-full bg-[#F59E0B]/20 blur-2xl sm:block"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0 [background-size:32px_32px] [background-image:linear-gradient(to_right,rgba(30,58,138,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,58,138,0.07)_1px,transparent_1px)] opacity-40"
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-4xl text-center">
            <h2
              id="booking-cta-heading"
              className="text-3xl font-semibold leading-tight text-[#1E3A8A] sm:text-4xl"
            >
              Begin with the question that&apos;s already within you.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-slate-700 sm:text-base">
              Your journey doesn&apos;t need to be figured out all at once.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <button
                type="button"
                onClick={() => {
                  setShowBookingForm(true);
                  setBookingStep("details");
                  setForm(initialForm);
                  setPaymentAttachment(null);
                  setSubmitted(false);
                  setSubmitError("");
                }}
                className="rounded-xl bg-[#1E3A8A] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#142a63] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
              >
                Book an Akashic Reading
              </button>
            </div>
          </div>
        </section>

        {showBookingForm ? (
          <section className="mt-8" aria-labelledby="booking-form-heading">
            {!submitted ? (
              <>
                <h2
                  id="booking-form-heading"
                  className="text-2xl font-semibold tracking-tight text-[#1E3A8A] sm:text-3xl"
                >
                  Request your Akashic session
                </h2>
                <p>The session will be conducted on Zoom calls.</p>

                <div className="mt-6 mx-auto max-w-4xl rounded-[18px] border border-[#D4AF37]/25 bg-white/85 p-6 shadow-[0_12px_30px_rgba(30,58,138,0.1)] sm:p-8">
                  <form className="grid gap-4 md:grid-cols-2" onSubmit={handleBookingSubmit}>
                <label className="text-sm font-semibold text-[#1E3A8A] md:col-span-2">
                  Choose a session
                  <select
                    className="mt-2 w-full rounded-xl border border-[#1E3A8A]/20 bg-white px-4 py-3 text-sm text-slate-700 outline-none ring-[#1E3A8A]/30 transition focus:ring"
                    value={form.session}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, session: event.target.value }))
                    }
                  >
                    <option>Akashic Reading</option>
                  </select>
                </label>

                <label className="text-sm font-semibold text-[#1E3A8A]">
                  Preferred format
                  <select
                    className="mt-2 w-full rounded-xl border border-[#1E3A8A]/20 bg-white px-4 py-3 text-sm text-slate-700 outline-none ring-[#1E3A8A]/30 transition focus:ring"
                    value={form.format}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, format: event.target.value }))
                    }
                  >
                    <option>Online</option>
                  </select>
                </label>

                <label className="text-sm font-semibold text-[#1E3A8A]">
                  Preferred date
                  <input
                    className="mt-2 w-full rounded-xl border border-[#1E3A8A]/20 bg-white px-4 py-3 text-sm text-slate-700 outline-none ring-[#1E3A8A]/30 transition focus:ring"
                    type="date"
                    value={form.date}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, date: event.target.value }))
                    }
                    required
                  />
                </label>

                <label className="text-sm font-semibold text-[#1E3A8A]">
                  Preferred time
                  <input
                    className="mt-2 w-full rounded-xl border border-[#1E3A8A]/20 bg-white px-4 py-3 text-sm text-slate-700 outline-none ring-[#1E3A8A]/30 transition focus:ring"
                    type="time"
                    value={form.time}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, time: event.target.value }))
                    }
                    required
                  />
                </label>

                <label className="text-sm font-semibold text-[#1E3A8A]">
                  Your name
                  <input
                    className="mt-2 w-full rounded-xl border border-[#1E3A8A]/20 bg-white px-4 py-3 text-sm text-slate-700 outline-none ring-[#1E3A8A]/30 transition focus:ring"
                    value={form.name}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, name: event.target.value }))
                    }
                    required
                  />
                </label>

                <label className="text-sm font-semibold text-[#1E3A8A]">
                  Email
                  <input
                    className="mt-2 w-full rounded-xl border border-[#1E3A8A]/20 bg-white px-4 py-3 text-sm text-slate-700 outline-none ring-[#1E3A8A]/30 transition focus:ring"
                    type="email"
                    value={form.email}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, email: event.target.value }))
                    }
                    required
                  />
                </label>

                <label className="text-sm font-semibold text-[#1E3A8A]">
                  WhatsApp / Phone
                  <input
                    className="mt-2 w-full rounded-xl border border-[#1E3A8A]/20 bg-white px-4 py-3 text-sm text-slate-700 outline-none ring-[#1E3A8A]/30 transition focus:ring"
                    value={form.phone}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, phone: event.target.value }))
                    }
                    required
                  />
                </label>

                <label className="text-sm font-semibold text-[#1E3A8A] md:col-span-2">
                  Please share your questions for the session here.
                  <textarea
                    className="mt-2 min-h-36 w-full rounded-xl border border-[#1E3A8A]/20 bg-white px-4 py-3 text-sm text-slate-700 outline-none ring-[#1E3A8A]/30 transition focus:ring"
                    value={form.focus}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, focus: event.target.value }))
                    }
                    required
                  />
                </label>

                {bookingStep === "payment" ? (
                  <div className="md:col-span-2 rounded-2xl border border-[#D4AF37]/35 bg-[#FEF3C7] p-4 sm:p-5">
                    <h3 className="text-lg font-semibold text-[#1E3A8A]">Payment Details</h3>
                    <p className="mt-2 text-sm text-slate-700">
                      Please scan the QR Code given below, complete payment, then provide the
                      transaction ID and payment attachment.
                    </p>
                      <div className="space-y-1 text-sm text-slate-700">
                        <p className="font-semibold text-[#1E3A8A]">UPI Payment</p>
                        <p>After payment, upload a screenshot and enter your transaction ID.</p>
                      </div>
                    <div className="mt-4 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                      <img
                        src={sharanagatiQrCode}
                        alt="Sharanagati payment QR code"
                        // className="h-72 w-72 border border-[#1E3A8A]/15 bg-white object-contain p-4 sm:h-80 sm:w-80"
                      />
                    </div>
                  </div>
                ) : null}

                {bookingStep === "payment" ? (
                  <>
                    <label className="text-sm font-semibold text-[#1E3A8A] md:col-span-2">
                      Transaction ID
                      <input
                        className="mt-2 w-full rounded-xl border border-[#1E3A8A]/20 bg-white px-4 py-3 text-sm text-slate-700 outline-none ring-[#1E3A8A]/30 transition focus:ring"
                        value={form.transactionId}
                        onChange={(event) =>
                          setForm((prev) => ({ ...prev, transactionId: event.target.value }))
                        }
                        required
                      />
                    </label>

                    <label className="cursor-pointer text-sm font-semibold text-[#1E3A8A] md:col-span-2">
                      Payment Attachment (Screenshot)
                      <input
                        className="mt-2 w-full cursor-pointer rounded-xl border border-[#1E3A8A]/20 bg-white px-4 py-3 text-sm text-slate-700 file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-[#1E3A8A] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
                        type="file"
                        accept="image/*"
                        onChange={(event) => {
                          const file = event.target.files?.[0] || null;
                          setPaymentAttachment(file);
                        }}
                        required
                      />
                    </label>
                  </>
                ) : null}

                {submitError ? (
                  <div className="md:col-span-2 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {submitError}
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-xl bg-[#F59E0B] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#d97706] md:col-span-2"
                >
                  {bookingStep === "details"
                    ? "Continue"
                    : isSubmitting
                      ? "Submitting..."
                      : "Request a Session"}
                </button>
              </form>

                  {bookingStep === "payment" ? (
                    <button
                      type="button"
                      onClick={() => {
                        setBookingStep("details");
                        setSubmitError("");
                      }}
                      className="mt-4 text-sm font-semibold text-[#FFF7E0] underline-offset-4 hover:underline"
                    >
                      {"< Back to details"}
                    </button>
                  ) : null}
                </div>
              </>
            ) : (
              <div className="mx-auto max-w-4xl rounded-[18px] border border-[#D4AF37]/35 bg-[#FEF3C7] p-6 text-center shadow-[0_12px_30px_rgba(30,58,138,0.1)] sm:p-8">
                <h2 className="text-2xl font-semibold text-[#1E3A8A] sm:text-3xl">
                  Request Submitted Successfully
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-slate-700 sm:text-base">
                  Thank you. Your Akashic session request and payment details have been received. We will review your submission, and our team will contact you soon within 7 days.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setShowBookingForm(false);
                  }}
                  className="mt-6 rounded-xl bg-[#1E3A8A] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#142a63]"
                >
                  Close
                </button>
              </div>
            )}
          </section>
        ) : null}
      </section>
    </main>
  );
};

export default OccultScience;