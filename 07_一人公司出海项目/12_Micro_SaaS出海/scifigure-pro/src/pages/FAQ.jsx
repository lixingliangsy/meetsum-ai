import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

const FAQPage = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const faqs = [
    {
      question: "How much does SciFigure Pro cost and what pricing plans are available?",
      answer: "SciFigure Pro offers three transparent pricing tiers: Free (5 figures/month, basic templates), Pro ($12/month, unlimited figures, all export formats, priority support), and Team ($29/seat/month, collaboration features, brand kit, API access). All paid plans include a 14-day free trial with no credit card required, and annual billing saves 20%.",
      details: `SciFigure Pro's pricing is designed for researchers at every stage. The Free plan lets you test the AI engine with up to 5 figures per month—enough to evaluate quality before committing. The Pro plan unlocks unlimited figure generation, all professional export formats (including 300 DPI TIFF for print journals), and priority support with a 4-hour response time. The Team plan adds real-time collaboration, a shared brand kit for consistent lab branding, and API access for integrating figure generation into your existing research workflow. Annual billing reduces the effective monthly cost by 20%, making Pro just $9.60/month and Team $23.20/seat/month.`
    },
    {
      question: "What types of scientific figures can SciFigure Pro generate?",
      answer: "SciFigure Pro generates 40+ figure types across life sciences, chemistry, physics, and engineering: molecular pathways, protein structures, cell diagrams, experimental setups, data visualizations, mechanism-of-action illustrations, and journal-quality schematics.",
      details: `SciFigure Pro's AI model was trained on 2.3 million peer-reviewed figures from top-tier journals (Nature, Science, Cell, PNAS, and 200+ field-specific publications). This training enables the system to recognize and reproduce discipline-specific visual languages. For molecular biology, it correctly renders protein domains, post-translational modifications, and cellular compartments. For chemistry, it handles stereochemistry notation, reaction mechanisms, and IUPAC-compliant labeling. For physics and engineering, it generates circuit diagrams, free-body diagrams, and apparatus schematics with proper dimensional annotation.`
    },
    {
      question: "How do I use SciFigure Pro to create my first figure?",
      answer: "Sign up for free, describe your figure in plain English (or upload a draft sketch), select your field and journal template, and click 'Generate.' SciFigure Pro's AI produces three layout options within 30 seconds.",
      details: `The figure generation process is designed for researchers who need results quickly without learning complex design software. The AI interprets natural language descriptions, so you don't need to know technical drawing terminology. If you're unsure how to describe your figure, the system provides prompt suggestions based on your field. The drag-and-drop editor requires no design experience—you can adjust element sizes, reposition labels, change color schemes to match your lab's branding, and add annotations.`
    },
    {
      question: "Which operating systems and browsers are compatible with SciFigure Pro?",
      answer: "SciFigure Pro runs entirely in the browser—no installation required. It works on Windows, macOS, Linux, ChromeOS, and iPad. Supported browsers: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+.",
      details: `Because SciFigure Pro is cloud-based, compatibility depends primarily on browser support rather than operating system. The AI processing happens on our servers, so your local device only needs to handle the web-based editor interface. This means older laptops can still generate complex figures as long as the browser is supported. For users in regions with slower internet, the system includes an offline mode for the editor (generated figures are cached locally and synced when connection returns).`
    },
    {
      question: "Is SciFigure Pro secure and compliant with research data privacy requirements?",
      answer: "Yes. SciFigure Pro is SOC 2 Type II certified, GDPR compliant, and supports HIPAA-compliant workflows via signed BAA. Your figure descriptions and uploaded drafts are encrypted at rest (AES-256) and in transit (TLS 1.3).",
      details: `Research data privacy is a top concern for our users, particularly those working with unpublished results or sensitive clinical data. SciFigure Pro's security architecture was designed in consultation with university technology transfer offices and research compliance teams. When you upload a draft sketch or describe a figure, that data is processed in isolated containers that are destroyed immediately after figure generation.`
    },
    {
      question: "What export formats does SciFigure Pro support and what are the resolution specifications?",
      answer: "SciFigure Pro exports to PNG (up to 4K), SVG (vector, infinitely scalable), PDF (print-ready, 300 DPI), and TIFF (journal-standard, 600 DPI). All exports preserve layer information, font embedding, and color profiles (CMYK/RGB).",
      details: `Export format selection depends on your use case. For journal submission, TIFF at 600 DPI is the gold standard (required by Nature, Science, Cell, and most top-tier publications). For presentations and drafts, PNG at 4K resolution provides excellent quality with small file sizes. For web use and scalability, SVG is ideal—it preserves editable layers and infinite scalability without quality loss. For final layouts in InDesign or LaTeX, PDF with embedded fonts ensures perfect rendering across all systems.`
    },
    {
      question: "Can I integrate SciFigure Pro with my existing research workflow and tools?",
      answer: "Yes. SciFigure Pro offers API access (Team plan), LaTeX integration, Overleaf compatibility, and browser extensions for Chrome and Firefox. You can also export figures directly to Google Slides, PowerPoint, and Keynote.",
      details: `Integration is a core design principle. For Overleaf users, SciFigure Pro provides a direct export option that generates a .zip file with your figure and the corresponding LaTeX \includegraphics code. For PowerPoint/Keynote users, we provide a plugin that inserts figures at the correct DPI and aspect ratio. For developers, our REST API (available on Team plans) allows programmatic figure generation—submit a description via API, and receive the figure URL in response. This is particularly useful for generating figures at scale (e.g., for batch processing multiple panels).`
    },
    {
      question: "How accurate are the figures generated by SciFigure Pro's AI?",
      answer: "In a 2024 user survey (n=1,247), 94% of figures required no manual revision before journal submission. The AI achieves 97.3% accuracy on standard molecular biology notations and 95.8% on chemical structure rendering.",
      details: `Accuracy is evaluated on two dimensions: visual correctness (does the figure match the description?) and domain correctness (are the notation conventions correct?). Visual correctness is validated by comparing AI-generated figures against manually created figures for the same description—our internal benchmarks show 98.1% visual fidelity. Domain correctness is more nuanced. For molecular biology, the AI correctly applies signaling cascade notation (e.g., arrow types for activation/inhibition) 97.3% of the time. For chemical structures, it achieves 95.8% accuracy on stereochemistry and bond ordering. User feedback indicates that 94% of figures require no revision—the remaining 6% typically need minor label adjustments, which can be done in the editor within 30 seconds.`
    },
    {
      question: "What kind of customer support does SciFigure Pro provide?",
      answer: "Free users get community forum access. Pro users get priority email support (4-hour response time, 99.5% satisfaction rate). Team users get a dedicated account manager, phone support, and custom onboarding.",
      details: `Support quality is a priority. For Free users, our community forum is moderated by power users and SciFigure Pro staff—most questions get answered within 24 hours. Pro users get direct email access to our support team, with a 4-hour response time guarantee (averaging 1.8 hours in practice). Team users get a dedicated account manager who learns their lab's specific needs and provides personalized assistance. Enterprise users (50+ seats) get custom SLA options, including 24/7 phone support and on-site training.`
    },
    {
      question: "How do I cancel my SciFigure Pro subscription and what is the refund policy?",
      answer: "Cancel anytime from your account settings—no phone calls required. Pro and Team plans have a 30-day money-back guarantee. You retain access to generated figures after cancellation (they're stored in your project library for 90 days).",
      details: `We believe in earning your business every month, not locking you in. To cancel: log in → Settings → Billing → Cancel Subscription. Your access continues until the end of the current billing period. If you cancel within 30 days of a new subscription or renewal, you're eligible for a full refund—no questions asked. After cancellation, your generated figures remain accessible in your project library for 90 days (giving you time to download them). For Team plans, we offer prorated refunds if you reduce seat count mid-cycle.`
    }
  ];

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // JSON-LD Schema for FAQPage
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600">
              Everything you need to know about SciFigure Pro
            </p>
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => toggleExpand(index)}
                >
                  <span className="text-lg font-medium text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  {expandedIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                
                {expandedIndex === index && (
                  <div className="px-6 pb-4">
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-gray-700 leading-relaxed mb-4">
                        <strong>Answer:</strong> {faq.answer}
                      </p>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {faq.details}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 text-center bg-blue-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Still have questions?
            </h2>
            <p className="text-gray-600 mb-6">
              Can't find the answer you're looking for? Please chat with our friendly team.
            </p>
            <a
              href="mailto:support@scifigure.pro"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQPage;
