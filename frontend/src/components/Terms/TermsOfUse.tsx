import { Link } from "react-router-dom";
import NavBar from "../global/NavBar";
import Footer from "../global/Footer";
import "../../style/Legal.css";

function TermsOfUse() {
  return (
    <>
      <NavBar />
      <div className="legalNav" style={{ justifyContent: "right" }}>
        <Link
          className="legalLink"
          to="/legal/privacy-policy"
          style={{ color: "#FFFFFF" }}
        >
          Privacy Policy
          <div className="md-footer_button_right md-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M4 11v2h12l-5.5 5.5 1.42 1.42L19.84 12l-7.92-7.92L10.5 5.5 16 11z"></path>
            </svg>
          </div>
        </Link>
      </div>
      <div
        className="section-3"
        style={{ backgroundColor: "#000000", padding: "3rem 0" }}
      >
        <div className="tou-container">
          <h1 className="tou-heading">
            Terms of Use (Last updated: 30 December 2024)
          </h1>
          <p className="tou-p">
            These terms and conditions outline the rules and regulations for the
            use of Pluck Your Heart String Music Co.'s Website, located at
            pluckyourheartstringmusic.com. By accessing this website we assume
            you accept these terms and conditions. Do not continue to use
            pluckyourheartstringmusic.com if you do not agree to take all of the
            terms and conditions stated on this page.
            <br />
            <br />
            The following terminology applies to these Terms and Conditions,
            Privacy Statement and Disclaimer Notice and all Agreements:
            "Client", "You" and "Your" refers to you, the person log on this
            website and compliant to the Company's terms and conditions. "The
            Company", "Ourselves", "We", "Our" and "Us", refers to our Company.
            "Party", "Parties", or "Us", refers to both the Client and
            ourselves. All terms refer to the offer, acceptance and
            consideration of payment necessary to undertake the process of our
            assistance to the Client in the most appropriate manner for the
            express purpose of meeting the Client's needs in respect of
            provision of the Company's stated services, in accordance with and
            subject to, prevailing law of Netherlands. Any use of the above
            terminology or other words in the singular, plural, capitalization
            and/or he/she or they, are taken as interchangeable and therefore as
            referring to same.
          </p>
          <h3 className="tou-subheader">Cookies</h3>
          <p className="tou-p">
            We employ the use of cookies. By accessing
            pluckyourheartstringmusic.com, you agreed to use cookies in
            agreement with the Pluck Your Heart String Music Co.'s Privacy
            Policy. Most interactive websites use cookies to let us retrieve the
            user's details for each visit. Cookies are used by our website to
            enable the functionality of certain areas to make it easier for
            people visiting our website. Some of our affiliate/advertising
            partners may also use cookies.
          </p>
          <h3 className="tou-subheader">License</h3>
          <p className="tou-p">
            Unless otherwise stated, Pluck Your Heart String Music Co. and/or
            its licensors own the intellectual property rights for all material
            on pluckyourheartstringmusic.com. All intellectual property rights
            are reserved. You may access this from pluckyourheartstringmusic.com
            for your own personal use subjected to restrictions set in these
            terms and conditions.
            <br />
            <br />
            You must not:
          </p>
          <p className="tou-p">
            <ul>
              <li>Republish material from pluckyourheartstringmusic.com</li>
              <li>
                Sell, rent or sub-license material from
                pluckyourheartstringmusic.com
              </li>
              <li>
                Reproduce, duplicate or copy material from
                pluckyourheartstringmusic.com
              </li>
              <li>Redistribute content from pluckyourheartstringmusic.com</li>
            </ul>
            <br />
            Parts of this website offer an opportunity for users to post and
            exchange opinions and information in certain areas of the website.
            Pluck Your Heart String Music Co.does not filter, edit, publish or
            review Comments prior to their presence on the website. Comments do
            not reflect the views and opinions ofPluck Your Heart String Music
            Co., its agents and/or affiliates. Comments reflect the views and
            opinions of the person who post their views and opinions. To the
            extent permitted by applicable laws, Pluck Your Heart String Music
            Co. shall not be liable for the Comments or for any liability,
            damages or expenses caused and/or suffered as a result of any use of
            and/or posting of and/or appearance of the Comments on this website.
            Pluck Your Heart String Music Co. reserves the right to monitor all
            Comments and to remove any Comments which can be considered
            inappropriate, offensive or causes breach of these Terms and
            Conditions.
            <br />
            <br />
            You warrant and represent that:
            <ul>
              <li>
                You are entitled to post the Comments on our website and have
                all necessary licenses and consents to do so;
              </li>
              <li>
                The Comments do not invade any intellectual property right,
                including without limitation copyright, patent or trademark of
                any third party;
              </li>
              <li>
                The Comments do not contain any defamatory, libelous, offensive,
                indecent or otherwise unlawful material which is an invasion of
                privacy
              </li>
              <li>
                The Comments will not be used to solicit or promote business or
                custom or present commercial activities or unlawful activity.
              </li>
            </ul>
            <br />
            You hereby grant Pluck Your Heart String Music Co. a non-exclusive
            license to use, reproduce, edit and authorize others to use,
            reproduce and edit any of your Comments in any and all forms,
            formats or media.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default TermsOfUse;
