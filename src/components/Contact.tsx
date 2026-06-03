import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { PERSON } from "../lib/data";
import { Reveal, SectionHeader } from "./primitives";

type Line = { text: string; cls: string };

export function Contact() {
  const reduced = useReducedMotion();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [out, setOut] = useState<Line[]>([]);
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const push = (lines: Line[]) => {
    if (reduced) {
      setOut((o) => [...o, ...lines]);
      return;
    }
    lines.forEach((l, i) => {
      const t = setTimeout(() => setOut((o) => [...o, l]), 420 * (i + 1));
      timers.current.push(t);
    });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOut([]);
    timers.current.forEach(clearTimeout);
    const emailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);

    if (!name.trim() || !emailOk || !msg.trim()) {
      const errs: Line[] = [
        { text: "➜ validating payload…", cls: "text-faint" },
      ];
      if (!name.trim())
        errs.push({
          text: "✗ name: required — who is transmitting?",
          cls: "text-err",
        });
      else if (!emailOk)
        errs.push({
          text: `✗ mail: ${
            email ? `"${email}" is not a valid address` : "required"
          }`,
          cls: "text-err",
        });
      else if (!msg.trim())
        errs.push({
          text: "✗ msg: empty payload, nothing to send",
          cls: "text-err",
        });
      push(errs);
      return;
    }

    setBusy(true);
    push([
      { text: "➜ ./transmit --to sam", cls: "text-faint" },
      { text: "› opening socket to samneghabat.dev …", cls: "text-muted" },
      { text: `› packing message from ${name} ‹${email}›`, cls: "text-muted" },
      { text: "› signing & sending …", cls: "text-muted" },
      {
        text: "✓ 200 — message received. Reply inbound within a day or two.",
        cls: "text-ok",
      },
      {
        text: `› thanks for saying hello, ${name.split(" ")[0]}.`,
        cls: "text-accent",
      },
    ]);
    const done = setTimeout(
      () => {
        setBusy(false);
        setSent(true);
      },
      reduced ? 50 : 2700
    );
    timers.current.push(done);
  };

  return (
    <section
      id="contact"
      className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36"
    >
      <SectionHeader index="05" title="Contact" note="// open a connection" />

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <h2 className="font-display text-[3rem] font-extrabold leading-[0.9] tracking-tight sm:text-[4.5rem]">
              Let’s build
              <br />
              something <span className="text-accent">that lasts.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-col gap-3">
              <a
                href={`mailto:${PERSON.email}`}
                data-cursor
                data-cursor-label="email"
                className="inline-block w-fit border-b border-fg pb-1 font-mono text-lg text-fg transition-colors hover:border-accent hover:text-accent sm:text-2xl"
              >
                {PERSON.email}
              </a>
              <a
                href={`tel:${PERSON.phone.replace(/\s/g, "")}`}
                data-cursor
                data-cursor-label="call"
                className="inline-flex w-fit items-center gap-2 font-mono text-sm text-muted transition-colors hover:text-accent"
              >
                <span className="text-accent">☏</span> {PERSON.phone}
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
              {PERSON.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor
                  className="group flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-muted transition-colors hover:text-fg"
                >
                  <span className="text-accent transition-transform group-hover:-translate-y-0.5">
                    ↗
                  </span>
                  {s.label}
                </a>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-faint">
              <span className="h-2 w-2 rounded-full bg-ok" />
              {PERSON.available}
            </div>
          </Reveal>
        </div>

        {/* terminal form */}
        <Reveal delay={0.05}>
          <div
            className="overflow-hidden rounded-lg border border-line bg-surface shadow-2xl shadow-black/50"
            data-cursor="text"
          >
            <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
              <span className="h-3 w-3 rounded-full border border-line bg-err/70" />
              <span className="h-3 w-3 rounded-full border border-line bg-warn/70" />
              <span className="h-3 w-3 rounded-full border border-line bg-ok/70" />
              <span className="ml-3 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-faint">
                guest@sam-neghabat — bash
              </span>
            </div>

            <form
              onSubmit={onSubmit}
              className="space-y-3 p-5 font-mono text-[0.78rem]"
            >
              <div className="text-faint">~ last login: ready when you are</div>
              <Field
                label="name"
                value={name}
                onChange={setName}
                placeholder="Ada Lovelace"
                autoComplete="name"
              />
              <Field
                label="mail"
                value={email}
                onChange={setEmail}
                placeholder="ada@analytical.engine"
                type="email"
                autoComplete="email"
              />
              <div className="flex items-start gap-2">
                <label
                  htmlFor="c-msg"
                  className="whitespace-nowrap pt-0.5 text-accent"
                >
                  msg&nbsp;:
                </label>
                <textarea
                  id="c-msg"
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  placeholder="Type your message…"
                  rows={3}
                  data-cursor="text"
                  className="w-full resize-none bg-transparent text-fg outline-none placeholder:text-faint"
                />
              </div>

              <button
                type="submit"
                disabled={busy}
                data-cursor
                data-cursor-label="send"
                className="mt-2 inline-flex items-center gap-2 bg-accent px-4 py-2.5 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-bg transition-opacity disabled:opacity-50"
              >
                {busy
                  ? "transmitting…"
                  : sent
                  ? "sent ✓ — send another"
                  : "transmit ↵"}
              </button>

              <div aria-live="polite" className="space-y-1 pt-2">
                {out.map((l, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`whitespace-pre-wrap ${l.cls}`}
                  >
                    {l.text}
                  </motion.div>
                ))}
              </div>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div className="flex items-baseline gap-2">
      <label htmlFor={`c-${label}`} className="whitespace-nowrap text-accent">
        {label}&nbsp;:
      </label>
      <input
        id={`c-${label}`}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        data-cursor="text"
        className="w-full bg-transparent text-fg caret-accent outline-none placeholder:text-faint"
      />
    </div>
  );
}
