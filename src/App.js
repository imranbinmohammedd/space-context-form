import { useState } from 'react';
import axios from 'axios';

function App() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    location: '',
    siteArea: '',
    projectType: '',
    preferredTimeline: '',
    budgetRange: '',
    source: 'Website',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const notes = [
      form.address ? `Address: ${form.address}` : '',
      form.siteArea ? `Site Area: ${form.siteArea}` : '',
    ]
      .filter(Boolean)
      .join(' | ');

    const payload = {
      name: form.name,
      phone: form.phone,
      email: form.email,
      location: form.location,
      projectType: form.projectType,
      preferredTimeline: form.preferredTimeline,
      budgetRange: form.budgetRange,
      source: form.source,
      notes: notes,
    };

    try {
      await axios.post('https://space-context-api.onrender.com/api/leads', payload);
      setSubmitted(true);
    } catch (err) {
      setError('Unable to submit your enquiry. Please try again shortly.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#f7f6f3] flex items-center justify-center p-6">
        <div className="bg-white max-w-md w-full p-10 text-center shadow-sm border border-gray-100">
          <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-slate-800 flex items-center justify-center">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-slate-800 tracking-tight mb-3">
            Enquiry Received
          </h1>
          <p className="text-slate-500 text-sm leading-relaxed">
            Thank you for reaching out to Space & Context.
            Our team will review your details and contact you shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f6f3]">
      {/* Top brand bar */}
      <div className="bg-slate-900 text-white py-4 px-6">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold tracking-wide">SPACE & CONTEXT</h1>
            <p className="text-xs text-slate-400 mt-0.5">Architecture · Interior · Construction</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-5 py-10">
        {/* Intro */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-800 tracking-tight">
            Project Enquiry
          </h2>
          <p className="text-slate-500 text-sm mt-2 leading-relaxed">
            Share a few details about your project. Our team will get in touch to discuss the next steps.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white border border-gray-200 shadow-sm">
          {error && (
            <div className="mx-6 mt-6 p-3 bg-red-50 border border-red-100 text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
            {/* Personal Details */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
                Contact Details
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-600 mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 px-3.5 py-2.5 text-sm text-slate-800 outline-none focus:border-slate-800 transition"
                    placeholder="Your full name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-600 mb-1.5">Mobile Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 px-3.5 py-2.5 text-sm text-slate-800 outline-none focus:border-slate-800 transition"
                      placeholder="10-digit number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-600 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full border border-gray-300 px-3.5 py-2.5 text-sm text-slate-800 outline-none focus:border-slate-800 transition"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-slate-600 mb-1.5">
                    Residential / Correspondence Address
                  </label>
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    rows="2"
                    className="w-full border border-gray-300 px-3.5 py-2.5 text-sm text-slate-800 outline-none focus:border-slate-800 transition resize-none"
                    placeholder="Your current address"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
                Project Details
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-600 mb-1.5">
                    Project / Site Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 px-3.5 py-2.5 text-sm text-slate-800 outline-none focus:border-slate-800 transition"
                    placeholder="City, area or landmark"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-600 mb-1.5">
                    Approximate Site Area
                  </label>
                  <input
                    type="text"
                    name="siteArea"
                    value={form.siteArea}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-3.5 py-2.5 text-sm text-slate-800 outline-none focus:border-slate-800 transition"
                    placeholder="e.g. 30×40 ft, 2400 sq.ft"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-600 mb-1.5">Type of Project *</label>
                  <select
                    name="projectType"
                    value={form.projectType}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 px-3.5 py-2.5 text-sm text-slate-800 outline-none focus:border-slate-800 transition bg-white"
                  >
                    <option value="">Select project type</option>
                    <option value="Residential">Residential Building</option>
                    <option value="Commercial">Commercial Building</option>
                    <option value="Interior">Interior Design / Fit-out</option>
                    <option value="Institutional">Institutional / Educational</option>
                    <option value="Renovation">Renovation / Remodelling</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
  <label className="block text-sm text-slate-600 mb-1.5">
    Expected Start Time
  </label>
  <select
    name="preferredTimeline"
    value={form.preferredTimeline}
    onChange={handleChange}
    className="w-full border border-gray-300 px-3.5 py-2.5 text-sm text-slate-800 outline-none focus:border-slate-800 transition bg-white"
  >
    <option value="">Select expected start</option>
    <option value="Immediately">Immediately</option>
    <option value="Within 1 month">Within 1 month</option>
    <option value="1–3 months">1–3 months</option>
    <option value="3–6 months">3–6 months</option>
    <option value="More than 6 months">More than 6 months</option>
  </select>
</div>
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-sm text-slate-600 mb-2.5">
                    Estimated Budget Range
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      '15 – 25 Lakhs',
                      '25 – 50 Lakhs',
                      '50 Lakhs & above',
                      'Not decided yet',
                    ].map((option) => (
                      <label
                        key={option}
                        className={`flex items-center gap-3 px-3.5 py-2.5 border cursor-pointer transition ${
                          form.budgetRange === option
                            ? 'border-slate-800 bg-slate-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="budgetRange"
                          value={option}
                          checked={form.budgetRange === option}
                          onChange={handleChange}
                          className="w-3.5 h-3.5 accent-slate-800"
                        />
                        <span className="text-sm text-slate-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <div>
                <label className="block text-sm text-slate-600 mb-1.5">
                  How did you hear about us?
                </label>
                <select
                  name="source"
                  value={form.source}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-3.5 py-2.5 text-sm text-slate-800 outline-none focus:border-slate-800 transition bg-white"
                >
                  <option value="Website">Website</option>
                  <option value="Instagram">Instagram</option>
                  <option value="Facebook">Facebook</option>
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Referral">Friend / Referral</option>
                  <option value="Google">Google Search</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-slate-900 text-white py-3.5 text-sm font-medium tracking-wide hover:bg-slate-800 disabled:opacity-60 transition"
              >
                {loading ? 'Submitting...' : 'Submit Enquiry'}
              </button>
            </div>
          </form>
        </div>

        <p className="text-center text-xs text-slate-400 mt-8 tracking-wide">
          SPACE & CONTEXT · Designing Better Spaces
        </p>
      </div>
    </div>
  );
}

export default App;