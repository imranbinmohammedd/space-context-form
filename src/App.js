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
    duration: '',
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

    // Combine extra details into notes for backend
    const notes = [
      form.address ? `Address: ${form.address}` : '',
      form.siteArea ? `Site Area: ${form.siteArea}` : '',
      form.duration ? `Expected Duration: ${form.duration}` : '',
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
      setError('Something went wrong. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="text-5xl mb-4">✅</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h1>
          <p className="text-gray-600">
            We have received your enquiry. Our team will get in touch with you shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Space & Context</h1>
          <p className="text-gray-500 mt-1">Architecture • Interior • Construction</p>
          <p className="text-gray-600 mt-3">
            Please share a few details about your project and our team will contact you soon.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-slate-500"
                placeholder="Enter your full name"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-slate-500"
                placeholder="10-digit mobile number"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-slate-500"
                placeholder="your@email.com"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Residential / Correspondence Address
              </label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                rows="2"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-slate-500"
                placeholder="Your current address"
              />
            </div>

            {/* Site Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project / Site Location *
              </label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-slate-500"
                placeholder="City, area or landmark"
              />
            </div>

            {/* Site Area */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Approximate Site Area
              </label>
              <input
                type="text"
                name="siteArea"
                value={form.siteArea}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-slate-500"
                placeholder="e.g. 30×40 ft, 2400 sq.ft, 5 cents"
              />
            </div>

            {/* What to construct */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type of Project *
              </label>
              <select
                name="projectType"
                value={form.projectType}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-slate-500"
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

            {/* When to start */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Start Timeline
              </label>
              <select
                name="preferredTimeline"
                value={form.preferredTimeline}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-slate-500"
              >
                <option value="">Select preferred start</option>
                <option value="Immediately">Immediately</option>
                <option value="Within 1 month">Within 1 month</option>
                <option value="1–3 months">1–3 months</option>
                <option value="3–6 months">3–6 months</option>
                <option value="More than 6 months">More than 6 months</option>
              </select>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expected Project Duration
              </label>
              <select
                name="duration"
                value={form.duration}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-slate-500"
              >
                <option value="">Select expected duration</option>
                <option value="3–6 months">3–6 months</option>
                <option value="6–12 months">6–12 months</option>
                <option value="12–18 months">12–18 months</option>
                <option value="More than 18 months">More than 18 months</option>
                <option value="Not sure yet">Not sure yet</option>
              </select>
            </div>

            {/* Budget - Radio style (looks clean) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estimated Budget Range
              </label>
              <div className="space-y-2">
                {[
                  '15 – 25 Lakhs',
                  '25 – 50 Lakhs',
                  '50 Lakhs & above',
                  'Not decided yet',
                ].map((option) => (
                  <label key={option} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="budgetRange"
                      value={option}
                      checked={form.budgetRange === option}
                      onChange={handleChange}
                      className="w-4 h-4 text-slate-800"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* How did you find us */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                How did you hear about us?
              </label>
              <select
                name="source"
                value={form.source}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-slate-500"
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

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-800 text-white py-3 rounded-lg font-medium hover:bg-slate-700 disabled:opacity-60 transition"
            >
              {loading ? 'Submitting...' : 'Submit Enquiry'}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-400 mt-6">
          Space & Context • Designing Better Spaces
        </p>
      </div>
    </div>
  );
}

export default App;