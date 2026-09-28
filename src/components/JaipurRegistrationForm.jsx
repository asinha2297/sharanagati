import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuCopy } from "react-icons/lu";

const API_URL = (import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
const apiUrl = (path) => `${API_URL}${path}`;
const createParticipant = () => ({
  name: "",
  age: "",
  gender: "",
  medicalStudent: "No",
  attendingClasses: "",
});

const participantDeposit = (person, roomType) => {
  const age = Number(person.age);
  if (age < 5) return 0;
  if (person.medicalStudent === "Medical Student" || (age >= 11 && age <= 17)) return 3800;
  if (age < 11) return 3800;
  return roomType === "double" ? 4800 : 4400;
};

const participantTotal = (person, roomType) => {
  const age = Number(person.age);
  if (age < 5) return 0;
  if (person.medicalStudent === "Medical Student" || (age >= 11 && age <= 17)) return 6800;
  if (age < 11) return 4700;
  return roomType === "double" ? 9500 : 8800;
};

export default function JaipurRegistrationForm() {
  const navigate = useNavigate();
  const [participants, setParticipants] = useState([createParticipant()]);
  const [contact, setContact] = useState({ mobile: "", email: "" });
  const [roomType, setRoomType] = useState("double");
  const [paymentType, setPaymentType] = useState("advance");
  const [formStep, setFormStep] = useState("details");
  const [authMobile, setAuthMobile] = useState("");
  const [viewMode, setViewMode] = useState("login");
  const [existingRegistration, setExistingRegistration] = useState(null);
  const [paymentReference, setPaymentReference] = useState("");
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");

  const deposit = participants.reduce((sum, person) => sum + participantDeposit(person, roomType), 0);
  const fullAmount = participants.reduce((sum, person) => sum + participantTotal(person, roomType), 0);
  const payableNow = paymentType === "full" ? fullAmount : deposit;

  const updateParticipant = (index, field, value) => {
    setParticipants((current) => current.map((person, personIndex) =>
      personIndex === index ? { ...person, [field]: value } : person
    ));
  };

  const copyPaymentDetail = async (label, value) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopyStatus(`${label} copied`);
    } catch {
      setCopyStatus(`Could not copy ${label.toLowerCase()}`);
    }
  };

  const handleContinue = (event) => {
    event.preventDefault();
    setError("");
    setFormStep("payment");
  };

  const handleMobileLogin = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      const response = await fetch(apiUrl(`/api/jaipur-registration/status?mobile=${encodeURIComponent(authMobile.trim())}`));
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || "Unable to check registration status.");
      if (data.requiresRegistration) {
        setContact((current) => ({ ...current, mobile: authMobile.trim() }));
        setViewMode("form");
      } else {
        setExistingRegistration(data.registration);
        setViewMode("status");
      }
    } catch (loginError) {
      setError(loginError.message || "Unable to check registration status.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const paymentLabel = paymentType === "full" ? "full payment" : "advance payment";
    const confirmed = window.confirm(`Submit registration for ₹${payableNow.toLocaleString("en-IN")}?`);
    if (!confirmed) return;

    setError("");
    setIsSubmitting(true);

    try {
      const submission = new FormData();
      submission.append("roomType", roomType);
      submission.append("paymentType", paymentType);
      submission.append("participants", JSON.stringify(participants));
      submission.append("mobile", contact.mobile);
      submission.append("email", contact.email);
      submission.append("paymentReference", paymentReference.trim());
      if (paymentScreenshot) submission.append("paymentScreenshot", paymentScreenshot);
      const saveResponse = await fetch(apiUrl("/api/jaipur-registration/register"), {
        method: "POST",
        body: submission,
      });
      const saved = await saveResponse.json();
      if (!saveResponse.ok || !saved.success) throw new Error(saved.message || "Unable to save your registration.");
      setSuccess(true);
    } catch (submitError) {
      setError(submitError.message || "Registration could not be completed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-800";

  return (
    <main className="min-h-screen bg-[#FFF7E0] px-4 py-10">
      <div className="mx-auto max-w-3xl rounded-xl border border-[#D4AF37]/30 bg-white p-5 shadow-lg sm:p-8">
        <button type="button" onClick={() => navigate("/yatras")} className="mb-5 text-sm font-semibold text-[#FFF7E0]">Back to Yatras</button>
        <p className="text-center text-sm font-semibold uppercase tracking-widest text-[#B45309]">04–10 December 2026</p>
        <h1 className="mt-2 text-center text-2xl font-semibold text-[#1E3A8A] sm:text-3xl">Jaipur Yatra Registration</h1>
        <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">Journey to Gupta Vrindavan. Registration deposit is adjusted against the yatra cost. Train fare and local sightseeing expenses are separate.</p>

        {success ? (
          <div className="mt-8 rounded-lg bg-emerald-50 p-6 text-center text-emerald-900" role="status">
            <h2 className="text-xl font-semibold">Registration submitted</h2>
            <p className="mt-2">Your transfer details have been received. Payment remains pending until verified. Contact Rounak Prabhu at +91 79721 85705 for updates.</p>
            <button type="button" onClick={() => navigate("/yatras")} className="mt-5 rounded-md bg-[#1E3A8A] px-5 py-3 font-semibold text-white">Return to Yatras</button>
          </div>
        ) : viewMode === "login" ? (
          <form onSubmit={handleMobileLogin} className="mx-auto mt-8 max-w-lg space-y-5">
            <h2 className="text-center text-xl font-semibold text-[#1E3A8A]">Continue with Mobile Number</h2>
            <label className="block font-medium text-slate-700" htmlFor="jaipurLoginMobile">Mobile number</label>
            <input id="jaipurLoginMobile" className={inputClass} type="tel" inputMode="tel" autoComplete="tel" required value={authMobile} onChange={(event) => setAuthMobile(event.target.value)} placeholder="Enter your mobile number" />
            {error && <p className="rounded-md bg-red-50 p-3 text-sm text-red-800" role="alert">{error}</p>}
            <button type="submit" disabled={isSubmitting} className="w-full rounded-md bg-[#1E3A8A] px-6 py-3 font-semibold text-white disabled:opacity-60">{isSubmitting ? "Checking..." : "Continue"}</button>
          </form>
        ) : viewMode === "status" ? (
          <section className="mx-auto mt-8 max-w-lg space-y-5 rounded-lg bg-[#FFF7E0] p-5 text-slate-700">
            <h2 className="text-center text-xl font-semibold text-[#1E3A8A]">Jaipur Registration Status</h2>
            <p>Mobile: <strong>{existingRegistration?.mobile}</strong></p>
            <p>Lead devotee: <strong>{existingRegistration?.participants?.[0]?.name}</strong></p>
            <p>Payment type: <strong>{existingRegistration?.paymentType === "full" ? "Full" : "Advance"}</strong></p>
            <p>Payment verification: <strong>{existingRegistration?.paymentVerificationStatus === "verified" ? "Verified" : existingRegistration?.paymentVerificationStatus === "rejected" ? "Needs attention" : "Awaiting verification"}</strong></p>
            <p>Amount submitted: <strong>₹{Number(existingRegistration?.amountSubmitted || 0).toLocaleString("en-IN")}</strong></p>
            <p>Estimated balance after verification: <strong>₹{Math.max(Number(existingRegistration?.totalAmount || 0) - Number(existingRegistration?.amountSubmitted || 0), 0).toLocaleString("en-IN")}</strong></p>
            <button type="button" onClick={() => { setViewMode("login"); setExistingRegistration(null); setError(""); }} className="w-full rounded-md border border-[#1E3A8A] px-5 py-3 font-semibold text-[#1E3A8A]">Check another mobile</button>
          </section>
        ) : (
          <form onSubmit={formStep === "details" ? handleContinue : handleSubmit} className="mt-8 space-y-7">
            {formStep === "details" ? (
              <>
            <section className="space-y-4">
              <h2 className="border-b border-slate-200 pb-2 text-lg font-semibold text-[#1E3A8A]">Booking Details</h2>
              <label className="block font-medium text-slate-700" htmlFor="roomType">Room sharing preference</label>
              <select id="roomType" className={inputClass} value={roomType} onChange={(event) => setRoomType(event.target.value)}>
                <option value="double">AC double sharing (₹9,500 per adult)</option>
                <option value="triple">AC triple sharing (₹8,800 per adult)</option>
              </select>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block font-medium text-slate-700">Mobile number<input className={`${inputClass} mt-2 font-normal`} type="tel" autoComplete="tel" required value={contact.mobile} onChange={(event) => setContact({ ...contact, mobile: event.target.value })} /></label>
                <label className="block font-medium text-slate-700">Email address<input className={`${inputClass} mt-2 font-normal`} type="email" autoComplete="email" required value={contact.email} onChange={(event) => setContact({ ...contact, email: event.target.value })} /></label>
              </div>
              <label className="block font-medium text-slate-700" htmlFor="paymentType">Payment Type</label>
              <select id="paymentType" name="paymentType" className={inputClass} value={paymentType} onChange={(event) => setPaymentType(event.target.value)}>
                <option value="advance">Advance Payment</option>
                <option value="full">Full Payment</option>
              </select>
            </section>

            <section className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-2">
                <h2 className="text-lg font-semibold text-[#1E3A8A]">Devotee Details</h2>
                <button type="button" disabled={participants.length >= 5} onClick={() => setParticipants((current) => [...current, createParticipant()])} className="rounded-md border border-[#1E3A8A] px-3 py-2 text-sm font-semibold text-[#FFF7E0] disabled:opacity-50">Add devotee</button>
              </div>
              {participants.map((person, index) => (
                <fieldset key={index} className="rounded-lg border border-slate-200 p-4">
                  <legend className="px-2 font-semibold text-[#1E3A8A]">{index === 0 ? "Primary devotee" : `Devotee ${index + 1}`}</legend>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="font-medium text-slate-700">Full name<input className={`${inputClass} mt-2 font-normal`} type="text" required value={person.name} onChange={(event) => updateParticipant(index, "name", event.target.value)} /></label>
                    <label className="font-medium text-slate-700">Age<input className={`${inputClass} mt-2 font-normal`} type="number" min="0" max="120" required value={person.age} onChange={(event) => updateParticipant(index, "age", event.target.value)} /></label>
                    <label className="font-medium text-slate-700">Gender<select className={`${inputClass} mt-2 font-normal`} required value={person.gender} onChange={(event) => updateParticipant(index, "gender", event.target.value)}><option value="">Select gender</option><option value="Male">Male</option><option value="Female">Female</option></select></label>
                    <label className="font-medium text-slate-700">Medical student status<select className={`${inputClass} mt-2 font-normal`} value={person.medicalStudent} onChange={(event) => updateParticipant(index, "medicalStudent", event.target.value)}><option value="No">Not a medical student / intern / PGT / house staff</option><option value="Medical Student">Medical student</option><option value="Medical Intern/PGT/House Staff">Medical intern / PGT / house staff</option></select></label>
                    <label className="font-medium text-slate-700 sm:col-span-2">Do you attend classes regularly?<select className={`${inputClass} mt-2 font-normal`} required value={person.attendingClasses} onChange={(event) => updateParticipant(index, "attendingClasses", event.target.value)}><option value="">Select</option><option value="Yes">Yes</option><option value="No">No</option></select></label>
                  </div>
                  {participants.length > 1 && <button type="button" onClick={() => setParticipants((current) => current.filter((_, personIndex) => personIndex !== index))} className="mt-4 text-sm font-semibold text-red-700 underline">Remove devotee</button>}
                </fieldset>
              ))}
            </section>

            <section className="rounded-lg bg-[#FFF7E0] p-4 text-slate-700">
              <h2 className="font-semibold text-[#1E3A8A]">Registration Deposit</h2>
              <p className="mt-2 text-sm">Double sharing ₹4,800 per adult; triple sharing ₹4,400 per adult; child/medical student ₹3,800; under 5 years free.</p>
              <p className="mt-1 text-sm">Yatra cost: adult ₹9,500 (double) / ₹8,800 (triple); ages 5–9 ₹4,700; ages 10–17 and medical students ₹6,800.</p>
              <p className="mt-4 flex justify-between font-semibold text-[#1E3A8A]"><span>{paymentType === "full" ? "Full payment due now" : "Advance deposit due now"}</span><span>₹{payableNow.toLocaleString("en-IN")}</span></p>
              <p className="mt-1 flex justify-between text-sm"><span>Estimated yatra cost</span><span>₹{fullAmount.toLocaleString("en-IN")}</span></p>
              <p className="mt-1 flex justify-between text-sm"><span>Advance amount</span><span>₹{deposit.toLocaleString("en-IN")}</span></p>
              <p className="mt-1 flex justify-between text-sm"><span>Remaining after payment</span><span>₹{Math.max(fullAmount - payableNow, 0).toLocaleString("en-IN")}</span></p>
            </section>
                <div className="space-y-3">
                  {error && <p className="rounded-md bg-red-50 p-3 text-sm text-red-800" role="alert">{error}</p>}
                  <button type="submit" disabled={payableNow < 100} className="w-full rounded-md bg-[#F59E0B] px-6 py-3 font-semibold text-white shadow transition hover:bg-[#D97706] disabled:cursor-not-allowed disabled:opacity-60">Continue</button>
                  <button type="button" onClick={() => { setViewMode("login"); setError(""); }} className="w-full rounded-md border border-[#1E3A8A] px-5 py-3 font-semibold text-[#1E3A8A]">Back to mobile login</button>
                </div>
              </>
            ) : (
              <>
            <section className="rounded-lg bg-[#FFF7E0] p-4 text-slate-700">
              <h2 className="font-semibold text-[#1E3A8A]">Payment Summary</h2>
              <p className="mt-2 flex justify-between font-semibold"><span>{paymentType === "full" ? "Full payment due now" : "Advance deposit due now"}</span><span>₹{payableNow.toLocaleString("en-IN")}</span></p>
              <p className="mt-1 flex justify-between text-sm"><span>Estimated yatra cost</span><span>₹{fullAmount.toLocaleString("en-IN")}</span></p>
              <p className="mt-1 flex justify-between text-sm"><span>Remaining after payment</span><span>₹{Math.max(fullAmount - payableNow, 0).toLocaleString("en-IN")}</span></p>
            </section>
            <section className="space-y-3 rounded-lg border border-slate-200 p-4 text-slate-700">
              <h2 className="font-semibold text-[#1E3A8A]">Manual Payment</h2>
              <p className="text-sm">Pay by bank transfer or UPI, then provide the transaction reference below. Registration is saved as awaiting verification until the payment is confirmed.</p>
              <p className="text-sm">Account Name: Annu Sinha</p>
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span>Account Number: 35165460879</span>
                <button type="button" onClick={() => copyPaymentDetail("Account number", "35165460879")} className="rounded !border-white !bg-white p-1 text-[#1E3A8A] hover:!bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFFFFF]" aria-label="Copy account number" title="Copy account number"><LuCopy aria-hidden="true" size={16} /></button>
              </div>
              {/* <p className="text-sm">IFSC: BKID0004704</p> */}
              <p className="text-sm">Bank: State Bank of India (SBI)</p>
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span>UPI ID: 7488136259@ybl</span>
                <button type="button" onClick={() => copyPaymentDetail("UPI ID", "7488136259@ybl")} className="rounded !border-white !bg-white p-1 text-[#1E3A8A] hover:!bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFFFFF]" aria-label="Copy UPI ID" title="Copy UPI ID"><LuCopy aria-hidden="true" size={16} /></button>
              </div>
              {copyStatus && <p className="text-xs text-slate-600" role="status" aria-live="polite">{copyStatus}</p>}
              <label className="block font-medium" htmlFor="paymentReference">UPI transaction ID / bank reference (optional)</label>
              <input id="paymentReference" className={inputClass} value={paymentReference} onChange={(event) => setPaymentReference(event.target.value)} />
              <label className="block font-medium" htmlFor="paymentScreenshot">Payment screenshot <span className="text-red-700">(required)</span></label>
              <div className="flex flex-wrap items-center gap-3">
                <label htmlFor="paymentScreenshot" className="inline-flex cursor-pointer items-center rounded-md border border-[#1E3A8A] bg-white px-4 py-2 font-semibold text-[#1E3A8A] underline decoration-transparent underline-offset-2 hover:bg-[#FFF7E0] hover:decoration-current focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[#1E3A8A]">
                  Choose file
                  <input id="paymentScreenshot" className="sr-only" type="file" accept="image/jpeg,image/png" required onChange={(event) => setPaymentScreenshot(event.target.files?.[0] || null)} />
                </label>
                <span className="text-sm" aria-live="polite">{paymentScreenshot?.name || "No file chosen"}</span>
              </div>
            </section>
            {error && <p className="rounded-md bg-red-50 p-3 text-sm text-red-800" role="alert">{error}</p>}
            <div className="flex items-center justify-between gap-4">
              <button type="button" onClick={() => { setFormStep("details"); setError(""); }} className="rounded-md border border-[#1E3A8A] px-5 py-3 font-semibold text-white">Previous</button>
              <button type="submit" disabled={isSubmitting || payableNow < 100} className="rounded-md bg-[#F59E0B] px-5 py-3 font-semibold text-white shadow transition hover:bg-[#D97706] disabled:cursor-not-allowed disabled:opacity-60">{isSubmitting ? "Submitting..." : "Submit registration"}</button>
            </div>
              </>
            )}
            <p className="text-center text-xs text-slate-500">Registration amount is due by 01 Oct 2026. Full payment is due by 21 Oct 2026. For questions: Rounak prabhu, +91 79721 85705.</p>
          </form>
        )}
      </div>
    </main>
  );
}
