const Footer = () => {
    return (
      <footer className="bg-gray-900 text-gray-300 py-10 px-5 md:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div>
            <h2 className="text-2xl font-bold text-white">PropEase</h2>
            <p className="mt-4 text-sm">
              Your trusted partner in buying, selling, and renting properties across India.
            </p>
          </div>
  
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Home</a></li>
              <li><a href="#" className="hover:text-white">Buy</a></li>
              <li><a href="#" className="hover:text-white">Rent</a></li>
              <li><a href="#" className="hover:text-white">Sell</a></li>
            </ul>
          </div>
  
          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">FAQs</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
              <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>
  
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Contact Us</h3>
            <p className="text-sm">123 Realty Lane, Mumbai, India</p>
            <p className="text-sm mt-2">Email: support@propease.com</p>
            <p className="text-sm mt-1">Phone: +91 98765 43210</p>
  
            {/* Social Icons */}
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-white">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="hover:text-white">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="hover:text-white">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="hover:text-white">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>
  
        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm">
          © {new Date().getFullYear()} PropEase. All rights reserved.
        </div>
      </footer>
    );
  };
  
  export default Footer;
  