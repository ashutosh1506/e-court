import React from "react";
import { motion } from "framer-motion";

function Services() {
  return (
    <div className="min-h-screen flex flex-col bg-base-100 text-base-content px-6 py-12 ">
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-secondary"
      >
        Our Services
      </motion.h1>

      {/* Stats Section */}
      <section className="flex flex-col items-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl"
        >
          {[
            { title: "High Court Complexes", value: "39" },
            { title: "HC Cases Pending", value: "6.17 M" },
            { title: "HC Cases Disposed", value: "37.33 M" },
            { title: "HC Cases Today", value: "62.23 K" },
            { title: "District Court Complexes", value: "3504" },
            { title: "DC Pending Cases", value: "44.34 M" },
            { title: "DC Disposed (Last Month)", value: "1.23 M" },
            { title: "DC Cases Today", value: "1.15 M" },
          ].map((card, i) => (
            <div
              key={i}
              className={`shadow-lg rounded-xl text-center p-6 hover:scale-105 transition-transform duration-300 ${
                i % 2 === 0
                  ? "bg-primary text-neutral-content"
                  : "bg-white text-blue-900 "
              }`}
            >
              <p className="text-lg font-medium">{card.title}</p>
              <h1 className="text-3xl font-bold mt-2">{card.value}</h1>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Service Offerings */}
      <section className="max-w-5xl mx-auto mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-primary">
          What We Offer
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Legal Consultation",
              desc: "Get expert advice from top lawyers across all courts with ease of online access.",
            },
            {
              title: "Case Tracking",
              desc: "Track the real-time status of your cases and get notified of updates instantly.",
            },
            {
              title: "Online Hearings",
              desc: "Participate in hearings virtually, saving both time and resources efficiently.",
            },
          ].map((service, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-base-200 rounded-xl shadow-md hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold mb-3 text-primary">
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-primary">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "How can I register as a lawyer?",
              a: "Simply go to the Register/Login option on the homepage and select 'As Lawyer'.",
            },
            {
              q: "Is online hearing legally valid?",
              a: "Yes, virtual hearings are recognized under the e-Court initiative of the Supreme Court.",
            },
            {
              q: "How do I check case status?",
              a: "You can track pending, disposed, and active cases directly on the dashboard in real-time.",
            },
          ].map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="p-5 border border-base-300 rounded-lg hover:shadow-md transition"
            >
              <h4 className="font-semibold text-lg mb-2 text-primary">
                {faq.q}
              </h4>
              <p className="text-sm">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-primary text-white py-10 px-6 rounded-xl shadow-lg max-w-3xl mx-auto"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Experience Virtual Justice?
          </h2>
          <p className="mb-6">
            Join thousands of users accessing courts and legal services online
            with transparency and ease.
          </p>
          <button className="px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-base-200 transition">
            Get Started
          </button>
        </motion.div>
      </section>
    </div>
  );
}

export default Services;
