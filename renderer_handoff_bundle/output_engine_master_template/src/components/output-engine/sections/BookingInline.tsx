import * as React from "react";
import type { WizardData } from "../types";

interface Props { data: WizardData }

/**
 * Grow inline · Booking module attach point.
 * Mock day data here is illustrative — production wires to the Booking edge fn.
 */
export const BookingInline: React.FC<Props> = ({ data }) => {
  const services = data.content.services.slice(0, 3);
  const [picked, setPicked] = React.useState(0);
  const [day, setDay] = React.useState(5);

  const days = React.useMemo(
    () => Array.from({ length: 14 }, (_, i) => ({ idx: i, full: i < 3 || i === 6 || i === 7 || i === 8 || i === 13 })),
    []
  );

  return (
    <section
      className="oe-booking oe-section"
      data-section="booking" data-section-label="Book online" id="booking"
    >
      <div className="oe-wrap">
        <div className="oe-booking__card">
          <div className="oe-booking__info">
            <div className="oe-booking__tag"><span className="oe-booking__dot" />Live booking · Booking module</div>
            <h3 className="oe-h3" style={{ fontSize: "1.75rem" }}>Book your dog in. {data.modules.bookingLeadTimeDays || 14} days out, usually.</h3>
            <p>Real-time availability — what you see is what we have. Pay nothing until pickup.</p>
            <ul>
              <li>Free cancellation up to 24 hrs before</li>
              <li>SMS reminder the day before</li>
              <li>First-time clients: bring vaccination records</li>
            </ul>
          </div>
          <div className="oe-booking__form">
            <div className="oe-booking__step">Step 1 of 3</div>
            <h4 className="oe-h4">Pick a service</h4>
            <div className="oe-booking__svcs">
              {services.map((s, i) => (
                <button
                  key={s.name}
                  type="button"
                  onClick={() => setPicked(i)}
                  className={`oe-booking__svc${picked === i ? " is-selected" : ""}`}
                >
                  <span className="oe-booking__svc-name">{s.name}</span>
                  <span className="oe-booking__svc-meta">{s.duration} · {s.price}</span>
                </button>
              ))}
            </div>
            <h4 className="oe-h4" style={{ marginTop: 8 }}>Pick a date · this fortnight</h4>
            <div className="oe-booking__cal">
              {days.map(d => (
                <button
                  key={d.idx}
                  type="button"
                  disabled={d.full}
                  onClick={() => !d.full && setDay(d.idx)}
                  className={`oe-booking__day${d.full ? " is-full" : ""}${day === d.idx ? " is-selected" : ""}`}
                >
                  <span className="oe-booking__num">{d.idx + 18}</span>
                  {!d.full && <span className="oe-booking__dotsm" />}
                </button>
              ))}
            </div>
            <button className="oe-btn oe-btn--cta" style={{ width: "100%", justifyContent: "center" }}>
              Continue · Pick a time →
            </button>
          </div>
        </div>
      </div>
      <style>{BOOKING_CSS}</style>
    </section>
  );
};

const BOOKING_CSS = `
.oe-booking { background: linear-gradient(180deg, var(--foundation-wash) 0%, var(--foundation-white) 100%);
  border-top: 1px solid var(--foundation-pale); border-bottom: 1px solid var(--foundation-pale); }
.oe-booking__card { background: #fff; border: 1px solid var(--foundation-pale);
  border-radius: var(--preset-radius-lg, 20px); box-shadow: var(--preset-shadow-lift);
  display: grid; grid-template-columns: 1fr 1.2fr; overflow: hidden;
  max-width: 1080px; margin: 0 auto; }
.oe-booking__info { padding: 48px 44px; background: var(--foundation-dark); color: #fff; }
.oe-booking__tag { display: inline-flex; align-items: center; gap: 8px;
  background: rgba(127,212,203,0.18); color: #7fd4cb;
  padding: 6px 12px; border-radius: 999px;
  font-size: 11.5px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
  margin-bottom: 20px; }
.oe-booking__dot { width: 8px; height: 8px; background: #0f766e; border-radius: 999px; }
.oe-booking__info h3 { color: #fff; line-height: 1.15; margin-bottom: 14px; }
.oe-booking__info p { color: #cbd5e1; font-size: 15px; margin: 0 0 24px; }
.oe-booking__info ul { margin: 0; padding: 0; list-style: none; }
.oe-booking__info li { color: #cbd5e1; font-size: 14px; margin-bottom: 10px; padding-left: 22px; position: relative; }
.oe-booking__info li::before { content: '✓'; position: absolute; left: 0; color: #7fd4cb; font-weight: 700; }
.oe-booking__form { padding: 40px 44px; }
.oe-booking__step { font-size: 12px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--site-primary); margin-bottom: 6px; }
.oe-booking__form h4 { margin-bottom: 24px; font-size: 1.125rem; color: var(--foundation-dark); }
.oe-booking__svcs { display: grid; gap: 10px; margin-bottom: 28px; }
.oe-booking__svc { all: unset; box-sizing: border-box; cursor: pointer;
  border: 1px solid var(--foundation-pale); border-radius: var(--preset-radius-sm, 8px);
  padding: 14px 16px; display: flex; justify-content: space-between; align-items: center;
  font-size: 14.5px; transition: all 120ms; }
.oe-booking__svc:hover { border-color: var(--site-primary); }
.oe-booking__svc.is-selected { border-color: var(--site-primary);
  background: color-mix(in oklab, var(--site-primary), white 88%);
  box-shadow: 0 0 0 3px color-mix(in oklab, var(--site-primary), white 70%); }
.oe-booking__svc-name { font-weight: 600; color: var(--foundation-dark); }
.oe-booking__svc-meta { font-size: 13px; color: var(--foundation-mid); }
.oe-booking__cal { display: grid; grid-template-columns: repeat(7, 1fr); gap: 6px; margin-bottom: 20px; }
.oe-booking__day { all: unset; box-sizing: border-box; aspect-ratio: 1; cursor: pointer;
  border: 1px solid var(--foundation-pale); border-radius: 6px;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  font-size: 13px; color: var(--foundation-slate); transition: all 120ms; }
.oe-booking__num { font-weight: 600; }
.oe-booking__dotsm { width: 4px; height: 4px; border-radius: 999px;
  background: var(--site-primary); margin-top: 3px; }
.oe-booking__day:hover:not(:disabled) { border-color: var(--site-primary); }
.oe-booking__day.is-full { color: #cbd5e1; cursor: not-allowed; background: var(--foundation-wash); }
.oe-booking__day.is-selected { background: var(--site-primary); color: #fff; border-color: var(--site-primary); }
.oe-booking__day.is-selected .oe-booking__dotsm { background: #fff; }
@media (max-width: 900px) { .oe-booking__card { grid-template-columns: 1fr; } }`;
