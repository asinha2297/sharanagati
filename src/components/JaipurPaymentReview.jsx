import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = (import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
const apiUrl = (path) => `${API_URL}${path}`;
const money = (amount) => `₹${Number(amount || 0).toLocaleString("en-IN")}`;

export default function JaipurPaymentReview() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [registrations, setRegistrations] = useState([]);
  const [notes, setNotes] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [busyId, setBusyId] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const loadRegistrations = async (accessCode = password) => {
    setError("");
    setIsLoading(true);
    try {
      const response = await fetch(apiUrl("/api/jaipur-registration/admin/registrations"), {
        headers: { "x-registration-password": accessCode },
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || "Unable to load registrations.");
      setRegistrations(data.registrations || []);
      setPassword(accessCode);
      setAuthenticated(true);
    } catch (loadError) {
      setError(loadError.message || "Unable to load registrations.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAction = async (registration, action) => {
    const note = String(notes[registration._id] || "").trim();
    if (action === "reject" && !note) {
      setError("Enter a reason before rejecting a payment.");
      return;
    }

    setError("");
    setBusyId(registration._id);
    try {
      const response = await fetch(
        apiUrl(`/api/jaipur-registration/admin/registrations/${registration._id}/${action}`),
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-registration-password": password,
          },
          body: JSON.stringify({ note }),
        }
      );
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || "Unable to update payment status.");
      setRegistrations((current) => current.map((item) =>
        item._id === registration._id ? data.registration : item
      ));
    } catch (actionError) {
      setError(actionError.message || "Unable to update payment status.");
    } finally {
      setBusyId("");
    }
  };

  const pendingCount = registrations.filter((item) => item.paymentVerificationStatus === "awaiting_verification").length;
  const inputClass = "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-800";

  return (
    <main className="min-h-screen bg-[#FFF7E0] px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-[#D4AF37]/40 pb-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#B45309]">Organizer</p>
            <h1 className="mt-1 text-2xl font-semibold text-[#1E3A8A]">Jaipur Payment Review</h1>
          </div>
          <button type="button" onClick={() => navigate("/yatras")} className="rounded-md border border-[#1E3A8A] px-4 py-2 font-semibold text-[#FFF7E0]">Back to Yatras</button>
        </div>

        {!authenticated ? (
          <form onSubmit={(event) => { event.preventDefault(); loadRegistrations(); }} className="mx-auto mt-12 max-w-md space-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-[#1E3A8A]">Admin access</h2>
            <label className="block font-medium text-slate-700" htmlFor="jaipurAdminPassword">Registration admin password</label>
            <input id="jaipurAdminPassword" className={inputClass} type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} />
            {error && <p className="text-sm text-red-700" role="alert">{error}</p>}
            <button type="submit" disabled={isLoading} className="w-full rounded-md bg-[#1E3A8A] px-5 py-3 font-semibold text-white disabled:opacity-60">{isLoading ? "Loading..." : "Open payment queue"}</button>
          </form>
        ) : (
          <>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <p className="text-slate-700"><strong>{pendingCount}</strong> awaiting verification · {registrations.length} total</p>
              <div className="flex gap-2">
                <button type="button" onClick={() => loadRegistrations()} disabled={isLoading} className="rounded-md border border-[#1E3A8A] px-4 py-2 font-semibold text-[#FFF7E0] disabled:opacity-50">Refresh</button>
                <button type="button" onClick={() => { setAuthenticated(false); setPassword(""); setRegistrations([]); setNotes({}); }} className="rounded-md border border-slate-400 px-4 py-2 font-semibold text-[#FFF7E0]">Sign out</button>
              </div>
            </div>
            {error && <p className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-800" role="alert">{error}</p>}
            {registrations.length === 0 ? (
              <p className="rounded-lg border border-slate-200 bg-white p-6 text-slate-600">No Jaipur registrations have been submitted.</p>
            ) : (
              <div className="space-y-4">
                {registrations.map((registration) => {
                  const status = registration.paymentVerificationStatus || "awaiting_verification";
                  const statusLabel = status === "verified" ? "Verified" : status === "rejected" ? "Needs attention" : "Awaiting verification";
                  return (
                    <article key={registration._id} className="border-b border-slate-300 bg-white p-5 shadow-sm">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <h2 className="text-lg font-semibold text-[#1E3A8A]">{registration.participants?.[0]?.name || "Unnamed registrant"}</h2>
                          <p className="text-sm text-slate-600">{registration.mobile} · {registration.email} · {registration.persons} devotee(s)</p>
                        </div>
                        <span className={`rounded px-2.5 py-1 text-sm font-semibold ${status === "verified" ? "bg-emerald-100 text-emerald-800" : status === "rejected" ? "bg-red-100 text-red-800" : "bg-amber-100 text-amber-900"}`}>{statusLabel}</span>
                      </div>

                      <div className="mt-4 grid gap-x-8 gap-y-2 text-sm text-slate-700 sm:grid-cols-2 lg:grid-cols-3">
                        <p>Submitted: {new Date(registration.createdAt).toLocaleString()}</p>
                        <p>Room: {registration.roomType} sharing</p>
                        <p>Payment type: {registration.paymentType}</p>
                        <p>Amount reported: <strong>{money(registration.amountSubmitted)}</strong></p>
                        <p>Yatra total: {money(registration.totalAmount)}</p>
                        <p>Confirmed paid: {money(registration.paidAmount)}</p>
                        <p>Balance: {money(registration.remainingAmount)}</p>
                        <p>Reference: {registration.paymentReference || "Not provided"}</p>
                        {registration.paymentVerifiedAt && <p>Verified: {new Date(registration.paymentVerifiedAt).toLocaleString()}</p>}
                      </div>

                      <div className="mt-3 space-y-1 text-sm text-slate-700">
                        {registration.participants?.map((person, index) => (
                          <p key={`${registration._id}-${person.name}-${index}`}>{person.name}, age {person.age}, {person.gender}; classes: {person.attendingClasses}</p>
                        ))}
                      </div>
                      {registration.paymentScreenshot && (
                        <a className="mt-3 inline-block font-semibold text-[#1E3A8A] underline" href={registration.paymentScreenshot.startsWith("http") ? registration.paymentScreenshot : `${API_URL}${registration.paymentScreenshot}`} target="_blank" rel="noreferrer">View payment screenshot</a>
                      )}
                      {registration.paymentVerificationNote && <p className="mt-3 text-sm text-slate-600">Review note: {registration.paymentVerificationNote}</p>}

                      {status !== "verified" && (
                        <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto_auto]">
                          <label className="sr-only" htmlFor={`review-note-${registration._id}`}>Review note or rejection reason</label>
                          <input id={`review-note-${registration._id}`} className={inputClass} value={notes[registration._id] || ""} onChange={(event) => setNotes((current) => ({ ...current, [registration._id]: event.target.value }))} placeholder="Optional verification note; required for rejection" />
                          <button type="button" disabled={busyId === registration._id} onClick={() => handleAction(registration, "verify")} className="rounded-md bg-emerald-700 px-4 py-2 font-semibold text-white disabled:opacity-50">{busyId === registration._id ? "Saving..." : "Confirm payment"}</button>
                          <button type="button" disabled={busyId === registration._id} onClick={() => handleAction(registration, "reject")} className="rounded-md border border-red-700 px-4 py-2 font-semibold text-red-700 disabled:opacity-50">Reject</button>
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
