import { useState } from "react";

type FAQ = {
  question: string;
  answer: string;
};

const faqs: FAQ[] = [
  {
    question: "Can I pre-order an item if it's currently unavailable?",
    answer:
      "Yes! Apart from custom orders, all pre-orders/reservations require a 100% deposit or a 40% deposit with 60% Balance payment upon item arrival. Speak to our friendly Sales & Support Team about a possible reservation/pre-order today!",
  },
  {
    question: "Does my order come with a warranty?",
    answer:
      "Yes! All orders come with Essential Coverage for a year from the date of purchase once you've registered your order details in your account.",
  },
  {
    question: "Can I test an item before buying it?",
    answer:
      "Unless displayed in a store, we keep our instruments freshly sealed in our warehouse.",
  },
  {
    question: "Will my order come with any accessories?",
    answer:
      "Unless stated in the product's description, our products do not come with any accessories.",
  },
  {
    question: "Does my guitar/bass come set up?",
    answer:
      "We maintain our instruments' factory set ups, which encompass a variety of playing styles.",
  },
];

function AccordionItem({
  faq,
  isOpen,
  toggle,
}: {
  faq: FAQ;
  isOpen: boolean;
  toggle: () => void;
}) {
  return (
    <div className={`accordion-item ${isOpen ? "open" : ""}`}>
      <div className="accordion-item-header" onClick={toggle}>
        <span className="accordion-item-header-title">{faq.question}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-chevron-down accordion-item-header-icon"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
      {isOpen && (
        <div className="accordion-item-description-wrapper">
          <div className="accordion-item-description">
            <p>{faq.answer}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="accordian-container">
      <div className="accordion">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            faq={faq}
            isOpen={openIndex === index}
            toggle={() => toggleItem(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default Faq;
