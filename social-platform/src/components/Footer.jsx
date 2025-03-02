import React from 'react';

function Footer() {
  return (
    <section className="bg-white">
      <div className="max-w-screen-xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
        <nav className="flex flex-wrap justify-center -mx-5 -my-2">
          {['About', 'Blog', 'Team', 'Pricing', 'Contact', 'Terms'].map((item) => (
            <div key={item} className="px-5 py-2">
              <a href="#" className="text-base leading-6 text-gray-500 hover:text-gray-900">
                {item}
              </a>
            </div>
          ))}
        </nav>
        <div className="flex justify-center mt-8 space-x-6">
          {[
            { name: 'Facebook', icon: 'fab fa-facebook' },
            { name: 'Instagram', icon: 'fab fa-instagram' },
            { name: 'Twitter', icon: 'fab fa-twitter' },
            { name: 'GitHub', icon: 'fab fa-github' }, // Added GitHub
            { name: 'Globe', icon: 'fas fa-globe' } // Added Globe
          ].map(({ name, icon }) => (
            <a key={name} href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">{name}</span>
              <i className={icon} style={{ fontSize: '1.5rem' }}></i>
            </a>
          ))}
        </div>
        <p className="mt-8 text-base leading-6 text-center text-gray-400">
          &copy; 2025, Inc. All rights reserved.
        </p>
      </div>
    </section>
  );
}

export default Footer;