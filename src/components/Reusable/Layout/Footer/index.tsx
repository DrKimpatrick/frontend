import React from 'react';
import { Link } from 'react-router-dom';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import iosIcon from 'assets/images/ios-icon.svg';
import androidIcon from 'assets/images/android-icon.svg';
import useWindowSize from 'utils/useWindowSize';
import './Footer.scss';

const Footer = () => {
  const size = useWindowSize();
  return (
    <>
      {size?.width && size?.width > 768 && (
        <>
          <footer className="text-white text-xs footer" data-testid="Footer">
            <div className="footer-background opacity-100 px-32 py-16">
              <div className="flex justify-between max-w-6xl m-auto">
                <div className="w-1/4">
                  <h3 className="text-lg mb-8 font-bold">COMPANY</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link className="hover:text-gray-400" to="#">
                        About us
                      </Link>
                    </li>
                    <li>
                      <Link className="hover:text-gray-400" to="#">
                        Investor Relations
                      </Link>
                    </li>
                    <li>
                      <Link className="hover:text-gray-400" to="#">
                        Careers
                      </Link>
                    </li>
                    <li>
                      <Link className="hover:text-gray-400" to="#">
                        Press
                      </Link>
                    </li>
                    <li>
                      <Link className="hover:text-gray-400" to="#">
                        Trust, Safety & Security
                      </Link>
                    </li>
                    <li>
                      <Link className="hover:text-gray-400" to="#">
                        Terms of Service
                      </Link>
                    </li>
                    <li>
                      <Link className="hover:text-gray-400" to="#">
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link className="hover:text-gray-400" to="#">
                        Accessibility
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="w-1/4">
                  <h3 className="text-lg mb-8 font-bold">BROWSE</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link className="hover:text-gray-400" to="#">
                        Tech Talent by Skill
                      </Link>
                    </li>
                    <li>
                      <Link className="hover:text-gray-400" to="#">
                        {' '}
                        Tech Talent in USA
                      </Link>
                    </li>
                    <li>
                      <Link className="hover:text-gray-400" to="#">
                        Tech Talent in UK
                      </Link>
                    </li>
                    <li>
                      <Link className="hover:text-gray-400" to="#">
                        Tech Talent in Canada
                      </Link>
                    </li>
                    <li>
                      <Link className="hover:text-gray-400" to="#">
                        Tech Talent in Australia
                      </Link>
                    </li>
                    <li>
                      <Link className="hover:text-gray-400" to="#">
                        Jobs in USA{' '}
                      </Link>
                    </li>
                    <li>
                      <Link className="hover:text-gray-400" to="#">
                        Find Jobs
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="w-1/4">
                  <h3 className="text-lg mb-8 font-bold">RESOURCES</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link className="hover:text-gray-400" to="#">
                        Resources
                      </Link>
                    </li>
                    <li>
                      <Link className="hover:text-gray-400" to="#">
                        Customer Support
                      </Link>
                    </li>
                    <li>
                      <Link className="hover:text-gray-400" to="#">
                        Customer Stories
                      </Link>
                    </li>
                    <li>
                      <Link className="hover:text-gray-400" to="#">
                        Business Resources
                      </Link>
                    </li>
                    <li>
                      <Link className="hover:text-gray-400" to="#">
                        Payroll Services
                      </Link>
                    </li>
                    <li>
                      <Link className="hover:text-gray-400" to="#">
                        Talent Reviews
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex justify-between items-center max-w-6xl m-auto mt-20 px-3 py-2 social-media">
                <div className="font-bold flex space-x-2 items-center ">
                  <span className="text-lg font-bold mr-5">Follow us</span>
                  <div className="flex space-x-3">
                    <Link to="#">
                      <FacebookIcon />
                    </Link>
                    <Link to="#">
                      <LinkedInIcon />
                    </Link>
                    <Link to="#">
                      <InstagramIcon />
                    </Link>
                    <Link to="#">
                      <TwitterIcon />
                    </Link>
                  </div>
                </div>
                <div className="flex space-x-6 ">
                  <Link to="#">
                    <img src={androidIcon} alt="android icon" />
                  </Link>
                  <Link to="#">
                    <img src={iosIcon} alt="ios icon" />
                  </Link>
                </div>
              </div>
            </div>
          </footer>
        </>
      )}
    </>
  );
};

export default Footer;
