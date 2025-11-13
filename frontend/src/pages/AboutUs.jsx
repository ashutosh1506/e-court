import { motion } from "framer-motion";
const AboutUs = () => {
  return (
    <div className="min-h-screen bg-base-100 text-base-content px-4 sm:px-6 md:px-12 lg:px-20 py-12">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-secondary"
      >
        About Us
      </motion.h2>

      {/* Content Grid */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-base-100 rounded-2xl shadow-lg p-6"
        >
          <p className="text-lg mb-6">
            <strong className="text-neutral">
              Welcome to Virtual-Court India, where the future of justice meets
              the convenience of technology.
            </strong>{" "}
            Our platform revolutionizes the legal landscape by integrating
            cutting-edge features that empower users to engage with the legal
            system more efficiently and accessibly.
          </p>

          <h3 className="text-2xl font-semibold text-neutral mb-4">
            Who We Are
          </h3>
          <p className="mb-4">
            At Virtual-Court India, we are committed to bridging the gap between
            traditional court proceedings and the digital age.
          </p>

          <h3 className="text-2xl font-semibold text-neutral mb-4">
            Our Features
          </h3>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <span className="font-semibold">
                Online Hearings via Video Call:
              </span>{" "}
              Attend hearings from anywhere.
            </li>
            <li>
              <span className="font-semibold">Face Recognition System:</span>{" "}
              Security & authenticity ensured.
            </li>
            <li>
              <span className="font-semibold">Online Petition Filing:</span>{" "}
              Quick, paperless petitions.
            </li>
            <li>
              <span className="font-semibold">Case Tracking & Access:</span>{" "}
              Stay informed with real-time updates.
            </li>
          </ul>
        </motion.div>

        {/* Right Column */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-neutral text-neutral-content rounded-2xl shadow-lg p-6"
        >
          <h3 className="text-2xl font-semibold mb-4">Why Choose Us?</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <span className="font-semibold">Efficiency:</span> Save time and
              resources with streamlined processes.
            </li>
            <li>
              <span className="font-semibold">Accessibility:</span> Justice for
              all, accessible from anywhere.
            </li>
            <li>
              <span className="font-semibold">Security:</span> Face recognition
              & modern safeguards.
            </li>
            <li>
              <span className="font-semibold">Innovation:</span> Constantly
              evolving for modern needs.
            </li>
          </ul>

          <p className="mt-6 text-lg font-medium">
            Join us at <span className="text-primary">Virtual-Court India</span>{" "}
            and be part of the digital revolution bringing justice to your
            fingertips.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
