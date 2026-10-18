
import React from "react";
import {
  Zap,
  BrainCircuit,
  ShieldCheck,
  Users,
  Mic,
  MapPin,
  ClipboardCheck,
  ArrowRight,
  Sparkles,
  Target,
  Eye,
  HeartHandshake,
  Clock,
  Building2,
  CheckCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Layout from "../../layouts/Layout";

const About = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: BrainCircuit,
      title: "AI-Powered Classification",
      description:
        "Automatically identifies complaint categories and recommends priority levels for faster routing.",
    },
    {
      icon: Users,
      title: "Smart Complaint Grouping",
      description:
        "Identifies similar reports from the same area and helps authorities coordinate a single repair response.",
    },
    {
      icon: Mic,
      title: "Voice-Based Complaints",
      description:
        "Makes complaint registration easier for citizens who prefer speaking instead of typing.",
    },
    {
      icon: MapPin,
      title: "Location-Based Routing",
      description:
        "Uses the reported issue location to help route complaints to the appropriate maintenance team.",
    },
    {
      icon: ClipboardCheck,
      title: "Live Status Tracking",
      description:
        "Allows citizens to follow complaint progress from registration through repair and resolution.",
    },
    {
      icon: ShieldCheck,
      title: "Transparent Workflow",
      description:
        "Supports authority approvals, repair assignments, and public updates for area-level electricity issues.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Register",
      description: "Submit a complaint using text or voice.",
    },
    {
      number: "02",
      title: "Analyze",
      description: "AI categorizes the issue and suggests priority.",
    },
    {
      number: "03",
      title: "Route",
      description: "The complaint is directed for appropriate action.",
    },
    {
      number: "04",
      title: "Resolve",
      description: "Track repair progress until the issue is resolved.",
    },
  ];

  return (
    <Layout currTitle="About">
      <div className="min-h-screen bg-[#F7F2E8] px-4 py-5 pb-12 md:px-7 lg:px-10 fontcorm">

        {/* Hero */}
        <section className="relative mt-5 overflow-hidden rounded-3xl bg-[#61197B] px-6 py-10 text-white md:px-10 md:py-14">
          <div className="pointer-events-none absolute -right-12 -top-16 h-64 w-64 rounded-full border-[35px] border-white/5" />
          <div className="pointer-events-none absolute -bottom-24 right-32 h-52 w-52 rounded-full bg-[#F6B317]/10 blur-2xl" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-purple-100">
              <Sparkles size={16} className="text-[#F6B317]" />
              Smart electricity complaint resolution
            </div>

            <h1 className="mt-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              About{" "}
              <span className="text-[#F6B317]">VidyutSeva</span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-purple-100 md:text-lg">
              Making electricity complaint management smarter, more accessible,
              and more transparent through AI-powered assistance and intelligent
              service routing.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => navigate("/new-complaint")}
                className="flex items-center gap-2 rounded-xl bg-[#F6B317] px-5 py-3 font-semibold text-[#29113A] transition hover:bg-yellow-300"
              >
                Register a complaint
                <ArrowRight size={18} />
              </button>

              <button
                onClick={() => navigate("/view-complaints")}
                className="rounded-xl border border-white/30 px-5 py-3 font-medium text-white transition hover:bg-white/10"
              >
                Track complaints
              </button>
            </div>
          </div>

          <div className="relative z-10 mt-10 grid grid-cols-2 gap-3 md:absolute md:bottom-8 md:right-8 md:mt-0 md:w-64">
            <div className="flex min-h-24 flex-col justify-center rounded-2xl border border-white/15 bg-white/10 p-4">
              <Zap size={23} className="text-[#F6B317]" />
              <p className="mt-3 text-sm font-semibold">Smart Routing</p>
            </div>
            <div className="flex min-h-24 flex-col justify-center rounded-2xl border border-white/15 bg-white/10 p-4">
              <BrainCircuit size={23} className="text-[#F6B317]" />
              <p className="mt-3 text-sm font-semibold">AI Assistance</p>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#61197B]">
              Who we are
            </p>

            <h2 className="mt-3 text-3xl font-bold leading-tight text-[#2D103B] md:text-4xl">
              A smarter way to handle electricity complaints
            </h2>

            <p className="mt-5 leading-8 text-[#5E4A67]">
              VidyutSeva is an AI-powered electricity complaint resolution
              platform designed to connect citizens with the appropriate
              electricity service teams. It helps organize complaints, identify
              similar issues, recommend priorities, and provide clear progress
              updates.
            </p>

            <p className="mt-4 leading-8 text-[#5E4A67]">
              Whether a citizen reports a local power outage, a transformer
              problem, a meter issue, or a billing concern, the platform aims to
              make reporting and tracking easier.
            </p>
          </div>

          <div className="rounded-3xl border border-[#E3D4E8] bg-[#FFFEF6] p-6 md:p-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F0E3F5] text-[#61197B]">
              <Zap size={30} />
            </div>

            <h3 className="mt-5 text-2xl font-bold text-[#2D103B]">
              Our purpose
            </h3>

            <p className="mt-3 leading-7 text-[#5E4A67]">
              Reduce manual complaint handling, improve issue visibility, and
              help electricity departments coordinate maintenance more
              effectively.
            </p>

            <div className="mt-6 space-y-4">
              {[
                "Simpler complaint registration",
                "Intelligent issue prioritization",
                "Clearer repair status updates",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2
                    size={19}
                    className="shrink-0 text-[#61197B]"
                  />
                  <span className="text-sm text-[#2D103B]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission and Vision */}
        <section className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="rounded-3xl border border-[#E3D4E8] bg-[#FFFEF6] p-6 md:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F0E3F5] text-[#61197B]">
              <Target size={25} />
            </div>

            <h3 className="mt-5 text-2xl font-bold text-[#2D103B]">
              Our mission
            </h3>

            <p className="mt-3 leading-7 text-[#5E4A67]">
              To make electricity complaint registration and resolution more
              efficient by using AI-assisted categorization, priority
              recommendations, and transparent tracking.
            </p>
          </div>

          <div className="rounded-3xl border border-[#E3D4E8] bg-[#F0E3F5] p-6 md:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#61197B]">
              <Eye size={25} />
            </div>

            <h3 className="mt-5 text-2xl font-bold text-[#2D103B]">
              Our vision
            </h3>

            <p className="mt-3 leading-7 text-[#5E4A67]">
              To support more accessible, responsive, and data-informed
              electricity services, where citizens can report problems and
              understand the progress of maintenance work.
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="mt-14">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#61197B]">
              What makes us different
            </p>

            <h2 className="mt-3 text-3xl font-bold text-[#2D103B] md:text-4xl">
              One platform, smarter complaint handling
            </h2>

            <p className="mt-4 leading-7 text-[#5E4A67]">
              From accessible reporting to coordinated repairs, VidyutSeva brings
              important complaint-management capabilities together.
            </p>
          </div>

          <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-[#E3D4E8] bg-[#FFFEF6] p-6 transition duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F0E3F5] text-[#61197B]">
                    <Icon size={24} />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-[#2D103B]">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#6B5A71]">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* How it works */}
        <section className="mt-14 rounded-3xl border border-[#E3D4E8] bg-[#FFFEF6] p-6 md:p-9">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#61197B]">
              Simple workflow
            </p>

            <h2 className="mt-3 text-3xl font-bold text-[#2D103B]">
              How VidyutSeva works
            </h2>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#61197B] font-bold text-[#F6B317]">
                  {step.number}
                </div>

                <h3 className="mt-4 text-lg font-bold text-[#2D103B]">
                  {step.title}
                </h3>

                <p className="mt-2 text-sm leading-7 text-[#6B5A71]">
                  {step.description}
                </p>

                {index < steps.length - 1 && (
                  <ArrowRight
                    size={20}
                    className="absolute right-1 top-3 hidden text-[#B89AC6] xl:block"
                  />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="rounded-2xl bg-[#61197B] p-6 text-white">
            <ShieldCheck size={27} className="text-[#F6B317]" />
            <h3 className="mt-4 text-lg font-bold">Transparency</h3>
            <p className="mt-2 text-sm leading-6 text-purple-100">
              Clear complaint statuses and visible workflow progress.
            </p>
          </div>

          <div className="rounded-2xl bg-[#FFFEF6] p-6">
            <HeartHandshake size={27} className="text-[#61197B]" />
            <h3 className="mt-4 text-lg font-bold text-[#2D103B]">
              Accessibility
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#6B5A71]">
              A simpler experience, including support for voice-based reporting.
            </p>
          </div>

          <div className="rounded-2xl bg-[#F6B317] p-6">
            <Clock size={27} className="text-[#29113A]" />
            <h3 className="mt-4 text-lg font-bold text-[#29113A]">
              Efficiency
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#4C3654]">
              Better-organized complaints and AI-assisted prioritization.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 rounded-3xl border border-[#E3D4E8] bg-[#F0E3F5] px-6 py-10 text-center md:px-10">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#61197B]">
            <Building2 size={28} />
          </div>

          <h2 className="mt-5 text-3xl font-bold text-[#2D103B]">
            Electricity issues? We're here to help.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#5E4A67]">
            Register your electricity complaint and use VidyutSeva to follow its
            progress through the service workflow.
          </p>

          <button
            onClick={() => navigate("/new-complaint")}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#61197B] px-6 py-3 font-semibold text-white transition hover:bg-[#4E1263]"
          >
            Create a complaint
            <ArrowRight size={18} />
          </button>
        </section>

        {/* Footer */}
        <footer className="mt-8 border-t border-[#DECBE5] pt-5 text-center text-sm text-[#786A7D]">
          <p className="font-semibold text-[#61197B]">VidyutSeva</p>
          <p className="mt-2">
            AI-Powered Smart Electricity Complaint Resolution Portal
          </p>
        </footer>
      </div>
    </Layout>

  );
};

export default About;
``