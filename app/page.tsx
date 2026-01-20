"use client";

import { useState, useEffect } from "react";

const TAGS_DATA = [
  {
    category: "padel",
    tags: [
      "casual rallies",
      "2-3 courts",
      "120 minutes",
      "coffee after",
      "all levels",
      "rackets available",
      "no cost, sponsored",
      "mixed doubles",
      "rotating partners",
    ],
  },
  {
    category: "people",
    tags: [
      "pe & vc investors",
      "founders",
      "tech operators",
      "invite only",
      "10-16 people",
      "familiar faces",
      "new ones too",
      "word of mouth",
    ],
  },
  {
    category: "place & time",
    tags: [
      "central london",
      "location on invite",
      "easy to get to",
      "every four weeks",
      "usually weekend mornings",
      "year-round",
    ],
  },
];

const ROLES = ["pe & vc", "founder", "tech operator", "other"] as const;
type Role = (typeof ROLES)[number];

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [progressWidth, setProgressWidth] = useState(0);
  const [isOpened, setIsOpened] = useState(false);

  const handleJoinClick = () => {
    setShowForm(true);
  };

  const handleBack = () => {
    setShowForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole && email && phone) {
      console.log({ role: selectedRole, email, phone });
      setSubmitted(true);
    }
  };

  // Open the layout after initial animations
  useEffect(() => {
    const openTimer = setTimeout(() => {
      setIsOpened(true);
    }, 3500);
    return () => clearTimeout(openTimer);
  }, []);

  // Auto-reset to initial view after submission
  useEffect(() => {
    if (submitted) {
      // Start progress bar animation after a brief delay
      const startTimer = setTimeout(() => {
        setProgressWidth(100);
      }, 50);

      const resetTimer = setTimeout(() => {
        setSubmitted(false);
        setShowForm(false);
        setSelectedRole(null);
        setEmail("");
        setPhone("");
        setProgressWidth(0);
      }, 4000);
      return () => {
        clearTimeout(startTimer);
        clearTimeout(resetTimer);
      };
    }
  }, [submitted]);

  return (
    <main className="min-h-screen flex items-center justify-center p-4 md:p-8 overflow-hidden">
      <div
        className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg overflow-hidden transition-all duration-1000 ease-in-out"
        style={{
          width: "100%",
          maxWidth: isOpened ? "1350px" : "675px",
        }}
      >
        <div className="flex">
          {/* Left Column - Image with Overlay */}
          <div
            className="hidden lg:flex relative min-h-[500px] bg-cover bg-center bg-no-repeat flex-shrink-0"
            style={{
              backgroundImage: "url('/padel-courts.jpg.jpg')",
              width: "675px",
            }}
          >
            {/* Black transparent overlay */}
            <div className="absolute inset-0 bg-black/[0.78]" />
            {/* Logo at top */}
            <div className="absolute top-16 left-0 right-0 z-10 flex justify-center">
              <img
                src="/offcourt-logo-v1-large.png"
                alt="offcourt"
                className="w-56"
              />
            </div>
            {/* Centered content - positioned between logo and credit */}
            <div className="relative z-10 flex flex-col items-center justify-center w-full pt-32 pb-16 px-8 -mt-8">
              <h1
                className="text-4xl md:text-5xl text-white lowercase tracking-tight leading-tight text-center mb-6"
                style={{
                  fontFamily: "var(--font-headline)",
                  letterSpacing: "-0.01em",
                  animation: "fade-in-up 0.8s ease-out forwards",
                }}
              >
                london. padel.
                <br />
                investors. founders. operators.
              </h1>
              <p
                className="text-lg text-white/70 lowercase text-center"
                style={{
                  fontFamily: "var(--font-body)",
                  opacity: 0,
                  animation: "fade-in-up 0.8s ease-out 0.2s forwards",
                }}
              >
                casual monthly padel sessions
                <br />
                for london's builders and backers.
              </p>
            </div>
            {/* Credit */}
            <p
              className="absolute bottom-10 left-0 right-0 text-center text-[13px] text-white/50 lowercase z-10"
              style={{
                fontFamily: "var(--font-body)",
                opacity: 0,
                animation: "fade-in-up 0.8s ease-out 2.5s forwards",
              }}
            >
              hosted by{" "}
              <a href="https://www.linkedin.com/in/cornelius-menke-3954a469/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white/80 transition-colors">cornelius</a>,{" "}
              <a href="https://www.linkedin.com/in/daniel-wolf-0bb10981/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white/80 transition-colors">daniel</a> &{" "}
              <a href="https://www.linkedin.com/in/lukas-rehm/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white/80 transition-colors">lukas</a>
            </p>
          </div>

          {/* Right Column - Content with slide transition */}
          <div
            className="relative overflow-hidden min-h-[720px] transition-opacity duration-1000 ease-in-out flex-shrink-0"
            style={{
              width: "675px",
              opacity: isOpened ? 1 : 0,
            }}
          >
            {/* Tags View */}
            <div
              className={`absolute inset-0 p-8 md:p-12 flex flex-col justify-center transition-all duration-500 ease-in-out ${
                showForm
                  ? "-translate-y-full opacity-0"
                  : "translate-y-0 opacity-100"
              }`}
            >
              {/* Tags Section */}
              <div className="space-y-10 mb-12">
                {TAGS_DATA.map((row) => (
                  <div key={row.category}>
                    {/* Category Header */}
                    <div className="category-header mb-3">
                      <span
                        className="text-[20px] font-semibold text-[var(--color-text-primary)] lowercase shrink-0"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {row.category}
                      </span>
                    </div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2.5">
                      {row.tags.map((tag) => (
                        <span
                          key={tag}
                          className="tag-hover text-sm text-[var(--color-text-primary)] px-3 py-1.5 rounded-full"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button
                onClick={handleJoinClick}
                className="btn-slide group w-full bg-[var(--color-primary)] text-white text-[17px] font-light lowercase py-3.5 px-6 rounded-md cursor-pointer relative"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <span className="flex items-center justify-center gap-1.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="opacity-0 -ml-[28px] group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"
                  >
                    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0" />
                      <path d="M6 5.3a9 9 0 0 1 0 13.4M18 5.3a9 9 0 0 0 0 13.4" />
                    </g>
                  </svg>
                  put me on the list
                </span>
              </button>

              {/* Disclaimer */}
              <p
                className="mt-4 text-[13px] text-[var(--color-text-secondary)] lowercase text-center"
                style={{ fontFamily: "var(--font-body)" }}
              >
                this gets you on our radar. invites go out closer to the time.
              </p>
            </div>

            {/* Form View */}
            <div
              className={`absolute inset-0 p-8 md:p-12 flex flex-col justify-center transition-all duration-500 ease-in-out ${
                showForm && !submitted
                  ? "translate-y-0 opacity-100"
                  : showForm && submitted
                  ? "-translate-y-full opacity-0"
                  : "translate-y-full opacity-0"
              }`}
            >
                  {/* Back button */}
                  <button
                    onClick={handleBack}
                    className="mb-8 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors lowercase text-sm flex items-center gap-1.5 cursor-pointer"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v14m6-8l-6-6m-6 6l6-6"/>
                    </svg>
                    back
                  </button>

                  <div className="category-header mb-8">
                    <h2
                      className="text-[28px] font-semibold text-[var(--color-text-primary)] lowercase shrink-0"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      let's get you on the list
                    </h2>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Role Selection */}
                    <div className="flex gap-2">
                      {ROLES.map((role) => (
                        <button
                          key={role}
                          type="button"
                          onClick={() => setSelectedRole(role)}
                          className={`px-4 py-4 rounded-md text-sm lowercase text-center cursor-pointer transition-all duration-150 flex-1 border ${
                            selectedRole === role
                              ? "bg-[var(--color-accent)] text-white border-[var(--color-accent)]"
                              : "bg-[#F8F7F5] text-[var(--color-text-primary)] border-[var(--color-border)] hover:bg-[var(--color-tag-background)]"
                          }`}
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          {role}
                        </button>
                      ))}
                    </div>

                    {/* Email & Phone */}
                    <div className="flex gap-4">
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email"
                        required
                        className={`flex-1 bg-transparent border-b-2 pl-1 py-2 text-base text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] focus:outline-none transition-colors ${
                          email ? "border-[var(--color-accent)]" : "border-[var(--color-border)] focus:border-[var(--color-accent)]"
                        }`}
                        style={{ fontFamily: "var(--font-body)" }}
                      />
                      <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="phone (for whatsapp)"
                        required
                        className={`flex-1 bg-transparent border-b-2 pl-1 py-2 text-base text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] focus:outline-none transition-colors ${
                          phone ? "border-[var(--color-accent)]" : "border-[var(--color-border)] focus:border-[var(--color-accent)]"
                        }`}
                        style={{ fontFamily: "var(--font-body)" }}
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className={`btn-slide group w-full text-white text-[17px] font-light lowercase py-3.5 px-6 rounded-md relative ${
                        selectedRole && email && phone ? "bg-[var(--color-primary)] cursor-pointer" : "bg-[#B0B5BC] btn-slide-grey cursor-default"
                      }`}
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      <span className="flex items-center justify-center gap-1.5">
                        {selectedRole && email && phone ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="opacity-0 -ml-[28px] group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"
                          >
                            <g stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                              <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0" />
                              <path d="M6 5.3a9 9 0 0 1 0 13.4M18 5.3a9 9 0 0 0 0 13.4" />
                            </g>
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="opacity-0 -ml-[28px] group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"
                          >
                            <path
                              fill="none"
                              stroke="white"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0m9-3v4m0 3v.01"
                            />
                          </svg>
                        )}
                        {!selectedRole ? "select a role" : !email ? "add email" : !phone ? "add phone" : "get on the list"}
                      </span>
                    </button>

                    {/* Hint */}
                    <p
                      className="-mt-4 text-[13px] text-[var(--color-text-secondary)] lowercase text-center"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      your details are only used to contact you about upcoming events.
                      <br />
                      registering doesn't guarantee a spot. we'll be in touch.
                    </p>
                  </form>
            </div>

            {/* Success View */}
            <div
              className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out ${
                submitted
                  ? "translate-y-0 opacity-100"
                  : "translate-y-full opacity-0"
              }`}
            >
              <div className="text-center p-8 md:p-12 -mt-16">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 100"
                  className="w-36 h-36 mx-auto mb-3"
                  fill="var(--color-accent)"
                >
                  <path d="M81.7,15.7c-9.5-6.7-21.6-6.3-32.4-4c-8.1,1.7-16,4.7-23,9c-0.4-0.4-1-0.6-1.8-0.6c-10,1-15.7,9.4-18.2,18.5c-3.3,12.1-0.6,25.7,7,35.6c6.7,8.7,16.8,14,27.6,15.4c12.7,1.7,25.3-4.6,35.1-12.1c9.6-7.3,18.9-16.9,19.1-29.7c0.1-6.1-2.1-12.8-4-18.6C89.2,24,86.2,18.9,81.7,15.7z M76.7,70.5c-15.6,13.9-37.2,20.3-54.6,5.8c-8.2-6.8-12-16.7-12.1-27.1c-0.1-5.6,1.3-13,4.9-18.1c0.2,1.9,2.6,3.4,4.2,1.7C32,19.6,55.7,10.9,73.6,17C84.2,20.5,86.8,31.7,89,41.3C91.9,53.8,85.7,62.4,76.7,70.5z"/>
                  <path d="M63.3,31c-3.2,8.2-6.9,16.2-11,23.9c-2,3.7-4.1,7.3-6.4,10.9c-0.1,0.1-8.9-9.4-9.6-10.3c-1.9-2.6-6.2-0.1-4.3,2.5c3,4.2,6.7,8.9,11.2,11.7c3.8,2.3,5.9,0.4,7.9-2.9C58,55.9,63.6,44.3,68.2,32.3C69.3,29.3,64.5,28,63.3,31z"/>
                </svg>
                <h2
                  className="text-4xl md:text-5xl text-[var(--color-text-primary)] lowercase tracking-tight leading-tight mb-6"
                  style={{ fontFamily: "var(--font-headline)", letterSpacing: "-0.01em" }}
                >
                  you're on the list.
                </h2>
                <p
                  className="text-lg text-[var(--color-text-secondary)] lowercase"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  nice one. we'll reach out closer to the next session.
                </p>
                {/* Progress bar */}
                <div className="w-48 h-1 bg-[var(--color-border)] rounded-full overflow-hidden mx-auto mt-10">
                  <div
                    className="h-full bg-[var(--color-accent)] rounded-full"
                    style={{
                      width: `${progressWidth}%`,
                      transition: progressWidth > 0 ? "width 3.95s ease-in-out" : "none",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
