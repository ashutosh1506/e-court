export default function Footer() {
  return (
    <>
      <footer className="bg-neutral text-gray-300 px-8 py-12 flex flex-wrap justify-between gap-8">
        {/* Left */}
        <div className="max-w-xs">
          <div className="flex items-center gap-3 mb-4">
            <img
              src="https://thumbs.dreamstime.com/b/justice-scale-grunge-texture-as-symbol-law-vintage-parchment-texture-as-concept-old-legal-system-36389701.jpg"
              alt="e-Court Logo"
              className="w-12 h-12 rounded-full"
            />
            <h2 className="text-lg text-white font-bold">
              e-Court <span className="block text-warning">Virtual Portal</span>
            </h2>
          </div>
          <p>
            Empowering justice through digital transformation. Access court
            services, file cases, and track proceedings seamlessly online.
          </p>
          <p className="mt-3">
            Email: <a href="mailto:support@ecourts.gov.in" className="text-warning">support@ecourts.gov.in</a>
          </p>
          <p>Phone: 1800-123-4567</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-warning font-bold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-warning">Video Tutorials</a></li>
            <li><a href="#" className="hover:text-warning">Contact Us</a></li>
            <li><a href="#" className="hover:text-warning">About Us</a></li>
            <li><a href="#" className="hover:text-warning">Terms and Conditions</a></li>
            <li><a href="#" className="hover:text-warning">Site Map</a></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-warning font-bold mb-3">e-Court Services</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-warning">Case Status Inquiry</a></li>
            <li><a href="#" className="hover:text-warning">e-Filing Services</a></li>
            <li><a href="#" className="hover:text-warning">Virtual Court Hearings</a></li>
            <li><a href="#" className="hover:text-warning">Court Fee Payment</a></li>
            <li><a href="#" className="hover:text-warning">Document Verification</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-warning font-bold mb-3">Contact Information</h3>
          <p>📍 Supreme Court of India, Tilak Marg, New Delhi - 110001</p>
          <p className="mt-2">Technical Support Hours:</p>
          <p>Mon-Fri: 9:00 AM - 6:00 PM</p>
          <p>Sat: 9:00 AM - 2:00 PM</p>
        </div>
      </footer>

      {/* Government Partners */}
      <section className="bg-neutral text-center py-8 border-t border-gray-600">
        <h3 className="text-warning font-bold text-lg mb-4">Government Partners</h3>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="https://www.digitalindia.gov.in" className="btn bg-white text-black">Digital India</a>
          <a href="https://lawmin.gov.in" className="btn bg-white text-black">Ministry of Law & Justice</a>
          <a href="https://www.india.gov.in" className="btn bg-white text-black">Government of India</a>
          <a href="https://www.nic.in" className="btn bg-white text-black">NIC</a>
          <a href="https://www.indiacode.nic.in" className="btn bg-white text-black">India Code</a>
        </div>
      </section>

      {/* Bottom */}
      <div className="bg-primary text-gray-200 flex flex-col md:flex-row justify-between items-center px-8 py-3 text-sm">
        <p>@Virtual © e-Court Portal, for online hearing conference.</p>
        <div className="flex gap-4 mt-2 md:mt-0">
          <a href="#" className="hover:text-warning">Privacy Policy</a>
          <a href="#" className="hover:text-warning">Accessibility</a>
          <a href="#" className="hover:text-warning">RTI</a>
        </div>
      </div>
    </>
  );
}
