 
import { useState } from "react";
import {
  Globe,
  Mic,
  ImagePlus,
  MapPin,
  LocateFixed,
  Sparkles,
  ArrowRight,
  UserRound,
  Phone,
  Mail,
  Hash,
  MapPinned,
  ShieldCheck,
  Search,
} from "lucide-react";

export default function NewComplaint() {
  const [formData, setFormData] = useState({
    consumerNumber: "",
    name: "",
    address: "",
    pincode: "",
    email: "",
    mobile: "",
    description: "",
    category: "Power outage",
  });

  const [image, setImage] = useState(null);
  const [consumerFound, setConsumerFound] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Demo consumer lookup. Connect this to your API.
  const handleConsumerLookup = () => {
    if (formData.consumerNumber.trim()) {
      setConsumerFound(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.consumerNumber.trim()) {
      alert("Please enter your consumer number.");
      return;
    }

    if (!formData.name.trim() || !formData.mobile.trim()) {
      alert("Please enter your name and mobile number.");
      return;
    }

    if (!formData.description.trim()) {
      alert("Please describe your complaint.");
      return;
    }

    // Replace with your backend API request.
    console.log("Complaint data:", formData);
    console.log("Uploaded image:", image);

    alert("Form validated! Connect your complaint submission API.");
  };

  const inputClass =
    "w-full rounded-xl border border-[#D8C6E4] bg-[#FCF6E9] px-4 py-3 text-sm text-[#2D103B] outline-none transition focus:border-[#61197B] focus:ring-2 focus:ring-[#61197B]/10";

  const labelClass =
    "mb-2 block text-sm font-medium text-[#2D103B]";

  return (
    <div className="min-h-screen bg-[#F7F2E8] px-4 py-4 pb-10 md:px-6 lg:px-10 fontcorm">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-[#6B4C7B]">
            Citizen services / New complaint
          </p>

          <h1 className="mt-2 text-3xl font-bold text-[#2D103B] md:text-4xl">
            Tell us what happened
          </h1>

          <p className="mt-3 text-[#5E4A67]">
            Share your details and our team will route your complaint to the
            right department.
          </p>
        </div>

        <button
          type="button"
          className="hidden items-center gap-2 text-[#4B2C5E] md:flex"
        >
          <Globe size={18} />
          English
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mt-8 grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
          {/* LEFT COLUMN */}
          <div className="space-y-6">
            {/* Consumer Information */}
            <section className="rounded-3xl border border-[#D8C6E4] bg-[#FFFEF6] p-5 md:p-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F0E3F5] text-[#61197B]">
                  <UserRound size={21} />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-[#2D103B]">
                    Consumer information
                  </h2>
                  <p className="mt-1 text-sm text-[#6B4C7B]">
                    Enter your electricity connection details.
                  </p>
                </div>
              </div>

              {/* Consumer Number */}
              <div className="mb-5">
                <label htmlFor="consumerNumber" className={labelClass}>
                  Consumer number <span className="text-red-600">*</span>
                </label>

                <div className="flex flex-col gap-2 sm:flex-row">
                  <input
                    id="consumerNumber"
                    name="consumerNumber"
                    value={formData.consumerNumber}
                    onChange={handleChange}
                    onBlur={handleConsumerLookup}
                    placeholder="Enter consumer number"
                    className={inputClass}
                    required
                  />

                  <button
                    type="button"
                    onClick={handleConsumerLookup}
                    className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#61197B] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#4E1263]"
                  >
                    <Search size={16} />
                    Verify
                  </button>
                </div>

                <p className="mt-2 text-xs text-[#786A7D]">
                  Enter the number printed on your electricity bill.
                </p>

                {consumerFound && (
                  <p className="mt-2 text-sm text-[#9A6500]">
                    Demo lookup only. Verify the consumer details with the
                    electricity provider to confirm the connection.
                  </p>
                )}
              </div>

              {/* Name */}
              <div className="mb-4">
                <label htmlFor="name" className={labelClass}>
                  Consumer name <span className="text-red-600">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  autoComplete="name"
                  className={inputClass}
                  required
                />
              </div>

              {/* Address */}
              <div className="mb-4">
                <label htmlFor="address" className={labelClass}>
                  Consumer address
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your registered address"
                  rows={3}
                  autoComplete="street-address"
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Pincode */}
              <div className="mb-4">
                <label htmlFor="pincode" className={labelClass}>
                  Pincode
                </label>
                <div className="relative">
                  <MapPinned
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#786A7D]"
                  />
                  <input
                    id="pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={(e) =>
                      handleChange({
                        target: {
                          name: "pincode",
                          value: e.target.value.replace(/\D/g, "").slice(0, 6),
                        },
                      })
                    }
                    placeholder="6-digit pincode"
                    inputMode="numeric"
                    maxLength={6}
                    autoComplete="postal-code"
                    className={`${inputClass} pl-10`}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="mb-4">
                <label htmlFor="email" className={labelClass}>
                  Email address
                </label>
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#786A7D]"
                  />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    autoComplete="email"
                    className={`${inputClass} pl-10`}
                  />
                </div>
              </div>

              {/* Mobile */}
              <div className="mb-4">
                <label htmlFor="mobile" className={labelClass}>
                  Mobile number <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <Phone
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#786A7D]"
                  />
                  <input
                    id="mobile"
                    name="mobile"
                    type="tel"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    inputMode="numeric"
                    autoComplete="tel"
                    maxLength={10}
                    className={`${inputClass} pl-10`}
                    required
                  />
                </div>
              </div>

              {/* Authentication Status */}
              <div className="mt-5 flex items-start gap-3 rounded-xl border border-[#E3D4E8] bg-[#F5EDF7] p-4">
                <ShieldCheck
                  size={22}
                  className="shrink-0 text-[#61197B]"
                />
                <div>
                  <h3 className="font-semibold text-[#2D103B]">
                    Aadhaar authentication
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-[#6B4C7B]">
                    Authentication status will be displayed after integration
                    with an authorized verification service.
                  </p>
                  <span className="mt-2 inline-block rounded-full bg-white px-3 py-1 text-xs text-[#786A7D]">
                    Not verified
                  </span>
                </div>
              </div>
            </section>

            {/* Complaint Details */}
            <section className="rounded-3xl border border-[#D8C6E4] bg-[#FFFEF6] p-5 md:p-6">
              <h2 className="text-xl font-bold text-[#2D103B]">
                Complaint details
              </h2>

              <div className="mt-5">
                <label htmlFor="description" className={labelClass}>
                  Describe your complaint{" "}
                  <span className="text-red-600">*</span>
                </label>

                <textarea
                  id="description"
                  name="description"
                  rows={6}
                  maxLength={500}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the electricity issue and when it started..."
                  className={`${inputClass} resize-none p-4`}
                  required
                />

                <div className="mt-2 flex justify-between gap-3 text-xs text-[#6B4C7B]">
                  <span>Include details about the issue.</span>
                  <span>{formData.description.length}/500</span>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() =>
                    alert("Connect a speech-to-text service for voice complaints.")
                  }
                  className="flex items-center gap-2 rounded-xl border border-[#D8C6E4] px-4 py-3 text-sm text-[#2D103B] hover:bg-[#F5EDF7]"
                >
                  <Mic size={18} />
                  Add voice complaint
                </button>

                <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-[#D8C6E4] px-4 py-3 text-sm text-[#2D103B] hover:bg-[#F5EDF7]">
                  <ImagePlus size={18} />
                  {image ? "Change image" : "Upload image"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setImage(e.target.files?.[0] || null)}
                  />
                </label>
              </div>

              {image && (
                <p className="mt-3 break-all text-sm text-[#61197B]">
                  Selected image: {image.name}
                </p>
              )}

              <div className="mt-6">
                <label htmlFor="category" className={labelClass}>
                  Complaint category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option>Power outage</option>
                  <option>Transformer failure</option>
                  <option>Voltage fluctuation</option>
                  <option>Street light issue</option>
                  <option>Meter problem</option>
                  <option>Billing issue</option>
                  <option>New connection</option>
                  <option>Other</option>
                </select>
              </div>

              <button
                type="submit"
                className="mt-7 flex items-center justify-center gap-2 rounded-xl bg-[#61197B] px-6 py-3 font-medium text-white transition hover:bg-[#4E1263]"
              >
                Submit complaint
                <ArrowRight size={18} />
              </button>
            </section>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            {/* Location */}
            <section className="overflow-hidden rounded-3xl border border-[#D8C6E4] bg-[#FFFEF6]">
              <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-bold text-[#2D103B]">
                    Issue location
                  </h3>
                  <p className="mt-1 text-sm text-[#6B4C7B]">
                    Where is the problem?
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    alert("Connect browser geolocation to select your location.")
                  }
                  className="flex items-center justify-center gap-2 rounded-xl border border-[#D8C6E4] px-3 py-2 text-sm hover:bg-[#F5EDF7]"
                >
                  <LocateFixed size={16} />
                  Use my location
                </button>
              </div>

              {/* Decorative map placeholder */}
              <div className="relative h-64 bg-[#D9EEF8] sm:h-72">
                <div className="absolute inset-0 bg-[linear-gradient(#7DB7D6_1px,transparent_1px),linear-gradient(90deg,#7DB7D6_1px,transparent_1px)] bg-[size:42px_42px] opacity-30" />

                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#D6C2E8]">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F6B317]">
                      <MapPin size={24} className="text-[#3A2200]" />
                    </div>
                  </div>
                  <div className="mt-3 whitespace-nowrap rounded-xl bg-white px-4 py-2 text-sm shadow">
                    Select your issue location
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2 p-5 text-sm text-[#61197B]">
                <MapPin size={18} className="shrink-0" />
                <span>
                  Select a location to provide the address of the electricity
                  issue.
                </span>
              </div>
            </section>

            {/* Smart Routing */}
            <section className="rounded-3xl border border-[#D8C6E4] bg-[#EFDFF3] p-6">
              <div className="flex items-center gap-3 text-[#61197B]">
                <Sparkles size={21} />
                <h3 className="font-bold">Smart routing</h3>
              </div>

              <p className="mt-3 text-sm leading-7 text-[#5E4A67]">
                Our AI will identify the issue, set its priority, detect
                similar complaints and route the request to the right team.
              </p>
            </section>

            {/* Help */}
            <section className="rounded-2xl border border-[#D8C6E4] bg-[#FFFEF6] p-5">
              <h3 className="font-semibold text-[#2D103B]">
                Need assistance?
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#6B4C7B]">
                For electricity-related assistance, contact your electricity
                provider through its official customer support channels.
              </p>
            </section>
          </div>
        </div>
      </form>
    </div>
  );
}
 