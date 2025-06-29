// Schema Markup Generator for Medical/Healthcare Websites
export class SchemaGenerator {
  constructor() {
    this.baseUrl = 'https://mediverse-ai.com';
    this.organizationName = 'MediVerse AI';
  }

  // Generate Organization Schema
  generateOrganizationSchema() {
    return {
      '@context': 'https://schema.org',
      '@type': 'MedicalOrganization',
      '@id': `${this.baseUrl}/#organization`,
      name: this.organizationName,
      alternateName: 'MediVerse AI Healthcare Platform',
      description: 'AI-powered healthcare platform providing 24/7 medical consultations with 70+ medical specialties through advanced artificial intelligence technology.',
      url: this.baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${this.baseUrl}/logo.png`,
        width: 400,
        height: 400
      },
      image: {
        '@type': 'ImageObject',
        url: `${this.baseUrl}/og-image.png`,
        width: 1200,
        height: 630
      },
      telephone: '+1-800-MEDIVERSE',
      email: 'contact@mediverse-ai.com',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'US',
        addressRegion: 'Global',
        addressLocality: 'Virtual Healthcare'
      },
      foundingDate: '2024-01-01',
      medicalSpecialty: [
        'General Practice',
        'Cardiology', 
        'Neurology',
        'Psychology',
        'Psychiatry',
        'Pediatrics',
        'Oncology',
        'Orthopedics',
        'Dermatology',
        'Gynecology',
        'Emergency Medicine',
        'Internal Medicine',
        'Endocrinology',
        'Gastroenterology',
        'Ophthalmology',
        'Otolaryngology',
        'Urology',
        'Rheumatology'
      ],
      availableService: [
        {
          '@type': 'MedicalTherapy',
          name: 'AI Medical Consultation',
          description: '24/7 AI-powered medical consultations and diagnosis',
          serviceType: 'Telemedicine'
        },
        {
          '@type': 'MedicalTherapy', 
          name: 'Virtual Health Assessment',
          description: 'Comprehensive virtual health evaluations and recommendations',
          serviceType: 'Health Assessment'
        },
        {
          '@type': 'MedicalTherapy',
          name: 'Emergency Medical Consultation',
          description: 'Urgent medical consultations for emergency situations',
          serviceType: 'Emergency Care'
        }
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Medical Consultation Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Free Initial Consultation',
              description: 'Complimentary first consultation with AI medical specialist'
            },
            price: '0',
            priceCurrency: 'USD'
          }
        ]
      },
      sameAs: [
        'https://twitter.com/mediverse_ai',
        'https://facebook.com/mediverse.ai',
        'https://linkedin.com/company/mediverse-ai'
      ]
    };
  }

  // Generate WebSite Schema with Search Action
  generateWebsiteSchema() {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${this.baseUrl}/#website`,
      name: this.organizationName,
      alternateName: 'AI Healthcare Platform',
      description: 'AI-powered healthcare platform with 70+ medical specialties available 24/7',
      url: this.baseUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${this.baseUrl}/search?q={search_term_string}`,
          actionPlatform: [
            'http://schema.org/DesktopWebPlatform',
            'http://schema.org/MobileWebPlatform'
          ]
        },
        'query-input': 'required name=search_term_string'
      },
      publisher: {
        '@id': `${this.baseUrl}/#organization`
      }
    };
  }

  // Generate Service Schema for Medical Consultations
  generateServiceSchema(serviceType = 'consultation') {
    const services = {
      consultation: {
        name: 'AI Medical Consultation',
        description: 'Instant AI-powered medical consultation with specialized healthcare professionals available 24/7',
        serviceType: 'Telemedicine Consultation'
      },
      emergency: {
        name: 'Emergency Medical Consultation',
        description: 'Urgent AI medical assistance for critical health situations and emergency care',
        serviceType: 'Emergency Telemedicine'
      },
      specialist: {
        name: 'Specialist Medical Consultation',
        description: 'Specialized AI medical consultations across 70+ medical departments and specialties',
        serviceType: 'Specialist Telemedicine'
      }
    };

    const service = services[serviceType] || services.consultation;

    return {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${this.baseUrl}/service/${serviceType}`,
      name: service.name,
      description: service.description,
      serviceType: service.serviceType,
      provider: {
        '@id': `${this.baseUrl}/#organization`
      },
      areaServed: {
        '@type': 'Country',
        name: 'Global'
      },
      availableChannel: {
        '@type': 'ServiceChannel',
        serviceUrl: `${this.baseUrl}/consultation`,
        servicePhone: '+1-800-MEDIVERSE',
        serviceSmsNumber: '+1-800-MEDIVERSE'
      },
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday', 'Tuesday', 'Wednesday', 'Thursday', 
          'Friday', 'Saturday', 'Sunday'
        ],
        opens: '00:00',
        closes: '23:59'
      },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        validFrom: '2024-01-01',
        description: 'Free initial consultation available'
      }
    };
  }

  // Generate FAQ Schema
  generateFAQSchema(faqs) {
    const defaultFAQs = [
      {
        question: 'What is MediVerse AI?',
        answer: 'MediVerse AI is a comprehensive AI-powered healthcare platform that provides instant access to 70+ medical specialties through advanced artificial intelligence. Our platform offers 24/7 medical consultations, health record management, appointment scheduling, and personalized health analytics.'
      },
      {
        question: 'How accurate are AI medical consultations?',
        answer: 'Our AI systems achieve 94-97% accuracy across different medical specialties, trained on millions of medical cases and research papers, continuously learning from new medical literature, and regularly validated against human physician diagnoses.'
      },
      {
        question: 'Is my medical data secure?',
        answer: 'Yes, MediVerse AI is fully HIPAA compliant with end-to-end encryption for all communications, SOC 2 Type II certified infrastructure, multi-factor authentication, and zero-knowledge architecture ensuring even we cannot access your unencrypted data.'
      },
      {
        question: 'What medical specialties are available?',
        answer: 'We offer 70+ medical specialties including General Practice, Cardiology, Neurology, Psychology, Pediatrics, Oncology, Orthopedics, Dermatology, Gynecology, Emergency Medicine, Psychiatry, Ophthalmology, ENT, Gastroenterology, Endocrinology, and many more.'
      },
      {
        question: 'How much does MediVerse AI cost?',
        answer: 'MediVerse AI offers flexible pricing plans: Free tier includes basic consultations and health record storage. Premium plans start at $29/month for unlimited consultations, advanced analytics, and priority support. We also accept most insurance plans.'
      },
      {
        question: 'Can AI doctors prescribe medications?',
        answer: 'Yes, our AI specialists can prescribe medications when appropriate. They can issue digital prescriptions for common conditions, renew existing medications, adjust dosages based on your response, and provide over-the-counter recommendations. All prescriptions are reviewed by licensed physicians.'
      }
    ];

    const faqData = faqs && faqs.length > 0 ? faqs : defaultFAQs;

    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${this.baseUrl}/faq/#faqpage`,
      mainEntity: faqData.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    };
  }

  // Generate Medical Professional Schema
  generateMedicalProfessionalSchema(doctorData) {
    return {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': `${this.baseUrl}/doctor/${doctorData.id || 'ai-specialist'}`,
      name: doctorData.name || 'AI Medical Specialist',
      jobTitle: doctorData.title || 'AI Healthcare Professional',
      description: doctorData.description || 'Advanced AI medical specialist trained across multiple healthcare disciplines',
      worksFor: {
        '@id': `${this.baseUrl}/#organization`
      },
      hasOccupation: {
        '@type': 'Occupation',
        name: 'Medical Professional',
        occupationLocation: {
          '@type': 'VirtualLocation',
          name: 'Virtual Healthcare Platform'
        }
      },
      knowsAbout: doctorData.specialties || [
        'General Medicine',
        'Diagnostic Medicine', 
        'Telemedicine',
        'AI Healthcare'
      ]
    };
  }

  // Generate Product/Software Application Schema
  generateSoftwareApplicationSchema() {
    return {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      '@id': `${this.baseUrl}/#software`,
      name: 'MediVerse AI Healthcare Platform',
      description: 'AI-powered healthcare application providing instant medical consultations, health record management, and personalized healthcare analytics',
      url: this.baseUrl,
      applicationCategory: 'HealthApplication',
      operatingSystem: ['Web Browser', 'iOS', 'Android'],
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock'
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        ratingCount: '12847',
        bestRating: '5',
        worstRating: '1'
      },
      author: {
        '@id': `${this.baseUrl}/#organization`
      },
      publisher: {
        '@id': `${this.baseUrl}/#organization`
      },
      datePublished: '2024-01-01',
      dateModified: new Date().toISOString().split('T')[0]
    };
  }

  // Generate Breadcrumb Schema
  generateBreadcrumbSchema(breadcrumbs) {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: `${this.baseUrl}${crumb.url}`
      }))
    };
  }

  // Generate Review Schema
  generateReviewSchema(reviews) {
    return {
      '@context': 'https://schema.org',
      '@type': 'Review',
      itemReviewed: {
        '@id': `${this.baseUrl}/#software`
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: reviews.rating || '5',
        bestRating: '5',
        worstRating: '1'
      },
      author: {
        '@type': 'Person',
        name: reviews.author || 'Verified Patient'
      },
      reviewBody: reviews.text || 'Excellent AI healthcare platform with accurate consultations and great user experience.',
      datePublished: reviews.date || new Date().toISOString().split('T')[0]
    };
  }

  // Generate complete schema set for a page
  generatePageSchema(pageType, pageData = {}) {
    const schemas = [];

    // Always include organization and website
    schemas.push(this.generateOrganizationSchema());
    schemas.push(this.generateWebsiteSchema());

    // Add page-specific schemas
    switch (pageType) {
      case 'homepage':
        schemas.push(this.generateServiceSchema('consultation'));
        schemas.push(this.generateSoftwareApplicationSchema());
        if (pageData.breadcrumbs) {
          schemas.push(this.generateBreadcrumbSchema(pageData.breadcrumbs));
        }
        break;

      case 'faq':
        schemas.push(this.generateFAQSchema(pageData.faqs));
        break;

      case 'consultation':
        schemas.push(this.generateServiceSchema('consultation'));
        if (pageData.breadcrumbs) {
          schemas.push(this.generateBreadcrumbSchema(pageData.breadcrumbs));
        }
        break;

      case 'emergency':
        schemas.push(this.generateServiceSchema('emergency'));
        if (pageData.breadcrumbs) {
          schemas.push(this.generateBreadcrumbSchema(pageData.breadcrumbs));
        }
        break;

      case 'departments':
        schemas.push(this.generateServiceSchema('specialist'));
        if (pageData.breadcrumbs) {
          schemas.push(this.generateBreadcrumbSchema(pageData.breadcrumbs));
        }
        break;

      default:
        schemas.push(this.generateServiceSchema('consultation'));
    }

    return schemas;
  }

  // Generate JSON-LD script tag
  generateJSONLD(schema) {
    return `<script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>`;
  }

  // Generate all schemas as JSON-LD for insertion
  generateAllSchemasJSONLD(pageType, pageData = {}) {
    const schemas = this.generatePageSchema(pageType, pageData);
    return schemas.map(schema => this.generateJSONLD(schema)).join('\n');
  }
}

export default new SchemaGenerator();