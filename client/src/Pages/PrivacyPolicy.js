import React from "react";
import Layout from "../Components/Layout/Layout";
import "./HomePage.css";

export default function PrivacyPolicy() {
  return (
    <Layout>
      <div className="privacy_card">
        <h1 className="text-center">Karur Polymers Privacy Policy</h1><br/>
        {/* <p>
          <strong>Effective Date:</strong> October 27 2023
        </p> */}
        <p>
          At Karur Polymers, we are committed to safeguarding your privacy and
          protecting your personal information. This Privacy Policy outlines our
          practices concerning the collection, use, and protection of your
          personal information when you interact with our e-commerce website.
        </p>
        <br />
        <ol>
          <li>
            <h2>Information We Collect</h2>
            <p>
              We may collect the following types of information when you use our
              website:
            </p>
            <ul>
              <li>
                <strong>Personal Information:</strong> This includes information
                such as your name, email address, shipping address, billing
                information, and contact details.
              </li>
              <li>
                <strong>Payment Information:</strong> When you make a purchase,
                we may collect payment information, including credit card or
                payment card details.
              </li>
            </ul>
          </li>
          <br />

          <li>
            <h2>How We Use Your Information</h2>
            <p>We use the information we collect for the following purposes:</p>
            <ul>
              <li>
                <strong>Order Processing:</strong> To process and fulfill your
                orders, including shipping and providing order updates.
              </li>
              <li>
                <strong>Customer Support:</strong> To provide customer support
                and respond to your inquiries and requests.
              </li>
              <li>
                <strong>Improving Our Website:</strong> To enhance and customize
                your browsing experience and improve our website's
                functionality.
              </li>
              <li>
                <strong>Marketing and Promotions:</strong> To send you
                promotional emails, newsletters, and other marketing
                communications, subject to your consent and preferences.
              </li>
              <li>
                <strong>Legal Compliance:</strong> To comply with legal
                obligations and regulations.
              </li>
            </ul>
          </li>
          <br />

          <li>
            <h2>Sharing Your Information</h2>
            <p>We may share your personal information with:</p>
            <ul>
              <li>
                Service providers who assist us in running our website and
                fulfilling orders.
              </li>
              <li>
                Third-party partners for marketing and promotional purposes,
                with your consent.
              </li>
              <li>Government authorities, as required by law.</li>
            </ul>
          </li>
          <br />

          <li>
            <h2>Your Choices</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access, correct, or delete your personal information.</li>
              <li>Opt out of receiving marketing communications.</li>
              <li>
                Set your browser to reject cookies and other tracking
                technologies.
              </li>
            </ul>
          </li>
          <br />

          <li>
            <h2>Security Measures</h2>
            <p>
              We take reasonable steps to protect your personal information from
              unauthorized access and disclosure. However, no online data
              transmission or storage can be guaranteed to be 100% secure.
            </p>
          </li>
          <br />

          <li>
            <h2>Updates to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will post
              the updated version with a revised effective date.
            </p>
          </li>
          <br />

          <li>
            <h2>Contact Us</h2>
            <p>
              If you have any questions, concerns, or requests regarding your
              personal information or this Privacy Policy, please contact us at{" "}
              <a href="mailto:karurpolymerspvtltd@gmail.com">karurpolymerspvtltd@gmail.com</a>.
            </p>
          </li>
          <br />
        </ol>
        <p>
          By using our website, you agree to the terms of this Privacy Policy.
          Please review it regularly to stay informed about how we collect and
          protect your personal information.
        </p>
        <br />
      </div>
    </Layout>
  );
}
