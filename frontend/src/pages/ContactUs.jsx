import React from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";

function ContactUs() {
  return (
    <div className="min-h-screen bg-base-100 text-base-content flex flex-col items-center px-4 sm:px-6 md:px-12 lg:px-20 py-12">
      {/* Contact Section */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-secondary "
      >
        Contact Us
      </motion.h2>

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-base-100 rounded-2xl shadow-lg p-6 md:col-span-2"
        >
          <h3 className="text-2xl font-semibold mb-4 text-neutral">
            Send a Message
          </h3>
          <form className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="input input-bordered w-full"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="input input-bordered w-full"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered w-full"
              />
              <input
                type="number"
                placeholder="Mobile Number"
                className="input input-bordered w-full"
              />
            </div>
            <textarea
              placeholder="Write your message here..."
              rows="5"
              className="textarea textarea-bordered w-full"
            ></textarea>
            <button className="btn btn-primary w-full md:w-auto">Submit</button>
          </form>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-neutral text-neutral-content rounded-2xl shadow-lg p-6 flex flex-col justify-between"
        >
          <div>
            <h3 className="text-xl font-semibold mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="w-6 h-6 text-primary" />
                <p>Bhopal, Madhya Pradesh</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-6 h-6 text-primary" />
                <a
                  href="mailto:VirtualEcourt@email.com"
                  className="hover:underline"
                >
                  VirtualEcourt@email.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-6 h-6 text-primary" />
                <a href="tel:+919291287614" className="hover:underline">
                  +91 92912 87614
                </a>
              </div>
            </div>
          </div>

          {/* Social */}
          <div className="flex space-x-4 mt-6">
            <a href="#" className="hover:text-primary transition">
              <Facebook />
            </a>
            <a href="#" className="hover:text-primary transition">
              <Twitter />
            </a>
            <a href="#" className="hover:text-primary transition">
              <Linkedin />
            </a>
            <a href="#" className="hover:text-primary transition">
              <Instagram />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Map */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mt-10 rounded-2xl overflow-hidden shadow-lg w-full max-w-6xl"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.198957759974!2d77.397651024094!3d23.235846029024795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c42bde8f02dcf%3A0x3cf286d10ba239be!2sNew%20Market%2C%20STT%20Nagar%2C%20TT%20Nagar%2C%20Bhopal%2C%20Madhya%20Pradesh%20462003!5e0!3m2!1sen!2sin!4v1700910532938!5m2!1sen!2sin"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </motion.div>
    </div>
  );
}

export default ContactUs;
