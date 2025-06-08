const Footer = () => {
  return(
     <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">ServiceHub</h3>
              <p className="text-gray-400">Your trusted partner for finding local services</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Popular Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Electrician</li>
                <li>Plumber</li>
                <li>Doctor</li>
                <li>AC Repair</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Contact</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Safety</li>
                <li>Community Guidelines</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 ServiceHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
  )
}

export default Footer;