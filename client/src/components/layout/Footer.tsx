const Footer = () => {
  return (
    <footer className="bg-blue-100  text-gray-600 border-t border-gray-200">
      <div className="container mx-auto px-6 py-8 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
          <span className="text-xl font-bold text-gray-800">CRM Pro</span>
        </div>
        <p>&copy; 2025 CRM Pro. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;