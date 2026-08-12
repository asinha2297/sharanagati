import React, { useEffect, useState } from "react";
import {
  LuCompass as Compass,
  LuHeart as Heart,
  LuInfinity as Infinity,
  LuWaves as Waves,
  LuHourglass as Hourglass,
  LuSparkles as Sparkles,
} from "react-icons/lu";
import krsnaImage from "../assets/Krsna.jpg";

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
    icon: Infinity,
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
};

const OccultScience = () => {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [form, setForm] = useState(initialForm);
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

  const handleBookingSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
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
                  setSubmitted(false);
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
            <h2
              id="booking-form-heading"
              className="text-2xl font-semibold tracking-tight text-[#1E3A8A] sm:text-3xl"
            >
              Request your Akashic session
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
              This form is a polished placeholder flow for V1 and can be connected to a
              calendar, payment gateway or booking backend later.
            </p>

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
                  What would you like to explore?
                  <textarea
                    className="mt-2 min-h-36 w-full rounded-xl border border-[#1E3A8A]/20 bg-white px-4 py-3 text-sm text-slate-700 outline-none ring-[#1E3A8A]/30 transition focus:ring"
                    value={form.focus}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, focus: event.target.value }))
                    }
                    required
                  />
                </label>

                <button
                  type="submit"
                  className="rounded-xl bg-[#F59E0B] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#d97706] md:col-span-2"
                >
                  Request a Session
                </button>
              </form>

              {submitted ? (
                <div className="mt-5 rounded-xl border border-[#D4AF37]/35 bg-[#FEF3C7] px-4 py-4 text-sm text-[#1E3A8A]">
                  Request received. This is a placeholder success state for V1. Connect this
                  form to your booking backend and notifications workflow in the next phase.
                </div>
              ) : null}
            </div>
          </section>
        ) : null}
      </section>
    </main>
  );
};

export default OccultScience;